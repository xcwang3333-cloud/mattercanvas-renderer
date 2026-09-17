// MatterCanvas Renderer v0.1
// Crystal cell wireframe generator

export function createCellVertices(lattice) {
  if (!lattice) return [];

  const a = lattice[0];
  const b = lattice[1];
  const c = lattice[2];

  return [
    [0,0,0], a, b, c,
    [a[0]+b[0],a[1]+b[1],a[2]+b[2]],
    [a[0]+c[0],a[1]+c[1],a[2]+c[2]],
    [b[0]+c[0],b[1]+c[1],b[2]+c[2]],
    [a[0]+b[0]+c[0],a[1]+b[1]+c[1],a[2]+b[2]+c[2]]
  ];
}
