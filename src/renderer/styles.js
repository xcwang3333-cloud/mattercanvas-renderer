import nature from '../styles/nature.json';
import jacs from '../styles/jacs.json';

const styles = {
  nature,
  jacs,
  angew: {
    name: 'Angew',
    atomScale: 0.38,
    bondRadius: 0.05,
    cellOpacity: 0.12,
    background: '#ffffff',
    orthographic: true,
    lighting: {
      ambient: 0.7,
      directional: 1.9
    }
  },
  minimal: {
    name: 'Minimal',
    atomScale: 0.28,
    bondRadius: 0.035,
    cellOpacity: 0.08,
    background: '#ffffff',
    orthographic: true,
    lighting: {
      ambient: 0.85,
      directional: 1.2
    }
  }
};

export function getStyle(name = 'nature') {
  return styles[name] || styles.nature;
}

export function listStyles() {
  return Object.keys(styles);
}
