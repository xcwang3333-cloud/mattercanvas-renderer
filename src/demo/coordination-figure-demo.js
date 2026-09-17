// MatterCanvas Renderer v0.4-8
// Coordination annotation demo presets.

export const PB_COORDINATION_DEMO = {
  name: 'PbN4-CO2RR',
  style: 'nature',
  highlight: {
    centerElements: ['Pb'],
    cutoff: 3.2
  },
  coordination: {
    centerElements: ['Pb'],
    targetElements: ['N', 'O', 'C'],
    cutoff: 3.2,
    dashed: true,
    showDistance: true
  }
};

export const LNFE_COORDINATION_DEMO = {
  name: 'LnFe-ORR',
  style: 'nature',
  highlight: {
    centerElements: ['Fe', 'La', 'Ce', 'Gd'],
    cutoff: 3.4
  },
  coordination: {
    centerElements: ['Fe', 'La', 'Ce', 'Gd'],
    targetElements: ['N', 'O', 'Fe', 'La', 'Ce', 'Gd'],
    cutoff: 3.4,
    dashed: true,
    showDistance: true
  }
};
