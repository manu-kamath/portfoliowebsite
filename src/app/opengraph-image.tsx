import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Manu Kamath — Design Leader, Musician, Coach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const photoData = readFileSync(
    path.join(process.cwd(), "public/Manu_Kamath_Profile.jpg")
  );
  const photoSrc = `data:image/jpeg;base64,${photoData.toString("base64")}`;

  const satoshiBold = readFileSync(
    path.join(process.cwd(), "public/fonts/satoshi-700.ttf")
  );
  const satoshiRegular = readFileSync(
    path.join(process.cwd(), "public/fonts/satoshi-400.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#141414",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Satoshi, sans-serif",
          position: "relative",
        }}
      >
        {/* Green accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 6,
            height: "100%",
            background: "#7cba6e",
          }}
        />

        {/* Left: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            flex: 1,
            paddingRight: 60,
          }}
        >
          {/* Site label */}
          <div
            style={{
              fontFamily: "Satoshi",
              fontSize: 18,
              color: "#7cba6e",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            manukamath.com
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: "Satoshi",
              fontSize: 72,
              fontWeight: 700,
              color: "#e8e4df",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Manu Kamath
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 8,
            }}
          >
            {["Design Leader", "Musician", "Coach"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 6,
                  border: "1px solid rgba(232,228,223,0.14)",
                  color: "#9a948e",
                  fontSize: 20,
                  fontFamily: "Satoshi",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Right: circular photo */}
        <img
          src={photoSrc}
          width={320}
          height={320}
          style={{
            borderRadius: "50%",
            border: "3px solid rgba(124,186,110,0.4)",
            objectFit: "cover",
            objectPosition: "center top",
            flexShrink: 0,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Satoshi", data: satoshiRegular, weight: 400, style: "normal" },
        { name: "Satoshi", data: satoshiBold, weight: 700, style: "normal" },
      ],
    }
  );
}
