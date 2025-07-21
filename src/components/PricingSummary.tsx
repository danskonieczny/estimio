'use client'

import { PricingResult } from '@/lib/types'
import ExportButtons from './ExportButtons'
import { motion } from 'framer-motion'

interface PricingSummaryProps {
  estimate: PricingResult | null
  loading: boolean
}

export default function PricingSummary({ estimate, loading }: PricingSummaryProps) {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!estimate) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">
          Wybierz funkcjonalności aby zobaczyć wycenę
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Podsumowanie Wyceny
      </h3>

      <div className="bg-primary-50 rounded-lg p-6 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Szacowany koszt całkowity</p>
          <p className="text-3xl font-bold text-primary-600">
            {estimate.totalCost.toLocaleString('pl-PL')} PLN
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {estimate.totalHours}h • ~{Math.ceil(estimate.totalHours / 40)} tyg. pracy
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900">Breakdown kosztów:</h4>
        
        {estimate.breakdown.map((item) => (
          <div key={item.category} className="border-l-4 border-primary-200 pl-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{item.category}</span>
              <span className="text-primary-600 font-semibold">
                {item.cost.toLocaleString('pl-PL')} PLN
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mb-1">
              {item.hours}h • {item.features.join(', ')}
            </div>
          </div>
        ))}
      </div>

      {estimate.recommendations.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <h5 className="font-medium text-yellow-800 mb-2">Rekomendacje:</h5>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            {estimate.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <ExportButtons estimate={estimate} />
    </motion.div>
  )
}
