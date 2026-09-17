// MatterCanvas Renderer v0.4-7
// Detect surface/slab structures by lattice anisotropy and atomic distribution.

function vectorLength(v) {
  return Math.hypot(v[0], v[1], v[2]);
}

function atomicZSpan(atoms = []) {
  if (!atoms.length) return 0;
  const z = atoms.map(a => a.position[2]);
  return Math.max(...z) - Math.min(...z);
}

export function detectSlab(structure, options = {}) {
  const atoms = structure?.atoms || [];
  const lattice = structure?.lattice || [];

  const a = lattice[0] ? vectorLength(lattice[0]) : 0;
  const b = lattice[1] ? vectorLength(lattice[1]) : 0;
  const c = lattice[2] ? vectorLength(lattice[2]) : 0;

  const zSpan = atomicZSpan(atoms);
  const vacuum = Math.max(c - zSpan, 0);

  const isSlab =
    c > 0 &&
    (c / Math.max(a, b, 1e-6)) > (options.cRatio ?? 1.6) &&
    vacuum > (options.vacuum ?? 6);

  return {
    isSlab,
    lattice: { a, b, c },
    zSpan,
    vacuum
  };
}
