// MatterCanvas Renderer v0.1
// OrbitControls wrapper

export function enableOrbitControls(controls) {
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.screenSpacePanning = true;
  controls.minDistance = 2;
  controls.maxDistance = 200;
  controls.update();

  return controls;
}
