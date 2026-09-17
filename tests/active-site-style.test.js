import { applyActiveSiteStyle } from '../src/renderers/svg-active-site-style.js';

test('highlighted atoms receive publication style', () => {
  const state = {
    highlightedAtoms: new Set([0]),
    coordinationShell: new Set([1]),
  };

  expect(applyActiveSiteStyle({index:0}, state).opacity).toBe(1);
  expect(applyActiveSiteStyle({index:1}, state).opacity).toBeLessThan(1);
});
