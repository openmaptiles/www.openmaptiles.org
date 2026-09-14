# Prefix `baseurl` onto root-absolute src/href in rendered output.
#
# Markdown bodies write asset and link paths root-absolute — `![x](/media/y.png)`,
# `[x](/docs/host/tileserver-gl/)` — and kramdown emits them verbatim. Layouts and
# includes pipe their paths through `relative_url`, but a markdown body has no way to,
# short of Liquid in every image tag. With `baseurl: ""` that is identical, which is
# why production never noticed: /media/y.png IS the right URL there.
#
# Under a non-root baseurl every one of those paths resolves against the host root
# instead — 103 refs, including all 42 schema ETL and mapping diagrams, the internal doc
# links, and the two `/maps/` iframes.
#
# Fixing the markdown instead would mean Liquid in 24 files and would break again the
# next time somebody writes a normal markdown image. This runs after render, so it
# covers markdown, inline HTML in docs, and anything a future page does.
#
# A no-op when baseurl is empty, i.e. always in production.
module OpenMapTiles
  module BaseUrl
    REF = /(?<attr>\bsrc|\bhref)="(?<path>\/[^"]*)"/

    def self.transform(html, baseurl)
      return html if html.nil? || baseurl.nil? || baseurl.empty?

      html.gsub(REF) do
        m = Regexp.last_match
        path = m[:path]

        # Protocol-relative URLs (//cdn.example.com/x) are absolute, not site paths.
        next m[0] if path.start_with?("//")
        # Idempotent: already prefixed. Compared with a boundary so a hypothetical
        # /www.openmaptiles.org-archive/ path is still rewritten rather than skipped.
        next m[0] if path == baseurl || path.start_with?("#{baseurl}/")

        %(#{m[:attr]}="#{baseurl}#{path}")
      end
    end
  end
end

Jekyll::Hooks.register [:documents, :pages], :post_render do |item|
  next unless item.output_ext == ".html"

  item.output = OpenMapTiles::BaseUrl.transform(item.output, item.site.config["baseurl"].to_s)
end
