import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface ScreenSceneProps {
  src: string;
  title: string;
  subtitle?: string;
  scrollDuration?: number;
  imageHeight: number;
}

const VIEWPORT = 1080;

export const ScreenScene: React.FC<ScreenSceneProps> = ({
  src,
  title,
  subtitle,
  scrollDuration = 60,
  imageHeight,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const height = imageHeight;
  const scrollMax = Math.max(0, height - VIEWPORT);

  const scrollProgress = interpolate(
    frame,
    [15, 15 + scrollDuration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.bezier(0.25, 0.1, 0.25, 1)),
    }
  );
  const translateY = -(scrollProgress * scrollMax);

  const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSlide = interpolate(frame, [15, 30], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0A08" }}>
      <AbsoluteFill
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            width: "100%",
            height: height,
            transform: `translateY(${translateY}px)`,
            willChange: "transform",
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(transparent, rgba(13,10,8,0.8) 30%, rgba(13,10,8,0.95) 70%, #0D0A08)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 48px 36px",
          opacity: titleOpacity,
          transform: `translateY(${titleSlide}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#F5F0EB",
            letterSpacing: "-0.02em",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: "#B8A89A",
              letterSpacing: "0.05em",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
