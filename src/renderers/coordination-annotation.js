// MatterCanvas Renderer v0.4-8
// Coordination annotation utilities for catalyst publication figures.

function distance(a, b) {
  const dx = a.position[0] - b.position[0];
  const dy = a.position[1] - b.position[1];
  const dz = a.position[2] - b.position[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function buildCoordinationAnnotations(structure, options = {}) {
  const atoms = structure?.atoms || [];
  const centers = options.centerElements || [];
  const targets = options.targetElements || [];
  const cutoff = options.cutoff ?? 3.2;

  const annotations = [];

  atoms.forEach((a, i) => {
    if (!centers.includes(a.element)) return;

    atoms.forEach((b, j) => {
      if (i === j) return;
      if (targets.length && !targets.includes(b.element)) return;

      const d = distance(a, b);
      if (d <= cutoff) {
        annotations.push({
          atom1: i,
          atom2: j,
          distance: Number(d.toFixed(2)),
          label: `${a.element}-${b.element} ${d.toFixed(2)} Å`
        });
      }
    });
  });

  return annotations;
}
