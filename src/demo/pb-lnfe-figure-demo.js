// MatterCanvas publication demo presets

export const PB_N4_FIGURE_DEMO = {
  title: 'PbN4 CO2RR active-site figure',
  style: 'nature',
  camera: 'publication-iso',
  highlight: {
    centerElements: ['Pb'],
    cutoff: 3.0,
    mode: 'active-site'
  },
  panels: [
    'PbN4',
    'PbN4-COOH',
    'PbN4-OCHO',
    'PbN4-CO'
  ]
};

export const LN_FE_FIGURE_DEMO = {
  title: 'LnFe DAC active-site figure',
  style: 'nature',
  camera: 'publication-iso',
  highlight: {
    centerElements: ['Fe', 'La', 'Ce', 'Gd'],
    cutoff: 3.2,
    mode: 'coordination-shell'
  },
  panels: [
    'LnFe-N-C'
  ]
};
