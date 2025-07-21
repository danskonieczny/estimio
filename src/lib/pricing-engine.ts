import { ProjectFeature, PricingResult, PricingConfig } from './types'
import { PRICING_CONFIG } from '@/data/pricing-config'

export class PricingEngine {
  private config: PricingConfig

  constructor(config: PricingConfig = PRICING_CONFIG) {
    this.config = config
  }

  calculateEstimate(features: ProjectFeature[]): PricingResult {
    const selectedFeatures = features.filter(f => f.selected)
    const breakdown: PricingResult['breakdown'] = []
    let totalHours = 0
    let totalCost = 0

    // Grupuj według kategorii
    const categories = this.groupByCategory(selectedFeatures)

    for (const [category, categoryFeatures] of Object.entries(categories)) {
      let categoryHours = 0
      let categoryCost = 0
      const featureNames: string[] = []

      for (const feature of categoryFeatures) {
        const baseHours = feature.baseHours
        const complexity = this.config.complexityMultipliers[feature.complexity]
        const technologyRate = this.getTechnologyRate(category)
        
        const featureHours = Math.ceil(baseHours * complexity)
        const featureCost = featureHours * technologyRate

        // Dodaj premie za trendy
        const trendMultiplier = this.getTrendMultiplier(feature)
        const adjustedCost = featureCost * trendMultiplier

        categoryHours += featureHours
        categoryCost += adjustedCost
        featureNames.push(feature.name)
      }

      breakdown.push({
        category,
        hours: categoryHours,
        cost: Math.round(categoryCost),
        features: featureNames
      })

      totalHours += categoryHours
      totalCost += categoryCost
    }

    // Dodaj margines na zarządzanie projektem (15%)
    totalCost *= 1.15
    totalHours = Math.ceil(totalHours * 1.15)

    return {
      totalHours,
      totalCost: Math.round(totalCost),
      breakdown,
      recommendations: this.generateRecommendations(selectedFeatures)
    }
  }

  private groupByCategory(features: ProjectFeature[]): Record<string, ProjectFeature[]> {
    return features.reduce((acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = []
      }
      acc[feature.category].push(feature)
      return acc
    }, {} as Record<string, ProjectFeature[]>)
  }

  private getTechnologyRate(category: string): number {
    switch (category.toLowerCase()) {
      case 'frontend': return this.config.technologyRates.frontend
      case 'backend': return this.config.technologyRates.backend
      case 'mobile': return this.config.technologyRates.mobile
      case 'ai': return this.config.technologyRates.ai
      case 'blockchain': return this.config.technologyRates.blockchain
      default: return this.config.baseHourlyRate
    }
  }

  private getTrendMultiplier(feature: ProjectFeature): number {
    if (feature.category.toLowerCase() === 'ai') {
      return this.config.marketTrends.aiPremium
    }
    if (feature.category.toLowerCase() === 'mobile') {
      return this.config.marketTrends.mobileFirst
    }
    return 1.0
  }

  private generateRecommendations(features: ProjectFeature[]): string[] {
    const recommendations: string[] = []
    
    const hasBackend = features.some(f => f.category === 'Backend')
    const hasMobile = features.some(f => f.category === 'Mobile')
    const hasAI = features.some(f => f.category === 'AI')

    if (!hasBackend && hasMobile) {
      recommendations.push('Rozważ dodanie API Backend dla aplikacji mobilnej')
    }

    if (hasAI && !hasBackend) {
      recommendations.push('Funkcje AI wymagają solidnego backendu')
    }

    if (features.length > 5) {
      recommendations.push('Duży zakres projektu - rozważ podział na fazy')
    }

    return recommendations
  }
}
