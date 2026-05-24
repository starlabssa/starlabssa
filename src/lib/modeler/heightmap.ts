/**
 * STAR Labs Modeler — Heightmap engine
 *
 * Converts a 2D image into a 3D mesh by treating pixel brightness as height.
 * Shared across all templates (bookmark, keychain, future: lithophane, portrait, etc).
 *
 * The mesh is generated as a typed-array of vertices + faces so it can be
 * handed to either the STL writer or Three.js for preview without conversion.
 */

export type HeightmapOptions = {
  /** Final printed width in mm (X axis). */
  widthMM: number;
  /** Final printed height in mm (Y axis). */
  heightMM: number;
  /** Base/floor thickness in mm. The image-derived relief sits on top of this. */
  baseMM: number;
  /** Maximum additional relief height in mm on top of the base. */
  reliefMM: number;
  /** Grid resolution. More = finer detail, larger file. 200-400 is a sweet spot. */
  resolution: number;
  /** If true, dark pixels become tall (lithophane-style). If false, bright pixels become tall (engrave-style). */
  invert: boolean;
  /** Circular holes to subtract from the mesh (for keychain rings, bookmark tassels, etc). */
  holes?: HoleSpec[];
  /** Optional shape mask. Pixels outside the mask are excluded from the mesh. */
  shape?: ShapeMask;
};

export type HoleSpec = {
  /** Center X in mm from the left edge. */
  x: number;
  /** Center Y in mm from the bottom edge. */
  y: number;
  /** Hole radius in mm. */
  radius: number;
};

export type ShapeMask =
  | { kind: 'rect'; cornerRadiusMM?: number }
  | { kind: 'ellipse' }
  | { kind: 'rounded'; cornerRadiusMM: number };

export type Mesh = {
  /** Float32Array of [x,y,z, x,y,z, ...] vertex positions in mm. */
  vertices: Float32Array;
  /** Uint32Array of vertex indices, three per triangle. */
  indices: Uint32Array;
  /** Per-vertex normals (Float32Array, same length as vertices). */
  normals: Float32Array;
};

/**
 * Load an image from a File or Blob into an ImageData object at the
 * requested resolution. Resamples to fit the heightmap grid.
 */
export async function imageToGrayscale(
  source: HTMLImageElement,
  cols: number,
  rows: number,
): Promise<Float32Array> {
  const canvas = document.createElement('canvas');
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D not available');

  // Use high-quality downsampling.
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, cols, rows);

  const pixels = ctx.getImageData(0, 0, cols, rows).data;
  const out = new Float32Array(cols * rows);

  // Standard luminance weights (Rec. 709).
  for (let i = 0, p = 0; p < pixels.length; p += 4, i++) {
    const r = pixels[p];
    const g = pixels[p + 1];
    const b = pixels[p + 2];
    const a = pixels[p + 3] / 255;
    // Premultiply alpha so transparent regions read as white (no relief).
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    out[i] = lum * a + (1 - a) * 1.0;
  }

  return out;
}

/**
 * Build a mesh from an image and parameters.
 *
 * Algorithm:
 *   1. Resample image to a (cols × rows) grid of heights.
 *   2. For each grid cell, decide if it's inside the shape mask. Cells inside
 *      a hole are skipped entirely (creating the hole).
 *   3. Emit a top vertex per included grid point at z = base + relief*height.
 *   4. Emit a bottom vertex per included grid point at z = 0.
 *   5. Stitch top, bottom, and the boundary into a closed manifold.
 */
export async function buildMesh(
  image: HTMLImageElement,
  opts: HeightmapOptions,
): Promise<Mesh> {
  const aspect = opts.widthMM / opts.heightMM;
  // Keep total cell count near opts.resolution^2 while matching aspect ratio.
  const cols = Math.max(8, Math.round(opts.resolution * Math.sqrt(aspect)));
  const rows = Math.max(8, Math.round(opts.resolution / Math.sqrt(aspect)));

  const heights = await imageToGrayscale(image, cols, rows);

  const cellW = opts.widthMM / (cols - 1);
  const cellH = opts.heightMM / (rows - 1);

  // Decide inclusion per grid point.
  const included = new Uint8Array(cols * rows);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = i * cellW;
      const y = j * cellH;
      included[j * cols + i] = isInside(x, y, opts) ? 1 : 0;
    }
  }

  // Build vertex maps. Each included grid point gets a top and bottom vertex.
  // Map grid index -> (topVertexIndex, bottomVertexIndex). -1 if excluded.
  const topIdx = new Int32Array(cols * rows).fill(-1);
  const botIdx = new Int32Array(cols * rows).fill(-1);

  const verts: number[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const gi = j * cols + i;
      if (!included[gi]) continue;

      const x = i * cellW;
      const y = j * cellH;
      const h = heights[gi];
      const relief = opts.invert ? 1 - h : h;
      const z = opts.baseMM + relief * opts.reliefMM;

      topIdx[gi] = verts.length / 3;
      verts.push(x, y, z);
    }
  }
  // Bottom pass (after all tops so indices are contiguous in each group).
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const gi = j * cols + i;
      if (!included[gi]) continue;
      const x = i * cellW;
      const y = j * cellH;
      botIdx[gi] = verts.length / 3;
      verts.push(x, y, 0);
    }
  }

  const indices: number[] = [];

  // Top surface: two triangles per quad where all four corners are included.
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = topIdx[j * cols + i];
      const b = topIdx[j * cols + (i + 1)];
      const c = topIdx[(j + 1) * cols + i];
      const d = topIdx[(j + 1) * cols + (i + 1)];
      if (a < 0 || b < 0 || c < 0 || d < 0) continue;
      // Top faces wind CCW viewed from +Z.
      indices.push(a, b, d);
      indices.push(a, d, c);
    }
  }

  // Bottom surface: same quads, reversed winding.
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = botIdx[j * cols + i];
      const b = botIdx[j * cols + (i + 1)];
      const c = botIdx[(j + 1) * cols + i];
      const d = botIdx[(j + 1) * cols + (i + 1)];
      if (a < 0 || b < 0 || c < 0 || d < 0) continue;
      indices.push(a, d, b);
      indices.push(a, c, d);
    }
  }

  // Side walls: any edge between an included cell and an excluded cell (or the
  // grid boundary) needs a vertical wall connecting top to bottom.
  const isIncluded = (i: number, j: number) =>
    i >= 0 && i < cols && j >= 0 && j < rows && included[j * cols + i] === 1;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (!isIncluded(i, j)) continue;
      // Right edge.
      if (i + 1 < cols && !isIncluded(i + 1, j) && isIncluded(i, j + 1) && !isIncluded(i + 1, j + 1)) {
        emitWall(indices, topIdx[j * cols + i], topIdx[(j + 1) * cols + i],
          botIdx[j * cols + i], botIdx[(j + 1) * cols + i], 'right');
      }
      // Left edge.
      if (i - 1 >= 0 && !isIncluded(i - 1, j) && isIncluded(i, j + 1) && !isIncluded(i - 1, j + 1)) {
        emitWall(indices, topIdx[(j + 1) * cols + i], topIdx[j * cols + i],
          botIdx[(j + 1) * cols + i], botIdx[j * cols + i], 'left');
      }
      // Top edge.
      if (j + 1 < rows && !isIncluded(i, j + 1) && isIncluded(i + 1, j) && !isIncluded(i + 1, j + 1)) {
        emitWall(indices, topIdx[(j) * cols + (i + 1)], topIdx[j * cols + i],
          botIdx[(j) * cols + (i + 1)], botIdx[j * cols + i], 'top');
      }
      // Bottom edge.
      if (j - 1 >= 0 && !isIncluded(i, j - 1) && isIncluded(i + 1, j) && !isIncluded(i + 1, j - 1)) {
        emitWall(indices, topIdx[j * cols + i], topIdx[(j) * cols + (i + 1)],
          botIdx[j * cols + i], botIdx[(j) * cols + (i + 1)], 'bottom');
      }
    }
  }

  // Outer boundary walls (when the grid edges are inside the shape).
  // Bottom row.
  for (let i = 0; i < cols - 1; i++) {
    const a = topIdx[0 * cols + i];
    const b = topIdx[0 * cols + (i + 1)];
    const c = botIdx[0 * cols + i];
    const d = botIdx[0 * cols + (i + 1)];
    if (a >= 0 && b >= 0 && c >= 0 && d >= 0) emitWall(indices, b, a, d, c, 'outer-bottom');
  }
  // Top row.
  for (let i = 0; i < cols - 1; i++) {
    const a = topIdx[(rows - 1) * cols + i];
    const b = topIdx[(rows - 1) * cols + (i + 1)];
    const c = botIdx[(rows - 1) * cols + i];
    const d = botIdx[(rows - 1) * cols + (i + 1)];
    if (a >= 0 && b >= 0 && c >= 0 && d >= 0) emitWall(indices, a, b, c, d, 'outer-top');
  }
  // Left column.
  for (let j = 0; j < rows - 1; j++) {
    const a = topIdx[j * cols + 0];
    const b = topIdx[(j + 1) * cols + 0];
    const c = botIdx[j * cols + 0];
    const d = botIdx[(j + 1) * cols + 0];
    if (a >= 0 && b >= 0 && c >= 0 && d >= 0) emitWall(indices, a, b, c, d, 'outer-left');
  }
  // Right column.
  for (let j = 0; j < rows - 1; j++) {
    const a = topIdx[j * cols + (cols - 1)];
    const b = topIdx[(j + 1) * cols + (cols - 1)];
    const c = botIdx[j * cols + (cols - 1)];
    const d = botIdx[(j + 1) * cols + (cols - 1)];
    if (a >= 0 && b >= 0 && c >= 0 && d >= 0) emitWall(indices, b, a, d, c, 'outer-right');
  }

  const vertices = new Float32Array(verts);
  const indexArr = new Uint32Array(indices);
  const normals = computeNormals(vertices, indexArr);

  return { vertices, indices: indexArr, normals };
}

function emitWall(
  indices: number[],
  topA: number,
  topB: number,
  botA: number,
  botB: number,
  _label: string,
): void {
  // Quad: topA - topB - botB - botA, two triangles, outward normal.
  indices.push(topA, topB, botB);
  indices.push(topA, botB, botA);
}

function isInside(x: number, y: number, opts: HeightmapOptions): boolean {
  // Check holes first — points inside any hole are excluded.
  if (opts.holes) {
    for (const h of opts.holes) {
      const dx = x - h.x;
      const dy = y - h.y;
      if (dx * dx + dy * dy <= h.radius * h.radius) return false;
    }
  }
  // Check shape mask.
  const shape = opts.shape ?? { kind: 'rect' };
  if (shape.kind === 'rect' && !shape.cornerRadiusMM) return true;
  if (shape.kind === 'ellipse') {
    const cx = opts.widthMM / 2;
    const cy = opts.heightMM / 2;
    const rx = opts.widthMM / 2;
    const ry = opts.heightMM / 2;
    const nx = (x - cx) / rx;
    const ny = (y - cy) / ry;
    return nx * nx + ny * ny <= 1;
  }
  // Rounded rect.
  const r =
    shape.kind === 'rounded'
      ? shape.cornerRadiusMM
      : shape.kind === 'rect'
        ? (shape.cornerRadiusMM ?? 0)
        : 0;
  if (r <= 0) return true;
  const w = opts.widthMM;
  const h = opts.heightMM;
  if (x >= r && x <= w - r) return true;
  if (y >= r && y <= h - r) return true;
  // In a corner — check distance to corner center.
  const cx = x < r ? r : w - r;
  const cy = y < r ? r : h - r;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function computeNormals(vertices: Float32Array, indices: Uint32Array): Float32Array {
  const normals = new Float32Array(vertices.length);
  for (let t = 0; t < indices.length; t += 3) {
    const ia = indices[t] * 3;
    const ib = indices[t + 1] * 3;
    const ic = indices[t + 2] * 3;
    const ax = vertices[ia], ay = vertices[ia + 1], az = vertices[ia + 2];
    const bx = vertices[ib], by = vertices[ib + 1], bz = vertices[ib + 2];
    const cx = vertices[ic], cy = vertices[ic + 1], cz = vertices[ic + 2];
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = cx - ax, vy = cy - ay, vz = cz - az;
    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;
    normals[ia] += nx; normals[ia + 1] += ny; normals[ia + 2] += nz;
    normals[ib] += nx; normals[ib + 1] += ny; normals[ib + 2] += nz;
    normals[ic] += nx; normals[ic + 1] += ny; normals[ic + 2] += nz;
  }
  // Normalize.
  for (let i = 0; i < normals.length; i += 3) {
    const x = normals[i], y = normals[i + 1], z = normals[i + 2];
    const len = Math.hypot(x, y, z) || 1;
    normals[i] = x / len;
    normals[i + 1] = y / len;
    normals[i + 2] = z / len;
  }
  return normals;
}
