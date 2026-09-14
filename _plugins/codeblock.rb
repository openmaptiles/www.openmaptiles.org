# Wrap Rouge's output in the markup the stylesheet and copy button expect.
#
# Fenced code needs a wrapper carrying a copy-to-clipboard button, server-rendered —
# so the button is present in the static HTML, not added by client JS. Kramdown +
# Rouge emit a different shape:
#
#   <div class="language-bash highlighter-rouge">
#     <div class="highlight"><pre class="highlight"><code>…</code></pre></div>
#   </div>
#
# This rewrites that to:
#
#   <div class="codeblock">
#     <pre class="codeblock__pre"><code class="codeblock__code">…</code></pre>
#     <button class="codeblock__copy" …>…</button>
#   </div>
#
# assets/js/ui.js wires the click handler; the markup and styling live here so the
# static output carries the button in place, with no client-side wrapping step.
module OpenMapTiles
  module CodeBlock
    COPY_ICON = <<~SVG.strip
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
    SVG

    # Swapped in by assets/js/ui.js on a successful copy. Not present in the static
    # output, which renders only
    # the copy icon server-side.
    CHECK_ICON = <<~SVG.strip
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path></svg>
    SVG

    # <div class="language-x highlighter-rouge"><div class="highlight"><pre …>…</pre></div></div>
    PATTERN = %r{
      <div\s+class="(?<lang>language-[^"\s]*\s+)?highlighter-rouge">\s*
      <div\s+class="highlight">\s*
      <pre\s+class="highlight">(?<body><code.*?</code>)</pre>\s*
      </div>\s*
      </div>
    }mx

    def self.transform(html)
      return html unless html&.include?("highlighter-rouge")

      html.gsub(PATTERN) do
        m = Regexp.last_match
        lang = m[:lang].to_s.strip
        body = m[:body].sub("<code", %(<code class="codeblock__code"))
        # Strip the single trailing newline. Rouge keeps the
        # trailing newline, which renders as an extra blank line.
        body = body.sub(%r{\n(</code>)\z}, '\\1')

        <<~HTML.strip
          <div class="codeblock#{lang.empty? ? "" : " #{lang}"}">
          <pre class="codeblock__pre">#{body}</pre>
          <button type="button" class="codeblock__copy" title="Copy to clipboard" data-copy-code>#{COPY_ICON}</button>
          </div>
        HTML
      end
    end
  end
end

Jekyll::Hooks.register [:documents, :pages], :post_render do |item|
  next unless item.output_ext == ".html"

  item.output = OpenMapTiles::CodeBlock.transform(item.output)
end
