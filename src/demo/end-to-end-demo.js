import { PB_N4_PUBLICATION_DEMO, LNFE_PUBLICATION_DEMO } from './publication-validation-config.js';

export const END_TO_END_DEMOS = {
  PbN4_CO2RR: {
    preset: PB_N4_PUBLICATION_DEMO,
    description: 'VASP folder to publication figure workflow for PbN4 CO2RR intermediates.'
  },
  LnFe_ORR: {
    preset: LNFE_PUBLICATION_DEMO,
    description: 'VASP folder to publication figure workflow for LnFe ORR structures.'
  }
};

export function getDemoConfig(name) {
  return END_TO_END_DEMOS[name] || null;
}
