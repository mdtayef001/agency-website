import type { MetadataRoute } from "next";

import { agency } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = agency.url.replace(/\/$/, "");

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
