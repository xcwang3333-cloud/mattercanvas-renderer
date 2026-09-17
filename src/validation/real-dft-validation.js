export function validateDFTCase(caseData = {}) {
  const required = ['name', 'structures'];
  const missing = required.filter((key) => !(key in caseData));

  return {
    valid: missing.length === 0,
    missing,
    structureCount: caseData.structures?.length || 0,
    checks: {
      parserReady: Boolean(caseData.structures?.length),
      figureReady: Boolean(caseData.template)
    }
  };
}

export const RELEASE_VALIDATION_CASES = {
  PbN4_CO2RR: {
    name: 'PbN4_CO2RR',
    requiredPanels: ['pristine', 'COOH', 'OCHO', 'CO']
  },
  LnFe_ORR: {
    name: 'LnFe_ORR',
    requiredPanels: ['structure']
  }
};
