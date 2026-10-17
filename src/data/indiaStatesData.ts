export interface StateGeoInfo {
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  lat: number;
  lng: number;
  zoom: number;
  districtsCount: number;
  famousFor: string[];
  samplePlaces: {
    name: string;
    category: 'heritage' | 'spiritual' | 'nature' | 'coastal' | 'hidden-gem';
    district: string;
    lat: number;
    lng: number;
    description: string;
    bestSeason: string;
    estCostInr: number;
  }[];
}

export const INDIA_STATES_DATA: StateGeoInfo[] = [
  {
    name: 'Andhra Pradesh',
    type: 'State',
    capital: 'Amaravati',
    lat: 15.9129,
    lng: 79.7400,
    zoom: 7,
    districtsCount: 26,
    famousFor: ['Tirupati Venkateswara Temple', 'Araku Valley', 'Gandikota Grand Canyon', 'Borra Caves', 'Papikondalu'],
    samplePlaces: [
      { name: 'Gandikota (Grand Canyon of India)', category: 'nature', district: 'YSR Kadapa', lat: 14.8142, lng: 78.2863, description: 'Spectacular red granite gorge carved by the Pennar River with a 13th-century fort perched above.', bestSeason: 'Oct - Mar', estCostInr: 8500 },
      { name: 'Tirumala Tirupati Devasthanam', category: 'spiritual', district: 'Tirupati', lat: 13.6833, lng: 79.3472, description: 'One of the most sacred and visited pilgrimage shrines in the world, atop the Seshachalam Hills.', bestSeason: 'All Year', estCostInr: 9500 },
      { name: 'Belum Caves', category: 'nature', district: 'Nandyal', lat: 15.1026, lng: 78.1118, description: 'Second longest subterranean limestone cave network in the Indian subcontinent.', bestSeason: 'Oct - Mar', estCostInr: 7200 },
      { name: 'Araku Valley & Borra Caves', category: 'nature', district: 'Alluri Sitharama Raju', lat: 18.3273, lng: 82.8775, description: 'Misty Eastern Ghats hill station, coffee plantations, and one-million-year-old caves.', bestSeason: 'Sep - Mar', estCostInr: 12500 }
    ]
  },
  {
    name: 'Telangana',
    type: 'State',
    capital: 'Hyderabad',
    lat: 17.8749,
    lng: 78.1808,
    zoom: 7,
    districtsCount: 33,
    famousFor: ['Golconda Fort', 'Charminar', 'Ramappa UNESCO Temple', 'Bogatha Waterfalls', 'Kuntala Falls'],
    samplePlaces: [
      { name: 'Golconda Fort & Sound Show', category: 'heritage', district: 'Hyderabad', lat: 17.3833, lng: 78.4011, description: 'Colossal medieval citadel famous for its acoustic engineering and diamond mines.', bestSeason: 'Oct - Mar', estCostInr: 8000 },
      { name: 'Ramappa Temple (UNESCO)', category: 'spiritual', district: 'Mulugu', lat: 18.2618, lng: 79.9431, description: '13th-century Kakatiya masterpiece built with floating bricks and intricate black basalt carvings.', bestSeason: 'Oct - Feb', estCostInr: 9000 },
      { name: 'Bogatha Waterfall (Niagara of Telangana)', category: 'nature', district: 'Bhadradri Kothagudem', lat: 18.2833, lng: 80.4833, description: 'Magnificent cascading waterfall surrounded by dense teak forests.', bestSeason: 'Jul - Nov', estCostInr: 7500 }
    ]
  },
  {
    name: 'Tamil Nadu',
    type: 'State',
    capital: 'Chennai',
    lat: 11.1271,
    lng: 78.6569,
    zoom: 7,
    districtsCount: 38,
    famousFor: ['Meenakshi Amman Temple', 'Brihadeeswara Temple (Thanjavur)', 'Mahabalipuram Shore Temple', 'Ooty Hills', 'Kanyakumari'],
    samplePlaces: [
      { name: 'Meenakshi Amman Temple', category: 'spiritual', district: 'Madurai', lat: 9.9195, lng: 78.1193, description: 'Historic Dravidian temple complex with 14 towering gopurams encrusted with thousands of colorful sculptures.', bestSeason: 'Oct - Mar', estCostInr: 11500 },
      { name: 'Mahabalipuram Shore Temples (UNESCO)', category: 'heritage', district: 'Chengalpattu', lat: 12.6172, lng: 80.1927, description: '7th-century monolithic rock-cut cave temples and Arjuna\'s Penance carved along the Bay of Bengal.', bestSeason: 'Nov - Feb', estCostInr: 9800 },
      { name: 'Brihadeeswarar Big Temple', category: 'heritage', district: 'Thanjavur', lat: 10.7828, lng: 79.1318, description: 'Chola architectural wonder carved from 130,000 tonnes of granite with a single-stone dome.', bestSeason: 'Oct - Mar', estCostInr: 10500 },
      { name: 'Kanyakumari & Vivekananda Rock', category: 'coastal', district: 'Kanyakumari', lat: 8.0883, lng: 77.5385, description: 'The confluence of the Indian Ocean, Arabian Sea, and Bay of Bengal at India\'s southernmost tip.', bestSeason: 'Oct - Mar', estCostInr: 12000 }
    ]
  },
  {
    name: 'Karnataka',
    type: 'State',
    capital: 'Bengaluru',
    lat: 15.3173,
    lng: 75.7139,
    zoom: 7,
    districtsCount: 31,
    famousFor: ['Hampi Ruins', 'Mysore Palace', 'Coorg Coffee Estates', 'Gokarna Beaches', 'Jog Falls'],
    samplePlaces: [
      { name: 'Hampi UNESCO World Heritage', category: 'heritage', district: 'Vijayanagara', lat: 15.3350, lng: 76.4600, description: 'Ruins of the medieval Vijayanagara capital with boulder-strewn landscapes and stone chariots.', bestSeason: 'Oct - Mar', estCostInr: 13500 },
      { name: 'Jog Falls (Gersoppa)', category: 'nature', district: 'Shimoga', lat: 14.2281, lng: 74.8125, description: 'Second highest plunge waterfall in India dropping 830 feet in four majestic cascades: Raja, Rani, Roarer, and Rocket.', bestSeason: 'Jul - Nov', estCostInr: 9500 },
      { name: 'Gokarna & Om Beach', category: 'coastal', district: 'Uttara Kannada', lat: 14.5479, lng: 74.3188, description: 'Tranquil coastal temple town with crescent beaches shaped like the auspicious Om symbol.', bestSeason: 'Oct - Mar', estCostInr: 11000 }
    ]
  },
  {
    name: 'Kerala',
    type: 'State',
    capital: 'Thiruvananthapuram',
    lat: 10.8505,
    lng: 76.2711,
    zoom: 7,
    districtsCount: 14,
    famousFor: ['Munnar Tea Hills', 'Alleppey Backwaters', 'Varkala Cliff Beach', 'Wayanad Chembra Peak', 'Athirappilly Falls'],
    samplePlaces: [
      { name: 'Athirappilly Waterfalls (Niagara of India)', category: 'nature', district: 'Thrissur', lat: 10.2851, lng: 76.5698, description: 'Majestic 80-foot wide waterfall cascading through Sholayar rainforest.', bestSeason: 'Jun - Jan', estCostInr: 9800 },
      { name: 'Varkala Papanasam Cliff Beach', category: 'coastal', district: 'Thiruvananthapuram', lat: 8.7379, lng: 76.7163, description: 'Dramatic red laterite sedimentary cliffs overlooking the Arabian Sea with natural mineral water springs.', bestSeason: 'Oct - Mar', estCostInr: 13500 },
      { name: 'Alleppey Backwaters', category: 'coastal', district: 'Alappuzha', lat: 9.4981, lng: 76.3388, description: 'Thatched-roof luxury houseboat journeys gliding through emerald lagoons and paddy fields.', bestSeason: 'Sep - Mar', estCostInr: 17200 }
    ]
  },
  {
    name: 'Maharashtra',
    type: 'State',
    capital: 'Mumbai',
    lat: 19.7515,
    lng: 75.7139,
    zoom: 7,
    districtsCount: 36,
    famousFor: ['Ajanta & Ellora Caves', 'Mahabaleshwar', 'Lonavala & Khandala', 'Tadoba Tiger Reserve', 'Gateway of India'],
    samplePlaces: [
      { name: 'Ajanta & Ellora Rock Caves (UNESCO)', category: 'heritage', district: 'Chhatrapati Sambhajinagar', lat: 20.5519, lng: 75.7033, description: 'Ancient rock-cut caves featuring the world\'s largest monolithic rock excavation (Kailash Temple).', bestSeason: 'Oct - Mar', estCostInr: 14000 },
      { name: 'Kaas Plateau of Flowers (UNESCO Valley)', category: 'nature', district: 'Satara', lat: 17.7208, lng: 73.8219, description: 'Biodiversity hotspot carpeted with millions of vibrant wild blooms every post-monsoon.', bestSeason: 'Aug - Oct', estCostInr: 9000 },
      { name: 'Mahabaleshwar & Arthur\'s Seat', category: 'nature', district: 'Satara', lat: 17.9237, lng: 73.6586, description: 'Western Ghats hill station famous for strawberry farms and dramatic canyon drop-offs.', bestSeason: 'Oct - Jun', estCostInr: 13500 }
    ]
  },
  {
    name: 'Rajasthan',
    type: 'State',
    capital: 'Jaipur',
    lat: 27.0238,
    lng: 74.2179,
    zoom: 6,
    districtsCount: 50,
    famousFor: ['Jaipur Hawa Mahal & Amer', 'Udaipur Lake Palace', 'Jaisalmer Sam Sand Dunes', 'Jodhpur Mehrangarh', 'Ranthambore Tigers'],
    samplePlaces: [
      { name: 'Mehrangarh Fort', category: 'heritage', district: 'Jodhpur', lat: 26.2980, lng: 73.0189, description: 'Imposing 15th-century cliffside fort towering 400 feet above the Blue City.', bestSeason: 'Oct - Mar', estCostInr: 12500 },
      { name: 'Jaisalmer Fort & Sam Desert Dunes', category: 'heritage', district: 'Jaisalmer', lat: 26.9124, lng: 70.9126, description: 'Golden living sandstone fort and camel safaris across rolling Thar Desert dunes.', bestSeason: 'Oct - Mar', estCostInr: 15500 },
      { name: 'Ranthambore National Park', category: 'nature', district: 'Sawai Madhopur', lat: 26.0173, lng: 76.5026, description: 'Legendary Royal Bengal Tiger sanctuary with 10th-century fort ruins within the jungle.', bestSeason: 'Oct - Apr', estCostInr: 18000 }
    ]
  },
  {
    name: 'Uttar Pradesh',
    type: 'State',
    capital: 'Lucknow',
    lat: 26.8467,
    lng: 80.9462,
    zoom: 6,
    districtsCount: 75,
    famousFor: ['Taj Mahal Agra', 'Varanasi Ghats', 'Ayodhya Ram Mandir', 'Mathura & Vrindavan', 'Fatehpur Sikri'],
    samplePlaces: [
      { name: 'Taj Mahal (UNESCO World Wonder)', category: 'heritage', district: 'Agra', lat: 27.1751, lng: 78.0421, description: 'Iconic white marble mausoleum of eternal love along the Yamuna River.', bestSeason: 'Oct - Mar', estCostInr: 13000 },
      { name: 'Varanasi Ghats & Ganga Aarti', category: 'spiritual', district: 'Varanasi', lat: 25.3176, lng: 82.9739, description: 'Centuries-old sacred riverfront steps, sunrise boat rides, and Kashi Vishwanath.', bestSeason: 'Oct - Mar', estCostInr: 12800 },
      { name: 'Fatehpur Sikri Mughal Capital', category: 'heritage', district: 'Agra', lat: 27.0945, lng: 77.6677, description: 'Emperor Akbar\'s preserved red sandstone royal city and Buland Darwaza gateway.', bestSeason: 'Oct - Mar', estCostInr: 9500 }
    ]
  },
  {
    name: 'Himachal Pradesh',
    type: 'State',
    capital: 'Shimla',
    lat: 31.1048,
    lng: 77.1734,
    zoom: 7,
    districtsCount: 12,
    famousFor: ['Manali & Rohtang', 'Shimla Toy Train', 'Dharamshala & McLeodganj', 'Spiti Valley', 'Kasol & Parvati Valley'],
    samplePlaces: [
      { name: 'Spiti Valley & Key Monastery', category: 'nature', district: 'Lahaul and Spiti', lat: 32.2970, lng: 78.0125, description: 'High-altitude cold mountain desert with 1,000-year-old cliffside Buddhist monasteries.', bestSeason: 'May - Oct', estCostInr: 24000 },
      { name: 'Dharamshala & McLeodganj (Little Lhasa)', category: 'spiritual', district: 'Kangra', lat: 32.2426, lng: 76.3213, description: 'Residence of His Holiness the Dalai Lama surrounded by cedar forests and Dhauladhar peaks.', bestSeason: 'Mar - Jun & Sep - Nov', estCostInr: 14500 },
      { name: 'Manali & Solang Valley', category: 'nature', district: 'Kullu', lat: 32.2432, lng: 77.1892, description: 'Snow slopes, Atal Tunnel, Beas river, and cedar valley adventures.', bestSeason: 'Oct - Jun', estCostInr: 18500 }
    ]
  },
  {
    name: 'Uttarakhand',
    type: 'State',
    capital: 'Dehradun',
    lat: 30.0668,
    lng: 79.0193,
    zoom: 7,
    districtsCount: 13,
    famousFor: ['Rishikesh & Haridwar', 'Char Dham (Kedarnath, Badrinath)', 'Valley of Flowers', 'Auli Ski Slopes', 'Nainital Lakes'],
    samplePlaces: [
      { name: 'Kedarnath Jyotirlinga Shrine', category: 'spiritual', district: 'Rudraprayag', lat: 30.7352, lng: 79.0669, description: 'One of the holiest Hindu shrines located at 11,755 feet near the Mandakini glacier.', bestSeason: 'May - Jun & Sep - Oct', estCostInr: 22000 },
      { name: 'Valley of Flowers National Park (UNESCO)', category: 'nature', district: 'Chamoli', lat: 30.7280, lng: 79.6053, description: 'High-altitude Himalayan valley carpeted with over 500 varieties of alpine wildflowers.', bestSeason: 'Jul - Sep', estCostInr: 19500 },
      { name: 'Auli Ski Resort & Ropeway', category: 'nature', district: 'Chamoli', lat: 30.5307, lng: 79.5670, description: 'Premier ski destination offering views of Nanda Devi peak and Asia\'s longest cable car.', bestSeason: 'Dec - Mar', estCostInr: 17500 }
    ]
  },
  {
    name: 'Meghalaya',
    type: 'State',
    capital: 'Shillong',
    lat: 25.4670,
    lng: 91.3662,
    zoom: 8,
    districtsCount: 12,
    famousFor: ['Cherrapunji & Mawsynram', 'Living Root Bridges', 'Dawki Umngot River', 'Krang Shuri Falls'],
    samplePlaces: [
      { name: 'Double Decker Living Root Bridge', category: 'nature', district: 'East Khasi Hills', lat: 25.2986, lng: 91.5822, description: 'Centuries-old bio-engineered ficus elastica root bridges in Nongriat jungle canyon.', bestSeason: 'Oct - Apr', estCostInr: 22500 },
      { name: 'Dawki Umngot Transparent River', category: 'nature', district: 'West Jaintia Hills', lat: 25.1950, lng: 92.0190, description: 'Crystal-clear turquoise river where boats seem to hover weightlessly on air.', bestSeason: 'Nov - Apr', estCostInr: 14500 }
    ]
  },
  {
    name: 'Goa',
    type: 'State',
    capital: 'Panaji',
    lat: 15.2993,
    lng: 74.1240,
    zoom: 9,
    districtsCount: 2,
    famousFor: ['Dudhsagar Falls', 'Fontainhas Latin Quarter', 'Palolem Beach', 'Fort Aguada', 'Anjuna Flea Market'],
    samplePlaces: [
      { name: 'Dudhsagar Waterfalls (Sea of Milk)', category: 'nature', district: 'South Goa', lat: 15.3144, lng: 74.3143, description: 'Four-tiered 1,017-foot waterfall where train tracks cross directly through the mist spray.', bestSeason: 'Jun - Dec', estCostInr: 7500 },
      { name: 'Palolem Beach Crescent Bay', category: 'coastal', district: 'South Goa', lat: 15.0100, lng: 74.0232, description: 'Calm crescent shoreline framed by coconut groves, colorful beach huts, and dolphin spotting.', bestSeason: 'Oct - May', estCostInr: 14000 }
    ]
  },
  {
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    capital: 'Port Blair',
    lat: 11.7401,
    lng: 92.6586,
    zoom: 7,
    districtsCount: 3,
    famousFor: ['Radhanagar Beach', 'Cellular Jail', 'Scuba Diving at Elephant Beach', 'Baratang Limestone Caves'],
    samplePlaces: [
      { name: 'Radhanagar Beach (Havelock)', category: 'coastal', district: 'South Andaman', lat: 11.9840, lng: 92.9510, description: 'Voted best beach in Asia with white coral sand and azure waters.', bestSeason: 'Oct - May', estCostInr: 32000 },
      { name: 'Cellular Jail National Memorial', category: 'heritage', district: 'South Andaman', lat: 11.6739, lng: 92.7483, description: 'Colonial prison of freedom fighters with nightly sound and light show.', bestSeason: 'All Year', estCostInr: 6000 }
    ]
  },
  {
    name: 'Puducherry',
    type: 'Union Territory',
    capital: 'Puducherry',
    lat: 11.9416,
    lng: 79.8083,
    zoom: 10,
    districtsCount: 4,
    famousFor: ['White Town French Quarter', 'Auroville Matrimandir', 'Promenade Beach', 'Paradise Beach'],
    samplePlaces: [
      { name: 'White Town Heritage Quarter', category: 'heritage', district: 'Puducherry', lat: 11.9333, lng: 79.8333, description: 'Mustard colonial villas, boutique French cafes, and bougainvillea streets.', bestSeason: 'Oct - Mar', estCostInr: 13500 },
      { name: 'Auroville Golden Matrimandir', category: 'spiritual', district: 'Villupuram/Puducherry', lat: 12.0070, lng: 79.8107, description: 'Universal township dedicated to human unity with a magnificent golden meditation sphere.', bestSeason: 'Oct - Mar', estCostInr: 5000 }
    ]
  },
  {
    name: 'Ladakh',
    type: 'Union Territory',
    capital: 'Leh',
    lat: 34.1526,
    lng: 77.5771,
    zoom: 7,
    districtsCount: 2,
    famousFor: ['Pangong Tso', 'Khardung La Pass', 'Nubra Valley Hunder Dunes', 'Thiksey Monastery'],
    samplePlaces: [
      { name: 'Pangong Tso High Altitude Lake', category: 'nature', district: 'Leh', lat: 33.7595, lng: 78.6674, description: 'Endorheic lake at 14,270 feet changing shades from blue to green and turquoise.', bestSeason: 'May - Sep', estCostInr: 34000 },
      { name: 'Nubra Valley & Diskit Monastery', category: 'nature', district: 'Leh', lat: 34.5428, lng: 77.5673, description: 'Cold desert sand dunes with double-humped Bactrian camels and giant Buddha statue.', bestSeason: 'May - Sep', estCostInr: 28000 }
    ]
  },
  {
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    capital: 'Srinagar (Summer) / Jammu (Winter)',
    lat: 33.7782,
    lng: 76.5762,
    zoom: 7,
    districtsCount: 20,
    famousFor: ['Dal Lake Shikaras', 'Gulmarg Gondola & Skiing', 'Pahalgam Betaab Valley', 'Vaishno Devi'],
    samplePlaces: [
      { name: 'Dal Lake & Houseboats', category: 'nature', district: 'Srinagar', lat: 34.0837, lng: 74.8380, description: 'Floating gardens, wooden carved shikaras, and houseboats overlooking Zabarwan mountains.', bestSeason: 'Apr - Oct', estCostInr: 22000 },
      { name: 'Gulmarg Gondola & Apharwat Peak', category: 'nature', district: 'Baramulla', lat: 34.0484, lng: 74.3805, description: 'One of the highest cable cars in the world reaching 13,780 feet with skiing bowls.', bestSeason: 'Dec - Mar (Snow) / Apr - Jun', estCostInr: 25000 }
    ]
  }
];
