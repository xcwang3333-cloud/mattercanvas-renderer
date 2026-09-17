import { highlightActiveSite } from '../src/renderers/active-site-highlight.js';

const structure = {
  atoms: [
    { element: 'Pb', position: [0, 0, 0] },
    { element: 'N', position: [2, 0, 0] },
    { element: 'N', position: [0, 2, 0] },
    { element: 'C', position: [10, 10, 10] }
  ]
};

const result = highlightActiveSite(structure, {
  centerElements: ['Pb'],
  cutoff: 3.0
});

if (!result.highlightedAtoms.includes(0)) {
  throw new Error('Pb center should be highlighted');
}

if (!result.highlightedAtoms.includes(1)) {
  throw new Error('Neighbor N should be highlighted');
}

if (result.highlightedAtoms.includes(3)) {
  throw new Error('Distant carbon should not be highlighted');
}

console.log('active-site-highlight test passed');
