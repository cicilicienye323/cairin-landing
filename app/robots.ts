import type { MetadataRoute } from "next";

import { SITE_URL } from "./site";

// Required by output: export so the file is written at build time.
export const dynamic = "force-static";

// Crawlers only read robots.txt at the domain root, so on the GitHub Pages subpath this file
// is informational. It becomes active if the site moves to its own domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}sitemap.xml`,
  };
}
