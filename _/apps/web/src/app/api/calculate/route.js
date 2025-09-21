export async function POST(request) {
  try {
    const {
      startCity,
      destination,
      people,
      transport,
      stayType,
      days,
      distance: providedDistance,
    } = await request.json();

    // Validate required fields
    if (
      !startCity ||
      !destination ||
      !people ||
      !transport ||
      !stayType ||
      !days
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Sample distance data between Indian cities (in km) - fallback if no distance provided
    const distanceMatrix = {
      "mumbai-tirupati": 850,
      "mumbai-hyderabad": 710,
      "mumbai-bangalore": 980,
      "mumbai-chennai": 1340,
      "mumbai-delhi": 1430,
      "mumbai-goa": 460,
      "delhi-tirupati": 1450,
      "delhi-hyderabad": 1570,
      "delhi-bangalore": 2150,
      "delhi-chennai": 2180,
      "delhi-mumbai": 1430,
      "delhi-jaipur": 280,
      "bangalore-tirupati": 250,
      "bangalore-hyderabad": 570,
      "bangalore-chennai": 350,
      "bangalore-mumbai": 980,
      "bangalore-delhi": 2150,
      "bangalore-mysore": 150,
      "hyderabad-tirupati": 570,
      "hyderabad-chennai": 630,
      "hyderabad-mumbai": 710,
      "hyderabad-delhi": 1570,
      "hyderabad-bangalore": 570,
      "chennai-tirupati": 150,
      "chennai-bangalore": 350,
      "chennai-hyderabad": 630,
      "chennai-mumbai": 1340,
      "chennai-delhi": 2180,
      "chennai-kochi": 680,
      "tirupati-chennai": 150,
      "tirupati-bangalore": 250,
      "tirupati-hyderabad": 570,
      "tirupati-mumbai": 850,
      "tirupati-delhi": 1450,
      "goa-mumbai": 460,
      "goa-bangalore": 560,
      "goa-hyderabad": 750,
      "jaipur-delhi": 280,
      "jaipur-mumbai": 1160,
      "jaipur-bangalore": 1850,
    };

    // Use provided distance or calculate from matrix
    let distance = providedDistance;
    if (!distance) {
      const distanceKey = `${startCity.toLowerCase()}-${destination.toLowerCase()}`;
      const reverseDistanceKey = `${destination.toLowerCase()}-${startCity.toLowerCase()}`;
      distance =
        distanceMatrix[distanceKey] ||
        distanceMatrix[reverseDistanceKey] ||
        500; // Default 500km
    }

    // Calculate travel cost based on transport mode
    let travelCost = 0;

    switch (transport) {
      case "car":
        // Car: (distance / mileage) × petrolPrice
        const mileage = 15; // km per liter
        const petrolPrice = 105; // per liter
        const roundTripDistance = distance * 2;
        travelCost = Math.round((roundTripDistance / mileage) * petrolPrice);
        break;

      case "train":
        // Train: avg ticket price × people
        const trainPricePerKm = 0.6; // per km per person
        travelCost = Math.round(distance * trainPricePerKm * people * 2); // round trip
        break;

      case "flight":
        // Flight: avg fare × people
        const baseFare = distance < 500 ? 4000 : distance < 1000 ? 6000 : 8000;
        travelCost = Math.round(baseFare * people);
        break;

      case "bus":
        // Bus: avg ticket price × people (cheaper than train)
        const busPricePerKm = 0.4; // per km per person
        travelCost = Math.round(distance * busPricePerKm * people * 2); // round trip
        break;

      default:
        travelCost = 0;
    }

    // Calculate food cost
    const avgMealCostPerPersonPerDay = 450; // ₹450 per person per day (3 meals)
    const foodCost = Math.round(avgMealCostPerPersonPerDay * people * days);

    // Calculate stay cost based on stay type
    let stayPricePerNight = 0;

    switch (stayType) {
      case "budget":
        stayPricePerNight = 1200; // per room per night
        break;
      case "mid":
        stayPricePerNight = 2200; // per room per night
        break;
      case "luxury":
        stayPricePerNight = 4500; // per room per night
        break;
      default:
        stayPricePerNight = 1200;
    }

    // Assume 2 people per room, add extra rooms if needed
    const roomsNeeded = Math.ceil(people / 2);
    const stayCost = Math.round(stayPricePerNight * roomsNeeded * days);

    // Miscellaneous cost (fixed)
    const miscCost = 500;

    // Calculate total
    const totalCost = travelCost + foodCost + stayCost + miscCost;

    const result = {
      travel: travelCost,
      food: foodCost,
      stay: stayCost,
      misc: miscCost,
      total: totalCost,
      details: {
        distance: distance,
        roomsNeeded: roomsNeeded,
        calculations: {
          travel: `${transport} for ${distance}km`,
          food: `₹${avgMealCostPerPersonPerDay}/person/day × ${people} people × ${days} days`,
          stay: `₹${stayPricePerNight}/room/night × ${roomsNeeded} rooms × ${days} nights`,
          misc: "Fixed miscellaneous expenses",
        },
      },
    };

    return Response.json(result);
  } catch (error) {
    console.error("Cost calculation error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
