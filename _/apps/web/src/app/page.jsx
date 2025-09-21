"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useTravelPlanner } from "@/hooks/useTravelPlanner";
import { DistanceCalculator } from "@/components/TravelPlanner/DistanceCalculator";
import { AnimatedBackground } from "@/components/TravelPlanner/AnimatedBackground";
import { Header } from "@/components/TravelPlanner/Header";
import { TripCostCalculatorForm } from "@/components/TravelPlanner/TripCostCalculatorForm";
import { ItineraryGuide } from "@/components/TravelPlanner/ItineraryGuide";
import { CostBreakdown } from "@/components/TravelPlanner/CostBreakdown";

export default function TravelAIAgent() {
  const {
    formData,
    setFormData,
    handleInputChange,
    costResult,
    itinerary,
    destinationInfo,
    loading,
    error,
    distance,
    calculateCost,
    fetchItinerary,
    handleDistanceCalculated,
  } = useTravelPlanner();

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <DistanceCalculator
        startCity={formData.startCity}
        destination={formData.destination}
        onDistanceCalculated={handleDistanceCalculated}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 relative overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 p-5 max-w-7xl mx-auto">
          <Header />

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <TripCostCalculatorForm
              formData={formData}
              handleInputChange={handleInputChange}
              setFormData={setFormData}
              calculateCost={calculateCost}
              loading={loading}
              distance={distance}
            />

            <ItineraryGuide
              destination={formData.destination}
              destinationInfo={destinationInfo}
              itinerary={itinerary}
              fetchItinerary={fetchItinerary}
              loading={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          {costResult && (
            <CostBreakdown
              result={costResult}
              formData={formData}
              distance={distance}
            />
          )}

          {/* Footer Section */}
          <footer className="mt-16 py-8 border-t border-white/20">
            <div className="text-center text-white/90">
              <p className="text-lg font-semibold mb-2">
                Created by team:{" "}
                <span className="text-yellow-300">NextGen Duo</span>
              </p>
              <p className="text-sm text-white/70">
                This is only a prototype with basic features
              </p>
            </div>
          </footer>
        </div>
      </div>
    </APIProvider>
  );
}
