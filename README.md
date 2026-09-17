# MatterCanvas Renderer

A lightweight scientific structure renderer focused on turning VASP structures into publication-ready figures.

## What it does

MatterCanvas Renderer is intentionally narrow:

```text
POSCAR / CONTCAR
      ↓
Structure parser
      ↓
3D / vector rendering
      ↓
Nature / JACS figure presets
      ↓
SVG / high-resolution PNG
```

Target use cases include Pb-N4 catalysts, LnFe heteronuclear dual-atom catalysts, adsorption intermediates (`*COOH`, `*OCHO`, `*CO`, `*H`) and slab/surface models.

## v0.4-6 DFT Figure Demo

The current demo can import multiple VASP structures or an entire calculation folder and automatically compose a consistent multi-panel figure.

Features:

- Reads `POSCAR`, `CONTCAR`, and `.vasp` files.
- Prefers `CONTCAR` when both `POSCAR` and `CONTCAR` exist in the same calculation folder.
- Recognizes common folder/file labels such as `COOH`, `OCHO`, `CO`, `HCOOH`, and `H`.
- Nature and JACS publication presets.
- Reproducible orthographic projection and automatic panel fitting.
- Vector unit-cell, bond, atom, panel-label, and title rendering.
- Multi-panel layouts (1/2/3/4 columns).
- Editable SVG export and 4× PNG export.

### Quick start

Because the demo uses browser ES modules, serve the repository with any local static server rather than opening `demo/index.html` directly from `file://`.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/demo/
```

Use **Structure files** for uniquely named `.vasp` files, or **calculation folder** to import a directory tree containing repeated `POSCAR` / `CONTCAR` filenames.

## Scope

Included:

- POSCAR / CONTCAR structure import
- Crystal lattice, atom, and bond rendering
- Camera / publication presets
- Batch DFT panel composition
- PNG / SVG export

Deliberately excluded:

- Bader charge analysis
- Differential charge density
- DOS / PDOS
- CHGCAR / ELF workflows
- Database management
- Computational workflow orchestration

Those analysis workflows belong in dedicated computational tools; MatterCanvas Renderer stays focused on structure visualization and figure generation.

## Design principle

**Do one task well: VASP structure → publication figure.**
