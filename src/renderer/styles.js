import nature from '../styles/nature.json';
import jacs from '../styles/jacs.json';

const styles = {
  nature,
  jacs,
  minimal: {
    name: 'Minimal',
    atomScale: 0.28,
    bondRadius: 0.035,
    cellOpacity: 0.08,
    background: '#ffffff',
    orthographic: true
  }
};

export function getStyle(name = 'nature') {
  return styles[name] || styles.nature;
}
