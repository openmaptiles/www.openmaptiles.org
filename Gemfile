source "https://rubygems.org"

gem "jekyll", "~> 4.4"

# GitHub-flavored markdown, which is what the docs are authored in
gem "kramdown-parser-gfm", "~> 1.1"

group :jekyll_plugins do
  gem "jekyll-sitemap", "~> 1.4"
  # 3 docs carry legacy redirect_from front matter whose URLs 404 in production
  # today. This gem restores them.
  gem "jekyll-redirect-from", "~> 0.16"
end

# jekyll serve needs this on Ruby 3.x
gem "webrick", "~> 1.9"
