// MatterCanvas Renderer v0.1
// Simple covalent-radius based bond detection

const COVALENT_RADII = {
  H: 0.31,
  C: 0.76,
  N: 0.71,
  O: 0.66,
  S: 1.05,
  Fe: 1.26,
  Co: 1.25,
  Ni: 1.21,
  Pb: 1.46
};

function distance(a, b) {
  return Math.sqrt(
    (a[0]-b[0])**2 +
    (a[1]-b[1])**2 +
    (a[2]-b[2])**2
  );
}

export function detectBonds(atoms, tolerance = 1.25) {
  const bonds = [];

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const ri = COVALENT_RADII[atoms[i].element];
      const rj = COVALENT_RADII[atoms[j].element];
      if (!ri || !rj) continue;

      const d = distance(atoms[i].position, atoms[j].position);
      if (d < tolerance * (ri + rj)) {
        bonds.push({
          atom1: i,
          atom2: j,
          distance: d
        });
      }
    }
  }

  return bonds;
}
