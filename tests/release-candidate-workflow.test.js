import { RELEASE_CANDIDATE_CASES } from '../src/demo/release-candidate-validation.js';

describe('v0.4-13 release candidate validation', () => {
  test('PbN4 CO2RR preset exists', () => {
    expect(RELEASE_CANDIDATE_CASES.PbN4_CO2RR.centerElements).toContain('Pb');
  });

  test('LnFe ORR preset exists', () => {
    expect(RELEASE_CANDIDATE_CASES.LnFe_ORR.centerElements).toContain('Fe');
  });
});
