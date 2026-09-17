// Publication templates for computational catalysis figures
// v0.4-9-b

export const CO2RR_FIGURE_TEMPLATE = {
  name: "co2rr-publication",
  panels: [
    {
      label: "(a)",
      title: "Catalyst structure",
      selector: (s) => s.name?.toLowerCase().includes("pristine") || s.name?.toLowerCase().includes("pbn4"),
    },
    {
      label: "(b)",
      title: "Adsorption configuration",
      selector: (s) => /cooh|ocho|co/i.test(s.name || ""),
    },
    {
      label: "(c)",
      title: "Coordination environment",
      selector: (s) => true,
    },
    {
      label: "(d)",
      title: "Reaction analysis",
      selector: (s) => true,
    },
  ],
};

export const ORR_FIGURE_TEMPLATE = {
  name: "orr-publication",
  panels: [
    {
      label: "(a)",
      title: "Active site structure",
      selector: (s) => true,
    },
    {
      label: "(b)",
      title: "Intermediate configurations",
      selector: (s) => /ooh|oh|o/i.test(s.name || ""),
    },
    {
      label: "(c)",
      title: "Coordination regulation",
      selector: (s) => true,
    },
    {
      label: "(d)",
      title: "Reaction pathway",
      selector: (s) => true,
    },
  ],
};
