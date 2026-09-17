// 3D to 2D projection utilities for vector figure export

export function projectPoint(point, camera = {}) {
  const x = point[0] - (camera.target?.[0] || 0);
  const y = point[1] - (camera.target?.[1] || 0);
  const z = point[2] - (camera.target?.[2] || 0);

  const scale = camera.scale || 80;

  return {
    x: x * scale,
    y: -y * scale,
    z
  };
}

export function projectAtoms(atoms, camera) {
  return atoms.map(atom => ({
    ...atom,
    screen: projectPoint(atom.position, camera)
  }));
}
