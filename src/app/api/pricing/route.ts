import { NextRequest, NextResponse } from 'next/server'
import { PricingEngine } from '@/lib/pricing-engine'

export async function POST(request: NextRequest) {
  try {
    const { features } = await request.json()
    
    const pricingEngine = new PricingEngine()
    const estimate = pricingEngine.calculateEstimate(features)
    
    return NextResponse.json(estimate)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate pricing' },
      { status: 500 }
    )
  }
}
