import { detectSlab } from '../src/analysis/slab-detector.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const slab = {
  atoms: [
    { position: [0, 0, 0] },
    { position: [1, 1, 1.5] }
  ],
  lattice: [
    [10, 0, 0],
    [0, 10, 0],
    [0, 0, 25]
  ]
};

const result = detectSlab(slab);
assert(result.isSlab === true, 'slab structure should be detected');
assert(result.metrics.vacuumThickness > 10, 'vacuum thickness should be large');

console.log('slab detection smoke test passed');
