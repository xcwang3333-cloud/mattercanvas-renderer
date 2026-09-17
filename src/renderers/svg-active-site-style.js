export function applyActiveSiteStyle(atom, state, options = {}) {
  const highlighted = state?.highlightedAtoms?.has?.(atom.index) ?? false;
  const shell = state?.coordinationShell?.has?.(atom.index) ?? false;

  if (highlighted) {
    return {
      opacity: 1,
      scale: options.highlightScale ?? 1.25,
      stroke: options.highlightStroke ?? '#111111',
      strokeWidth: options.highlightWidth ?? 1.2,
    };
  }

  if (shell) {
    return {
      opacity: options.shellOpacity ?? 0.8,
      scale: options.shellScale ?? 1.05,
    };
  }

  return {
    opacity: options.backgroundOpacity ?? 0.28,
    scale: options.backgroundScale ?? 0.85,
  };
}
