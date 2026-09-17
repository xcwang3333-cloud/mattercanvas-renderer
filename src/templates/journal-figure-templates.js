export const JOURNAL_FIGURE_TEMPLATES = {
  natureSingleColumn: {
    name: 'Nature single column',
    width: 89,
    height: 89,
    panelGap: 6,
    fontSize: 8,
    layout: '2x2'
  },
  natureDoubleColumn: {
    name: 'Nature double column',
    width: 183,
    height: 120,
    panelGap: 8,
    fontSize: 9,
    layout: '2x3'
  },
  jacsFigure: {
    name: 'JACS figure',
    width: 120,
    height: 90,
    panelGap: 7,
    fontSize: 9,
    layout: '2x2'
  },
  supplementary: {
    name: 'Supplementary figure',
    width: 180,
    height: 120,
    panelGap: 10,
    fontSize: 10,
    layout: 'free'
  }
};

export function getJournalTemplate(name = 'natureSingleColumn') {
  return JOURNAL_FIGURE_TEMPLATES[name] || JOURNAL_FIGURE_TEMPLATES.natureSingleColumn;
}
