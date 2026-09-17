export const RC_HARDENING_CHECKLIST = {
  parser: [
    'POSCAR loading',
    'CONTCAR loading',
    'VASP folder import'
  ],
  renderer: [
    'slab-aware projection',
    'active-site highlight',
    'coordination annotation'
  ],
  export: [
    'SVG generation',
    'PNG generation',
    'PDF generation'
  ],
  demos: [
    'PbN4_CO2RR',
    'LnFe_ORR'
  ]
};

export function validateRCChecklist(results = {}) {
  return Object.values(results).every(Boolean);
}
