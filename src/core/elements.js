// MatterCanvas Renderer - scientific element library
// Extended elements for DAC, LnFe, Pb and p-block catalyst structures

export const ELEMENTS = {
  H:  { color: 0xffffff, radius: 0.31 },
  C:  { color: 0x444444, radius: 0.76 },
  N:  { color: 0x3050f8, radius: 0.71 },
  O:  { color: 0xff0d0d, radius: 0.66 },
  S:  { color: 0xffff30, radius: 1.05 },

  Mn: { color: 0x9c7ac7, radius: 1.39 },
  Fe: { color: 0xe06633, radius: 1.26 },
  Co: { color: 0xf090a0, radius: 1.25 },
  Ni: { color: 0x50d050, radius: 1.24 },
  Cu: { color: 0xc88033, radius: 1.28 },
  Zn: { color: 0x7d80b0, radius: 1.31 },
  Cr: { color: 0x8a99c7, radius: 1.28 },

  La: { color: 0x70d4ff, radius: 1.87 },
  Ce: { color: 0xffd98a, radius: 1.82 },
  Pr: { color: 0xd9ff70, radius: 1.82 },
  Nd: { color: 0xc7ff00, radius: 1.81 },
  Sm: { color: 0x8fffd0, radius: 1.80 },
  Eu: { color: 0x61ffc8, radius: 1.99 },
  Gd: { color: 0x45ffc8, radius: 1.80 },
  Tb: { color: 0x30ffc8, radius: 1.77 },
  Dy: { color: 0x1fffc8, radius: 1.75 },
  Ho: { color: 0x00ff9c, radius: 1.74 },
  Er: { color: 0x00e675, radius: 1.73 },
  Tm: { color: 0x00d452, radius: 1.72 },
  Yb: { color: 0x00bf38, radius: 1.94 },
  Lu: { color: 0x00ab24, radius: 1.72 },

  Pt: { color: 0xd0d0d0, radius: 1.36 },
  In: { color: 0xa67573, radius: 1.56 },
  Sn: { color: 0x668080, radius: 1.45 },
  Sb: { color: 0x9e63b5, radius: 1.45 },
  Bi: { color: 0x9e4fb5, radius: 1.60 },
  Pb: { color: 0x575961, radius: 1.46 }
};

export function getElement(symbol) {
  return ELEMENTS[symbol] || { color: 0xaaaaaa, radius: 1.0 };
}
