import { siteConfig } from "@/config/site";
import { ImageResponse } from "next/og";

export const alt = `${siteConfig.brandName} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 45%, #eff6ff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            X
          </div>
          <span style={{ fontSize: 42, fontWeight: 800, color: "#14532d" }}>
            Mawashi<span style={{ color: "#16a34a" }}>X</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <p style={{ fontSize: 56, fontWeight: 800, color: "#0f172a", lineHeight: 1.1, margin: 0 }}>
            {siteConfig.tagline}
          </p>
          <p style={{ fontSize: 28, color: "#475569", lineHeight: 1.4, margin: 0 }}>
            {siteConfig.hero.subheadline}
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Bovins", "Ovins", "Caprins", "Camelins"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(22,163,74,0.12)",
                color: "#166534",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
