# IT Base — MkDocs Material

This repository contains a MkDocs site using the Material theme in dark mode.

## Quick start

1. Create and activate a virtual environment (optional but recommended).
2. Install dependencies from `requirements.txt`.
3. Serve locally.

### macOS / zsh

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Open http://127.0.0.1:8000 to view the site.

## Build static site

```bash
mkdocs build
```

The output will be in the `site/` directory.
