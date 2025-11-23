import Hero from '@/components/Hero'
import EditorsPicks from '@/components/EditorsPicks'
import FeaturedCategories from '@/components/FeaturedCategories'
import EzoicAd from '@/components/EzoicAd'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Top Leaderboard Ad - After Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EzoicAd placementId={101} className="text-center" />
      </div>
      
      <EditorsPicks />
      
      {/* Mid-Content Ad - Between Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EzoicAd placementId={102} className="text-center" />
      </div>
      
      <FeaturedCategories />
      
      {/* Bottom Ad - Before Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EzoicAd placementId={103} className="text-center" />
      </div>
    </>
  )
}
