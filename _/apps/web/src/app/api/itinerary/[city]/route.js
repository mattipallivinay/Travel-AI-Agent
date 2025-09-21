export async function GET(request, { params }) {
  try {
    const { city } = params;
    
    if (!city) {
      return Response.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    // Sample itinerary data for different cities
    const itineraryData = {
      tirupati: {
        attractions: [
          "Sri Venkateswara Temple (Balaji Temple)",
          "Padmavathi Ammavari Temple",
          "Kapila Theertham Waterfalls",
          "Sri Kalahasti Temple",
          "Chandragiri Fort",
          "ISKCON Tirupati",
          "Talakona Waterfalls",
          "Regional Science Centre",
          "Deer Park",
          "TTD Gardens"
        ],
        foods: [
          "Andhra Meals - ₹150-200",
          "Veg Tiffin - ₹120-150",
          "Traditional South Indian Thali - ₹180-250",
          "Mysore Pak (Sweet) - ₹80-120",
          "Pulihora (Tamarind Rice) - ₹60-100",
          "Laddu from Temple - ₹25-50",
          "Pesarattu (Green Gram Dosa) - ₹40-80",
          "Boorelu (Sweet) - ₹60-100",
          "Gongura Pachadi - ₹40-70",
          "Pootharekulu (Sweet) - ₹100-150"
        ],
        hotels: [
          "Marasa Sarovar Premiere - ₹3,500-5,000/night",
          "Fortune Select Grand Ridge - ₹2,800-4,200/night",
          "Hotel Bhimas Deluxe - ₹1,200-2,000/night",
          "Kalyan Residency - ₹800-1,500/night",
          "Hotel Mayura - ₹600-1,200/night",
          "Srinivasa Residency - ₹1,000-1,800/night",
          "Hotel Sindhuri Park - ₹1,500-2,500/night",
          "Ramee Guestline Hotel - ₹2,000-3,000/night"
        ]
      },
      hyderabad: {
        attractions: [
          "Charminar",
          "Golconda Fort",
          "Ramoji Film City",
          "Hussain Sagar Lake",
          "Salar Jung Museum",
          "Chowmahalla Palace",
          "Birla Mandir",
          "Nehru Zoological Park",
          "Qutb Shahi Tombs",
          "Laad Bazaar",
          "KBR National Park",
          "Shilparamam Arts & Crafts Village"
        ],
        foods: [
          "Hyderabadi Biryani - ₹250-400",
          "Haleem - ₹120-200",
          "Irani Chai & Osmania Biscuits - ₹30-60",
          "Lukhmi - ₹40-80",
          "Qubani Ka Meetha - ₹80-150",
          "Keema Samosa - ₹25-50",
          "Sheer Kurma - ₹60-120",
          "Dum Pukht - ₹300-500",
          "Pathar Ka Gosht - ₹200-350",
          "Double Ka Meetha - ₹70-120"
        ],
        hotels: [
          "Taj Falaknuma Palace - ₹15,000-25,000/night",
          "ITC Kohenur - ₹8,000-12,000/night",
          "Park Hyatt Hyderabad - ₹7,000-11,000/night",
          "Novotel Hyderabad Airport - ₹4,500-7,000/night",
          "Hotel Minerva Grand - ₹2,000-3,500/night",
          "FabHotel Prime Banjara Hills - ₹1,500-2,800/night",
          "OYO Hotels (Various) - ₹800-1,500/night",
          "Treebo Hotels - ₹1,200-2,200/night"
        ]
      },
      mumbai: {
        attractions: [
          "Gateway of India",
          "Marine Drive",
          "Elephanta Caves",
          "Juhu Beach",
          "Crawford Market",
          "Haji Ali Dargah",
          "Siddhivinayak Temple",
          "Chhatrapati Shivaji Terminus",
          "Hanging Gardens",
          "Film City",
          "Colaba Causeway",
          "Bandra-Worli Sea Link"
        ],
        foods: [
          "Vada Pav - ₹15-30",
          "Pav Bhaji - ₹80-150",
          "Mumbai Street Chaat - ₹50-120",
          "Bombay Duck Curry - ₹200-350",
          "Solkadhi - ₹40-80",
          "Misal Pav - ₹60-120",
          "Bhel Puri - ₹30-60",
          "Seafood Thali - ₹300-500",
          "Keema Pav - ₹80-140",
          "Kulfi - ₹40-80"
        ],
        hotels: [
          "The Taj Mahal Palace - ₹12,000-20,000/night",
          "The Oberoi Mumbai - ₹10,000-16,000/night",
          "JW Marriott Mumbai Juhu - ₹8,000-14,000/night",
          "Hotel Marine Plaza - ₹4,000-7,000/night",
          "The Gordon House Hotel - ₹3,000-5,500/night",
          "Hotel Suba Palace - ₹2,000-3,500/night",
          "FabHotel Prime - ₹1,500-2,800/night",
          "Zostel Mumbai - ₹800-1,500/night"
        ]
      },
      bangalore: {
        attractions: [
          "Lalbagh Botanical Garden",
          "Bangalore Palace",
          "Cubbon Park",
          "ISKCON Temple",
          "Tipu Sultan's Summer Palace",
          "Nandi Hills",
          "UB City Mall",
          "Vidhana Soudha",
          "Bull Temple",
          "Bannerghatta National Park",
          "Wonder La Amusement Park",
          "Ulsoor Lake"
        ],
        foods: [
          "Masala Dosa - ₹50-100",
          "Benne Masala Dosa - ₹80-150",
          "Filter Coffee - ₹20-40",
          "Mysore Pak - ₹100-180",
          "Rava Idli - ₹40-80",
          "Bisibelebath - ₹60-120",
          "Karnataka Meals - ₹150-250",
          "Chiroti (Sweet) - ₹60-100",
          "Ragi Mudde - ₹80-150",
          "Dharwad Pedha - ₹80-140"
        ],
        hotels: [
          "The Leela Palace Bengaluru - ₹10,000-18,000/night",
          "ITC Gardenia - ₹7,000-12,000/night",
          "Shangri-La Bengaluru - ₹6,500-11,000/night",
          "Hotel Royal Orchid - ₹3,500-6,000/night",
          "Ramada Bengaluru - ₹2,500-4,500/night",
          "FabHotel Prime Brigade Road - ₹1,800-3,200/night",
          "Zostel Bangalore - ₹700-1,300/night",
          "OYO Hotels - ₹900-1,800/night"
        ]
      },
      chennai: {
        attractions: [
          "Marina Beach",
          "Kapaleeshwarar Temple",
          "Fort St. George",
          "San Thome Cathedral",
          "Government Museum",
          "Mahabalipuram (Day Trip)",
          "Elliot's Beach",
          "Parthasarathy Temple",
          "DakshinaChitra",
          "Theosophical Society",
          "Birla Planetarium",
          "Express Avenue Mall"
        ],
        foods: [
          "Chettinad Chicken - ₹180-300",
          "Filter Coffee - ₹15-30",
          "Idli Sambar - ₹40-80",
          "Fish Curry Meals - ₹150-250",
          "Kothu Parotta - ₹80-150",
          "Payasam - ₹50-100",
          "Murukku - ₹60-120",
          "Tamil Nadu Meals - ₹120-200",
          "Appam with Stew - ₹60-120",
          "Jigarthanda - ₹40-80"
        ],
        hotels: [
          "ITC Grand Chola - ₹8,000-15,000/night",
          "The Leela Palace Chennai - ₹7,500-13,000/night",
          "Hyatt Regency Chennai - ₹5,000-9,000/night",
          "Hotel Savera - ₹2,500-4,500/night",
          "Residency Towers - ₹2,000-3,800/night",
          "FabHotel Prime T Nagar - ₹1,500-2,800/night",
          "Zostel Chennai - ₹600-1,200/night",
          "OYO Hotels - ₹800-1,600/night"
        ]
      },
      delhi: {
        attractions: [
          "Red Fort",
          "India Gate",
          "Qutub Minar",
          "Lotus Temple",
          "Humayun's Tomb",
          "Chandni Chowk",
          "Akshardham Temple",
          "Connaught Place",
          "Jama Masjid",
          "Raj Ghat",
          "Parliament House",
          "Khan Market"
        ],
        foods: [
          "Butter Chicken - ₹200-350",
          "Chole Bhature - ₹80-150",
          "Paranthe Wali Gali Parathas - ₹60-120",
          "Delhi Street Chaat - ₹30-80",
          "Kulfi - ₹40-80",
          "Tandoori Items - ₹150-300",
          "Rajma Chawal - ₹100-180",
          "Aloo Tikki - ₹25-50",
          "Dahi Bhalla - ₹50-100",
          "Jalebi - ₹60-120"
        ],
        hotels: [
          "The Imperial New Delhi - ₹12,000-22,000/night",
          "The Leela Palace New Delhi - ₹10,000-18,000/night",
          "ITC Maurya - ₹8,000-15,000/night",
          "Hotel Metropolis - ₹3,000-5,500/night",
          "Hotel Perfect - ₹2,000-3,500/night",
          "FabHotel Prime Karol Bagh - ₹1,500-2,800/night",
          "Zostel Delhi - ₹700-1,400/night",
          "OYO Hotels - ₹900-1,800/night"
        ]
      },
      goa: {
        attractions: [
          "Baga Beach",
          "Calangute Beach",
          "Basilica of Bom Jesus",
          "Fort Aguada",
          "Dudhsagar Waterfalls",
          "Anjuna Beach",
          "Palolem Beach",
          "Se Cathedral",
          "Chapora Fort",
          "Spice Plantations",
          "Casino Royale",
          "Old Goa Churches"
        ],
        foods: [
          "Fish Curry Rice - ₹150-250",
          "Bebinca (Sweet) - ₹80-150",
          "Prawn Balchão - ₹200-350",
          "Vindaloo - ₹180-300",
          "Solkadhi - ₹40-80",
          "Xacuti - ₹200-350",
          "Sorpotel - ₹150-280",
          "Feni (Local Drink) - ₹100-200",
          "Goan Fish Thali - ₹250-400",
          "Cashew Feni - ₹120-250"
        ],
        hotels: [
          "Taj Exotica Resort & Spa - ₹12,000-20,000/night",
          "The Leela Goa - ₹8,000-15,000/night",
          "Park Hyatt Goa Resort - ₹6,000-12,000/night",
          "Grand Hyatt Goa - ₹5,000-9,000/night",
          "Casa De Goa Boutique Resort - ₹3,000-5,500/night",
          "FabHotel Prime Baga Beach - ₹2,000-3,500/night",
          "Zostel Goa - ₹800-1,500/night",
          "OYO Hotels - ₹1,000-2,000/night"
        ]
      },
      jaipur: {
        attractions: [
          "Hawa Mahal",
          "City Palace",
          "Amber Fort",
          "Jantar Mantar",
          "Nahargarh Fort",
          "Jaigarh Fort",
          "Albert Hall Museum",
          "Jal Mahal",
          "Birla Mandir",
          "Chokhi Dhani",
          "Johari Bazaar",
          "Rambagh Palace"
        ],
        foods: [
          "Dal Baati Churma - ₹120-200",
          "Laal Maas - ₹250-400",
          "Gatte Ki Sabzi - ₹80-150",
          "Rajasthani Thali - ₹200-350",
          "Pyaaz Kachori - ₹40-80",
          "Mawa Kachori - ₹50-100",
          "Ghevar (Sweet) - ₹80-150",
          "Ker Sangri - ₹70-130",
          "Bajre Ki Roti - ₹60-120",
          "Lassi - ₹40-80"
        ],
        hotels: [
          "Rambagh Palace - ₹15,000-25,000/night",
          "The Oberoi Rajvilas - ₹12,000-20,000/night",
          "ITC Rajputana - ₹6,000-11,000/night",
          "Fairmont Jaipur - ₹8,000-14,000/night",
          "Hotel Clarks Amer - ₹3,000-5,500/night",
          "FabHotel Prime C-Scheme - ₹1,800-3,200/night",
          "Zostel Jaipur - ₹700-1,400/night",
          "OYO Hotels - ₹900-1,800/night"
        ]
      },
      kolkata: {
        attractions: [
          "Victoria Memorial",
          "Howrah Bridge",
          "Dakshineswar Kali Temple",
          "Indian Museum",
          "Kalighat Temple",
          "Eden Gardens",
          "Fort William",
          "Park Street",
          "Marble Palace",
          "Belur Math",
          "Science City",
          "Botanical Garden"
        ],
        foods: [
          "Fish Curry Rice - ₹120-200",
          "Rosogolla - ₹40-80",
          "Kosha Mangsho - ₹180-300",
          "Kathi Roll - ₹50-100",
          "Mishti Doi - ₹30-60",
          "Prawn Malai Curry - ₹200-350",
          "Phuchka - ₹20-50",
          "Sandesh - ₹40-80",
          "Bengali Fish Thali - ₹150-250",
          "Jhal Muri - ₹20-40"
        ],
        hotels: [
          "The Oberoi Grand - ₹8,000-15,000/night",
          "ITC Sonar - ₹6,000-11,000/night",
          "Taj Bengal - ₹7,000-12,000/night",
          "Hyatt Regency Kolkata - ₹4,500-8,000/night",
          "Hotel Hindusthan International - ₹2,500-4,500/night",
          "FabHotel Prime Park Street - ₹1,500-2,800/night",
          "Zostel Kolkata - ₹600-1,200/night",
          "OYO Hotels - ₹800-1,600/night"
        ]
      },
      kochi: {
        attractions: [
          "Chinese Fishing Nets",
          "Fort Kochi Beach",
          "Mattancherry Palace",
          "Jewish Synagogue",
          "St. Francis Church",
          "Bolgatty Palace",
          "Marine Drive",
          "Hill Palace Museum",
          "Cherai Beach",
          "Backwaters",
          "Spice Markets",
          "Kerala Folklore Museum"
        ],
        foods: [
          "Appam with Stew - ₹80-150",
          "Karimeen Fish Curry - ₹200-350",
          "Puttu and Kadala - ₹60-120",
          "Kerala Fish Thali - ₹180-300",
          "Coconut Barfi - ₹50-100",
          "Beef Fry - ₹150-280",
          "Prawn Curry - ₹200-350",
          "Banana Chips - ₹40-80",
          "Payasam - ₹50-100",
          "Fish Molee - ₹180-320"
        ],
        hotels: [
          "Taj Malabar Resort & Spa - ₹8,000-15,000/night",
          "Grand Hyatt Kochi Bolgatty - ₹6,000-11,000/night",
          "Crowne Plaza Kochi - ₹4,500-8,000/night",
          "Casino Hotel - ₹3,000-5,500/night",
          "Brunton Boatyard - ₹5,000-9,000/night",
          "FabHotel Prime Marine Drive - ₹1,800-3,200/night",
          "Zostel Kochi - ₹700-1,300/night",
          "OYO Hotels - ₹900-1,700/night"
        ]
      },
      mysore: {
        attractions: [
          "Mysore Palace",
          "Brindavan Gardens",
          "Chamundi Hill",
          "St. Philomena's Church",
          "Mysore Zoo",
          "Jaganmohan Palace",
          "Karanji Lake",
          "Datta Peetham",
          "Railway Museum",
          "Lalitha Mahal",
          "Krishnarajasagar Dam",
          "Srirangapatna"
        ],
        foods: [
          "Mysore Pak - ₹80-150",
          "Mysore Masala Dosa - ₹60-120",
          "Mysore Rasam - ₹40-80",
          "Obbattu (Sweet) - ₹50-100",
          "Karnataka Meals - ₹120-200",
          "Ragi Mudde - ₹60-120",
          "Bisi Bele Bath - ₹50-100",
          "Mysore Bonda - ₹30-60",
          "Filter Coffee - ₹20-40",
          "Chiroti - ₹60-120"
        ],
        hotels: [
          "Lalitha Mahal Palace Hotel - ₹5,000-9,000/night",
          "Radisson Blu Plaza Hotel - ₹4,000-7,000/night",
          "Royal Orchid Metropole - ₹3,000-5,500/night",
          "Hotel Pai Vista - ₹2,000-3,500/night",
          "Ginger Mysore - ₹2,500-4,000/night",
          "FabHotel Prime KRS Road - ₹1,500-2,800/night",
          "Zostel Mysore - ₹600-1,200/night",
          "OYO Hotels - ₹800-1,500/night"
        ]
      },
      rishikesh: {
        attractions: [
          "Laxman Jhula",
          "Ram Jhula",
          "Triveni Ghat",
          "Parmarth Niketan",
          "Beatles Ashram",
          "Neelkanth Mahadev Temple",
          "Rajaji National Park",
          "Ganga Aarti",
          "Vashistha Cave",
          "Shivpuri",
          "Kunjapuri Temple",
          "River Rafting Points"
        ],
        foods: [
          "Simple Vegetarian Thali - ₹80-150",
          "Aloo Puri - ₹40-80",
          "Chole Bhature - ₹60-120",
          "Masala Chai - ₹15-30",
          "Fresh Fruit Juice - ₹40-80",
          "Rajma Rice - ₹60-120",
          "Dal Chawal - ₹50-100",
          "Paratha with Curd - ₹50-100",
          "Kheer - ₹40-80",
          "Lassi - ₹30-60"
        ],
        hotels: [
          "Ananda in the Himalayas - ₹15,000-25,000/night",
          "Ganga Kinare - ₹3,000-5,500/night",
          "Hotel Ganga Kinare - ₹2,500-4,500/night",
          "Divine Resort - ₹2,000-3,500/night",
          "Zostel Rishikesh - ₹600-1,200/night",
          "Hotel Ishan - ₹1,500-2,800/night",
          "Ganga View Hotel - ₹1,200-2,200/night",
          "OYO Hotels - ₹700-1,500/night"
        ]
      }
    };

    const cityData = itineraryData[city.toLowerCase()];
    
    if (!cityData) {
      return Response.json(
        { error: `Itinerary data not available for ${city}. Available cities: ${Object.keys(itineraryData).join(', ')}` },
        { status: 404 }
      );
    }

    return Response.json(cityData);

  } catch (error) {
    console.error('Itinerary fetch error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}