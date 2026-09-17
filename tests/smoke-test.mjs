import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parsePOSCAR } from '../src/parser/poscar-parser.js';
import { loadDftPanels } from '../src/composer/dft-demo-loader.js';
import { renderDftFigureSvg } from '../src/composer/dft-figure-composer.js';

const fixtureNames = [
  'PbN4-Pristine.vasp',
  'PbN4-COOH.vasp',
  'PbN4-OCHO.vasp',
  'PbN4-CO.vasp'
];

const texts = new Map();
for (const name of fixtureNames) {
  texts.set(name, await readFile(new URL(`../examples/dft-demo/${name}`, import.meta.url), 'utf8'));
}

const pristine = parsePOSCAR(texts.get('PbN4-Pristine.vasp'), 'PbN4-Pristine.vasp');
assert.equal(pristine.atoms.length, 9, 'pristine fixture atom count');
assert.equal(pristine.lattice.length, 3, 'three lattice vectors');
assert.equal(pristine.atoms[0].element, 'Pb');
assert.deepEqual(pristine.atoms[0].position.map(v => Number(v.toFixed(6))), [5, 5, 10]);

const negativeScale = `negative-volume\n-1000\n1 0 0\n0 1 0\n0 0 1\nC\n1\nDirect\n0.5 0.5 0.5\n`;
const negative = parsePOSCAR(negativeScale, 'negative-test');
assert.ok(Math.abs(negative.lattice[0][0] - 10) < 1e-9, 'negative POSCAR scale interpreted as target volume');

const mockFiles = fixtureNames.map(name => ({
  name,
  webkitRelativePath: '',
  async text() { return texts.get(name); }
}));

const panels = await loadDftPanels(mockFiles);
assert.deepEqual(panels.map(panel => panel.title), ['Pristine', '*COOH', '*OCHO', '*CO']);
assert.deepEqual(panels.map(panel => panel.label), ['(a)', '(b)', '(c)', '(d)']);

const natureSvg = renderDftFigureSvg(panels, { style: 'nature', columns: 2, showCell: true });
assert.match(natureSvg, /^<svg /);
assert.match(natureSvg, /\(a\)/);
assert.match(natureSvg, /\*COOH/);
assert.match(natureSvg, /<circle /, 'atoms are vector circles');
assert.match(natureSvg, /<line /, 'bonds/cell are vector lines');
assert.match(natureSvg, /stroke-dasharray="4 4"/, 'Nature unit cell uses dashed low-emphasis lines');

const jacsSvg = renderDftFigureSvg(panels, { style: 'jacs', columns: 4, showCell: false });
assert.match(jacsSvg, /"style":"JACS"/);
assert.doesNotMatch(jacsSvg, /stroke-dasharray="4 4"/);

console.log('MatterCanvas v0.4-6 smoke test passed');
