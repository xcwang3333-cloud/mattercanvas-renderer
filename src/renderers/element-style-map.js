// MatterCanvas Renderer v0.4-7
// Publication-oriented element rendering rules.

export const ELEMENT_STYLE_MAP = {
  H: { scale: 0.55, opacity: 0.85 },
  C: { scale: 0.82, opacity: 1.0 },
  N: { scale: 0.95, opacity: 1.0 },
  O: { scale: 1.0, opacity: 1.0 },
  S: { scale: 1.05, opacity: 1.0 },

  Fe: { scale: 1.25, opacity: 1.0, highlight: true },
  Co: { scale: 1.25, opacity: 1.0, highlight: true },
  Ni: { scale: 1.22, opacity: 1.0, highlight: true },
  Cu: { scale: 1.25, opacity: 1.0, highlight: true },
  Pt: { scale: 1.35, opacity: 1.0, highlight: true },
  Pb: { scale: 1.45, opacity: 1.0, highlight: true },

  La: { scale: 1.35, opacity: 1.0, highlight: true },
  Ce: { scale: 1.35, opacity: 1.0, highlight: true },
  Gd: { scale: 1.40, opacity: 1.0, highlight: true },
  Lu: { scale: 1.35, opacity: 1.0, highlight: true },

  In: { scale: 1.35, opacity: 1.0, highlight: true },
  Sn: { scale: 1.35, opacity: 1.0, highlight: true },
  Sb: { scale: 1.35, opacity: 1.0, highlight: true },
  Bi: { scale: 1.40, opacity: 1.0, highlight: true }
};

export function getElementStyle(symbol, override = {}) {
  return {
    scale: 1,
    opacity: 1,
    ...ELEMENT_STYLE_MAP[symbol],
    ...override
  };
}
