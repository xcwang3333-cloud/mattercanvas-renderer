// MatterCanvas Renderer v0.4-7
// Orthographic 3D -> 2D projection with slab-aware fitting.

import { detectSlab } from '../analysis/slab-detector.js';

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function normalize(v) {
  const length = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / length, v[1] / length, v[2] / length];
}

function bounds(points) {
  if (!points.length) return { min: [0, 0], max: [1, 1] };
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  return {
    min: [Math.min(...xs), Math.min(...ys)],
    max: [Math.max(...xs), Math.max(...ys)]
  };
}

function cameraBasis(camera = {}) {
  const azimuth = (camera.azimuth ?? 45) * Math.PI / 180;
  const elevation = (camera.elevation ?? 35.264) * Math.PI / 180;
  const forward = normalize([
    Math.cos(elevation) * Math.cos(azimuth),
    Math.cos(elevation) * Math.sin(azimuth),
    Math.sin(elevation)
  ]);
  const worldUp = Math.abs(forward[2]) > 0.98 ? [0, 1, 0] : [0, 0, 1];
  const right = normalize(cross(forward, worldUp));
  const up = normalize(cross(right, forward));
  return { right, up, forward };
}

export function createOrthographicProjector(points3d, options = {}) {
  const width = options.width || 400;
  const height = options.height || 400;
  const padding = options.padding ?? 34;
  const target = options.target || [0, 0, 0];
  const basis = cameraBasis(options);

  const slabInfo = options.structure && options.slabAware !== false
    ? detectSlab(options.structure)
    : { isSlab: false };

  const projected = points3d.map(point => {
    const delta = sub(point, target);
    return [dot(delta, basis.right), -dot(delta, basis.up), dot(delta, basis.forward)];
  });

  const box = bounds(projected);
  const spanX = Math.max(box.max[0] - box.min[0], 1e-6);
  const spanY = Math.max(box.max[1] - box.min[1], 1e-6);
  const usableWidth = Math.max(1, width - 2 * padding);
  const usableHeight = Math.max(1, height - 2 * padding);

  let zoom = options.zoom ?? 0.92;
  if (slabInfo.isSlab) {
    zoom *= 1.12;
  }

  const scale = Math.min(usableWidth / spanX, usableHeight / spanY) * zoom;
  const centerX = (box.min[0] + box.max[0]) / 2;
  const centerY = (box.min[1] + box.max[1]) / 2;

  return point => {
    const delta = sub(point, target);
    const x = dot(delta, basis.right);
    const y = -dot(delta, basis.up);
    const depth = dot(delta, basis.forward);
    return {
      x: width / 2 + (x - centerX) * scale,
      y: height / 2 + (y - centerY) * scale,
      z: depth,
      scale,
      slabAware: slabInfo.isSlab
    };
  };
}

export function projectPoint(point, camera = {}) {
  const target = camera.target || [0, 0, 0];
  const delta = sub(point, target);
  const basis = cameraBasis(camera);
  const scale = camera.scale || 80;

  return {
    x: dot(delta, basis.right) * scale + (camera.offsetX || 0),
    y: -dot(delta, basis.up) * scale + (camera.offsetY || 0),
    z: dot(delta, basis.forward)
  };
}

export function projectAtoms(atoms, camera) {
  return atoms.map(atom => ({ ...atom, screen: projectPoint(atom.position, camera) }));
}
