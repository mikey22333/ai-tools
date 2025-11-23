'use client'

import { useEffect } from 'react'
import type { EzoicPlacementId } from '@/constants/ezoicPlacements'

interface EzoicAdProps {
  placementId: number | EzoicPlacementId
  className?: string
}

declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>
      showAds: (...ids: number[]) => void
    }
  }
}

export default function EzoicAd({ placementId, className = '' }: EzoicAdProps) {
  useEffect(() => {
    // Ensure ezstandalone is available
    if (typeof window !== 'undefined' && window.ezstandalone) {
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.showAds(placementId)
      })
    }
  }, [placementId])

  return <div id={`ezoic-pub-ad-placeholder-${placementId}`} className={className} />
}
