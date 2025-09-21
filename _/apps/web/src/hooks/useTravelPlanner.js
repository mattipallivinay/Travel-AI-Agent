import { useState, useEffect } from "react";
import { destinationData } from "@/data/destinations";

export function useTravelPlanner() {
  const [formData, setFormData] = useState({
    startCity: "",
    destination: "",
    people: 1,
    transport: "car",
    stayType: "budget",
    days: 3,
  });

  const [costResult, setCostResult] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (formData.destination) {
      const info = destinationData[formData.destination.toLowerCase()];
      setDestinationInfo(info || null);
    } else {
      setDestinationInfo(null);
    }
  }, [formData.destination]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "people" || name === "days" ? parseInt(value) || 1 : value,
    }));
  };

  const calculateCost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestData = { ...formData };
      if (distance) {
        requestData.distance = distance;
      }

      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setCostResult(result);
    } catch (err) {
      console.error("Cost calculation error:", err);
      setError("Failed to calculate trip cost. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchItinerary = async () => {
    if (!formData.destination.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/itinerary/${formData.destination.toLowerCase()}`,
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setItinerary(result);
    } catch (err) {
      console.error("Itinerary fetch error:", err);
      setError("Failed to fetch itinerary. City might not be available.");
      setItinerary(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDistanceCalculated = (calculatedDistance) => {
    setDistance(calculatedDistance);
  };

  return {
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
  };
}
