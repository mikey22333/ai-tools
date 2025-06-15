import Hero from '@/components/Hero'
import FeaturedCategories from '@/components/FeaturedCategories'
import TrendingTools from '@/components/TrendingTools'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingTools />
      <FeaturedCategories />
      <Newsletter />
    </>
  )
}
