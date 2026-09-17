// MatterCanvas v0.4-8-b smoke test

import { buildCoordinationAnnotations } from '../src/renderers/coordination-annotation.js';

const mockStructure = {
  atoms: [
    { element: 'Pb', position: [0, 0, 0] },
    { element: 'N', position: [2, 0, 0] },
    { element: 'O', position: [2.3, 0, 0] }
  ]
};

const annotations = buildCoordinationAnnotations(mockStructure, {
  centerElements: ['Pb'],
  targetElements: ['N', 'O'],
  cutoff: 3.0
});

if (!annotations.length) {
  throw new Error('coordination annotation generation failed');
}

console.log('coordination figure export smoke test passed');
