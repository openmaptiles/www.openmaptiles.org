# Give external links in docs content the external-link treatment: target/rel, the
# label wrapped in a <span>, and a small arrow glyph appended. Three variants:
#
#   * link wrapping an image  → plain anchor, no icon
#   * link with a `btn` class → dark button treatment, icon in neutral-300
#   * anything else external  → underlined text link, icon in neutral-400
#
# Internal links were left untouched.
#
# Kramdown emits plain anchors, so the same transformation happens here, scoped
# to the docs content column only — site chrome must not be rewritten.
module OpenMapTiles
  module DocLinks
    ARROW = %q(<svg class="doclink__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>)

    # `no-underline` is not decoration — it is load-bearing. The class is what
    # literal class on the button variant, and _prose-overrides.scss reproduces
    # the `.prose a:not(.no-underline)` rule, which at (0,2,1) outranks
    # `.doclink--button` at (0,1,0). Without the class the button rendered as a
    # plain underlined dark link instead of white-on-neutral-800.
    # `[^>]*>` for the tail, not `[^"]*">`: the latter required class to be the LAST
    # attribute on the tag, so adding data-section after it silently stopped the whole
    # plugin — every external docs link rendered bare.
    ARTICLE = %r{(<article\s+class="docs-content[^>]*>)(.*?)(</article>)}m
    ANCHOR  = %r{<a\s+(?<attrs>[^>]*?)href="(?<href>[^"]*)"(?<rest>[^>]*)>(?<label>.*?)</a>}m

    def self.transform(html)
      return html unless html&.include?('class="docs-content')

      html.sub(ARTICLE) do
        open_tag, body, close_tag = Regexp.last_match(1), Regexp.last_match(2), Regexp.last_match(3)
        open_tag + rewrite_links(body) + close_tag
      end
    end

    def self.rewrite_links(body)
      body.gsub(ANCHOR) do
        m = Regexp.last_match
        href  = m[:href]
        label = m[:label]
        attrs = "#{m[:attrs]}#{m[:rest]}".strip

        # Internal links are untouched.
        next m[0] unless href.start_with?("http://", "https://")

        # A link wrapping an image got no icon and no extra classes.
        next add_target(m[0], attrs) if label.include?("<img")

        if attrs.include?("btn")
          %(<a href="#{href}" target="_blank" rel="noopener noreferrer" class="doclink doclink--button no-underline"><span>#{label}</span>#{ARROW}</a>)
        else
          %(<a href="#{href}" target="_blank" rel="noopener noreferrer" class="doclink"><span>#{label}</span>#{ARROW}</a>)
        end
      end
    end

    def self.add_target(anchor, attrs)
      return anchor if attrs.include?("target=")

      anchor.sub("<a ", %(<a target="_blank" rel="noopener noreferrer" ))
    end
  end
end

Jekyll::Hooks.register [:documents, :pages], :post_render do |item|
  next unless item.output_ext == ".html"
  # Opt-out for pages that want plain markdown links — /docs/schema/ in practice.
  next if item.data["doclinks"] == false

  item.output = OpenMapTiles::DocLinks.transform(item.output)
end
