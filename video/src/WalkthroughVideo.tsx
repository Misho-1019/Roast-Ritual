import { useCurrentFrame, useVideoConfig, interpolate, staticFile, Img, spring, AbsoluteFill } from "remotion";

interface Screen {
  name: string;
  label: string;
}

interface WalkthroughVideoProps {
  screens: Screen[];
}

export const WalkthroughVideo: React.FC<WalkthroughVideoProps> = ({ screens }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationPerScreen = 90;
  const transitionFrames = 15;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0A08" }}>
      {screens.map((screen, index) => {
        const startFrame = index * durationPerScreen;
        const endFrame = startFrame + durationPerScreen;
        const isLast = index === screens.length - 1;

        if (frame > endFrame && !isLast) return null;
        if (frame < startFrame - transitionFrames) return null;

        const localFrame = frame - startFrame;

        const opacity = interpolate(
          localFrame,
          [-transitionFrames, 0, durationPerScreen - transitionFrames, durationPerScreen],
          [0, 1, 1, isLast ? 1 : 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const scale = interpolate(
          localFrame,
          [0, durationPerScreen],
          [1.0, 1.05],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const labelOpacity = spring({
          frame: localFrame,
          fps,
          config: { damping: 200, stiffness: 100 },
        });

        return (
          <AbsoluteFill
            key={screen.name}
            style={{ opacity, transform: `scale(${scale})` }}
          >
            <Img
              src={staticFile(`${screen.name}.png`)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#F5F0EB",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                letterSpacing: "-0.02em",
                opacity: labelOpacity,
              }}
            >
              {screen.label}
            </div>
            {!isLast && (
              <div
                style={{
                  position: "absolute",
                  bottom: 90,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#D4A04A",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  opacity: interpolate(
                    localFrame,
                    [durationPerScreen - transitionFrames - 10, durationPerScreen - transitionFrames],
                    [1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                }}
              >
                Next →
              </div>
            )}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
