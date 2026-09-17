export const CAMERA_TEMPLATES = {
  top: {
    name: "Top",
    position: [0, 0, 50],
    target: [0, 0, 0],
    zoom: 1.0,
    orthographic: true
  },
  side: {
    name: "Side",
    position: [50, 0, 0],
    target: [0, 0, 0],
    zoom: 1.0,
    orthographic: true
  },
  iso: {
    name: "Isometric",
    position: [35, 35, 35],
    target: [0, 0, 0],
    zoom: 1.0,
    orthographic: true
  },
  publication: {
    name: "Publication ISO",
    position: [42, 28, 38],
    target: [0, 0, 0],
    zoom: 1.15,
    orthographic: true
  }
};

export function getCameraTemplate(name = "publication") {
  return CAMERA_TEMPLATES[name] || CAMERA_TEMPLATES.publication;
}
