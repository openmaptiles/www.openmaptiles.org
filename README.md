# openmaptiles.org

Source for the [OpenMapTiles](https://openmaptiles.org) website. A plain **Jekyll 4**
static site at the repo root. No JavaScript build step: JS ships as hand-written ES
modules, and the two vendored libraries (lunr, the MapTiler SDK) are committed under
`assets/js/vendor/`.

```bash
bundle install
bundle exec jekyll serve     # http://localhost:4000
bundle exec jekyll build     # -> _site/
```

Ruby **3.3.6**, pinned in `.ruby-version`. Node is not required and nothing here uses
npm. Map canvases stay blank on `localhost` — the MapTiler API key is domain-restricted,
which is expected, not a bug.

## Before changing anything

Two things are load-bearing and easy to break silently:

- **Pages Source must be "GitHub Actions."** The built-in Pages build runs Jekyll in
  `--safe` mode, which skips `_plugins/` and *exits 0* — measured, 91 HTML files instead
  of 140, with no error. `datapage_generator.rb` accounts for all 65: the 59
  `/languages/:code/` pages and 6 of the `/styles/:slug/` ones, generated from `_data/`.
- **Nothing publishes unless `script/verify-build` passes.** It asserts the route floor,
  one check per custom plugin, the generated assets, every in-site link and image, and
  every redirect in `script/redirects.tsv`. Adding a redirect without adding it there
  means nothing checks it.
- **The legacy URLs in `script/redirects.tsv` are live and indexed.** `/layers/*` is
  the schema reference and the most externally cited part of the site. All 41 ship as
  `jekyll-redirect-from` stubs, and the 38 marked `both` additionally need a matching
  rule in `_redirects`. Rename a doc and drop its `redirect_from` and the URL keeps
  answering until the release that removes it, which is why the check exists.

## Stylesheets

CSS is **not** one bundle. Every page links `assets/css/core.css` — tokens, reset,
header, footer — plus one bundle per section, named by the page's `stylesheets` front
matter and resolved in `_layouts/base.html`:

| Bundle | Pages |
|---|---|
| `home` | `/`, `/viewers/`, the 7 `/styles/:slug/` and 59 `/languages/:code/` pages |
| `docs` | `/docs/**` and the `_docs` collection |
| `docs-schema` | `/docs/schema/` only, on top of `docs` |
| `about` · `osm2vt` · `error` | `/about/`, `/osm2vectortiles/`, `404`/`500` |

Three rules when editing `_sass/`:

- **`_sass/vendor/` is not ours** — Tailwind's preflight, the `prose` rules and Prism's
  palette, carried over verbatim. Nothing to regenerate from and no upstream to pull.
- **`_tokens.scss` emits CSS, so it belongs to `core.scss` alone.** Mixins go in
  `_config.scss`. `@use`-ing tokens from a second entry point ships `:root` twice.
- **Each bundle ends with `element-overrides`**, which must load after the components
  it outranks. Adding a partial after it breaks that.

`script/verify-build` resolves every stylesheet href on every page, because a page
whose bundle failed to build renders unstyled with exit 0.

## Documentation

| | |
|---|---|
| `DEPLOYMENT.md` | build, configuration, generated output, rollback, troubleshooting |
| `THIRD-PARTY-NOTICES.md` | licences for the vendored libraries |

Both are in `_config.yml`'s `exclude:` and asserted out of the build — they are not
site content.
