import { useState, useEffect, useRef } from "react";
import { Calculator, Plane, Train, Car, Bus } from "lucide-react";
import { availableCities } from "@/data/destinations";
import { Map, useMap, useMapsLibrary, Marker } from "@vis.gl/react-google-maps";

const getTransportIcon = (transport) => {
  switch (transport) {
    case "car":
      return <Car size={20} />;
    case "train":
      return <Train size={20} />;
    case "flight":
      return <Plane size={20} />;
    case "bus":
      return <Bus size={20} />;
    default:
      return <Car size={20} />;
  }
};

// Route Map Component
function RouteMap({ startCity, destination }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const geocodingLibrary = useMapsLibrary("geocoding");
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

  useEffect(() => {
    if (
      !map ||
      !routesLibrary ||
      !geocodingLibrary ||
      !startCity ||
      !destination
    )
      return;

    // Initialize services
    if (!directionsServiceRef.current) {
      directionsServiceRef.current = new routesLibrary.DirectionsService();
    }
    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new routesLibrary.DirectionsRenderer({
        suppressMarkers: true, // We'll add custom markers
        polylineOptions: {
          strokeColor: "#4F46E5",
          strokeWeight: 4,
          strokeOpacity: 0.8,
        },
      });
      directionsRendererRef.current.setMap(map);
    }

    // Geocode start and destination cities to get coordinates for custom markers
    const geocoder = new geocodingLibrary.Geocoder();

    // Geocode start city
    geocoder.geocode({ address: startCity + ", India" }, (results, status) => {
      if (status === geocodingLibrary.GeocoderStatus.OK && results[0]) {
        setStartCoords({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      }
    });

    // Geocode destination city
    geocoder.geocode(
      { address: destination + ", India" },
      (results, status) => {
        if (status === geocodingLibrary.GeocoderStatus.OK && results[0]) {
          setDestCoords({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        }
      },
    );

    // Calculate and display route
    directionsServiceRef.current.route(
      {
        origin: startCity + ", India",
        destination: destination + ", India",
        travelMode: routesLibrary.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === routesLibrary.DirectionsStatus.OK) {
          directionsRendererRef.current.setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      },
    );

    // Cleanup function
    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, [map, routesLibrary, geocodingLibrary, startCity, destination]);

  return (
    <>
      {/* Start City Marker (Green) */}
      {startCoords && (
        <Marker
          position={startCoords}
          title={`Start: ${startCity}`}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#10B981",
            fillOpacity: 1,
            strokeColor: "#059669",
            strokeWeight: 2,
            scale: 1.5,
            anchor: { x: 12, y: 24 },
          }}
        />
      )}

      {/* Destination City Marker (Red) */}
      {destCoords && (
        <Marker
          position={destCoords}
          title={`Destination: ${destination}`}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#EF4444",
            fillOpacity: 1,
            strokeColor: "#DC2626",
            strokeWeight: 2,
            scale: 1.5,
            anchor: { x: 12, y: 24 },
          }}
        />
      )}
    </>
  );
}

// Comprehensive list of Indian cities
const indianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivali",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Dhanbad",
  "Jodhpur",
  "Amritsar",
  "Raipur",
  "Allahabad",
  "Coimbatore",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Madurai",
  "Gurgaon",
  "Navi Mumbai",
  "Aurangabad",
  "Solapur",
  "Ranchi",
  "Jalandhar",
  "Tiruchirappalli",
  "Bhubaneswar",
  "Salem",
  "Warangal",
  "Mira-Bhayandar",
  "Thiruvananthapuram",
  "Bhiwandi",
  "Saharanpur",
  "Guntur",
  "Amravati",
  "Bikaner",
  "Noida",
  "Jamshedpur",
  "Bhilai Nagar",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Nanded",
  "Kolhapur",
  "Ajmer",
  "Gulbarga",
  "Jamnagar",
  "Ujjain",
  "Loni",
  "Siliguri",
  "Jhansi",
  "Ulhasnagar",
  "Jammu",
  "Sangli-Miraj & Kupwad",
  "Mangalore",
  "Erode",
  "Belgaum",
  "Ambattur",
  "Tirunelveli",
  "Malegaon",
  "Gaya",
  "Jalgaon",
  "Udaipur",
  "Maheshtala",
  "Tirupati",
  "Davanagere",
  "Kozhikode",
  "Akola",
  "Kurnool",
  "Bokaro",
  "Rajahmundry",
  "Ballari",
  "Agartala",
  "Bhagalpur",
  "Latur",
  "Dhule",
  "Korba",
  "Nellore",
  "Chandigarh",
  "Brahmapur",
  "Muzaffarpur",
  "Ahmednagar",
  "Mathura",
  "Kollam",
  "Avadi",
  "Kadapa",
  "Kamarhati",
  "Sambalpur",
  "Bilaspur",
  "Shahjahanpur",
  "Satara",
  "Bijapur",
  "Rampur",
  "Shivamogga",
  "Chandrapur",
  "Junagadh",
  "Thrissur",
  "Alwar",
  "Bardhaman",
  "Kulti",
  "Nizamabad",
  "Parbhani",
  "Tumkur",
  "Hisar",
  "Ozhukarai",
  "Bihar Sharif",
  "Panipat",
  "Darbhanga",
  "Bally",
  "Aizawl",
  "Dewas",
  "Ichalkaranji",
  "Karnal",
  "Bathinda",
  "Jalna",
  "Eluru",
  "Kirari Suleman Nagar",
  "Barabanki",
  "Purnia",
  "Satna",
  "Mau",
  "Sonipat",
  "Farrukhabad",
  "Sagar",
  "Rourkela",
  "Durg",
  "Imphal",
  "Ratlam",
  "Hapur",
  "Arrah",
  "Anantapur",
  "Karimnagar",
  "Etawah",
  "Ambarnath",
  "North Dumdum",
  "Bharatpur",
  "Begusarai",
  "New Delhi",
  "Gandhidham",
  "Baranagar",
  "Tiruvottiyur",
  "Pondicherry",
  "Sikar",
  "Thoothukudi",
  "Rewa",
  "Mirzapur",
  "Raichur",
  "Pali",
  "Ramagundam",
  "Silchar",
  "Jamalpur",
  "Aligarh",
  "Jalpaiguri",
  "Banda",
  "Singrauli",
  "Jind",
  "Noida",
  "Rishikesh",
  "Goa",
  "Mysore",
  "Shimla",
  "Manali",
  "Haridwar",
  "Mussoorie",
];

export function TripCostCalculatorForm({
  formData,
  handleInputChange,
  setFormData,
  calculateCost,
  loading,
  distance,
}) {
  // Autocomplete states
  const [startCitySuggestions, setStartCitySuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showStartSuggestions, setShowStartSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);

  // Refs for dropdown management
  const startCityRef = useRef(null);
  const destinationRef = useRef(null);

  // Filter cities based on input
  const filterCities = (input, isDestination = false) => {
    if (input.length < 3) return [];

    const cities = isDestination ? availableCities : indianCities;
    return cities
      .filter((city) => city.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 8); // Limit to 8 suggestions
  };

  // Handle autocomplete for start city
  const handleStartCityChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, startCity: value }));

    if (value.length >= 3) {
      const suggestions = filterCities(value, false);
      setStartCitySuggestions(suggestions);
      setShowStartSuggestions(true);
    } else {
      setShowStartSuggestions(false);
    }
  };

  // Handle autocomplete for destination
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, destination: value }));

    if (value.length >= 3) {
      const suggestions = filterCities(value, true);
      setDestinationSuggestions(suggestions);
      setShowDestinationSuggestions(true);
    } else {
      setShowDestinationSuggestions(false);
    }
  };

  // Select suggestion
  const selectStartCity = (city) => {
    setFormData((prev) => ({ ...prev, startCity: city }));
    setShowStartSuggestions(false);
  };

  const selectDestination = (city) => {
    setFormData((prev) => ({ ...prev, destination: city }));
    setShowDestinationSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startCityRef.current &&
        !startCityRef.current.contains(event.target)
      ) {
        setShowStartSuggestions(false);
      }
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setShowDestinationSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-center mb-6 text-indigo-600">
        <Calculator size={28} />
        <h2 className="text-2xl font-bold ml-3">Trip Cost Calculator</h2>
      </div>

      <form onSubmit={calculateCost} className="space-y-5">
        {/* Start City Input with Autocomplete */}
        <div className="relative" ref={startCityRef}>
          <label
            htmlFor="startCity"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Start City
          </label>
          <input
            type="text"
            id="startCity"
            name="startCity"
            value={formData.startCity}
            onChange={handleStartCityChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200"
            placeholder="Type at least 3 letters..."
            required
          />

          {/* Start City Suggestions */}
          {showStartSuggestions && startCitySuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
              {startCitySuggestions.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectStartCity(city)}
                  className="w-full px-4 py-2 text-left hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Destination Input with Autocomplete */}
        <div className="relative" ref={destinationRef}>
          <label
            htmlFor="destination"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleDestinationChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200"
            placeholder="Type at least 3 letters..."
            required
          />

          {/* Destination Suggestions */}
          {showDestinationSuggestions && destinationSuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
              {destinationSuggestions.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectDestination(city)}
                  className="w-full px-4 py-2 text-left hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                >
                  {city}
                </button>
              ))}
            </div>
          )}

          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-2">
              Available destinations:
            </p>
            <div className="flex flex-wrap gap-1">
              {availableCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, destination: city }))
                  }
                  className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
          {distance && (
            <p className="text-sm text-green-600 mt-2">
              📍 Distance: {distance} km
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="people"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              People
            </label>
            <input
              type="number"
              id="people"
              name="people"
              value={formData.people}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              min="1"
              max="20"
              required
            />
          </div>
          <div>
            <label
              htmlFor="days"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Days
            </label>
            <input
              type="number"
              id="days"
              name="days"
              value={formData.days}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              min="1"
              max="30"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Transport Mode
          </label>
          <div className="grid grid-cols-4 gap-3">
            {["car", "train", "flight", "bus"].map((transport) => (
              <button
                key={transport}
                type="button"
                className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                  formData.transport === transport
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setFormData((prev) => ({ ...prev, transport }))}
              >
                {getTransportIcon(transport)}
                <div className="text-sm font-medium mt-2 capitalize">
                  {transport}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="stayType"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Stay Type
          </label>
          <select
            id="stayType"
            name="stayType"
            value={formData.stayType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            required
          >
            <option value="budget">Budget (₹800-1500/night)</option>
            <option value="mid">Mid-range (₹1500-3000/night)</option>
            <option value="luxury">Luxury (₹3000+/night)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate Trip Cost"}
        </button>
      </form>

      {/* Route Map */}
      {formData.startCity &&
        formData.destination &&
        formData.startCity.trim() &&
        formData.destination.trim() && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Route Preview
            </h3>
            <div className="h-64 rounded-xl overflow-hidden border-2 border-gray-200">
              <Map
                defaultZoom={6}
                defaultCenter={{ lat: 20.5937, lng: 78.9629 }} // Center of India
                gestureHandling="greedy"
                disableDefaultUI={false}
                mapTypeControl={false}
                streetViewControl={false}
                fullscreenControl={false}
              >
                <RouteMap
                  startCity={formData.startCity}
                  destination={formData.destination}
                />
              </Map>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              🗺️ Route from {formData.startCity} to {formData.destination}
            </p>
          </div>
        )}
    </div>
  );
}
