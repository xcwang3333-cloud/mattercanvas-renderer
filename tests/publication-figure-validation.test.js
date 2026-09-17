// MatterCanvas Renderer v0.4-8-c
// Smoke validation for publication presets.

import { PB_N4_PUBLICATION_DEMO, LNFE_PUBLICATION_DEMO } from '../src/demo/publication-figure-validation.js';

test('PbN4 publication demo contains reaction panels', () => {
  expect(PB_N4_PUBLICATION_DEMO.panels.length).toBe(4);
  expect(PB_N4_PUBLICATION_DEMO.coordination.centerElements).toContain('Pb');
});

test('LnFe publication demo highlights heteronuclear centers', () => {
  expect(LNFE_PUBLICATION_DEMO.coordination.centerElements).toContain('Fe');
});
