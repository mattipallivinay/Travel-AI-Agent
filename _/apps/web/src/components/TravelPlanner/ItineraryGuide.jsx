import { MapPin, DollarSign, Calendar } from "lucide-react";

function DestinationInfo({ info }) {
  if (!info) return null;

  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
      <img
        src={info.image}
        alt={info.name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-2xl font-bold text-indigo-800 mb-3">
        {info.name}
      </h3>
      <p className="text-gray-700 mb-4 leading-relaxed">
        {info.greatness}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {info.highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-center text-sm text-indigo-700"
          >
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            {highlight}
          </div>
        ))}
      </div>
    </div>
  );
}

function ItineraryDetails({ itinerary, destination }) {
  if (!itinerary) return null;

  const renderSection = (title, items, icon) => (
    <div className="bg-gray-50 rounded-xl p-4">
      <h4 className="flex items-center text-lg font-semibold text-indigo-700 mb-3">
        {icon}
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {items && items.length > 0 ? (
          items.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="text-gray-700 text-sm py-1 border-b border-gray-200 last:border-b-0"
            >
              {item}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No data available</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-indigo-800 mb-4 capitalize">
        {destination} Travel Guide
      </h3>
      <div className="space-y-6">
        {renderSection("Attractions", itinerary.attractions, <MapPin size={18} className="mr-2" />)}
        {renderSection("Local Foods", itinerary.foods, <DollarSign size={18} className="mr-2" />)}
        {renderSection("Hotels", itinerary.hotels, <Calendar size={18} className="mr-2" />)}
      </div>
    </div>
  );
}

export function ItineraryGuide({ destination, destinationInfo, itinerary, fetchItinerary, loading }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-center mb-6 text-indigo-600">
        <MapPin size={28} />
        <h2 className="text-2xl font-bold ml-3">Itinerary Guide</h2>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Enter the same destination as above to get recommendations
        </p>
        <button
          onClick={fetchItinerary}
          className="w-full py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-200 disabled:opacity-50"
          disabled={loading || !destination}
        >
          {loading ? "Loading..." : "Get Itinerary Guide"}
        </button>

        <DestinationInfo info={destinationInfo} />
        <ItineraryDetails itinerary={itinerary} destination={destination} />
      </div>
    </div>
  );
}
