'use client'

import { ProjectFeature } from '@/lib/types'
import { motion } from 'framer-motion'

interface FeatureSelectorProps {
  features: ProjectFeature[]
  onFeatureToggle: (featureId: string) => void
}

export default function FeatureSelector({ features, onFeatureToggle }: FeatureSelectorProps) {
  const categories = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = []
    }
    acc[feature.category].push(feature)
    return acc
  }, {} as Record<string, ProjectFeature[]>)

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Wybierz Funkcjonalności
      </h3>
      
      <div className="space-y-6">
        {Object.entries(categories).map(([category, categoryFeatures]) => (
          <div key={category}>
            <h4 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b">
              {category}
            </h4>
            
            <div className="space-y-3">
              {categoryFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    feature.selected 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onFeatureToggle(feature.id)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={feature.selected}
                      onChange={() => onFeatureToggle(feature.id)}
                      className="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300"
                    />
                    
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-900 cursor-pointer">
                        {feature.name}
                      </label>
                      
                      {feature.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {feature.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          ~{feature.baseHours}h
                        </span>
                        
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          feature.complexity === 'simple' ? 'bg-green-100 text-green-800' :
                          feature.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {feature.complexity}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
