import { Composition } from "remotion";
import { Walkthrough } from "./Walkthrough";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RoastRitualWalkthrough"
      component={Walkthrough}
      durationInFrames={1725}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
