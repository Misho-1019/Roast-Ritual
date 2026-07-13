import { AbsoluteFill, Sequence } from "remotion";
import { ScreenScene } from "./ScreenScene";
import { Intro } from "./Intro";
import { Outro } from "./Outro";

const FPS = 30;

interface Screen {
  src: string;
  title: string;
  subtitle: string;
  height: number;
  scrollDuration: number;
}

const screens: Screen[] = [
  { src: "screens/home.jpg", title: "Home", subtitle: "Premium coffee experience", height: 5504, scrollDuration: 105 },
  { src: "screens/home-v2.jpg", title: "Home (Alternate)", subtitle: "Refined hero layout", height: 5798, scrollDuration: 105 },
  { src: "screens/home-v3.jpg", title: "Home (Variant)", subtitle: "Alternative composition", height: 5578, scrollDuration: 105 },
  { src: "screens/our-story.jpg", title: "Our Story", subtitle: "The brand behind the ritual", height: 8898, scrollDuration: 135 },
  { src: "screens/shop.jpg", title: "Our Collection", subtitle: "Curated single-origin coffees", height: 5026, scrollDuration: 105 },
  { src: "screens/product-detail.jpg", title: "Product Detail", subtitle: "Ethiopian Yirgacheffe", height: 3825, scrollDuration: 90 },
  { src: "screens/quiz.jpg", title: "Coffee Quiz", subtitle: "Find Your Perfect Roast", height: 3802, scrollDuration: 90 },
  { src: "screens/quiz-result.jpg", title: "Your Ritual Match", subtitle: "Personalized recommendation", height: 3748, scrollDuration: 90 },
  { src: "screens/cart.jpg", title: "Shopping Cart", subtitle: "Review your selections", height: 2442, scrollDuration: 60 },
  { src: "screens/checkout.jpg", title: "Secure Checkout", subtitle: "Complete your order", height: 2319, scrollDuration: 60 },
  { src: "screens/sign-in.jpg", title: "Sign In", subtitle: "Welcome back", height: 1536, scrollDuration: 45 },
  { src: "screens/sign-up.jpg", title: "Sign Up", subtitle: "Join the ritual", height: 1742, scrollDuration: 45 },
  { src: "screens/admin.jpg", title: "Admin Dashboard", subtitle: "Store overview", height: 1536, scrollDuration: 45 },
  { src: "screens/admin-v2.jpg", title: "Admin Dashboard", subtitle: "Analytics view", height: 1566, scrollDuration: 45 },
  { src: "screens/admin-v3.jpg", title: "Admin Dashboard", subtitle: "Order management", height: 1665, scrollDuration: 45 },
  { src: "screens/admin-redesign.jpg", title: "Admin Redesign", subtitle: "Updated interface", height: 1545, scrollDuration: 45 },
  { src: "screens/admin-premium.jpg", title: "Admin Premium", subtitle: "Enhanced dashboard", height: 1882, scrollDuration: 45 },
];

const INTRO_FRAMES = 120;
const OUTRO_FRAMES = 90;

export const Walkthrough: React.FC = () => {
  let offset = INTRO_FRAMES;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0A08" }}>
      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>

      {screens.map((screen, index) => {
        const start = offset;
        const duration = screen.scrollDuration + 15;
        offset += duration;
        return (
          <Sequence key={index} from={start} durationInFrames={duration}>
            <ScreenScene
              src={screen.src}
              title={screen.title}
              subtitle={screen.subtitle}
              imageHeight={screen.height}
              scrollDuration={screen.scrollDuration}
            />
          </Sequence>
        );
      })}

      <Sequence from={offset} durationInFrames={OUTRO_FRAMES}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
