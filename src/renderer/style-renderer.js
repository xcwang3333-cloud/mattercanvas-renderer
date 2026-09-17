// MatterCanvas Renderer - publication style controller

import { getStyle } from './styles.js';

export function applyStyle(viewer, styleName = 'nature') {
  const style = typeof styleName === 'string' ? getStyle(styleName) : styleName;
  if (!viewer || !style) return style;

  if (viewer.renderer && style.background) {
    viewer.renderer.setClearColor(style.background, 1);
  }

  viewer.style = style;

  if (viewer.scene) {
    viewer.scene.traverse((obj) => {
      if (obj.isMesh && obj.geometry.type === 'SphereGeometry') {
        obj.scale.setScalar(style.atomScale || 1);
      }
      if (obj.isMesh && obj.geometry.type === 'CylinderGeometry') {
        obj.scale.setY(style.bondRadius ? style.bondRadius / 0.05 : 1);
      }
    });
  }

  return style;
}
