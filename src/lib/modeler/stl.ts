/**
 * STAR Labs Modeler — Binary STL writer
 *
 * Binary STL format:
 *   - 80-byte header (ignored, conventionally blank or contains source app)
 *   - uint32 triangle count
 *   - For each triangle: 3 floats normal + 9 floats vertices + uint16 attribute = 50 bytes
 */

import type { Mesh } from './heightmap';

export function meshToSTL(mesh: Mesh, sourceTag = 'STAR Labs Modeler'): Blob {
  const triCount = mesh.indices.length / 3;
  const bufferSize = 80 + 4 + triCount * 50;
  const buffer = new ArrayBuffer(bufferSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  // Header — fill with source tag, pad with zeros.
  const tag = new TextEncoder().encode(sourceTag.padEnd(80, ' ').slice(0, 80));
  bytes.set(tag, 0);

  // Triangle count.
  view.setUint32(80, triCount, true);

  let offset = 84;
  const v = mesh.vertices;
  const idx = mesh.indices;

  for (let t = 0; t < triCount; t++) {
    const ia = idx[t * 3] * 3;
    const ib = idx[t * 3 + 1] * 3;
    const ic = idx[t * 3 + 2] * 3;

    const ax = v[ia], ay = v[ia + 1], az = v[ia + 2];
    const bx = v[ib], by = v[ib + 1], bz = v[ib + 2];
    const cx = v[ic], cy = v[ic + 1], cz = v[ic + 2];

    // Face normal via cross product.
    const ux = bx - ax, uy = by - ay, uz = bz - az;
    const vx = cx - ax, vy = cy - ay, vz = cz - az;
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const nLen = Math.hypot(nx, ny, nz) || 1;
    nx /= nLen; ny /= nLen; nz /= nLen;

    view.setFloat32(offset, nx, true); offset += 4;
    view.setFloat32(offset, ny, true); offset += 4;
    view.setFloat32(offset, nz, true); offset += 4;

    view.setFloat32(offset, ax, true); offset += 4;
    view.setFloat32(offset, ay, true); offset += 4;
    view.setFloat32(offset, az, true); offset += 4;

    view.setFloat32(offset, bx, true); offset += 4;
    view.setFloat32(offset, by, true); offset += 4;
    view.setFloat32(offset, bz, true); offset += 4;

    view.setFloat32(offset, cx, true); offset += 4;
    view.setFloat32(offset, cy, true); offset += 4;
    view.setFloat32(offset, cz, true); offset += 4;

    // Attribute byte count.
    view.setUint16(offset, 0, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'model/stl' });
}

export function downloadSTL(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.stl') ? filename : `${filename}.stl`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
