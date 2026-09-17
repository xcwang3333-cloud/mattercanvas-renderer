import { svgCircle, svgLine } from './vector-primitives.js';
import { projectPoint } from './projection.js';

export function renderAtomsSVG(atoms, camera, style = {}) {
  return atoms.map(atom => {
    const p = projectPoint(atom.position, camera);
    return svgCircle(
      p.x,
      p.y,
      style.atomRadius || 8,
      style.atomColor || '#888888'
    );
  }).join('\n');
}

export function renderBondsSVG(bonds, atoms, camera, style = {}) {
  return bonds.map(bond => {
    const a = projectPoint(atoms[bond.atom1].position, camera);
    const b = projectPoint(atoms[bond.atom2].position, camera);
    return svgLine(
      a.x,
      a.y,
      b.x,
      b.y,
      style.bondColor || '#444444',
      style.bondWidth || 2
    );
  }).join('\n');
}
