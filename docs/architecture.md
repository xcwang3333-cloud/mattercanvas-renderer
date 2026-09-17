# MatterCanvas Renderer Architecture

## Core pipeline

```
POSCAR / CIF / XYZ
        |
        v
Structure adapter
        |
        v
Unified structure model
        |
        +----------------+
        |                |
        v                v
Interactive viewer   Publication renderer
        |                |
        v                v
Browser preview     PNG / SVG export
```

## Modules

### Parser

Responsibilities:

- Read structure files
- Convert coordinates
- Store lattice information
- Store element information

### Viewer

Responsibilities:

- Rotation
- Zoom
- Unit cell display
- Atom display
- Bond display

### Renderer

Responsibilities:

- Publication styles
- Camera presets
- High resolution export

## Future extensions

- Automatic structure alignment
- Batch rendering of adsorption structures
- Saved style templates
