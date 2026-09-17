// Publication Figure Builder
// v0.4-9-b
// Pipeline: DFT folder -> template -> panels -> SVG export

export function buildPublicationFigure({
  structures = [],
  template,
  style = "nature",
  renderer,
}) {
  if (!template) {
    throw new Error("Publication template is required");
  }

  const panels = template.panels.map((panel, index) => {
    const structure = panel.selector
      ? structures.find(panel.selector)
      : structures[index];

    return {
      label: panel.label || `(${String.fromCharCode(97 + index)})`,
      title: panel.title || "",
      structure,
      style,
      renderer,
    };
  });

  return {
    type: "publication-figure",
    template: template.name,
    style,
    panels,
  };
}

export function buildFigureFromDftFolder({
  importedStructures,
  template,
  style = "nature",
  renderer,
}) {
  return buildPublicationFigure({
    structures: importedStructures,
    template,
    style,
    renderer,
  });
}
