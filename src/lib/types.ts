export interface ProjectFeature {
    id: string
    name: string
    category: string
    baseHours: number
    complexity: 'simple' | 'medium' | 'complex'
    dependencies: string[]
    selected: boolean
    description?: string
  }
  
  export interface PricingResult {
    totalHours: number
    totalCost: number
    breakdown: {
      category: string
      hours: number
      cost: number
      features: string[]
    }[]
    recommendations: string[]
  }
  
  export interface PricingConfig {
    baseHourlyRate: number
    complexityMultipliers: {
      simple: number
      medium: number
      complex: number
    }
    technologyRates: {
      frontend: number
      backend: number
      mobile: number
      ai: number
      blockchain: number
    }
    marketTrends: {
      aiPremium: number
      mobileFirst: number
      serverless: number
    }
  }
  