/**
 * Ezoic Ad Placement Reference
 * 
 * Quick reference for all ad placement IDs used across the site.
 * Update this file when adding new placements.
 */

export const EZOIC_PLACEMENTS = {
  // Homepage Placements
  HOMEPAGE_TOP: 101,           // After hero section (leaderboard)
  HOMEPAGE_MID: 102,           // Between editor's picks and categories
  HOMEPAGE_BOTTOM: 103,        // Before footer
  
  // Blog Post Placements
  BLOG_POST_TOP: 104,          // After featured image, before content
  BLOG_POST_BOTTOM: 105,       // After article content
  
  // Blog Listing Placements
  BLOG_LISTING_TOP: 106,       // After header, before posts
  BLOG_SIDEBAR: 107,           // Sidebar (related posts section)
  
  // Reserved for Future Use
  // TOOLS_DIRECTORY_TOP: 108,
  // TOOLS_DIRECTORY_SIDEBAR: 109,
  // CATEGORY_PAGE_TOP: 110,
  // TOOL_DETAIL_TOP: 111,
  // TOOL_DETAIL_SIDEBAR: 112,
} as const

/**
 * Usage Example:
 * 
 * import { EZOIC_PLACEMENTS } from '@/constants/ezoicPlacements'
 * import EzoicAd from '@/components/EzoicAd'
 * 
 * <EzoicAd placementId={EZOIC_PLACEMENTS.HOMEPAGE_TOP} />
 */

export type EzoicPlacementId = typeof EZOIC_PLACEMENTS[keyof typeof EZOIC_PLACEMENTS]
