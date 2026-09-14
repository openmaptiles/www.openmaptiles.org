#!/usr/bin/env ruby
#
# Resolves every in-site reference in a built _site/ against the files actually
# shipped. Called by script/verify-build; runnable alone:
#
#   ruby script/checks/references.rb _site [baseurl]
#
# Prints one finding per line as "<reference>\t<where>", and the number examined to
# stderr. Exits 0 on a successful run whether or not it found anything — the caller
# decides. A non-zero exit means THIS script broke, which must never read as a clean
# build.

site = ARGV[0] or abort "usage: #{$PROGRAM_NAME} <site-dir> [baseurl]"
baseurl = ARGV[1].to_s

checked = 0
broken = []

Dir.glob(File.join(site, "**", "*.html")).sort.each do |page|
  html = File.read(page, encoding: "UTF-8", invalid: :replace, undef: :replace)

  # Code samples are not references. Docs embed markup like `<script src="...">`,
  # HTML-escaped, inside <pre> and inline <code>; resolving those would report every
  # tutorial as broken.
  html = html.gsub(%r{<pre\b.*?</pre>}mi, "").gsub(%r{<code\b.*?</code>}mi, "")

  html.scan(/(?:src|href)="([^"]+)"/).each do |(ref)|
    # Anything with a scheme, protocol-relative, or a bare fragment is not ours.
    next if ref =~ %r{\A(?:[a-z][a-z0-9+.-]*:|//|#)}i
    path = ref.split("#").first.to_s.split("?").first.to_s
    next if path.empty?

    target =
      if path.start_with?("/")
        # Root-absolute. Under a baseurl the rendered path carries the prefix and the
        # file on disk does not, so strip it before resolving.
        rel = path
        if !baseurl.empty? && (rel == baseurl || rel.start_with?("#{baseurl}/"))
          rel = rel[baseurl.length..] || ""
        end
        File.join(site, rel)
      else
        # Relative to the page. inspect-tool.html is a standalone document with no
        # layout and legitimately uses these.
        File.expand_path(path, File.dirname(page))
      end

    checked += 1
    # A directory counts: pretty permalinks point at /docs/, served by its index.
    resolved = File.exist?(target) || File.exist?(File.join(target, "index.html"))
    broken << [ref, page.sub(/\A#{Regexp.escape(site)}/, "")] unless resolved
  end
end

# One missing file is one problem, not 67. Group by the reference, name a page.
broken.uniq.group_by(&:first).sort.each do |ref, rows|
  pages = rows.map(&:last).sort
  extra = pages.length > 1 ? " (#{pages.length} pages)" : ""
  puts "#{ref}\t#{pages.first}#{extra}"
end

warn checked.to_s
