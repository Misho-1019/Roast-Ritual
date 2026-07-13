import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [15, 45], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const goldLineScale = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0A08", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 512 512" fill="none">
            <circle cx="256" cy="256" r="240" stroke="#D4A04A" strokeWidth="24" fill="#1C1512" />
            <path d="M176 280 C176 220, 240 180, 256 160 C272 180, 336 220, 336 280 C336 340, 300 360, 256 360 C212 360, 176 340, 176 280Z" fill="none" stroke="#D4A04A" strokeWidth="12" />
            <path d="M220 280 C220 250, 245 230, 256 220 C267 230, 292 250, 292 280 C292 310, 278 325, 256 325 C234 325, 220 310, 220 280Z" fill="#D4A04A" opacity="0.3" />
            <path d="M180 420 L210 370" stroke="#7C4F34" strokeWidth="6" strokeLinecap="round" />
            <path d="M332 420 L302 370" stroke="#7C4F34" strokeWidth="6" strokeLinecap="round" />
            <line x1="210" y1="370" x2="302" y2="370" stroke="#7C4F34" strokeWidth="4" strokeLinecap="round" />
            <line x1="220" y1="350" x2="292" y2="350" stroke="#7C4F34" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: 64, fontWeight: 700, color: "#D4A04A", letterSpacing: "-0.02em", display: "block" }}>ROAST</span>
            <span style={{ fontSize: 64, fontWeight: 300, color: "#F5F0EB", letterSpacing: "-0.02em", display: "block", marginTop: -8 }}>
              &amp; <span style={{ fontWeight: 700, color: "#D4A04A" }}>RITUAL</span>
            </span>
          </div>
        </div>

        <div
          style={{
            width: 120,
            height: 3,
            backgroundColor: "#D4A04A",
            margin: "0 auto 24px",
            transform: `scaleX(${goldLineScale})`,
            transformOrigin: "center",
          }}
        />

        <div
          style={{
            fontSize: 20,
            color: "#B8A89A",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: subtitleOpacity,
          }}
        >
          Premium Coffee E-Commerce Experience
        </div>
      </div>
    </AbsoluteFill>
  );
};
