# Poetry

A Hugo-powered poetry site.

## License

- Poetry and written content in `content/` are **All Rights Reserved**.
- Website source code is licensed under the MIT License.
- See `LICENSE` for full terms.

## Prerequisites

- [Hugo (extended)](https://gohugo.io/installation/)

## Run locally

```powershell
hugo server -D
```

Then open `http://localhost:1313`.

## Build

```powershell
hugo
```

Generated output is written to `public/`.

## Project structure

- `content/poems/` - poem markdown files
- `layouts/` - Hugo templates
- `assets/` - source CSS/JS
- `public/` - generated static site output