# MatterCanvas Renderer

A lightweight scientific structure visualization tool for VASP and crystal structures.

## Vision

MatterCanvas Renderer converts computational structures into publication-ready figures.

Target applications:

- Pb-N4 catalyst structures
- LnFe heteronuclear dual atom catalysts
- Adsorption intermediates (*COOH, *OCHO, *CO, *H)
- Surface and slab models

## Scope

### Included

- POSCAR / CONTCAR import
- CIF import
- XYZ import
- Crystal lattice visualization
- Atom and bond rendering
- Camera presets
- Publication rendering styles
- PNG/SVG export

### Excluded

- Bader charge analysis
- Differential charge density
- DOS/PDOS
- CHGCAR/ELF workflows
- Database management
- Computational workflow engine

## Design principle

Do one task well:

```
VASP structure
      |
      v
Structure parser
      |
      v
3D visualization
      |
      v
Publication figure
```

## Planned technology

- pymatgen / ASE: structure handling
- Three.js based viewer
- Scientific rendering backend

## v0.1 Milestone

- Load POSCAR
- Display atoms, bonds and unit cell
- Support rendering presets
- Export high-quality figures
