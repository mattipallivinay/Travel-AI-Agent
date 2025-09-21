import { useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export function DistanceCalculator({
  startCity,
  destination,
  onDistanceCalculated,
}) {
  const routesLibrary = useMapsLibrary("routes");

  useEffect(() => {
    if (!routesLibrary || !startCity || !destination) return;

    const calculateRealDistance = async () => {
      try {
        // Use Google Maps Distance Matrix Service for real distance calculation
        const service = new routesLibrary.DistanceMatrixService();

        service.getDistanceMatrix(
          {
            origins: [startCity + ", India"],
            destinations: [destination + ", India"],
            travelMode: routesLibrary.TravelMode.DRIVING,
            unitSystem: routesLibrary.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          },
          (response, status) => {
            if (status === routesLibrary.DistanceMatrixStatus.OK) {
              const element = response.rows[0].elements[0];

              if (element.status === "OK") {
                // Distance is returned in meters, convert to kilometers
                const distanceInKm = Math.round(element.distance.value / 1000);
                onDistanceCalculated(distanceInKm);
              } else {
                console.warn(
                  "Distance calculation failed for:",
                  startCity,
                  "to",
                  destination,
                );
                // Try fallback with hardcoded distances for major routes
                const fallbackDistance = getFallbackDistance(
                  startCity,
                  destination,
                );
                onDistanceCalculated(fallbackDistance);
              }
            } else {
              console.error("Distance Matrix API error:", status);
              // Try fallback with hardcoded distances for major routes
              const fallbackDistance = getFallbackDistance(
                startCity,
                destination,
              );
              onDistanceCalculated(fallbackDistance);
            }
          },
        );
      } catch (error) {
        console.error("Distance calculation error:", error);
        // Try fallback with hardcoded distances for major routes
        const fallbackDistance = getFallbackDistance(startCity, destination);
        onDistanceCalculated(fallbackDistance);
      }
    };

    calculateRealDistance();
  }, [routesLibrary, startCity, destination, onDistanceCalculated]);

  // Fallback function for major routes only (no default 500km)
  const getFallbackDistance = (start, dest) => {
    const distanceMatrix = {
      "mumbai-tirupati": 850,
      "mumbai-hyderabad": 710,
      "mumbai-bangalore": 980,
      "mumbai-chennai": 1340,
      "mumbai-delhi": 1430,
      "mumbai-goa": 460,
      "mumbai-jaipur": 1150,
      "mumbai-kolkata": 2130,
      "mumbai-kochi": 1160,
      "mumbai-mysore": 1050,
      "mumbai-rishikesh": 1670,
      "delhi-tirupati": 1450,
      "delhi-hyderabad": 1570,
      "delhi-bangalore": 2150,
      "delhi-chennai": 2180,
      "delhi-mumbai": 1430,
      "delhi-jaipur": 280,
      "delhi-kolkata": 1470,
      "delhi-goa": 1870,
      "delhi-kochi": 2420,
      "delhi-mysore": 2320,
      "delhi-rishikesh": 230,
      "bangalore-tirupati": 250,
      "bangalore-hyderabad": 570,
      "bangalore-chennai": 350,
      "bangalore-mumbai": 980,
      "bangalore-delhi": 2150,
      "bangalore-mysore": 150,
      "bangalore-jaipur": 1930,
      "bangalore-kolkata": 1880,
      "bangalore-goa": 560,
      "bangalore-kochi": 460,
      "bangalore-rishikesh": 2380,
      "hyderabad-tirupati": 570,
      "hyderabad-chennai": 630,
      "hyderabad-mumbai": 710,
      "hyderabad-delhi": 1570,
      "hyderabad-bangalore": 570,
      "hyderabad-jaipur": 1350,
      "hyderabad-kolkata": 1270,
      "hyderabad-goa": 630,
      "hyderabad-kochi": 850,
      "hyderabad-mysore": 570,
      "hyderabad-rishikesh": 1800,
      "chennai-tirupati": 150,
      "chennai-bangalore": 350,
      "chennai-hyderabad": 630,
      "chennai-mumbai": 1340,
      "chennai-delhi": 2180,
      "chennai-kochi": 680,
      "chennai-jaipur": 1960,
      "chennai-kolkata": 1670,
      "chennai-goa": 930,
      "chennai-mysore": 480,
      "chennai-rishikesh": 2410,
      "kolkata-delhi": 1470,
      "kolkata-mumbai": 2130,
      "kolkata-bangalore": 1880,
      "kolkata-chennai": 1670,
      "kolkata-hyderabad": 1270,
      "kolkata-tirupati": 1420,
      "kolkata-jaipur": 1290,
      "kolkata-goa": 1980,
      "kolkata-kochi": 2150,
      "kolkata-mysore": 2010,
      "kolkata-rishikesh": 1700,
      "jaipur-delhi": 280,
      "jaipur-mumbai": 1150,
      "jaipur-bangalore": 1930,
      "jaipur-chennai": 1960,
      "jaipur-hyderabad": 1350,
      "jaipur-tirupati": 1630,
      "jaipur-kolkata": 1290,
      "jaipur-goa": 1650,
      "jaipur-kochi": 2200,
      "jaipur-mysore": 2100,
      "jaipur-rishikesh": 510,
      "goa-mumbai": 460,
      "goa-bangalore": 560,
      "goa-chennai": 930,
      "goa-delhi": 1870,
      "goa-hyderabad": 630,
      "goa-tirupati": 780,
      "goa-jaipur": 1650,
      "goa-kolkata": 1980,
      "goa-kochi": 590,
      "goa-mysore": 620,
      "goa-rishikesh": 2100,
      "kochi-chennai": 680,
      "kochi-bangalore": 460,
      "kochi-mumbai": 1160,
      "kochi-delhi": 2420,
      "kochi-hyderabad": 850,
      "kochi-tirupati": 680,
      "kochi-jaipur": 2200,
      "kochi-kolkata": 2150,
      "kochi-goa": 590,
      "kochi-mysore": 430,
      "kochi-rishikesh": 2650,
      "mysore-bangalore": 150,
      "mysore-chennai": 480,
      "mysore-mumbai": 1050,
      "mysore-delhi": 2320,
      "mysore-hyderabad": 570,
      "mysore-tirupati": 420,
      "mysore-jaipur": 2100,
      "mysore-kolkata": 2010,
      "mysore-goa": 620,
      "mysore-kochi": 430,
      "mysore-rishikesh": 2550,
      "rishikesh-delhi": 230,
      "rishikesh-mumbai": 1670,
      "rishikesh-bangalore": 2380,
      "rishikesh-chennai": 2410,
      "rishikesh-hyderabad": 1800,
      "rishikesh-tirupati": 2080,
      "rishikesh-jaipur": 510,
      "rishikesh-kolkata": 1700,
      "rishikesh-goa": 2100,
      "rishikesh-kochi": 2650,
      "rishikesh-mysore": 2550,
    };

    const key1 = `${start.toLowerCase()}-${dest.toLowerCase()}`;
    const key2 = `${dest.toLowerCase()}-${start.toLowerCase()}`;

    // Return distance if found in matrix, otherwise return null (no default fallback)
    return distanceMatrix[key1] || distanceMatrix[key2] || null;
  };

  return null;
}
