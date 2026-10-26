import { ImageResponse } from "next/og";

import { agency } from "@/lib/site";

export const alt = `${agency.name} — ${agency.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link-preview card. Rendered at build time and inherited by every route that
 * doesn't define its own, so renaming the agency updates all previews.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(203,255,90,0.18), transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#cbff5a",
              color: "#0b1400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            {agency.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ color: "#f5f6f8", fontSize: 38, fontWeight: 600 }}>
            {agency.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 940,
          }}
        >
          <div
            style={{
              color: "#f5f6f8",
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              fontWeight: 600,
            }}
          >
            {agency.tagline}
          </div>
          {/* One text child only — Satori rejects multi-child nodes without display:flex. */}
          <div style={{ color: "#8b93a1", fontSize: 30, lineHeight: 1.4 }}>
            {`CMS websites · Custom development · ${agency.location}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            color: "#5d646f",
            fontSize: 24,
          }}
        >
          <span>WordPress</span>
          <span>·</span>
          <span>Shopify</span>
          <span>·</span>
          <span>Webflow</span>
          <span>·</span>
          <span>Next.js</span>
          <span>·</span>
          <span>Django</span>
        </div>
      </div>
    ),
    size,
  );
}
