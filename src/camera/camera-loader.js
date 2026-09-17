// MatterCanvas Renderer - camera template loader

const CAMERA_TEMPLATES = {
  publicationIso: {
    name: 'publication-iso',
    position: [1.6, 1.2, 1.8],
    target: [0, 0, 0],
    projection: 'orthographic',
    zoom: 1.0
  },
  top: {
    name: 'top',
    position: [0, 0, 30],
    target: [0, 0, 0],
    projection: 'orthographic',
    zoom: 1.0
  }
};

export function getCameraTemplate(name = 'publication-iso') {
  return CAMERA_TEMPLATES[name] || CAMERA_TEMPLATES.publicationIso;
}
