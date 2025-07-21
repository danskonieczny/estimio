import PricingCalculator from '@/components/PricingCalculator'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Kalkulator Wyceny Aplikacji
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Profesjonalna wycena projektów na podstawie aktualnych trendów rynkowych
        </p>
      </div>
      <PricingCalculator />
    </div>
  )
}
