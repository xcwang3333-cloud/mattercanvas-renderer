// MatterCanvas Renderer v0.4
// Publication SVG structure renderer: cell -> bonds -> atoms.

import { detectBonds } from '../core/bond-detector.js';
import { getElement } from '../core/elements.js';
import { svgCircle, svgLine } from './vector-primitives.js';
import { createOrthographicProjector, projectPoint } from './projection.js';
import { latticeVertices, renderSvgCell } from './svg-cell-renderer.js';

function hexColor(value) {
  if (typeof value === 'string') return value;
  return `#${Number(value || 0xaaaaaa).toString(16).padStart(6, '0').slice(-6)}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function structureProjectionPoints(structure, showCell = true) {
  const atomPoints = (structure?.atoms || []).map(atom => atom.position);
  const cellPoints = showCell ? latticeVertices(structure?.lattice) : [];
  return [...atomPoints, ...cellPoints];
}

export function renderStructureSVG(structure, options = {}) {
  if (!structure?.atoms?.length) return '';

  const width = options.width || 400;
  const height = options.height || 360;
  const style = options.style || {};
  const camera = { ...(style.camera || {}), ...(options.camera || {}) };
  const showCell = options.showCell ?? true;
  const points = structureProjectionPoints(structure, showCell);
  const projector = createOrthographicProjector(points, {
    width,
    height,
    padding: options.padding ?? 34,
    ...camera
  });

  const bonds = options.bonds || detectBonds(
    structure.atoms,
    style.bondTolerance ?? 1.18,
    { maxDistance: options.maxBondDistance ?? Infinity }
  );

  const cellSvg = showCell
    ? renderSvgCell(structure.lattice, projector, style)
    : '';

  const bondSvg = bonds
    .map(bond => {
      const a = projector(structure.atoms[bond.atom1].position);
      const b = projector(structure.atoms[bond.atom2].position);
      return { bond, a, b, depth: (a.z + b.z) / 2 };
    })
    .sort((a, b) => a.depth - b.depth)
    .map(item => svgLine(item.a.x, item.a.y, item.b.x, item.b.y, {
      stroke: style.bondColor || '#666b70',
      width: style.bondWidth ?? 2,
      opacity: style.bondOpacity ?? 0.94,
      linecap: 'round'
    }))
    .join('\n');

  const atomSvg = structure.atoms
    .map(atom => ({ atom, p: projector(atom.position) }))
    .sort((a, b) => a.p.z - b.p.z)
    .map(({ atom, p }) => {
      const element = getElement(atom.element);
      const radius = clamp(
        element.radius * (style.atomRadiusScale ?? 8.6),
        style.atomMinRadius ?? 4.5,
        style.atomMaxRadius ?? 14
      );
      return svgCircle(p.x, p.y, radius, {
        fill: hexColor(element.color),
        stroke: style.atomStroke || '#ffffff',
        width: style.atomStrokeWidth ?? 0.65,
        opacity: style.atomOpacity ?? 1
      });
    })
    .join('\n');

  return `<g class="mc-structure">\n${cellSvg}\n${bondSvg}\n${atomSvg}\n</g>`;
}

// Backward-compatible low-level helpers used by earlier alpha code.
export function renderAtomsSVG(atoms, camera, style = {}) {
  return atoms.map(atom => {
    const p = projectPoint(atom.position, camera);
    return svgCircle(p.x, p.y, style.atomRadius || 8, {
      fill: style.atomColor || '#888888'
    });
  }).join('\n');
}

export function renderBondsSVG(bonds, atoms, camera, style = {}) {
  return bonds.map(bond => {
    const a = projectPoint(atoms[bond.atom1].position, camera);
    const b = projectPoint(atoms[bond.atom2].position, camera);
    return svgLine(a.x, a.y, b.x, b.y, {
      stroke: style.bondColor || '#444444',
      width: style.bondWidth || 2
    });
  }).join('\n');
}
