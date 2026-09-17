// MatterCanvas Camera Controller
// Publication-oriented camera presets

const CAMERA_PRESETS = {
  publicationIso: {
    position: [1.8, 1.4, 2.2],
    target: [0, 0, 0],
    zoom: 1.0,
    type: 'orthographic'
  },
  top: {
    position: [0, 0, 20],
    target: [0, 0, 0],
    zoom: 1.2,
    type: 'orthographic'
  },
  side: {
    position: [20, 0, 0],
    target: [0, 0, 0],
    zoom: 1.2,
    type: 'orthographic'
  }
};

export function applyCameraPreset(camera, controls, name = 'publicationIso') {
  const preset = CAMERA_PRESETS[name] || CAMERA_PRESETS.publicationIso;

  camera.position.set(...preset.position);
  camera.lookAt(...preset.target);

  if (camera.isOrthographicCamera) {
    camera.zoom = preset.zoom;
    camera.updateProjectionMatrix();
  }

  if (controls) {
    controls.target.set(...preset.target);
    controls.update();
  }
}

export { CAMERA_PRESETS };
