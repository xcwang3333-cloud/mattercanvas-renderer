// MatterCanvas Renderer v0.4-7
// Active-site highlighting utilities for catalytic structures.

function distance(a, b) {
  const dx = a.position[0] - b.position[0];
  const dy = a.position[1] - b.position[1];
  const dz = a.position[2] - b.position[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function highlightActiveSite(structure, options = {}) {
  const atoms = structure?.atoms || [];
  const centers = options.centerElements || ["Fe", "Pb", "Pt"];
  const cutoff = options.cutoff ?? 3.0;

  const centerIndices = atoms
    .map((atom, index) => ({ atom, index }))
    .filter(item => centers.includes(item.atom.element))
    .map(item => item.index);

  const highlighted = new Set(centerIndices);

  centerIndices.forEach(centerIndex => {
    atoms.forEach((atom, index) => {
      if (distance(atoms[centerIndex], atom) <= cutoff) {
        highlighted.add(index);
      }
    });
  });

  return {
    highlightedAtoms: [...highlighted],
    centerAtoms: centerIndices,
    mode: "coordination-shell"
  };
}

export function applyHighlightOpacity(atomIndex, highlightState, fadedOpacity = 0.28) {
  if (!highlightState) return 1;
  return highlightState.highlightedAtoms.includes(atomIndex)
    ? 1
    : fadedOpacity;
}
