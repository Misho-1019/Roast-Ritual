import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineScale = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0A08", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            width: 80,
            height: 3,
            backgroundColor: "#D4A04A",
            margin: "0 auto 32px",
            transform: `scaleX(${lineScale})`,
            transformOrigin: "center",
          }}
        />

        <div style={{ fontSize: 36, fontWeight: 700, color: "#F5F0EB", marginBottom: 12 }}>
          Turn your coffee into a ritual
        </div>

        <div style={{ fontSize: 18, color: "#B8A89A", letterSpacing: "0.1em" }}>
          Roast &amp; Ritual
        </div>
      </div>
    </AbsoluteFill>
  );
};
