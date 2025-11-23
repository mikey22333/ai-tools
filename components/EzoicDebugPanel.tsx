'use client'

import { useState, useEffect } from 'react'
import { EZOIC_PLACEMENTS } from '@/constants/ezoicPlacements'

/**
 * EzoicDebugPanel - Admin component for testing Ezoic integration
 * 
 * Usage: Add to your admin page or dev environment
 * Shows loaded scripts, placement status, and helps debug issues
 */
export default function EzoicDebugPanel() {
  const [scriptsLoaded, setScriptsLoaded] = useState({
    privacy1: false,
    privacy2: false,
    header: false,
    initialized: false,
  })
  
  const [placeholders, setPlaceholders] = useState<string[]>([])
  const [ezstandaloneStatus, setEzstandaloneStatus] = useState<any>(null)

  useEffect(() => {
    // Check if scripts are loaded
    const checkScripts = () => {
      const scripts = document.querySelectorAll('script')
      const loaded = {
        privacy1: Array.from(scripts).some(s => s.src.includes('gatekeeperconsent.com/min.js')),
        privacy2: Array.from(scripts).some(s => s.src.includes('cmp.min.js')),
        header: Array.from(scripts).some(s => s.src.includes('ezojs.com')),
        initialized: typeof window !== 'undefined' && window.ezstandalone !== undefined,
      }
      setScriptsLoaded(loaded)
      
      if (typeof window !== 'undefined' && window.ezstandalone) {
        setEzstandaloneStatus({
          hasCmd: Array.isArray(window.ezstandalone.cmd),
          cmdLength: window.ezstandalone.cmd?.length || 0,
          hasShowAds: typeof window.ezstandalone.showAds === 'function',
        })
      }
    }

    // Check for ad placeholders
    const checkPlaceholders = () => {
      const found: string[] = []
      Object.entries(EZOIC_PLACEMENTS).forEach(([key, id]) => {
        const element = document.getElementById(`ezoic-pub-ad-placeholder-${id}`)
        if (element) {
          found.push(`${key} (${id})`)
        }
      })
      setPlaceholders(found)
    }

    checkScripts()
    checkPlaceholders()

    // Recheck every 2 seconds for first 10 seconds
    const interval = setInterval(() => {
      checkScripts()
      checkPlaceholders()
    }, 2000)

    setTimeout(() => clearInterval(interval), 10000)

    return () => clearInterval(interval)
  }, [])

  const StatusIndicator = ({ status }: { status: boolean }) => (
    <span className={`inline-block w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`} />
  )

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Ezoic Debug Panel</h2>
      
      {/* Scripts Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Scripts Status</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <StatusIndicator status={scriptsLoaded.privacy1} />
            <span className="text-gray-700">Privacy Script 1 (gatekeeperconsent.com/min.js)</span>
          </div>
          <div className="flex items-center space-x-3">
            <StatusIndicator status={scriptsLoaded.privacy2} />
            <span className="text-gray-700">Privacy Script 2 (cmp.min.js)</span>
          </div>
          <div className="flex items-center space-x-3">
            <StatusIndicator status={scriptsLoaded.header} />
            <span className="text-gray-700">Ezoic Header Script (ezojs.com)</span>
          </div>
          <div className="flex items-center space-x-3">
            <StatusIndicator status={scriptsLoaded.initialized} />
            <span className="text-gray-700">ezstandalone Initialized</span>
          </div>
        </div>
      </div>

      {/* ezstandalone Object */}
      {ezstandaloneStatus && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">ezstandalone Object</h3>
          <div className="bg-gray-50 p-3 rounded border border-gray-200">
            <div className="text-sm text-gray-700 space-y-1">
              <div>Has cmd array: <strong>{ezstandaloneStatus.hasCmd ? 'Yes' : 'No'}</strong></div>
              <div>Cmd queue length: <strong>{ezstandaloneStatus.cmdLength}</strong></div>
              <div>Has showAds function: <strong>{ezstandaloneStatus.hasShowAds ? 'Yes' : 'No'}</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholders */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Ad Placeholders Found ({placeholders.length}/{Object.keys(EZOIC_PLACEMENTS).length})
        </h3>
        {placeholders.length > 0 ? (
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <ul className="space-y-1">
              {placeholders.map((placeholder, index) => (
                <li key={index} className="text-sm text-green-800">
                  ✓ {placeholder}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-sm text-yellow-800">No placeholders found on this page.</p>
          </div>
        )}
      </div>

      {/* All Placement IDs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">All Placement IDs</h3>
        <div className="bg-gray-50 border border-gray-200 rounded p-3">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            {Object.entries(EZOIC_PLACEMENTS).map(([key, id]) => (
              <div key={key}>
                <strong>{id}</strong> - {key.replace(/_/g, ' ').toLowerCase()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={() => window.location.href = '/ads.txt'}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Test ads.txt
          </button>
          <button
            onClick={() => {
              console.log('ezstandalone:', window.ezstandalone)
              alert('Check browser console for ezstandalone object')
            }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Log ezstandalone to Console
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h4 className="font-semibold text-blue-900 mb-2">Integration Status</h4>
        {Object.values(scriptsLoaded).every(v => v) ? (
          <p className="text-sm text-blue-800">
            ✓ All scripts loaded successfully! Integration appears to be working.
          </p>
        ) : (
          <p className="text-sm text-blue-800">
            ⚠ Some scripts are not loaded. Check the status above and ensure you've deployed the latest code.
          </p>
        )}
      </div>
    </div>
  )
}
