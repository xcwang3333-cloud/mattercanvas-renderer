// v0.4-8 coordination annotation smoke tests

import { buildCoordinationAnnotations } from '../src/renderers/coordination-annotation.js';

const mockStructure = {
  atoms: [
    { element: 'Pb', position: [0, 0, 0] },
    { element: 'N', position: [2.0, 0, 0] },
    { element: 'O', position: [2.5, 0, 0] },
    { element: 'C', position: [8, 0, 0] }
  ]
};

const result = buildCoordinationAnnotations(mockStructure, {
  centerElements: ['Pb'],
  targetElements: ['N', 'O'],
  cutoff: 3.2
});

if (result.length !== 2) {
  throw new Error('coordination annotation test failed');
}

console.log('coordination annotation smoke test passed');
