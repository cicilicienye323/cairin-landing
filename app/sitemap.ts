import type { MetadataRoute } from "next";

import { SITE_URL } from "./site";

// Required by output: export so the file is written at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL }];
}
