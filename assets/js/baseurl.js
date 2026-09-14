// _plugins/baseurl.rb prefixes baseurl onto rendered output, but only src= and href=
// in .html — it never sees this file. Any in-site URL built in JS must add it here.
export const withBase = (config, path) => `${(config && config.baseurl) || ""}${path}`;
