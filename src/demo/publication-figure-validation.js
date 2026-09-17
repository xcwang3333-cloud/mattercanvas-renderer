// MatterCanvas Renderer v0.4-8-c
// Publication figure validation presets for catalyst structures.

export const PB_N4_PUBLICATION_DEMO = {
  name: 'PbN4-CO2RR',
  layout: '2x2',
  style: 'nature',
  panels: [
    { label: '(a)', title: 'PbN4', highlight: ['Pb'] },
    { label: '(b)', title: 'PbN4-*COOH', highlight: ['Pb'] },
    { label: '(c)', title: 'PbN4-*OCHO', highlight: ['Pb'] },
    { label: '(d)', title: 'PbN4-*CO', highlight: ['Pb'] }
  ],
  coordination: {
    centerElements: ['Pb'],
    targetElements: ['N', 'O', 'C'],
    cutoff: 3.2,
    showDistance: true
  }
};

export const LNFE_PUBLICATION_DEMO = {
  name: 'LnFe-ORR',
  layout: '2x2',
  style: 'nature',
  panels: [
    { label: '(a)', title: 'LnFe-N-C', highlight: ['Fe', 'La', 'Ce', 'Gd'] }
  ],
  coordination: {
    centerElements: ['Fe', 'La', 'Ce', 'Gd'],
    targetElements: ['N', 'O', 'Fe', 'La', 'Ce', 'Gd'],
    cutoff: 3.4,
    showDistance: true
  }
};
