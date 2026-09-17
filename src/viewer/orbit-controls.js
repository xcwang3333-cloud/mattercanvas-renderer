// MatterCanvas Renderer v0.1
// Three.js OrbitControls adapter

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function attachOrbitControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = true;
  controls.minDistance = 2;
  controls.maxDistance = 200;
  controls.target.set(0, 0, 0);
  controls.update();
  return controls;
}
