// MatterCanvas Renderer v0.4
// Opinionated, reproducible publication presets for DFT structure panels.

const PRESETS = {
  nature: {
    name: 'Nature',
    background: '#ffffff',
    atomRadiusScale: 8.6,
    atomMinRadius: 4.6,
    atomMaxRadius: 13.5,
    bondWidth: 2.0,
    bondColor: '#6f747a',
    bondOpacity: 0.92,
    bondTolerance: 1.16,
    cellColor: '#6f7f89',
    cellWidth: 1.0,
    cellOpacity: 0.20,
    cellDash: '4 4',
    panelLabelSize: 18,
    panelTitleSize: 14,
    camera: { azimuth: 45, elevation: 32, zoom: 0.90 }
  },
  jacs: {
    name: 'JACS',
    background: '#ffffff',
    atomRadiusScale: 9.6,
    atomMinRadius: 5.0,
    atomMaxRadius: 14.8,
    bondWidth: 2.4,
    bondColor: '#5f646a',
    bondOpacity: 0.96,
    bondTolerance: 1.19,
    cellColor: '#667780',
    cellWidth: 1.15,
    cellOpacity: 0.27,
    cellDash: '',
    panelLabelSize: 18,
    panelTitleSize: 14,
    camera: { azimuth: 45, elevation: 35.264, zoom: 0.90 }
  }
};

export function getPublicationPreset(name = 'nature') {
  return PRESETS[name] || PRESETS.nature;
}

export function listPublicationPresets() {
  return Object.keys(PRESETS);
}
