import HeroSection from '../components/home/HeroSection'
import RatingBadge from '../components/home/RatingBadge'
import FeaturedProducts from '../components/home/FeaturedProducts'
import StorySection from '../components/home/StorySection'
import NewsletterSection from '../components/home/NewsletterSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RatingBadge />
      <FeaturedProducts />
      <StorySection />
      <NewsletterSection />
    </>
  )
}
