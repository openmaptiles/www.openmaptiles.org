# Jekyll has no way to generate a route family from a data file, so /styles/:slug/ and
# /languages/:code/ are generated here from _data/styles.json and _data/languages.json.
#
# Both route families render the same section stack as the homepage, differing
# only in which style or language is active, so all three route families share the
# same section stack rather than each defining its own.
module OpenMapTiles
  class DataPage < Jekyll::Page
    def initialize(site, dir, slug, layout, data)
      @site = site
      @base = site.source
      @dir  = File.join(dir, slug)
      @name = "index.html"

      process(@name)

      self.data = data.merge("layout" => layout)
      self.content = ""
    end
  end

  class DataPageGenerator < Jekyll::Generator
    safe true
    priority :normal

    def generate(site)
      generate_styles(site)
      generate_languages(site)
    end

    private

    def generate_styles(site)
      Array(site.data["styles"]).each do |style|
        title = "Style: #{style["title"]} – OpenMapTiles"
        desc  = "Explore the beautiful, free and open-source #{style["title"]} map style " \
                "customized for OpenMapTiles vector tiles. Supports Leaflet, MapLibre, " \
                "Mapbox GL, OpenLayers."

        site.pages << DataPage.new(site, "styles", style["slug"], "home", {
          # Stated per route family rather than derived from the layout name, so a new
          # family cannot silently request a stylesheet that does not exist.
          "stylesheets"  => ["home"],
          "title"        => title,
          "description"  => desc,
          "active_style" => style["slug"],
          "style"        => style,
        })
      end
    end

    def generate_languages(site)
      Array(site.data["languages"]).each do |lang|
        name = lang["languagename"]
        code = lang["code"]
        title = "Multilingual Map: OpenStreetMap in #{name} – OpenMapTiles"
        desc  = "View OpenMapTiles multilingual world maps displayed dynamically in " \
                "#{name} (#{code.upcase}). Powered by open-source vector tiles and MapTiler."

        site.pages << DataPage.new(site, "languages", code, "home", {
          "stylesheets"     => ["home"],   # see generate_styles
          "title"           => title,
          "description"     => desc,
          "active_language" => code,
          "language"        => lang,
        })
      end
    end
  end
end
