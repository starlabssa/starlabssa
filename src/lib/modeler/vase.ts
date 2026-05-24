/**
 * STAR Labs Modeler — Parametric vase generator
 *
 * Lathe-revolved thin-shell vase. The profile is a smooth Catmull-Rom curve
 * through five control radii (base, lower belly, belly, neck, rim) sampled
 * at evenly spaced heights. The inner wall mirrors the outer wall offset
 * inward by `wallMM`, the bottom is a solid disc, and the top is an open
 * rim connecting outer to inner.
 */

import type { Mesh } from './heightmap';

export type VaseOptions = {
  /** Total vase height in mm (Y axis when revolved). */
  heightMM: number;
  /** Outer radius at the base (Y = 0). */
  baseRadiusMM: number;
  /** Outer radius at the widest belly (around 40% of height). */
  bellyRadiusMM: number;
  /** Outer radius at the narrowest neck (around 75% of height). */
  neckRadiusMM: number;
  /** Outer radius at the open rim (Y = height). */
  rimRadiusMM: number;
  /** Wall thickness in mm. */
  wallMM: number;
  /** Total twist around the Y axis, in degrees, from base to rim. 0 = no twist. */
  twistDeg: number;
  /** Number of angular segments (higher = smoother). */
  segments: number;
  /** Number of vertical rings the profile is sampled at. */
  rings: number;
};

/**
 * Build a vase mesh.
 *
 * Profile control points (height fraction → radius):
 *   0.00 → baseRadius
 *   0.40 → bellyRadius
 *   0.75 → neckRadius
 *   1.00 → rimRadius
 *
 * Catmull-Rom interpolation gives a smooth curve through these. The 0.20
 * sample is implicitly between base and belly; the 0.55 sample between
 * belly and neck; the 0.88 between neck and rim.
 */
export function buildVaseMesh(opts: VaseOptions): Mesh {
  const segs = Math.max(12, Math.floor(opts.segments));
  const rings = Math.max(8, Math.floor(opts.rings));
  const wall = Math.max(0.6, opts.wallMM);

  // Sample outer profile radii along Y.
  const ys: number[] = new Array(rings);
  const outerR: number[] = new Array(rings);
  for (let r = 0; r < rings; r++) {
    const t = r / (rings - 1);
    ys[r] = t * opts.heightMM;
    outerR[r] = profileRadius(t, opts);
  }

  // Inner profile = outer minus wall, clamped so it never goes negative or crosses outer.
  const innerR: number[] = new Array(rings);
  for (let r = 0; r < rings; r++) {
    innerR[r] = Math.max(0.4, outerR[r] - wall);
  }

  // Angle per segment and twist per ring.
  const dAng = (Math.PI * 2) / segs;
  const twistRad = (opts.twistDeg * Math.PI) / 180;

  const verts: number[] = [];
  const indices: number[] = [];

  // Vertex layout:
  //   outer ring r, segment s   → r * segs + s
  //   inner ring r, segment s   → ringsOffset + r * segs + s
  //   bottom center             → bottomCenterIdx
  //
  // Y axis is "up" in the mesh; the studio rotates the whole thing into +Z up.
  const outerStart = 0;
  const innerStart = rings * segs;
  const bottomCenterIdx = 2 * rings * segs;

  for (let r = 0; r < rings; r++) {
    const twistAtRing = (r / (rings - 1)) * twistRad;
    for (let s = 0; s < segs; s++) {
      const a = s * dAng + twistAtRing;
      verts.push(Math.cos(a) * outerR[r], ys[r], Math.sin(a) * outerR[r]);
    }
  }
  for (let r = 0; r < rings; r++) {
    const twistAtRing = (r / (rings - 1)) * twistRad;
    for (let s = 0; s < segs; s++) {
      const a = s * dAng + twistAtRing;
      verts.push(Math.cos(a) * innerR[r], ys[r], Math.sin(a) * innerR[r]);
    }
  }
  verts.push(0, 0, 0); // bottom center

  // Outer skin: quads between consecutive rings, outward-facing normals.
  for (let r = 0; r < rings - 1; r++) {
    for (let s = 0; s < segs; s++) {
      const s2 = (s + 1) % segs;
      const a = outerStart + r * segs + s;
      const b = outerStart + r * segs + s2;
      const c = outerStart + (r + 1) * segs + s;
      const d = outerStart + (r + 1) * segs + s2;
      // Outward (away from Y axis): wind so the normal points outward.
      indices.push(a, c, d);
      indices.push(a, d, b);
    }
  }

  // Inner skin: same rings, reversed winding (normals face the Y axis).
  for (let r = 0; r < rings - 1; r++) {
    for (let s = 0; s < segs; s++) {
      const s2 = (s + 1) % segs;
      const a = innerStart + r * segs + s;
      const b = innerStart + r * segs + s2;
      const c = innerStart + (r + 1) * segs + s;
      const d = innerStart + (r + 1) * segs + s2;
      indices.push(a, d, c);
      indices.push(a, b, d);
    }
  }

  // Bottom cap — solid disc from outer ring 0 to the center point. Normal down.
  for (let s = 0; s < segs; s++) {
    const s2 = (s + 1) % segs;
    const a = outerStart + 0 * segs + s;
    const b = outerStart + 0 * segs + s2;
    // Winding: looking from below (-Y), CCW gives a downward normal.
    indices.push(bottomCenterIdx, b, a);
  }

  // Top rim — connect outer ring (rings-1) to inner ring (rings-1).
  // The rim faces +Y, so wind CCW viewed from above.
  const topR = rings - 1;
  for (let s = 0; s < segs; s++) {
    const s2 = (s + 1) % segs;
    const ao = outerStart + topR * segs + s;
    const bo = outerStart + topR * segs + s2;
    const ai = innerStart + topR * segs + s;
    const bi = innerStart + topR * segs + s2;
    // Quad: ao - bo - bi - ai, viewed from +Y.
    indices.push(ao, bo, bi);
    indices.push(ao, bi, ai);
  }

  const vertices = new Float32Array(verts);
  const indexArr = new Uint32Array(indices);
  const normals = computeNormals(vertices, indexArr);

  // Recenter so the vase sits with its center on the X/Z origin and base at Y=0,
  // then swap Y↔Z so it stands "up" the same way heightmap meshes do (which use
  // Z as height after the studio's -PI/2 X rotation).
  // The studio applies a global X rotation to its meshes; heightmap meshes are
  // built in XY-plane with thickness in +Z. To stay consistent, we'll build the
  // vase with height in +Z so the studio's rotation orients it standing up.
  return swapYToZ({ vertices, indices: indexArr, normals });
}

/** Catmull-Rom-ish interpolation through four control radii. */
function profileRadius(t: number, opts: VaseOptions): number {
  // Control points: (t, r)
  const cps: [number, number][] = [
    [0.0, opts.baseRadiusMM],
    [0.4, opts.bellyRadiusMM],
    [0.75, opts.neckRadiusMM],
    [1.0, opts.rimRadiusMM],
  ];

  // Find the segment t falls into.
  let i = 0;
  for (; i < cps.length - 1; i++) {
    if (t <= cps[i + 1][0]) break;
  }
  if (i >= cps.length - 1) return cps[cps.length - 1][1];

  const [t0, r0] = cps[i];
  const [t1, r1] = cps[i + 1];
  // Local parameter within this segment.
  const u = (t - t0) / (t1 - t0);

  // Use neighboring control points for Catmull-Rom tangents.
  const tPrev = i > 0 ? cps[i - 1] : cps[i];
  const tNext = i + 2 < cps.length ? cps[i + 2] : cps[i + 1];
  const rPrev = tPrev[1];
  const rNext = tNext[1];

  // Catmull-Rom (uniform).
  const u2 = u * u;
  const u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1;
  const h10 = u3 - 2 * u2 + u;
  const h01 = -2 * u3 + 3 * u2;
  const h11 = u3 - u2;
  const m0 = (r1 - rPrev) * 0.5;
  const m1 = (rNext - r0) * 0.5;
  return h00 * r0 + h10 * m0 + h01 * r1 + h11 * m1;
}

/** Swap Y and Z axes so the vase stands along +Z. */
function swapYToZ(mesh: Mesh): Mesh {
  const v = mesh.vertices;
  const n = mesh.normals;
  for (let i = 0; i < v.length; i += 3) {
    const y = v[i + 1];
    const z = v[i + 2];
    v[i + 1] = z;
    v[i + 2] = y;
  }
  for (let i = 0; i < n.length; i += 3) {
    const y = n[i + 1];
    const z = n[i + 2];
    n[i + 1] = z;
    n[i + 2] = y;
    // Flipping handedness via axis swap inverts winding; flip normals back.
    n[i] = -n[i];
    n[i + 1] = -n[i + 1];
    n[i + 2] = -n[i + 2];
  }
  // Also flip triangle winding to match the axis swap.
  const idx = mesh.indices;
  for (let t = 0; t < idx.length; t += 3) {
    const tmp = idx[t + 1];
    idx[t + 1] = idx[t + 2];
    idx[t + 2] = tmp;
  }
  return mesh;
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
  for (let i = 0; i < normals.length; i += 3) {
    const x = normals[i], y = normals[i + 1], z = normals[i + 2];
    const len = Math.hypot(x, y, z) || 1;
    normals[i] = x / len;
    normals[i + 1] = y / len;
    normals[i + 2] = z / len;
  }
  return normals;
}
