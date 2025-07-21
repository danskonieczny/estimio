'use client'

import { useState, useEffect } from 'react'
import { ProjectFeature } from '@/lib/types'
import { PROJECT_FEATURES } from '@/data/pricing-config'
import { PricingEngine } from '@/lib/pricing-engine'
import FeatureSelector from './FeatureSelector'
import PricingSummary from './PricingSummary'

export default function PricingCalculator() {
  const [features, setFeatures] = useState<ProjectFeature[]>(PROJECT_FEATURES)
  const [estimate, setEstimate] = useState(null)
  const [loading, setLoading] = useState(false)

  const pricingEngine = new PricingEngine()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const result = pricingEngine.calculateEstimate(features)
      setEstimate(result)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [features])

  const handleFeatureToggle = (featureId: string) => {
    setFeatures(prev => prev.map(f => 
      f.id === featureId ? { ...f, selected: !f.selected } : f
    ))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <FeatureSelector 
        features={features}
        onFeatureToggle={handleFeatureToggle}
      />
      <PricingSummary 
        estimate={estimate}
        loading={loading}
      />
    </div>
  )
}
