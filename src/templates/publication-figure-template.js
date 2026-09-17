// MatterCanvas Renderer v0.4-9
// Publication figure templates for catalytic DFT workflows.

export const CO2RR_FIGURE_TEMPLATE = {
  name: 'CO2RR',
  layout: '2x2',
  panels: [
    { label: '(a)', role: 'structure', title: 'Catalyst structure' },
    { label: '(b)', role: 'adsorption', title: 'Adsorption configurations' },
    { label: '(c)', role: 'coordination', title: 'Coordination environment' },
    { label: '(d)', role: 'descriptor', title: 'Descriptor analysis' }
  ]
};

export const ORR_FIGURE_TEMPLATE = {
  name: 'ORR',
  layout: '2x2',
  panels: [
    { label: '(a)', role: 'active-site', title: 'Active site structure' },
    { label: '(b)', role: 'intermediate', title: 'Reaction intermediates' },
    { label: '(c)', role: 'coordination', title: 'Coordination regulation' },
    { label: '(d)', role: 'mechanism', title: 'Reaction pathway' }
  ]
};

export function createPublicationFigure(template, structures = []) {
  return {
    template,
    structures,
    generatedAt: new Date().toISOString()
  };
}
