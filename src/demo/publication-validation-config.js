// MatterCanvas Renderer v0.4-8
// Publication validation presets for catalyst structures.

export const PB_VALIDATION_CONFIG = {
  name: 'PbN4-CO2RR',
  style: 'nature',
  highlight: {
    centerElements: ['Pb'],
    cutoff: 3.0
  },
  coordination: {
    centerElements: ['Pb'],
    targetElements: ['N', 'O', 'C'],
    cutoff: 3.2,
    showDistance: true,
    dashed: true
  }
};

export const LNFE_VALIDATION_CONFIG = {
  name: 'LnFe-ORR',
  style: 'nature',
  highlight: {
    centerElements: ['Fe', 'La', 'Ce', 'Gd'],
    cutoff: 3.2
  },
  coordination: {
    centerElements: ['Fe', 'La', 'Ce', 'Gd'],
    targetElements: ['N', 'O', 'Fe', 'La', 'Ce', 'Gd'],
    cutoff: 3.4,
    showDistance: true,
    dashed: true
  }
};
