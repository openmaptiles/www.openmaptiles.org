# OpenMapTiles Website — Deployment Guide

The site is a plain **Jekyll 4** static site at the repo root. There is no
JavaScript build step: JS ships as hand-written ES modules served directly, and
the two vendored libraries (lunr, the MapTiler SDK) are committed under
`assets/js/vendor/`.

The whole build is:

```bash
bundle exec jekyll build     # → _site/
```

## Requirements

| | |
|---|---|
| Ruby | **3.3.6**, pinned in `.ruby-version` |
| Bundler | gems pinned in `Gemfile.lock` — commit lockfile changes |
| Node | **not required.** Nothing in this repo uses npm. |

```bash
bundle install
bundle exec jekyll serve        # http://localhost:4000
bundle exec jekyll build        # → _site/
```

`_site/` is gitignored. Nothing in the repo is generated-and-committed except the
vendored JS.

---

## Production: GitHub Pages

`.github/workflows/deploy.yml` runs on every push to `master` and on manual
dispatch. It builds with **our own** `bundle exec jekyll build` and uploads
`_site/` as the Pages artifact — it does **not** use GitHub Pages' built-in Jekyll
build.

That distinction matters and must not be "simplified" away: the built-in build
runs in `--safe` mode, which forbids custom `_plugins/`. This site has four, and
`_plugins/datapage_generator.rb` generates the 59 `/languages/:code/` and the
`/styles/:slug/` pages from `_data/`. Under the sandboxed build those 65 pages simply
would not exist — measured: `--safe` yields 75 HTML files instead of 140, and exits 0.

**Custom domain** — `openmaptiles.org`, via the `CNAME` file at the repo root.
Jekyll copies it into `_site/` as a static file, and GitHub Pages reads it from
the published artifact. Deleting `CNAME`, or excluding it in `_config.yml`, drops
the custom domain on the next deploy. `deploy.yml` asserts `_site/CNAME` exists
for exactly that reason.

**Pre-publish assertions** — a Jekyll build exits 0 even when it produces almost
nothing, so every workflow runs `script/verify-build` before the artifact is
published. It asserts the route floor, one check per custom plugin, the static and
generated assets, the `CNAME`, that no internal document leaked, and every legacy URL
in `script/redirects.tsv`. If it fails the deploy job never runs and the previous site
stays up.

`.github/workflows/jekyll-build.yml` runs the same script on pull requests without
deploying.

### Why `_redirects` is kept, though GitHub Pages ignores it

`_redirects` is a Cloudflare/Netlify format and GitHub Pages ignores it, so it fires
on no current host. Every rule in it is therefore *also* shipped as a real HTML stub
via `jekyll-redirect-from`, which works anywhere — 41 legacy URLs in total, listed in
`script/redirects.tsv` and asserted on every build. `_redirects` is kept in sync so a
later move to Cloudflare Pages behaves identically; `verify-build` cross-checks the two
so they cannot drift.

Separately, note that the `openmaptiles.org` Cloudflare zone **already** answers nine
off-site paths with edge Redirect Rules, ahead of the origin. Those targets were read
off the live edge and are reproduced in the stubs, so all three layers agree.

---

## Configuration

Everything is in `_config.yml`. There are **no build-time environment variables** and
no secrets in CI.

**MapTiler API key** — `maps.key` in `_config.yml`, read by templates as
`{{ site.maps.key }}`. The committed value `LIb45gssRLBrsVQPT0MN` is the same key
the previous site used in production; it is not a new dependency. It is domain-restricted, which is why map canvases stay blank on
`localhost` — expected, not a bug. Changing keys is a one-line edit to
`_config.yml`.

**Analytics** — `gtm_id: GTM-PQHNBT6B`.

**`url` / `baseurl`** — `https://openmaptiles.org` and `""`. These feed
`sitemap.xml`, `robots.txt` and the canonical tags, so on a preview deployment
those still point at the production domain. Harmless for review; do not
copy-paste a preview's sitemap anywhere.

### Excludes

The Jekyll source directory **is** the repo root, so anything not listed in
`_config.yml`'s `exclude:` gets published. The internal markdown files at the root are
all excluded: `DEPLOYMENT.md` and `THIRD-PARTY-NOTICES.md`. So are `README.md` and
`script/`.

Two traps worth knowing:

- Setting `exclude:` **replaces** Jekyll's defaults rather than extending them,
  which is why `node_modules` and the `vendor/` entries are restated by hand.
- Adding a new `.md` file to the repo root publishes it at `/<name>/` unless it is
  excluded. `script/verify-build` asserts the known internal docs stay out of
  `_site/`; extend its list when adding another.

---

## Generated output

| Path | Produced by |
|---|---|
| `sitemap.xml` | `jekyll-sitemap` — 92 URLs, trailing slashes matching `permalink: pretty` |
| `search.json` | Liquid template over the docs collection; consumed by lunr at runtime |
| `robots.txt` | source template, interpolates `site.url` for the sitemap line |
| `llm.txt` | source template |
| `_redirects` | static file, copied via `include:` |
| `/languages/:code/`, `/styles/:slug/` | `_plugins/datapage_generator.rb` from `_data/` |

| `redirects.json` | `jekyll-redirect-from` — its own manifest of emitted stubs |
| 41 legacy redirect stubs | `redirect_from:` / `redirect_to:` front matter, listed in `script/redirects.tsv` |

140 HTML routes total: 99 pages and 41 redirect stubs, one per row of `script/redirects.tsv`.

---

## Rollback

GitHub Pages keeps previous deployments. Fastest path:

1. **Re-run a known-good deploy** — Actions → *Deploy to GitHub Pages* → pick the
   last green run on `master` → *Re-run all jobs*.
2. **Or revert and push** — `git revert <sha> && git push origin master`, which
   triggers a fresh build.

There is no artifact to hand-roll back to: `_site/` is not committed.

---

## Troubleshooting

**Build succeeds but 65 pages are missing.** Custom `_plugins/` did not run —
something is building in `--safe` mode, most likely GitHub Pages' built-in Jekyll
build rather than `deploy.yml`. Check that Pages *Source* is set to **GitHub
Actions**, not *Deploy from a branch*.

**Custom domain reverts to `*.github.io`.** `_site/CNAME` is missing. Check the
`CNAME` file is still tracked at the repo root and not caught by `exclude:`.

**An internal `.md` shows up on the live site.** Add it to `exclude:` in
`_config.yml` and to the assertion list in `jekyll-build.yml`.

**Redirects don't work.** Expected on GitHub Pages — see the known gap above.

**Search returns nothing.** `_site/search.json` is empty or missing; check the
docs collection is still `output: true` in `_config.yml`.

**`bundle exec jekyll build` fails locally but passes in CI (or the reverse).**
Compare Ruby versions first — CI reads `.ruby-version`, your shell may not.
