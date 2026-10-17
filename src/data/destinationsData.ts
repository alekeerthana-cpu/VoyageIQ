import { Destination } from '../types/travel';

export const DESTINATIONS_DATA: Destination[] = [
  // --- SOUTH INDIA: ANDHRA PRADESH & TELANGANA ---
  {
    id: 'araku-valley',
    name: 'Araku Valley & Borra Caves',
    country: 'India',
    stateOrRegion: 'Andhra Pradesh',
    regionZone: 'South India',
    coordinates: { lat: 18.3273, lng: 82.8775 },
    category: 'nature',
    climate: 'cool-misty',
    estimatedCostInr: 12500,
    estimatedCostUsd: 150,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'backpacker'],
    interests: ['nature', 'adventure', 'photography', 'wildlife', 'trekking'],
    imageUrl: '/src/assets/images/dest_bali_retreat_1792213545063.jpg',
    description: 'A tranquil hill station nestled in the Eastern Ghats, famed for organic coffee plantations, one-million-year-old limestone Borra caves, and scenic vistadome train rides passing through 84 tunnels.',
    highlights: ['Borra Caves Stalactites', 'Ananthagiri Coffee Estates', 'Katiki Waterfalls Trek', 'Chaparai River Stream'],
    bestSeason: 'Sep - Mar',
    popularityScore: 92,
    savesCount: 1420,
    viewsCount: 18450,
    distanceFromVijayawadaKm: 395,
    transitOptionsFromVijayawada: 'Vistadome Express train via Vizag (6.5 hrs) or scenic NH16 drive',
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Coffee Hill Terrains',
        morning: 'Board the scenic Vistadome train passing through tunnels and bridges',
        afternoon: 'Check-in to eco-resort; explore Padmapuram Gardens and Tribal Museum',
        evening: 'Fresh brew tasting session at Araku Valley organic coffee plantation',
        estCostInr: 3800
      },
      {
        day: 2,
        title: 'Borra Caves & Katiki Waterfalls',
        morning: 'Spelunking through the subterranean chambers of 150-million-year-old Borra Caves',
        afternoon: '4x4 jeep trail and moderate trek through dense forest to Katiki Waterfalls',
        evening: 'Sunset viewpoint at Galikonda Peak, highest altitude point in AP',
        estCostInr: 4500
      },
      {
        day: 3,
        title: 'Chaparai Streams & Local Flavors',
        morning: 'Morning walk along cascading rocky streams of Chaparai Cascade',
        afternoon: 'Savor traditional bamboo chicken and local tribal millet delicacies',
        evening: 'Return transit with memories and freshly ground coffee beans',
        estCostInr: 4200
      }
    ],
    expensesBreakdown: {
      accommodation: 4500,
      transport: 3500,
      food: 2500,
      activities: 2000
    },
    safetyRating: 4.8
  },
  {
    id: 'gandikota-canyon',
    name: 'Gandikota (Grand Canyon of India)',
    country: 'India',
    stateOrRegion: 'Andhra Pradesh',
    regionZone: 'South India',
    coordinates: { lat: 14.8142, lng: 78.2863 },
    category: 'adventure',
    climate: 'temperate',
    estimatedCostInr: 8500,
    estimatedCostUsd: 105,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'backpacker', 'adventure'],
    interests: ['adventure', 'nature', 'photography', 'heritage'],
    imageUrl: '/src/assets/images/hero_travel_scenic_1792213543590.jpg',
    description: 'A spectacular gorge of red granite boulders carved by River Pennar through Erramala hills, flanked by a 13th-century fort, Madhavaraya temple, and cliffside camping.',
    highlights: ['Pennar River Gorge Viewpoint', '13th-century Gandikota Fort', 'Raghunathaswamy & Madhavaraya Temples', 'Gorge Cliffside Sunrise Camping'],
    bestSeason: 'Oct - Mar',
    popularityScore: 90,
    savesCount: 1650,
    viewsCount: 19800,
    distanceFromVijayawadaKm: 380,
    transitOptionsFromVijayawada: 'Train to Jammalamadugu / Kadapa, then 30 mins taxi or drive via NH67',
    sampleItinerary: [
      {
        day: 1,
        title: 'Fort Exploration & Canyon Sunset',
        morning: 'Arrive at Gandikota; walk through the massive medieval fort gateway and granary',
        afternoon: 'Explore Madhavaraya temple carvings and Jama Masjid architecture',
        evening: 'Watch the crimson sunset from the edge of the 300-ft deep Pennar Gorge',
        estCostInr: 4200
      },
      {
        day: 2,
        title: 'Sunrise Kayaking & Belum Caves',
        morning: 'Cliff sunrise photography and kayaking on the calm Pennar river gorge',
        afternoon: 'Excursion to nearby Belum Caves (2nd longest cave system in India)',
        evening: 'Return transit towards Vijayawada / Hyderabad',
        estCostInr: 4300
      }
    ],
    expensesBreakdown: {
      accommodation: 3000,
      transport: 2800,
      food: 1500,
      activities: 1200
    },
    safetyRating: 4.7
  },
  {
    id: 'tirupati-balaji',
    name: 'Tirumala Tirupati Devasthanam',
    country: 'India',
    stateOrRegion: 'Andhra Pradesh',
    regionZone: 'South India',
    coordinates: { lat: 13.6833, lng: 79.3472 },
    category: 'cultural',
    climate: 'tropical',
    estimatedCostInr: 9500,
    estimatedCostUsd: 115,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'cultural'],
    interests: ['spirituality', 'heritage', 'cultural'],
    imageUrl: '/src/assets/images/dest_hampi_ruins_1792214364079.jpg',
    description: 'The sacred abode of Lord Venkateswara atop the seven peaks of Seshachalam Hills, world-renowned for its golden Ananda Nilayam vimana, spiritual energy, and GI-tagged Tirupati Laddus.',
    highlights: ['Sri Venkateswara Temple Ananda Nilayam', 'Silathoranam Natural Rock Arch', 'Kapila Theertham Holy Waterfall', 'Alipiri Footpath Pilgrimage Walk'],
    bestSeason: 'Sep - Mar',
    popularityScore: 97,
    savesCount: 4200,
    viewsCount: 52000,
    distanceFromVijayawadaKm: 380,
    transitOptionsFromVijayawada: 'Direct trains (Pinakini Express, 6 hrs) or NH16 highway',
    sampleItinerary: [
      {
        day: 1,
        title: 'Ascent to Tirumala Hills',
        morning: 'Arrive at Tirupati; proceed up the ghat road passing deer park to Tirumala',
        afternoon: 'Check-in to TTD cottages; visit Swami Pushkarini sacred lake and Varahaswamy temple',
        evening: 'Special entry darshan of Lord Venkateswara; collect Tirupati Laddu prasadam',
        estCostInr: 4800
      },
      {
        day: 2,
        title: 'Geological Arch & Valley Temples',
        morning: 'Visit Silathoranam rare natural geological stone arch and Chakra Theertham',
        afternoon: 'Descend to Tirupati foothills; visit Padmavathi Ammavari Temple at Tiruchanur',
        evening: 'Kapila Theertham waterfall temple and departure transit',
        estCostInr: 4700
      }
    ],
    expensesBreakdown: {
      accommodation: 3500,
      transport: 2800,
      food: 1800,
      activities: 1400
    },
    safetyRating: 5.0
  },
  {
    id: 'lambasingi',
    name: 'Lambasingi (Kashmir of AP)',
    country: 'India',
    stateOrRegion: 'Andhra Pradesh',
    regionZone: 'South India',
    coordinates: { lat: 17.8184, lng: 82.5152 },
    category: 'nature',
    climate: 'cool-misty',
    estimatedCostInr: 9500,
    estimatedCostUsd: 115,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'backpacker'],
    interests: ['nature', 'photography', 'relaxation'],
    imageUrl: '/src/assets/images/hero_travel_scenic_1792213543590.jpg',
    description: 'Renowned as the "Kashmir of Andhra Pradesh," this isolated Eastern Ghats hamlet experiences sub-zero winter temperatures, ethereal dense fog, and lush apple and pepper orchards.',
    highlights: ['Sub-zero Morning Frost', 'Thajangi Water Reservoir', 'Kothapalli Waterfalls', 'Misty Pine Groves'],
    bestSeason: 'Nov - Feb',
    popularityScore: 86,
    savesCount: 1180,
    viewsCount: 14300,
    distanceFromVijayawadaKm: 335,
    transitOptionsFromVijayawada: '5.5 hours via NH16 and Narsipatnam Ghat Road',
    sampleItinerary: [
      {
        day: 1,
        title: 'Misty Valleys & Reservoir',
        morning: 'Drive up the winding Narsipatnam ghats through morning fog blankets',
        afternoon: 'Camping setup by Thajangi reservoir and afternoon walk in pepper orchards',
        evening: 'Stargazing around campfire with hot herbal tea under crisp alpine skies',
        estCostInr: 4600
      },
      {
        day: 2,
        title: 'Kothapalli Falls & Pine Treks',
        morning: 'Sunrise fog photography across the undulating misty valleys',
        afternoon: 'Short hike down to the multi-tiered Kothapalli Waterfalls',
        evening: 'Local roadside farm fresh strawberry picking and return journey',
        estCostInr: 4900
      }
    ],
    expensesBreakdown: {
      accommodation: 3200,
      transport: 3000,
      food: 1800,
      activities: 1500
    },
    safetyRating: 4.7
  },
  {
    id: 'papikondalu',
    name: 'Papikondalu & Godavari River',
    country: 'India',
    stateOrRegion: 'Andhra Pradesh',
    regionZone: 'South India',
    coordinates: { lat: 17.4872, lng: 81.5298 },
    category: 'adventure',
    climate: 'tropical',
    estimatedCostInr: 11000,
    estimatedCostUsd: 130,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'family', 'moderate'],
    interests: ['adventure', 'nature', 'photography', 'cultural'],
    imageUrl: '/src/assets/images/hero_travel_scenic_1792213543590.jpg',
    description: 'A breathtaking gorge cruise cutting through the emerald Papi hills along the sacred Godavari River, featuring bamboo cottage island stays.',
    highlights: ['River Cruise Gorge Passage', 'Perantapalli Tribal Village', 'Kolluru Bamboo Huts', 'Sunset over Godavari'],
    bestSeason: 'Oct - Mar',
    popularityScore: 88,
    savesCount: 980,
    viewsCount: 12500,
    distanceFromVijayawadaKm: 160,
    transitOptionsFromVijayawada: '3 hours drive to Rajahmundry/Purushothapatnam boat launch point',
    sampleItinerary: [
      {
        day: 1,
        title: 'Gorge Navigation & Island Camping',
        morning: 'Board the double-decker cruise vessel from Purushothapatnam dock',
        afternoon: 'Sail between the narrowing gorge hills where emerald forests drop into river',
        evening: 'Camp in eco-friendly bamboo cottages along the peaceful sandy river banks',
        estCostInr: 5500
      },
      {
        day: 2,
        title: 'Perantapalli Shrine & Forest Trail',
        morning: 'Visit the secluded Ramakrishna Hermitage and tribal settlement at Perantapalli',
        afternoon: 'Cruising back while soaking in folk songs and scenic river breezes',
        evening: 'Return to Vijayawada by late evening',
        estCostInr: 5500
      }
    ],
    expensesBreakdown: {
      accommodation: 4000,
      transport: 2800,
      food: 2400,
      activities: 1800
    },
    safetyRating: 4.6
  },
  {
    id: 'pondicherry-french-quarter',
    name: 'Pondicherry (Puducherry) French Quarter & Auroville',
    country: 'India',
    stateOrRegion: 'Puducherry',
    regionZone: 'South India',
    coordinates: { lat: 11.9416, lng: 79.8083 },
    category: 'cultural',
    climate: 'tropical',
    estimatedCostInr: 13500,
    estimatedCostUsd: 160,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'relaxation', 'cultural', 'family'],
    interests: ['heritage', 'relaxation', 'cuisine', 'photography', 'coastal', 'spirituality'],
    imageUrl: '/src/assets/images/dest_pondicherry_french_town_1792214829219.jpg',
    description: 'The French Riviera of the East, famed for mustard-yellow colonial villas draped in vibrant bougainvillea, bohemian bakeries in White Town, scenic Promenade Beach rock seawalls, the universal township of Auroville with its golden Matrimandir, and Sri Aurobindo Ashram.',
    highlights: ['White Town (French Quarter) Heritage Walk', 'Auroville Golden Matrimandir & Peace Sphere', 'Promenade Beach Rock Seawall & Sunrise', 'French Bakeries & Croissant Tasting', 'Paradise Beach & Chunnambar Boat Ride'],
    bestSeason: 'Oct - Mar',
    popularityScore: 93,
    savesCount: 3420,
    viewsCount: 37600,
    distanceFromVijayawadaKm: 580,
    transitOptionsFromVijayawada: 'Direct train (Puducherry Express, 10 hrs) or scenic East Coast Road (ECR) drive from Chennai (2.5 hrs)',
    sampleItinerary: [
      {
        day: 1,
        title: 'White Town Heritage & Promenade Beach',
        morning: 'Cycle along the cobbled lanes and pastel villas of White Town; visit Sri Aurobindo Ashram',
        afternoon: 'Authentic French crepe and quiche lunch at a garden courtyard cafe',
        evening: 'Sunset stroll along the car-free Promenade Beach sea rocks and Gandhi statue',
        estCostInr: 4200
      },
      {
        day: 2,
        title: 'Auroville & Golden Matrimandir',
        morning: 'Experience the universal township of Auroville and view the futuristic golden Matrimandir',
        afternoon: 'Farm-to-table organic lunch at Solar Kitchen and explore artisan paper-making units',
        evening: 'Catch the ocean breeze and surf at Serenity Beach',
        estCostInr: 4800
      },
      {
        day: 3,
        title: 'Paradise Beach & French Bakeries',
        morning: 'Take the scenic Chunnambar backwater boat to the isolated white sands of Paradise Beach',
        afternoon: 'Savor fresh sourdough baguettes, croissants, and artisanal gelato',
        evening: 'Shop for handmade candles, incense, and linen garments before departure',
        estCostInr: 4500
      }
    ],
    expensesBreakdown: {
      accommodation: 5000,
      transport: 3500,
      food: 3000,
      activities: 2000
    },
    safetyRating: 4.9
  },
  {
    id: 'madurai-meenakshi',
    name: 'Madurai Meenakshi Temple & Cultural Capital',
    country: 'India',
    stateOrRegion: 'Tamil Nadu',
    regionZone: 'South India',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    category: 'cultural',
    climate: 'tropical',
    estimatedCostInr: 11500,
    estimatedCostUsd: 140,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'cultural'],
    interests: ['spirituality', 'heritage', 'cultural', 'cuisine'],
    imageUrl: '/src/assets/images/dest_hampi_ruins_1792214364079.jpg',
    description: 'The Athens of the East, one of India\'s most ancient cities centered around the world-famous Meenakshi Sundareswarar Temple with 14 soaring gopurams, Hall of Thousand Pillars, and jigarthanda street drink.',
    highlights: ['Meenakshi Amman 14 Gopurams Complex', 'Thousand Pillar Hall (Aayiram Kaal Mandapam)', 'Thirumalai Nayakkar Mahal Palace', 'Famous Madurai Murukku & Jigarthanda Drink'],
    bestSeason: 'Oct - Mar',
    popularityScore: 94,
    savesCount: 3200,
    viewsCount: 36000,
    distanceFromVijayawadaKm: 850,
    transitOptionsFromVijayawada: 'Direct trains (Navjeevan / Andaman Express) or via Chennai',
    sampleItinerary: [
      {
        day: 1,
        title: 'Meenakshi Temple & Sacred Chants',
        morning: 'Explore the monumental sculpture work and thousand-pillar hall inside Meenakshi Temple',
        afternoon: 'Admire Indo-Saracenic arches of 1636 Thirumalai Nayakkar Palace',
        evening: 'Watch the night palanquin procession ceremony inside the temple; drink cooling Jigarthanda',
        estCostInr: 5800
      },
      {
        day: 2,
        title: 'Gandhi Memorial & Cotton Weavers',
        morning: 'Visit historic Gandhi Memorial Museum housed in Rani Mangammal palace',
        afternoon: 'Shop for authentic Madurai Sungudi cotton sarees directly from handloom artisans',
        evening: 'Board evening return express train',
        estCostInr: 5700
      }
    ],
    expensesBreakdown: {
      accommodation: 4200,
      transport: 3600,
      food: 2100,
      activities: 1600
    },
    safetyRating: 4.9
  },
  {
    id: 'hampi-ruins',
    name: 'Hampi UNESCO World Heritage',
    country: 'India',
    stateOrRegion: 'Karnataka',
    regionZone: 'South India',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 13500,
    estimatedCostUsd: 160,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'backpacker', 'cultural'],
    interests: ['heritage', 'photography', 'cultural', 'adventure'],
    imageUrl: '/src/assets/images/dest_hampi_ruins_1792214364079.jpg',
    description: 'The surreal boulder-strewn capital of the 14th-century Vijayanagara Empire, featuring monolithic stone chariots, musical pillared halls, coracle boat rides, and sunsets over the Tungabhadra River.',
    highlights: ['Vittala Temple Stone Chariot', 'Virupaksha Ancient Temple', 'Coracle Ride on Tungabhadra', 'Matanga Hill Sunrise Panorama'],
    bestSeason: 'Oct - Mar',
    popularityScore: 94,
    savesCount: 3820,
    viewsCount: 41200,
    distanceFromVijayawadaKm: 480,
    transitOptionsFromVijayawada: 'Direct train to Hosapete Junction (8.5 hrs) or drive via Guntakal',
    sampleItinerary: [
      {
        day: 1,
        title: 'Virupaksha & Sacred Center',
        morning: 'Climb Matanga Hill for a 360-degree sunrise over golden granite boulders',
        afternoon: 'Explore 7th-century Virupaksha Temple and Hampi Bazaar ruins',
        evening: 'Coracle boat ride on the Tungabhadra River during golden sunset',
        estCostInr: 4200
      },
      {
        day: 2,
        title: 'Vittala Chariot & Royal Enclosure',
        morning: 'Marvel at the iconic Stone Chariot and musical pillars of Vittala Temple',
        afternoon: 'Wander Lotus Mahal, Elephant Stables, and Queen\'s Bath pavilions',
        evening: 'Sunset acoustic music session at Hemakuta Hill temple cluster',
        estCostInr: 4800
      },
      {
        day: 3,
        title: 'Hippie Island & Sanapur Lake',
        morning: 'Cross over to Anegundi and cycle through lush green paddy fields',
        afternoon: 'Cliff jumping and relaxation around pristine boulder-rimmed Sanapur Lake',
        evening: 'Board evening return express train from Hosapete',
        estCostInr: 4500
      }
    ],
    expensesBreakdown: {
      accommodation: 4800,
      transport: 3800,
      food: 2700,
      activities: 2200
    },
    safetyRating: 4.9
  },
  {
    id: 'coorg-highlands',
    name: 'Coorg (Kodagu) Coffee Mist',
    country: 'India',
    stateOrRegion: 'Karnataka',
    regionZone: 'South India',
    coordinates: { lat: 12.4244, lng: 75.7382 },
    category: 'nature',
    climate: 'cool-misty',
    estimatedCostInr: 15800,
    estimatedCostUsd: 190,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'family'],
    interests: ['nature', 'wildlife', 'cuisine', 'photography', 'relaxation'],
    imageUrl: '/src/assets/images/dest_bali_retreat_1792213545063.jpg',
    description: 'Dubbed the "Scotland of India," Coorg boasts misty Western Ghats slopes covered with aromatic arabica coffee, cardamom, rushing waterfalls, and Kodava warrior culinary traditions.',
    highlights: ['Abbey Falls Jungle Cascade', 'Namdroling Golden Temple (Bylakuppe)', 'Raja\'s Seat Sunset Garden', 'Coffee Plantation Homestay'],
    bestSeason: 'Sep - May',
    popularityScore: 91,
    savesCount: 2950,
    viewsCount: 32400,
    distanceFromVijayawadaKm: 760,
    transitOptionsFromVijayawada: 'Train/flight to Bangalore or Mysore, then scenic 3.5 hrs hill taxi',
    sampleItinerary: [
      {
        day: 1,
        title: 'Golden Temple & Madikeri Fort',
        morning: 'Visit the majestic Tibetan monastery at Bylakuppe with chanting monks',
        afternoon: 'Check-in to coffee plantation homestay; tour Madikeri Fort and palace',
        evening: 'Panoramic sunset views from Raja\'s Seat accompanied by musical fountains',
        estCostInr: 5200
      },
      {
        day: 2,
        title: 'Abbey Falls & Plantation Treks',
        morning: 'Trek down through dense coffee and spice estates to roar of Abbey Falls',
        afternoon: 'Coffee cupping workshop and authentic Pandi Curry spice lunch tasting',
        evening: 'Dubare Elephant Camp interaction on the banks of Cauvery River',
        estCostInr: 5600
      },
      {
        day: 3,
        title: 'Talacauvery River Origin',
        morning: 'Visit sacred Talacauvery at Brahmagiri hill, the origin of river Cauvery',
        afternoon: 'Shop for homegrown artisanal dark chocolates, spices, and freshly roasted beans',
        evening: 'Return descent towards Mysore / Bangalore',
        estCostInr: 5000
      }
    ],
    expensesBreakdown: {
      accommodation: 6000,
      transport: 4200,
      food: 3200,
      activities: 2400
    },
    safetyRating: 4.8
  },
  {
    id: 'munnar',
    name: 'Munnar Tea Highlands',
    country: 'India',
    stateOrRegion: 'Kerala',
    regionZone: 'South India',
    coordinates: { lat: 10.0889, lng: 77.0595 },
    category: 'nature',
    climate: 'cool-misty',
    estimatedCostInr: 16500,
    estimatedCostUsd: 200,
    idealDurationDays: 4,
    travelStyleFit: ['budget-friendly', 'moderate', 'luxury', 'family'],
    interests: ['nature', 'photography', 'relaxation', 'trekking'],
    imageUrl: '/src/assets/images/dest_bali_retreat_1792213545063.jpg',
    description: 'Rolling emerald tea plantations blanketed in clouds, endangered Nilgiri Tahr mountain goats, and colonial spice estates in God\'s Own Country.',
    highlights: ['Eravikulam National Park', 'Mattupetty Dam Boating', 'Top Station Cloud View', 'Tea Museum Tasting'],
    bestSeason: 'Sep - May',
    popularityScore: 95,
    savesCount: 2840,
    viewsCount: 31200,
    distanceFromVijayawadaKm: 850,
    transitOptionsFromVijayawada: 'Direct train to Ernakulam/Cochin, then 3.5 hrs hill taxi',
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival in Tea Paradise',
        morning: 'Scenic climb through Cheeyappara & Valara cascading waterfalls',
        afternoon: 'Check-in to tea estate bungalow; stroll through manicured tea bushes',
        evening: 'Kathakali cultural performance and traditional spice market walk',
        estCostInr: 4200
      },
      {
        day: 2,
        title: 'Eravikulam & Anamudi Views',
        morning: 'Spot the endangered Nilgiri Tahr at Rajamalai Peak',
        afternoon: 'Visit century-old Lockhart Tea Factory and learn leaf processing',
        evening: 'Sunset photography at Top Station overlooking Tamil Nadu plains',
        estCostInr: 4500
      },
      {
        day: 3,
        title: 'Lakes & Echo Point',
        morning: 'Speedboat cruise at Mattupetty Dam and visit Echo Point',
        afternoon: 'Elephant spotting walk around Kundala Lake and rose garden',
        evening: 'Relaxing Ayurvedic herbal massage therapy session',
        estCostInr: 4800
      },
      {
        day: 4,
        title: 'Spice Gardens & Departure',
        morning: 'Guided tour of cardamom, clove, and cinnamon spice plantations',
        afternoon: 'Pack authentic organic tea samples and descent back to Cochin',
        evening: 'Board connecting train/flight',
        estCostInr: 3000
      }
    ],
    expensesBreakdown: {
      accommodation: 6200,
      transport: 4500,
      food: 3200,
      activities: 2600
    },
    safetyRating: 4.9
  },
  {
    id: 'alleppey-backwaters',
    name: 'Alleppey (Alappuzha) Backwaters',
    country: 'India',
    stateOrRegion: 'Kerala',
    regionZone: 'South India',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    category: 'relaxation',
    climate: 'tropical',
    estimatedCostInr: 17200,
    estimatedCostUsd: 210,
    idealDurationDays: 3,
    travelStyleFit: ['moderate', 'luxury', 'family', 'relaxation'],
    interests: ['relaxation', 'photography', 'cuisine', 'nature'],
    imageUrl: '/src/assets/images/dest_amalfi_coast_1792213545453.jpg',
    description: 'Venice of the East known for traditional thatched-roof Kettuvallam houseboats gliding silently through palm-fringed lagoons, emerald paddy fields below sea level, and Karimeen fish roasts.',
    highlights: ['Overnight Luxury Houseboat Cruise', 'Vembanad Lake Sunset', 'Marari Quiet Beach', 'Backwater Village Canoe Safari'],
    bestSeason: 'Sep - Mar',
    popularityScore: 94,
    savesCount: 3450,
    viewsCount: 38700,
    distanceFromVijayawadaKm: 910,
    transitOptionsFromVijayawada: 'Train to Alappuzha (ALLP) or 1.5 hr drive from Kochi Airport',
    sampleItinerary: [
      {
        day: 1,
        title: 'Boarding the Houseboat',
        morning: 'Arrive at Punnamada Jetty; step onto traditional wooden houseboat with private chef',
        afternoon: 'Cruise through narrow palm-shaded canals while savoring banana-leaf Karimeen Pollichathu',
        evening: 'Anchor in Vembanad Lake for a silent crimson sunset over backwater waters',
        estCostInr: 6800
      },
      {
        day: 2,
        title: 'Canoe Villages & Coir Making',
        morning: 'Sunrise birdwatching on country rowboat through remote canal communities',
        afternoon: 'Witness traditional coir weaving and toddy tapping in Kuttanad farming hamlets',
        evening: 'Relax on Marari white sand beach with fresh coconut water',
        estCostInr: 5600
      },
      {
        day: 3,
        title: 'Alleppey Lighthouse & Departure',
        morning: 'Climb 1862 Alleppey Lighthouse for aerial panoramic coast views',
        afternoon: 'Spice bazaar walk in old Dutch trading quarter',
        evening: 'Departure transfer to Kochi',
        estCostInr: 4800
      }
    ],
    expensesBreakdown: {
      accommodation: 7500,
      transport: 4200,
      food: 3300,
      activities: 2200
    },
    safetyRating: 4.9
  },

  // --- NORTH INDIA: UTTAR PRADESH & RAJASTHAN ---
  {
    id: 'taj-mahal-agra',
    name: 'Taj Mahal & Agra Mughal Heritage',
    country: 'India',
    stateOrRegion: 'Uttar Pradesh',
    regionZone: 'North India',
    coordinates: { lat: 27.1751, lng: 78.0421 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 13000,
    estimatedCostUsd: 155,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'cultural'],
    interests: ['heritage', 'photography', 'cultural'],
    imageUrl: '/src/assets/images/dest_jaipur_hawa_mahal_1792214362658.jpg',
    description: 'One of the Seven Wonders of the World, an ethereal white marble mausoleum commissioned by Mughal Emperor Shah Jahan along the Yamuna River, alongside Agra Fort and Fatehpur Sikri.',
    highlights: ['Taj Mahal Sunrise Illumination', 'Agra Fort Diwan-i-Khas & Red Sandstone Bastions', 'Mehtab Bagh Moonlight Garden View', 'Fatehpur Sikri Buland Darwaza'],
    bestSeason: 'Oct - Mar',
    popularityScore: 99,
    savesCount: 6100,
    viewsCount: 68000,
    distanceFromVijayawadaKm: 1480,
    transitOptionsFromVijayawada: 'Direct trains (G.T. Express, Kerala Express) to Agra Cantt',
    sampleItinerary: [
      {
        day: 1,
        title: 'Taj Mahal Sunrise & Agra Fort',
        morning: 'Experience Taj Mahal at dawn as the morning sun casts soft pink hues across the white marble',
        afternoon: 'Explore massive ramparts and palaces of Agra Fort where Shah Jahan spent his final years',
        evening: 'Sunset view of the Taj reflecting in the Yamuna River from Mehtab Bagh gardens',
        estCostInr: 6800
      },
      {
        day: 2,
        title: 'Fatehpur Sikri Deserted Capital',
        morning: 'Excursion to Akbar\'s ghost capital Fatehpur Sikri and the 176-ft Buland Darwaza gateway',
        afternoon: 'Savor traditional Agra Petha sweets and marble inlay artisan workshops',
        evening: 'Board evening Shatabdi / Gatimaan express train',
        estCostInr: 6200
      }
    ],
    expensesBreakdown: {
      accommodation: 4800,
      transport: 3800,
      food: 2600,
      activities: 1800
    },
    safetyRating: 4.8
  },
  {
    id: 'varanasi-ghats',
    name: 'Varanasi (Kashi) Holy Ghats',
    country: 'India',
    stateOrRegion: 'Uttar Pradesh',
    regionZone: 'North India',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 12800,
    estimatedCostUsd: 155,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'backpacker', 'cultural'],
    interests: ['heritage', 'spirituality', 'photography', 'cultural', 'cuisine'],
    imageUrl: '/src/assets/images/dest_varanasi_ghats_1792214361333.jpg',
    description: 'One of the world\'s oldest continuously inhabited sacred cities, where 88 ancient stone ghats meet the holy Ganges River with mesmerizing evening Ganga Aarti fire ceremonies and silk weaving.',
    highlights: ['Dashashwamedh Evening Ganga Aarti', 'Sunrise Boat Ride on River Ganges', 'Kashi Vishwanath Corridor', 'Sarnath Buddhist Stupa'],
    bestSeason: 'Oct - Mar',
    popularityScore: 95,
    savesCount: 3980,
    viewsCount: 44200,
    distanceFromVijayawadaKm: 1250,
    transitOptionsFromVijayawada: 'Direct trains (Ganga Kaveri / Sanghamitra Express) or flight via Delhi/Hyderabad',
    sampleItinerary: [
      {
        day: 1,
        title: 'Sacred River & Evening Aarti',
        morning: 'Check-in to riverside heritage haveli; wander narrow ancient gali alleys',
        afternoon: 'Visit newly restored Kashi Vishwanath Golden Temple Corridor',
        evening: 'Watch the theatrical multicandelabra fire ritual of Dashashwamedh Ganga Aarti from boat',
        estCostInr: 4100
      },
      {
        day: 2,
        title: 'Subah-e-Banaras Sunrise Boat',
        morning: 'Dawn wooden boat ride from Assi Ghat to Manikarnika observing morning rituals',
        afternoon: 'Excursion to Sarnath where Lord Buddha preached his first sermon after enlightenment',
        evening: 'Savor Banarasi kachori-jalebi, creamy malaiyo dessert, and famous meetha paan',
        estCostInr: 4500
      },
      {
        day: 3,
        title: 'Silk Weavers & Ramnagar Fort',
        morning: 'Visit master handloom weavers crafting authentic Zari Banarasi silk sarees',
        afternoon: 'Explore 18th-century Ramnagar Fort and vintage royal palanquin museum',
        evening: 'Evening departure from Varanasi Cantt / Lal Bahadur Shastri Airport',
        estCostInr: 4200
      }
    ],
    expensesBreakdown: {
      accommodation: 4500,
      transport: 3800,
      food: 2500,
      activities: 2000
    },
    safetyRating: 4.7
  },
  {
    id: 'jaipur-pink-city',
    name: 'Jaipur Pink City & Amer Fort',
    country: 'India',
    stateOrRegion: 'Rajasthan',
    regionZone: 'North India',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 15500,
    estimatedCostUsd: 190,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'luxury', 'cultural', 'family'],
    interests: ['heritage', 'photography', 'cultural', 'cuisine'],
    imageUrl: '/src/assets/images/dest_jaipur_hawa_mahal_1792214362658.jpg',
    description: 'The Pink City of royalty showcasing the 953-windowed Hawa Mahal, colossal Amer Fort perched on amber hills, astronomical instruments at Jantar Mantar, and regal Rajasthani hospitality.',
    highlights: ['Hawa Mahal Palace of Winds', 'Amer Fort Sheesh Mahal (Mirror Palace)', 'Nahargarh Fort Sunset Panorama', 'Jantar Mantar UNESCO Observatory'],
    bestSeason: 'Oct - Mar',
    popularityScore: 96,
    savesCount: 4620,
    viewsCount: 49800,
    distanceFromVijayawadaKm: 1520,
    transitOptionsFromVijayawada: 'Direct flights via Hyderabad/Delhi or express trains',
    sampleItinerary: [
      {
        day: 1,
        title: 'Hawa Mahal & City Palace',
        morning: 'Morning photography in front of the honeycomb facade of Hawa Mahal',
        afternoon: 'Explore City Palace royal museum and Jantar Mantar sundials',
        evening: 'Street food crawl in Johari Bazaar tasting Pyaaz Kachori and Ghewar',
        estCostInr: 4900
      },
      {
        day: 2,
        title: 'Amer Fort & Sheesh Mahal',
        morning: 'Ascend Amer Fort; marvel at the thousand-mirror Sheesh Mahal and Maota Lake',
        afternoon: 'Visit Stepwell (Panna Meena Ka Kund) and Jaigarh Fort world\'s largest cannon',
        evening: 'Sunset panoramic view over the entire illuminated Pink City from Nahargarh Fort',
        estCostInr: 5600
      },
      {
        day: 3,
        title: 'Blue Pottery & Chokhi Dhani',
        morning: 'Traditional Jaipur blue pottery and block-printing workshop in Sanganer',
        afternoon: 'Shopping for gemstones, mojris, and bandhani textiles in Bapu Bazaar',
        evening: 'Cultural folk dance, puppet shows, and Dal Baati Churma royal feast at Chokhi Dhani',
        estCostInr: 5000
      }
    ],
    expensesBreakdown: {
      accommodation: 5500,
      transport: 4200,
      food: 3200,
      activities: 2600
    },
    safetyRating: 4.8
  },
  {
    id: 'udaipur-lakes',
    name: 'Udaipur City of Lakes',
    country: 'India',
    stateOrRegion: 'Rajasthan',
    regionZone: 'North India',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    category: 'relaxation',
    climate: 'temperate',
    estimatedCostInr: 18500,
    estimatedCostUsd: 220,
    idealDurationDays: 3,
    travelStyleFit: ['moderate', 'luxury', 'cultural', 'family'],
    interests: ['relaxation', 'heritage', 'photography', 'cultural'],
    imageUrl: '/src/assets/images/dest_jaipur_hawa_mahal_1792214362658.jpg',
    description: 'The White City and romantic crown of Rajasthan, nestled around turquoise Lake Pichola with majestic floating marble palaces, Jagmandir island, and Aravalli mountain backdrops.',
    highlights: ['Lake Pichola Sunset Boat Cruise', 'City Palace Lakeside Complex', 'Jagdish 1651 Temple', 'Sajjangarh Monsoon Palace'],
    bestSeason: 'Sep - Mar',
    popularityScore: 94,
    savesCount: 3890,
    viewsCount: 42100,
    distanceFromVijayawadaKm: 1450,
    transitOptionsFromVijayawada: 'Flight via Mumbai/Delhi to Maharana Pratap Airport Udaipur',
    sampleItinerary: [
      {
        day: 1,
        title: 'City Palace & Pichola Cruise',
        morning: 'Explore the monumental City Palace towers, balconies, and Peacock Courtyard',
        afternoon: 'Stroll the ghats around Gangaur Ghat and Jagdish Temple',
        evening: 'Sunset boat cruise on Lake Pichola gliding past Lake Palace and Jag Mandir',
        estCostInr: 5800
      },
      {
        day: 2,
        title: 'Monsoon Palace & Saheliyon-ki-Bari',
        morning: 'Visit Saheliyon-ki-Bari royal garden with marble elephant fountains',
        afternoon: 'Vintage classic car collection museum and miniature painting ateliers',
        evening: 'Ascend to hilltop Monsoon Palace (Sajjangarh) for sunset over the Aravallis',
        estCostInr: 6400
      },
      {
        day: 3,
        title: 'Bagore Ki Haveli & Departure',
        morning: 'Wander Bagore Ki Haveli museum on waterfront; folk puppet show',
        afternoon: 'Rooftop lunch overlooking Lake Fatehsagar and Nehru Island Park',
        evening: 'Departure transit',
        estCostInr: 6300
      }
    ],
    expensesBreakdown: {
      accommodation: 7200,
      transport: 4800,
      food: 3800,
      activities: 2700
    },
    safetyRating: 4.9
  },

  // --- NORTH INDIA: HIMALAYAS & UTTARAKHAND ---
  {
    id: 'ladakh',
    name: 'Leh-Ladakh High Passes',
    country: 'India',
    stateOrRegion: 'Ladakh',
    regionZone: 'North India',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    category: 'adventure',
    climate: 'alpine',
    estimatedCostInr: 34000,
    estimatedCostUsd: 410,
    idealDurationDays: 6,
    travelStyleFit: ['moderate', 'adventure', 'backpacker'],
    interests: ['adventure', 'photography', 'nature', 'spirituality', 'trekking'],
    imageUrl: '/src/assets/images/dest_swiss_alps_1792213545756.jpg',
    description: 'The Land of High Passes — barren lunar mountainscapes, high-altitude cobalt lakes, ancient cliffside Tibetan monasteries, and prayer flags fluttering in pure Himalayan breeze.',
    highlights: ['Pangong Tso Lake', 'Khardung La (17,582 ft)', 'Nubra Valley Sand Dunes', 'Thiksey Monastery'],
    bestSeason: 'May - Sep',
    popularityScore: 96,
    savesCount: 3950,
    viewsCount: 42800,
    distanceFromVijayawadaKm: 2450,
    transitOptionsFromVijayawada: 'Flight via Delhi to Leh Kushok Bakula Rimpochee Airport',
    sampleItinerary: [
      {
        day: 1,
        title: 'Acclimatization & Leh Shanti Stupa',
        morning: 'Arrive at Leh (11,500 ft); mandatory rest day for high altitude acclimatization',
        afternoon: 'Gentle walk around Leh Old Town and market bazaar',
        evening: 'Golden sunset over the valley from white-domed Shanti Stupa',
        estCostInr: 5200
      },
      {
        day: 2,
        title: 'Monastery Circuit',
        morning: 'Morning chanting ceremony with red-robed monks at Thiksey Monastery',
        afternoon: 'Explore Shey Palace and Indus-Zanskar river confluence at Sangam',
        evening: 'Magnetic Hill marvel and Hall of Fame memorial visit',
        estCostInr: 5400
      },
      {
        day: 3,
        title: 'Khardung La to Nubra Valley',
        morning: 'Ascend Khardung La Pass, among highest motorable roads in the world',
        afternoon: 'Descend into lush Nubra Valley and Diskit Monastery Maitreya Buddha',
        evening: 'Double-humped Bactrian camel safari among Hunder sand dunes',
        estCostInr: 6800
      },
      {
        day: 4,
        title: 'Pangong Tso Marvel',
        morning: 'Drive through remote Shayok route towards the changthang plateau',
        afternoon: 'First glimpse of the shifting sapphire and turquoise blues of Pangong Lake',
        evening: 'Camp in lakeside swiss tents under a billion stars of the Milky Way',
        estCostInr: 7200
      },
      {
        day: 5,
        title: 'Chang La & Return to Leh',
        morning: 'Mesmerizing sunrise photography over Pangong shoreline',
        afternoon: 'Traverse Chang La Pass (17,590 ft) spotting Himalayan marmots',
        evening: 'Souvenir shopping for pure Pashmina shawls and apricot kernels',
        estCostInr: 5500
      },
      {
        day: 6,
        title: 'Farewell Himalayas',
        morning: 'Transfer to Leh Airport with aerial views of Zanskar snow peaks',
        afternoon: 'Connecting transit home',
        evening: 'Arrival home',
        estCostInr: 3900
      }
    ],
    expensesBreakdown: {
      accommodation: 12000,
      transport: 11500,
      food: 5500,
      activities: 5000
    },
    safetyRating: 4.7
  },
  {
    id: 'manali-rohtang',
    name: 'Manali & Solang Valley',
    country: 'India',
    stateOrRegion: 'Himachal Pradesh',
    regionZone: 'North India',
    coordinates: { lat: 32.2432, lng: 77.1892 },
    category: 'adventure',
    climate: 'alpine',
    estimatedCostInr: 18500,
    estimatedCostUsd: 220,
    idealDurationDays: 4,
    travelStyleFit: ['budget-friendly', 'moderate', 'adventure'],
    interests: ['adventure', 'nature', 'photography', 'trekking'],
    imageUrl: '/src/assets/images/dest_swiss_alps_1792213545756.jpg',
    description: 'Snow-clad Pir Panjal ranges, deodar cedar pine forests along the Beas River, thrilling paragliding at Solang Valley, and high-altitude road journeys across the Atal Tunnel into Lahaul.',
    highlights: ['Atal Tunnel & Sissu Waterfall', 'Solang Valley Paragliding', 'Old Manali Bohemian Cafes', 'Hadimba Wooden Temple (1553 AD)'],
    bestSeason: 'Oct - Jun (Snow: Dec - Feb)',
    popularityScore: 95,
    savesCount: 3740,
    viewsCount: 40100,
    distanceFromVijayawadaKm: 2150,
    transitOptionsFromVijayawada: 'Train/flight to Delhi/Chandigarh, then overnight Volvo bus to Manali',
    sampleItinerary: [
      {
        day: 1,
        title: 'Old Manali & Hadimba Forest',
        morning: 'Check-in to mountain chalet facing snow peaks; Hadimba 16th-century pagoda temple',
        afternoon: 'Stroll through Old Manali apple orchards and bohemian cafes by the stream',
        evening: 'Vashisht hot sulphur springs bath and Tibetan market shopping',
        estCostInr: 4400
      },
      {
        day: 2,
        title: 'Solang Valley & Paragliding',
        morning: 'Tandem paragliding and zorbing amidst the snow bowl of Solang Valley',
        afternoon: 'Cable car ropeway climb to top view of the glaciers',
        evening: 'Warm trout fish dinner and bonfire session',
        estCostInr: 5200
      },
      {
        day: 3,
        title: 'Atal Tunnel to Sissu (Lahaul)',
        morning: 'Pass through the 9.02 km Atal Tunnel emerging into the stark beauty of Lahaul Valley',
        afternoon: 'Photograph roaring Sissu Waterfalls and glacial river beds',
        evening: 'Return to Manali for Mall Road stroll and hot momos',
        estCostInr: 4900
      },
      {
        day: 4,
        title: 'Jogini Waterfall Hike & Departure',
        morning: 'Short picturesque hike to Jogini Waterfalls through deodar forest',
        afternoon: 'Pack Kullu shawls and organic honey; board evening Volvo coach',
        evening: 'Overnight transit to Delhi',
        estCostInr: 4000
      }
    ],
    expensesBreakdown: {
      accommodation: 6400,
      transport: 5200,
      food: 3800,
      activities: 3100
    },
    safetyRating: 4.8
  },
  {
    id: 'rishikesh-ganga',
    name: 'Rishikesh Yoga & White Water Rafting',
    country: 'India',
    stateOrRegion: 'Uttarakhand',
    regionZone: 'North India',
    coordinates: { lat: 30.0869, lng: 78.2676 },
    category: 'adventure',
    climate: 'temperate',
    estimatedCostInr: 11500,
    estimatedCostUsd: 140,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'backpacker', 'adventure', 'moderate'],
    interests: ['adventure', 'spirituality', 'wellness', 'nature', 'photography'],
    imageUrl: '/src/assets/images/dest_varanasi_ghats_1792214361333.jpg',
    description: 'The Yoga Capital of the World where the emerald Ganga emerges from Himalayan foothills, world-famous for Grade III/IV river rafting, riverside beach camping, cliff jumping, and spiritual serenity.',
    highlights: ['16 km Ganga River Rafting & Cliff Jump', 'Triveni Ghat Evening Maha Aarti', 'Beatles Ashram (Chaurasi Kutia)', 'Neer Garh Natural Waterfall'],
    bestSeason: 'Sep - Jun',
    popularityScore: 93,
    savesCount: 3280,
    viewsCount: 36200,
    distanceFromVijayawadaKm: 1800,
    transitOptionsFromVijayawada: 'Train to Haridwar/Dehradun or flight to Jolly Grant Airport Dehradun',
    sampleItinerary: [
      {
        day: 1,
        title: 'Ram Jhula & Beatles Ashram',
        morning: 'Walk across iconic suspension bridges Ram Jhula and Lakshman Jhula',
        afternoon: 'Explore the graffiti meditation domes of the legendary 1968 Beatles Ashram',
        evening: 'Spiritual Ganga Aarti at Parmarth Niketan or Triveni Ghat',
        estCostInr: 3600
      },
      {
        day: 2,
        title: 'White Water Rafting & Cliff Jump',
        morning: 'White-water rafting from Marine Drive/Shivpuri tackling Roller Coaster rapids',
        afternoon: 'Cliff jump from 25-ft rock into glacial Ganga waters; maggi break on riverbank',
        evening: 'Riverside cafe dinner in Tapovan with organic vegan cuisine and sitar music',
        estCostInr: 4400
      },
      {
        day: 3,
        title: 'Neer Garh Falls & Sunrise Yoga',
        morning: 'Morning Hatha yoga session overlooking the misty river valley',
        afternoon: 'Short jungle trek to crystal blue pools of Neer Garh Waterfall',
        evening: 'Departure transit from Dehradun / Haridwar',
        estCostInr: 3500
      }
    ],
    expensesBreakdown: {
      accommodation: 4200,
      transport: 3200,
      food: 2200,
      activities: 1900
    },
    safetyRating: 4.8
  },

  // --- NORTH-EAST INDIA: MEGHALAYA & ASSAM ---
  {
    id: 'meghalaya-root-bridges',
    name: 'Meghalaya Living Root Bridges & Dawki',
    country: 'India',
    stateOrRegion: 'Meghalaya',
    regionZone: 'North-East India',
    coordinates: { lat: 25.2986, lng: 91.5822 },
    category: 'adventure',
    climate: 'cool-misty',
    estimatedCostInr: 22500,
    estimatedCostUsd: 270,
    idealDurationDays: 4,
    travelStyleFit: ['moderate', 'backpacker', 'adventure'],
    interests: ['adventure', 'nature', 'photography', 'trekking'],
    imageUrl: '/src/assets/images/dest_meghalaya_root_bridge_1792214363302.jpg',
    description: 'The Abode of Clouds featuring 250-year-old bio-engineered double-decker living root bridges grown by indigenous Khasi tribes, the crystal glass waters of Umngot River in Dawki, and roaring waterfalls.',
    highlights: ['Double Decker Living Root Bridge (Nongriat)', 'Dawki Umngot Glass River Boating', 'Nohkalikai Falls (India\'s tallest plunge)', 'Mawsmai Limestone Caves'],
    bestSeason: 'Oct - May',
    popularityScore: 95,
    savesCount: 3650,
    viewsCount: 39800,
    distanceFromVijayawadaKm: 2100,
    transitOptionsFromVijayawada: 'Flight via Kolkata to Guwahati (GAU), then 3.5 hrs drive to Shillong',
    sampleItinerary: [
      {
        day: 1,
        title: 'Guwahati to Shillong Scottish Hills',
        morning: 'Scenic highway climb past turquoise Umiam (Barapani) Lake',
        afternoon: 'Check-in to pine cottage in Shillong; visit Don Bosco Indigenous Culture Museum',
        evening: 'Live indie acoustic music and Khasi momos in Police Bazar',
        estCostInr: 5200
      },
      {
        day: 2,
        title: 'Trek to Double Decker Root Bridge',
        morning: 'Descent of 3,500 stone stairs from Tyrna into dense jungle gorge',
        afternoon: 'Cross ancient living ficus elastica root bridges over turquoise mountain streams',
        evening: 'Swim in natural azure pools of Rainbow Falls; homestay in Nongriat village',
        estCostInr: 5800
      },
      {
        day: 3,
        title: 'Nohkalikai & Dawki Glass River',
        morning: 'Ascend gorge; view 1,115-ft Nohkalikai plunge waterfall in Cherrapunji',
        afternoon: 'Drive to border town Dawki; boat ride where boats appear floating on thin air',
        evening: 'Camp in riverside tents at Shnongpdeng village with riverside barbecue',
        estCostInr: 6200
      },
      {
        day: 4,
        title: 'Mawlynnong Cleanest Village & Return',
        morning: 'Visit Mawlynnong, recognized as Asia\'s cleanest village with treehouse skywalks',
        afternoon: 'Drive back across the Khasi plateau towards Guwahati airport',
        evening: 'Connecting evening flights',
        estCostInr: 5300
      }
    ],
    expensesBreakdown: {
      accommodation: 7800,
      transport: 6800,
      food: 4400,
      activities: 3500
    },
    safetyRating: 4.9
  },
  {
    id: 'kaziranga-rhinos',
    name: 'Kaziranga National Park & Tea Plains',
    country: 'India',
    stateOrRegion: 'Assam',
    regionZone: 'North-East India',
    coordinates: { lat: 26.5775, lng: 93.1711 },
    category: 'wildlife',
    climate: 'tropical',
    estimatedCostInr: 19800,
    estimatedCostUsd: 240,
    idealDurationDays: 3,
    travelStyleFit: ['moderate', 'family', 'wildlife'],
    interests: ['wildlife', 'nature', 'photography'],
    imageUrl: '/src/assets/images/dest_bali_retreat_1792213545063.jpg',
    description: 'UNESCO World Heritage wildlife sanctuary hosting two-thirds of the world\'s great one-horned rhinoceroses, wild water buffaloes, Asian elephants, and Royal Bengal tigers in tall elephant-grass plains.',
    highlights: ['Elephant Dawn Safari among Rhinos', 'Jeep Safari through Bagori & Kohora Ranges', 'Kaziranga Orchid & Biodiversity Park', 'Assam Orthodox Tea Garden Tour'],
    bestSeason: 'Nov - Apr',
    popularityScore: 92,
    savesCount: 2640,
    viewsCount: 29800,
    distanceFromVijayawadaKm: 2200,
    transitOptionsFromVijayawada: 'Flight to Guwahati (GAU) or Jorhat, then 4 hrs highway drive',
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival in Rhino Territory',
        morning: 'Highway drive along the scenic south bank of the Brahmaputra River',
        afternoon: 'Check-in to jungle eco-lodge; stroll through organic tea estates',
        evening: 'Assamese Bihu folk dance performance and ethnic fish thali dinner',
        estCostInr: 6200
      },
      {
        day: 2,
        title: 'Elephant & 4x4 Jeep Safari',
        morning: 'Dawn elephant-back safari approaching grazing one-horned rhinos within feet',
        afternoon: 'Afternoon 4x4 open-top jeep safari through dense central range wetlands',
        evening: 'Spot wild water buffaloes and swamp deer returning at dusk',
        estCostInr: 7400
      },
      {
        day: 3,
        title: 'Orchid Park & Return',
        morning: 'Visit National Orchid Park with 500+ indigenous Himalayan orchid species',
        afternoon: 'Fresh Assam golden tip tea tasting; departure drive towards Guwahati',
        evening: 'Board evening connecting flight',
        estCostInr: 6200
      }
    ],
    expensesBreakdown: {
      accommodation: 7200,
      transport: 5800,
      food: 3600,
      activities: 3200
    },
    safetyRating: 4.8
  },

  // --- ISLANDS & COASTAL: ANDAMAN & GOA ---
  {
    id: 'andaman-radhanagar',
    name: 'Andaman (Havelock & Neil Islands)',
    country: 'India',
    stateOrRegion: 'Andaman and Nicobar',
    regionZone: 'Islands',
    coordinates: { lat: 11.9840, lng: 92.9510 },
    category: 'coastal',
    climate: 'tropical',
    estimatedCostInr: 32000,
    estimatedCostUsd: 385,
    idealDurationDays: 5,
    travelStyleFit: ['moderate', 'luxury', 'adventure', 'family'],
    interests: ['coastal', 'adventure', 'relaxation', 'photography', 'wildlife'],
    imageUrl: '/src/assets/images/dest_andaman_radhanagar_1792214362866.jpg',
    description: 'Pristine tropical archipelago in the Bay of Bengal boasting Radhanagar Beach (voted Asia\'s best beach), vibrant coral reefs teeming with clownfish and sea turtles, and historic Cellular Jail.',
    highlights: ['Radhanagar Beach White Sands', 'Scuba Diving at Elephant Beach Reefs', 'Kalapathar Turquoise Lagoon', 'Cellular Jail Light & Sound Show'],
    bestSeason: 'Oct - May',
    popularityScore: 97,
    savesCount: 4560,
    viewsCount: 48900,
    distanceFromVijayawadaKm: 1650,
    transitOptionsFromVijayawada: 'Direct flights to Port Blair (IXZ) from Chennai/Hyderabad/Vizag (2 hrs)',
    sampleItinerary: [
      {
        day: 1,
        title: 'Port Blair & Cellular Jail',
        morning: 'Arrive at Veer Savarkar Airport Port Blair; transfer to waterfront hotel',
        afternoon: 'Visit national memorial Cellular Jail and discover freedom struggle history',
        evening: 'Emotional Sound & Light show under towering century-old banyan trees',
        estCostInr: 6000
      },
      {
        day: 2,
        title: 'Catamaran to Havelock (Swaraj Dweep)',
        morning: 'Ride high-speed Makruzz luxury catamaran across open turquoise ocean',
        afternoon: 'Check-in to beachfront resort; afternoon swim at crescent-shaped Radhanagar Beach',
        evening: 'Unforgettable golden sunset into the Bay of Bengal waters',
        estCostInr: 7200
      },
      {
        day: 3,
        title: 'Elephant Beach Scuba Diving',
        morning: 'Speedboat to Elephant Beach; certified discover scuba dive among live coral formations',
        afternoon: 'Sea kayaking through mangrove creeks and snorkeling over starfish beds',
        evening: 'Fresh grilled lobster and crab dinner at beach shack',
        estCostInr: 7800
      },
      {
        day: 4,
        title: 'Kalapathar Beach & Neil Island',
        morning: 'Sunrise walk along black volcanic rocks and jade waters of Kalapathar Beach',
        afternoon: 'Ferry to Neil Island (Shaheed Dweep); explore Natural Coral Bridge',
        evening: 'Stargazing by the sound of gentle tropical surf',
        estCostInr: 6500
      },
      {
        day: 5,
        title: 'Corbyn\'s Cove & Departure',
        morning: 'Return ferry to Port Blair; souvenir shopping for pearls and seashell handicrafts',
        afternoon: 'Transfer to Port Blair airport for flight home',
        evening: 'Arrival home',
        estCostInr: 4500
      }
    ],
    expensesBreakdown: {
      accommodation: 12000,
      transport: 9500,
      food: 5500,
      activities: 5000
    },
    safetyRating: 5.0
  },
  {
    id: 'dudhsagar-falls',
    name: 'Dudhsagar Waterfalls & Spice Plantations',
    country: 'India',
    stateOrRegion: 'Goa',
    regionZone: 'West India',
    coordinates: { lat: 15.3144, lng: 74.3143 },
    category: 'adventure',
    climate: 'tropical',
    estimatedCostInr: 8500,
    estimatedCostUsd: 105,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'backpacker', 'adventure'],
    interests: ['adventure', 'nature', 'photography'],
    imageUrl: '/src/assets/images/hero_travel_scenic_1792213543590.jpg',
    description: 'A colossal four-tiered waterfall dropping 1,017 feet through the Western Ghats jungle on Mandovi River, where the railway viaduct cuts directly across the roaring spray.',
    highlights: ['4x4 Jungle Jeep Safari via Bhagwan Mahaveer Sanctuary', 'Swimming in Natural Waterfall Mist Pool', 'Sahakari Spice Farm Guided Tour', 'Railway Viaduct Train Photography'],
    bestSeason: 'Jul - Jan',
    popularityScore: 92,
    savesCount: 2800,
    viewsCount: 31000,
    distanceFromVijayawadaKm: 780,
    transitOptionsFromVijayawada: 'Train to Kulem (QLM) or Madgaon Junction',
    sampleItinerary: [
      {
        day: 1,
        title: 'Jeep Safari & Waterfall Dip',
        morning: 'Board 4x4 open-top jeep through rivers and Bhagwan Mahavir wildlife sanctuary',
        afternoon: 'Hike to the base pool of Dudhsagar; swim in cool fresh waters under the spray',
        evening: 'Buffet lunch at organic spice plantation with fresh vanilla and pepper vines',
        estCostInr: 4600
      },
      {
        day: 2,
        title: 'Tambdi Surla 12th-century Temple',
        morning: 'Visit Tambdi Surla, ancient black basalt temple hidden inside the dense jungle',
        afternoon: 'Forest butterfly walk and return transit',
        evening: 'Departure to coastal Goa or train home',
        estCostInr: 3900
      }
    ],
    expensesBreakdown: {
      accommodation: 3500,
      transport: 2600,
      food: 1400,
      activities: 1000
    },
    safetyRating: 4.8
  },
  {
    id: 'goa-coastal',
    name: 'Goa Coastal & Latin Quarters',
    country: 'India',
    stateOrRegion: 'Goa',
    regionZone: 'West India',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    category: 'coastal',
    climate: 'tropical',
    estimatedCostInr: 15500,
    estimatedCostUsd: 190,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'luxury', 'backpacker'],
    interests: ['relaxation', 'photography', 'adventure', 'cuisine', 'heritage'],
    imageUrl: '/src/assets/images/dest_amalfi_coast_1792213545453.jpg',
    description: 'Golden sandy shorelines, Portuguese Latin quarters of Fontainhas, vibrant beach shacks, water adventures, and aromatic Konkan seafood curries.',
    highlights: ['Palolem & Morjim Beaches', 'Fontainhas Heritage Walk', 'Aguada Fort Sea View', 'Catamaran Sunset Cruise'],
    bestSeason: 'Oct - Apr',
    popularityScore: 94,
    savesCount: 3620,
    viewsCount: 38900,
    distanceFromVijayawadaKm: 810,
    transitOptionsFromVijayawada: 'Direct Amaravati Express train (18 hrs) or 1.5 hr flight via Bengaluru',
    sampleItinerary: [
      {
        day: 1,
        title: 'Latin Quarter & North Beaches',
        morning: 'Walk along the vivid yellow, blue, and terracotta villas of Fontainhas, Panjim',
        afternoon: 'Seafood lunch with Goan fish thali and coconut curry',
        evening: 'Panoramic sunset views from the bastions of 17th-century Fort Aguada',
        estCostInr: 4900
      },
      {
        day: 2,
        title: 'Water Sports & Coastal Thrills',
        morning: 'Jet-skiing and parasailing at Calangute/Anjuna coast',
        afternoon: 'Relax under palm fronds at quiet Ashwem Beach; artisan flea market browsing',
        evening: 'Sunset beach shack dining with live acoustic music',
        estCostInr: 5800
      },
      {
        day: 3,
        title: 'South Goa Serenity & Spice Farm',
        morning: 'Traditional spice plantation tour with elephant bathing and authentic Goan buffet',
        afternoon: 'St. Cajetan and Basilica of Bom Jesus UNESCO world heritage churches',
        evening: 'Sundowner drinks along the crescent bay of Palolem Beach',
        estCostInr: 4800
      }
    ],
    expensesBreakdown: {
      accommodation: 5800,
      transport: 3800,
      food: 3400,
      activities: 2500
    },
    safetyRating: 4.8
  },

  // --- MAHARASHTRA & GUJARAT: AJANTA-ELLORA & RANN OF KUTCH ---
  {
    id: 'ajanta-ellora-grishneshwar',
    name: 'Ellora Caves, Kailasa Temple & Grishneshwar Jyotirlinga',
    country: 'India',
    stateOrRegion: 'Maharashtra',
    regionZone: 'West India',
    coordinates: { lat: 20.0268, lng: 75.1793 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 12500,
    estimatedCostUsd: 150,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'cultural'],
    interests: ['heritage', 'spirituality', 'photography', 'cultural'],
    imageUrl: '/src/assets/images/dest_hampi_ruins_1792214364079.jpg',
    description: 'Home to the colossal monolithic rock-cut Kailasa Temple (Cave 16) carved top-down from a single basalt mountain cliff, alongside ancient Buddhist and Jain caves, and the sacred Grishneshwar Jyotirlinga, the 12th and final Jyotirlinga of Lord Shiva.',
    highlights: ['Kailasa Temple Monolithic Rock Miracle', 'Grishneshwar Sacred Jyotirlinga Temple', 'Ajanta UNESCO Buddhist Cave Frescoes', 'Daulatabad Medieval Hill Fortress'],
    bestSeason: 'Oct - Mar',
    popularityScore: 95,
    savesCount: 3100,
    viewsCount: 34500,
    distanceFromVijayawadaKm: 760,
    transitOptionsFromVijayawada: 'Direct train to Chhatrapati Sambhajinagar (Aurangabad) or via Secunderabad',
    sampleItinerary: [
      {
        day: 1,
        title: 'Ellora Caves & Kailasa Temple',
        morning: 'Arrive in Aurangabad; explore the astounding top-down rock-hewn Kailasa Temple (Cave 16)',
        afternoon: 'Wander through ancient Buddhist multi-storied monasteries and Jain Indra Sabha caves',
        evening: 'Darshan and evening abhishek aarti at the revered Grishneshwar Jyotirlinga',
        estCostInr: 4200
      },
      {
        day: 2,
        title: 'Ajanta Cave Paintings',
        morning: 'Full day excursion through the horseshoe gorge of Ajanta UNESCO caves',
        afternoon: 'Admire 2,000-year-old fresco murals depicting Bodhisattva Padmapani and Jataka tales',
        evening: 'View panoramic horseshoe gorge canyon from the British Viewpoint',
        estCostInr: 4600
      },
      {
        day: 3,
        title: 'Daulatabad Fortress & Bibi Ka Maqbara',
        morning: 'Climb through the optical maze and dark subterranean passages of Daulatabad Fort',
        afternoon: 'Visit Bibi Ka Maqbara, the majestic "Taj of the Deccan", and shop for Himroo shawls',
        evening: 'Board evening return express train',
        estCostInr: 3700
      }
    ],
    expensesBreakdown: {
      accommodation: 4500,
      transport: 3600,
      food: 2400,
      activities: 2000
    },
    safetyRating: 4.8
  },
  {
    id: 'rann-of-kutch',
    name: 'Rann of Kutch White Desert & Mandvi Coast',
    country: 'India',
    stateOrRegion: 'Gujarat',
    regionZone: 'West India',
    coordinates: { lat: 23.7337, lng: 69.8597 },
    category: 'adventure',
    climate: 'temperate',
    estimatedCostInr: 17500,
    estimatedCostUsd: 210,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'cultural'],
    interests: ['nature', 'photography', 'cultural', 'adventure'],
    imageUrl: '/src/assets/images/hero_travel_scenic_1792213543590.jpg',
    description: 'The world\'s largest seasonal salt marsh desert transforming into a glowing white crystalline expanse under moonlight during Rann Utsav, accompanied by vibrant Kutchi artisan villages, flamingo sanctuaries, and camel safaris.',
    highlights: ['Endless White Salt Desert Horizon', 'Rann Utsav Cultural Tent City', 'Kalo Dungar (Black Hill) Confluence View', 'Bhujodi Handloom & Rogan Art Guilds'],
    bestSeason: 'Nov - Feb (Rann Utsav)',
    popularityScore: 94,
    savesCount: 3340,
    viewsCount: 37200,
    distanceFromVijayawadaKm: 1680,
    transitOptionsFromVijayawada: 'Train/flight to Ahmedabad/Bhuj, then 1.5 hrs scenic desert drive to Dhordo',
    sampleItinerary: [
      {
        day: 1,
        title: 'Dhordo Arrival & White Desert Sunset',
        morning: 'Arrive at Bhuj; transfer through Banni grasslands to traditional Bhunga mud cottages',
        afternoon: 'Explore Rann Utsav cultural artisan bazaar and camel cart rides',
        evening: 'Witness the surreal white salt desert glowing under sunset and moonlit twilight',
        estCostInr: 6500
      },
      {
        day: 2,
        title: 'Kalo Dungar & Artisan Villages',
        morning: 'Climb Kalo Dungar (Black Hill), highest point in Kutch with panoramic views of the Indo-Pak border',
        afternoon: 'Meet National Award-winning Rogan art painters in Nirona and block-printers in Ajrakhpur',
        evening: 'Bonfire folk music and Kutchi garba dance performance under desert stars',
        estCostInr: 5800
      },
      {
        day: 3,
        title: 'Aina Mahal & Departure',
        morning: 'Wander Aina Mahal mirror palace and Prag Mahal Venetian Gothic tower in Bhuj',
        afternoon: 'Savor traditional Kutchi Dabeli and sweet Mawa; souvenir textile shopping',
        evening: 'Board return transit from Bhuj Airport or Railway Station',
        estCostInr: 5200
      }
    ],
    expensesBreakdown: {
      accommodation: 6500,
      transport: 4800,
      food: 3400,
      activities: 2800
    },
    safetyRating: 4.9
  },

  // --- ODISHA & WEST BENGAL: PURI, KONARK & DARJEELING ---
  {
    id: 'puri-konark',
    name: 'Puri Jagannath Temple & Konark Sun Chariot',
    country: 'India',
    stateOrRegion: 'Odisha',
    regionZone: 'Central & East India',
    coordinates: { lat: 19.8135, lng: 85.8312 },
    category: 'cultural',
    climate: 'tropical',
    estimatedCostInr: 10800,
    estimatedCostUsd: 130,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'cultural'],
    interests: ['heritage', 'spirituality', 'coastal', 'cultural'],
    imageUrl: '/src/assets/images/dest_hampi_ruins_1792214364079.jpg',
    description: 'One of the Char Dham holy pilgrimages on the Bay of Bengal, featuring the colossal 13th-century Konark Sun Temple shaped as a 24-wheeled chariot of time, sacred Mahaprasad at Jagannath Temple, and golden sand beaches with sand art.',
    highlights: ['Konark Sun Temple UNESCO Stone Chariot', 'Shree Jagannath 12th-century Dham Shrine', 'Golden Beach Blue Flag Coastal Stroll', 'Chilika Lake Irrawaddy Dolphin Boat Cruise'],
    bestSeason: 'Oct - Mar',
    popularityScore: 93,
    savesCount: 2950,
    viewsCount: 33100,
    distanceFromVijayawadaKm: 780,
    transitOptionsFromVijayawada: 'Direct express trains via Visakhapatnam to Puri (12 hrs) or flight to Bhubaneswar',
    sampleItinerary: [
      {
        day: 1,
        title: 'Jagannath Temple & Blue Flag Beach',
        morning: 'Arrive at Puri; divine darshan of Lord Jagannath, Balabhadra, and Subhadra',
        afternoon: 'Savor sacred Ananda Bazar Mahaprasad prepared in earthen pots',
        evening: 'Stroll along the certified Blue Flag Golden Beach watching master sand artists',
        estCostInr: 3600
      },
      {
        day: 2,
        title: 'Konark Sun Temple & Marine Drive',
        morning: 'Drive the scenic Puri-Konark Marine Drive through casuarina forests to Konark',
        afternoon: 'Marvel at the 24 astronomical carved sundial wheels of Konark Sun Temple',
        evening: 'Sunset at Chandrabhaga Beach; visit Raghurajpur heritage Pattachitra painting village',
        estCostInr: 4100
      },
      {
        day: 3,
        title: 'Chilika Lake & Dolphins',
        morning: 'Boat excursion on Chilika Lake (Asia\'s largest brackish lagoon) spotting rare Irrawaddy dolphins',
        afternoon: 'Fresh coastal crab and prawn curry lunch; souvenir stone carving shopping',
        evening: 'Board return train from Puri or Bhubaneswar',
        estCostInr: 3100
      }
    ],
    expensesBreakdown: {
      accommodation: 3800,
      transport: 3200,
      food: 2100,
      activities: 1700
    },
    safetyRating: 4.8
  },
  {
    id: 'darjeeling-himalayan',
    name: 'Darjeeling Queen of the Hills & Tiger Hill',
    country: 'India',
    stateOrRegion: 'West Bengal',
    regionZone: 'Central & East India',
    coordinates: { lat: 27.0410, lng: 88.2663 },
    category: 'nature',
    climate: 'cool-misty',
    estimatedCostInr: 16800,
    estimatedCostUsd: 200,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'family'],
    interests: ['nature', 'photography', 'relaxation', 'heritage'],
    imageUrl: '/src/assets/images/dest_swiss_alps_1792213545756.jpg',
    description: 'Perched in the Lesser Himalayas at 6,700 feet, famed for golden sunrises over Mount Kanchenjunga (world\'s 3rd highest peak), century-old steam Darjeeling Himalayan Railway toy train, and emerald champagne tea gardens.',
    highlights: ['Tiger Hill Kanchenjunga Golden Sunrise', 'Darjeeling Himalayan Toy Train (UNESCO)', 'Happy Valley Century Tea Estate Tour', 'Batasia Loop Spiral & Gorkha War Memorial'],
    bestSeason: 'Mar - May & Oct - Dec',
    popularityScore: 94,
    savesCount: 3500,
    viewsCount: 38200,
    distanceFromVijayawadaKm: 1850,
    transitOptionsFromVijayawada: 'Train/flight to Kolkata, then flight to Bagdogra (IXB) and 3 hrs mountain taxi',
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival & Mall Road Heritage',
        morning: 'Scenic mountain climb from Bagdogra through pine-clad valleys to Darjeeling',
        afternoon: 'Check-in to colonial heritage lodge; stroll along the pedestrian-only Mall Road (Chowrasta)',
        evening: 'Hot Darjeeling first flush tea and momos at legendary Glenary\'s Bakery',
        estCostInr: 5200
      },
      {
        day: 2,
        title: 'Tiger Hill Dawn & Toy Train',
        morning: '4:00 AM ascent to Tiger Hill watching the sunrise paint Mount Kanchenjunga in gold and pink',
        afternoon: 'Ride the UNESCO steam Toy Train through Batasia Loop to Ghoom Monastery',
        evening: 'Guided leaf plucking and tea cupping session at Happy Valley Tea Estate',
        estCostInr: 6100
      },
      {
        day: 3,
        title: 'Himalayan Mountaineering & Departure',
        morning: 'Visit Padmaja Naidu Himalayan Zoo (Red Pandas & Snow Leopards) and Mountaineering Institute',
        afternoon: 'Panoramic ropeway cable car glide over cascading tea estates',
        evening: 'Descent transfer towards Bagdogra / New Jalpaiguri',
        estCostInr: 5500
      }
    ],
    expensesBreakdown: {
      accommodation: 6200,
      transport: 4800,
      food: 3200,
      activities: 2600
    },
    safetyRating: 4.9
  },

  // --- KERALA COASTAL & RAJASTHAN DESERT ---
  {
    id: 'kovalam-varkala',
    name: 'Kovalam Beach & Varkala Cliff Springs',
    country: 'India',
    stateOrRegion: 'Kerala',
    regionZone: 'South India',
    coordinates: { lat: 8.4004, lng: 76.9787 },
    category: 'coastal',
    climate: 'tropical',
    estimatedCostInr: 14200,
    estimatedCostUsd: 170,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'relaxation'],
    interests: ['coastal', 'relaxation', 'photography', 'wellness'],
    imageUrl: '/src/assets/images/dest_amalfi_coast_1792213545453.jpg',
    description: 'Iconic southern Arabian Sea coastlines with the candy-striped Kovalam lighthouse overlooking crescent surfing bays, and the dramatic red laterite cliffs of Varkala overlooking turquoise beaches and natural mineral springs.',
    highlights: ['Kovalam Red & White Striped Lighthouse', 'Varkala Clifftop Cafes & Sunset Panorama', 'Traditional Ayurvedic Panchakarma Spa', 'Papanasam Beach Holy Cleansing Waters'],
    bestSeason: 'Sep - Mar',
    popularityScore: 92,
    savesCount: 2850,
    viewsCount: 31800,
    distanceFromVijayawadaKm: 1100,
    transitOptionsFromVijayawada: 'Direct trains (Kerala Express) to Thiruvananthapuram (TVC) or 2 hr flight',
    sampleItinerary: [
      {
        day: 1,
        title: 'Kovalam Crescent & Lighthouse',
        morning: 'Climb 142 spiral steps of the 1972 Vizhinjam Lighthouse for sweeping coastal views',
        afternoon: 'Catamaran boat ride with local fishermen; fresh coconut water on Lighthouse Beach',
        evening: 'Sunset seaside dinner tasting spicy Kerala Meen Pollichathu fish fry',
        estCostInr: 4500
      },
      {
        day: 2,
        title: 'Varkala Clifftop & Mineral Springs',
        morning: 'Drive 1 hour north to Varkala; walk along the vibrant cliff edge perched above Papanasam Beach',
        afternoon: 'Dip in natural mineral spring waterfalls cascading from the laterite rock formations',
        evening: 'Rooftop yoga and fresh fruit smoothie as twilight settles over the Arabian Sea',
        estCostInr: 5200
      },
      {
        day: 3,
        title: 'Ayurveda & Departure',
        morning: 'Rejuvenating herbal oil Abhyanga Ayurvedic massage session at certified seaside spa',
        afternoon: 'Visit 2,000-year-old Janardhana Swamy Vishnu temple',
        evening: 'Transfer to Trivandrum Airport or Railway Station',
        estCostInr: 4500
      }
    ],
    expensesBreakdown: {
      accommodation: 5200,
      transport: 3800,
      food: 2800,
      activities: 2400
    },
    safetyRating: 4.9
  },
  {
    id: 'jaisalmer-golden-fort',
    name: 'Jaisalmer The Golden City & Thar Desert',
    country: 'India',
    stateOrRegion: 'Rajasthan',
    regionZone: 'North India',
    coordinates: { lat: 26.9157, lng: 70.9083 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 16200,
    estimatedCostUsd: 195,
    idealDurationDays: 3,
    travelStyleFit: ['budget-friendly', 'moderate', 'adventure', 'cultural'],
    interests: ['heritage', 'photography', 'adventure', 'cultural'],
    imageUrl: '/src/assets/images/dest_jaipur_hawa_mahal_1792214362658.jpg',
    description: 'The Golden City rising like a mirage from the Thar Desert, boasting India\'s only living sandstone fort (Sonar Qila) housing 4,000 residents, intricate lace-like havelis, and undulating Sam sand dunes under starry skies.',
    highlights: ['Sonar Qila (Living UNESCO Sandstone Fort)', 'Sam Sand Dunes Camel Safari & Sunset', 'Patwon Ki Haveli Filigree Carvings', 'Gadisar Lake Historic Chhatris'],
    bestSeason: 'Oct - Mar',
    popularityScore: 95,
    savesCount: 3720,
    viewsCount: 40500,
    distanceFromVijayawadaKm: 1820,
    transitOptionsFromVijayawada: 'Express train to Jodhpur/Jaisalmer or flight via Jaipur/Delhi',
    sampleItinerary: [
      {
        day: 1,
        title: 'Living Fort & Sandstone Alleys',
        morning: 'Enter through the 4 monumental gates of 1156 AD Jaisalmer Fort; explore Jain temples',
        afternoon: 'Wander inside Patwon Ki Haveli and Salim Singh Ki Haveli with 38 intricate balconies',
        evening: 'Paddleboat on Gadisar Lake surrounded by floating sandstone shrines and gateway arches',
        estCostInr: 4800
      },
      {
        day: 2,
        title: 'Sam Sand Dunes & Desert Camping',
        morning: 'Visit the abandoned 13th-century ghost village of Kuldhara',
        afternoon: 'Arrive at Thar desert camp; camel safari across rolling gold crests of Sam sand dunes',
        evening: 'Rajasthani Kalbelia folk dance, dholak rhythms, and royal dinner under the desert sky',
        estCostInr: 6600
      },
      {
        day: 3,
        title: 'Desert Crafts & Departure',
        morning: 'Sunrise desert walk; return to Jaisalmer town',
        afternoon: 'Shop for camel leather crafts, mirror-work textiles, and fossil stone bowls',
        evening: 'Board evening overnight express train',
        estCostInr: 4800
      }
    ],
    expensesBreakdown: {
      accommodation: 6200,
      transport: 4400,
      food: 3200,
      activities: 2400
    },
    safetyRating: 4.8
  },

  // --- PUNJAB & KASHMIR: AMRITSAR & SRINAGAR ---
  {
    id: 'amritsar-golden-temple',
    name: 'Amritsar Golden Temple & Wagah Border',
    country: 'India',
    stateOrRegion: 'Punjab',
    regionZone: 'North India',
    coordinates: { lat: 31.6200, lng: 74.8765 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 10500,
    estimatedCostUsd: 125,
    idealDurationDays: 2,
    travelStyleFit: ['budget-friendly', 'moderate', 'family', 'cultural'],
    interests: ['heritage', 'spirituality', 'cuisine', 'cultural'],
    imageUrl: '/src/assets/images/dest_hampi_ruins_1792214364079.jpg',
    description: 'The spiritual heart of Sikhism centered on the gilded Sri Harmandir Sahib reflecting in the holy Amrit Sarovar lake, the world\'s largest free community kitchen (Guru Ka Langar), and the high-energy Wagah Border flag lowering ceremony.',
    highlights: ['Sri Harmandir Sahib (Golden Temple) Illuminated Darshan', 'Guru Ka Langar (100,000 daily free meals service)', 'Wagah Border Patriotic Beating Retreat Ceremony', 'Authentic Amritsari Kulcha with Chole & Sweet Lassi'],
    bestSeason: 'Oct - Mar',
    popularityScore: 96,
    savesCount: 3850,
    viewsCount: 42000,
    distanceFromVijayawadaKm: 1980,
    transitOptionsFromVijayawada: 'Direct express trains (Andaman Express, Hirakud) or flight via Delhi',
    sampleItinerary: [
      {
        day: 1,
        title: 'Golden Temple & Langar Seva',
        morning: 'Walk barefoot into Harmandir Sahib; listen to ethereal Gurbani hymns over Amrit Sarovar',
        afternoon: 'Participate in community vegetable chopping or bread making at Guru Ka Langar',
        evening: 'Night Palki Sahib golden palanquin procession ceremony when the Guru Granth Sahib is put to rest',
        estCostInr: 4800
      },
      {
        day: 2,
        title: 'Jallianwala Bagh & Wagah Border',
        morning: 'Pay respects at Jallianwala Bagh national memorial and Partition Museum',
        afternoon: 'Savor crispy Amritsari chur-chur kulcha drenched in desi butter with tall frothy lassi',
        evening: 'Drive to Indo-Pak border for the thunderous Wagah Border Beating Retreat ceremony',
        estCostInr: 5700
      }
    ],
    expensesBreakdown: {
      accommodation: 3800,
      transport: 3200,
      food: 2000,
      activities: 1500
    },
    safetyRating: 4.9
  },
  {
    id: 'srinagar-gulmarg',
    name: 'Srinagar Dal Lake & Gulmarg Ski Meadow',
    country: 'India',
    stateOrRegion: 'Jammu and Kashmir',
    regionZone: 'North India',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    category: 'nature',
    climate: 'alpine',
    estimatedCostInr: 24500,
    estimatedCostUsd: 295,
    idealDurationDays: 4,
    travelStyleFit: ['moderate', 'luxury', 'family', 'adventure'],
    interests: ['nature', 'photography', 'relaxation', 'adventure'],
    imageUrl: '/src/assets/images/dest_swiss_alps_1792213545756.jpg',
    description: 'Paradise on Earth where hand-carved cedarwood houseboats float on misty Dal Lake, colorful shikaras glide past floating lotus gardens, terraced Mughal gardens bloom with chinars, and Gulmarg Gondola climbs to 13,780-foot snow peaks.',
    highlights: ['Carved Cedarwood Houseboat Stay on Dal Lake', 'Shikara Dawn Ride to Floating Flower Market', 'Gulmarg Gondola (World\'s 2nd Highest Cable Car)', 'Mughal Gardens: Shalimar Bagh & Nishat Bagh'],
    bestSeason: 'Apr - Oct (Snow: Dec - Mar)',
    popularityScore: 97,
    savesCount: 4420,
    viewsCount: 47800,
    distanceFromVijayawadaKm: 2350,
    transitOptionsFromVijayawada: 'Flight via Delhi/Mumbai to Sheikh ul-Alam International Airport Srinagar (SXR)',
    sampleItinerary: [
      {
        day: 1,
        title: 'Dal Lake & Houseboat Welcome',
        morning: 'Arrive in Srinagar; board wooden shikara to luxury cedarwood houseboat moored on Dal Lake',
        afternoon: 'Sip hot saffron and cardamom Kehwa tea; stroll through Royal Shalimar & Nishat Mughal Gardens',
        evening: 'Sunset shikara cruise watching mirror reflections of Zabarwan mountains',
        estCostInr: 6200
      },
      {
        day: 2,
        title: 'Gulmarg Gondola & Snow Peaks',
        morning: 'Drive through pine forests and apple orchards to Gulmarg (Meadow of Flowers)',
        afternoon: 'Ascend Phase 1 & Phase 2 of the world-famous Gulmarg Gondola to Apharwat Peak (13,780 ft)',
        evening: 'Warm Kashmiri Wazwan dinner with Rogan Josh and Gushtaba back in Srinagar',
        estCostInr: 7100
      },
      {
        day: 3,
        title: 'Floating Market & Old Srinagar',
        morning: '5:30 AM sunrise shikara to the legendary floating vegetable and water lily market',
        afternoon: 'Explore 1395 AD Jamia Masjid with 378 deodar pillars and Khanqah-e-Moula wooden shrine',
        evening: 'Shop for authentic GI-tagged Cashmere Pashmina shawls and carved walnut wood boxes',
        estCostInr: 5800
      },
      {
        day: 4,
        title: 'Chashme Shahi & Departure',
        morning: 'Visit Chashme Shahi royal spring garden overlooking Dal Lake panorama',
        afternoon: 'Transfer to Srinagar Airport with memories of the Himalayan valley',
        evening: 'Board return flight',
        estCostInr: 5400
      }
    ],
    expensesBreakdown: {
      accommodation: 8500,
      transport: 6500,
      food: 5000,
      activities: 4500
    },
    safetyRating: 4.8
  },

  // --- GLOBAL BENCHMARK DESTINATIONS ---
  {
    id: 'kyoto',
    name: 'Kyoto Ancient Capital',
    country: 'Japan',
    stateOrRegion: 'Kansai',
    regionZone: 'International',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    category: 'cultural',
    climate: 'temperate',
    estimatedCostInr: 78000,
    estimatedCostUsd: 940,
    idealDurationDays: 5,
    travelStyleFit: ['moderate', 'luxury', 'cultural'],
    interests: ['heritage', 'photography', 'cultural', 'cuisine', 'relaxation'],
    imageUrl: '/src/assets/images/dest_kyoto_heritage_1792213544585.jpg',
    description: 'Japan\'s cultural epicenter showcasing over a thousand Buddhist temples, tranquil Zen stone gardens, Arashiyama bamboo forests, and Geisha quarters in Gion.',
    highlights: ['Fushimi Inari 10,000 Torii Gates', 'Kinkaku-ji Golden Pavilion', 'Arashiyama Bamboo Grove', 'Gion Historic Tea Houses'],
    bestSeason: 'Mar - May & Oct - Nov',
    popularityScore: 98,
    savesCount: 5410,
    viewsCount: 56200,
    distanceFromVijayawadaKm: 5600,
    sampleItinerary: [
      {
        day: 1,
        title: 'Gion & Fushimi Inari Gates',
        morning: 'Hike through thousands of vermilion torii gates winding up sacred Mount Inari',
        afternoon: 'Traditional soba lunch; stroll through preserved machiya alleys of Ninenzaka',
        evening: 'Atmospheric twilight walk through Gion hoping to spot apprentice geiko',
        estCostInr: 14500
      },
      {
        day: 2,
        title: 'Zen Gardens & Golden Pavilion',
        morning: 'Reflective morning at Kinkaku-ji, the Zen pavilion leafed in pure gold',
        afternoon: 'Meditate at the raked gravel dry landscape rock garden of Ryoan-ji',
        evening: 'Formal matcha green tea ceremony ritual in an authentic tea master room',
        estCostInr: 16200
      },
      {
        day: 3,
        title: 'Arashiyama Bamboo & Monkey Park',
        morning: 'Morning walk through towering bamboo stalks swaying in the wind',
        afternoon: 'Tenryu-ji landscaped garden and crossing the historic Togetsukyo wooden bridge',
        evening: 'Yudofu hotpot dinner overlooking the Hozu River',
        estCostInr: 15800
      },
      {
        day: 4,
        title: 'Philosopher\'s Path & Silver Temple',
        morning: 'Walk along the stone canal path of Philosopher\'s Walk',
        afternoon: 'Ginkaku-ji Silver Pavilion and shopping for ceramics and incense',
        evening: 'Pontocho Alley dining along the raised wooden river decks',
        estCostInr: 16500
      },
      {
        day: 5,
        title: 'Nijo Castle & Departure',
        morning: 'Explore Nijo Castle with its nightingale floors',
        afternoon: 'Nishiki Market food tour tasting dashi tamagoyaki and wagashi sweets',
        evening: 'Shinkansen bullet train transfer to Osaka airport',
        estCostInr: 15000
      }
    ],
    expensesBreakdown: {
      accommodation: 32000,
      transport: 18000,
      food: 16000,
      activities: 12000
    },
    safetyRating: 5.0
  },
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast & Positano',
    country: 'Italy',
    stateOrRegion: 'Campania',
    regionZone: 'International',
    coordinates: { lat: 40.6340, lng: 14.6027 },
    category: 'coastal',
    climate: 'mediterranean',
    estimatedCostInr: 95000,
    estimatedCostUsd: 1150,
    idealDurationDays: 4,
    travelStyleFit: ['moderate', 'luxury'],
    interests: ['photography', 'cuisine', 'relaxation', 'coastal', 'heritage'],
    imageUrl: '/src/assets/images/dest_amalfi_coast_1792213545453.jpg',
    description: 'Dramatic limestone cliffs plunging into the cerulean Tyrrhenian Sea, pastel-hued villages clinging to rock faces, fragrant lemon groves, and Mediterranean dining.',
    highlights: ['Positano Cliffside Terraces', 'Path of the Gods Trek', 'Ravello Villa Cimbrone Gardens', 'Private Boat to Capri'],
    bestSeason: 'May - Oct',
    popularityScore: 97,
    savesCount: 4890,
    viewsCount: 51200,
    distanceFromVijayawadaKm: 6800,
    sampleItinerary: [
      {
        day: 1,
        title: 'Arrival in Positano Clifftops',
        morning: 'Scenic private drive along the winding corniche coastal cliffs',
        afternoon: 'Check-in to sea-view villa; walk down the pebble beach of Spiaggia Grande',
        evening: 'Campanian dinner with fresh seafood scialatielli and artisanal limoncello',
        estCostInr: 22000
      },
      {
        day: 2,
        title: 'Path of the Gods',
        morning: 'Hike the legendary clifftop trail with panoramic aerial vistas',
        afternoon: 'Rustic lunch in village of Nocelle with fresh buffalo mozzarella',
        evening: 'Sunset cocktails overlooking Positano\'s illuminated pastel houses',
        estCostInr: 24000
      },
      {
        day: 3,
        title: 'Capri & Blue Grotto by Sea',
        morning: 'Board wooden gozzo boat to island of Capri and Faraglioni rocks',
        afternoon: 'Rowing boat inside incandescent azure cavern of Blue Grotto',
        evening: 'Return cruise past emerald sea caves',
        estCostInr: 26000
      },
      {
        day: 4,
        title: 'Ravello Heights & Gardens',
        morning: 'Ascend to medieval Ravello; visit Villa Cimbrone Terrace of Infinity',
        afternoon: 'Lemon grove farm tour and handmade ceramic shopping',
        evening: 'Departure transfer to Naples',
        estCostInr: 23000
      }
    ],
    expensesBreakdown: {
      accommodation: 42000,
      transport: 22000,
      food: 19000,
      activities: 12000
    },
    safetyRating: 4.8
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps & Zermatt',
    country: 'Switzerland',
    stateOrRegion: 'Valais',
    regionZone: 'International',
    coordinates: { lat: 45.9763, lng: 7.7491 },
    category: 'nature',
    climate: 'alpine',
    estimatedCostInr: 110000,
    estimatedCostUsd: 1320,
    idealDurationDays: 4,
    travelStyleFit: ['moderate', 'luxury', 'adventure'],
    interests: ['nature', 'photography', 'adventure', 'trekking', 'relaxation'],
    imageUrl: '/src/assets/images/dest_swiss_alps_1792213545756.jpg',
    description: 'Crystalline glacier lakes reflecting the jagged Matterhorn, cogwheel railways, alpine wildflower meadows, and cozy fondue chalets.',
    highlights: ['Gornergrat Matterhorn Railway', 'Five Lakes Trail Hike', 'Glacier Paradise Cable Car', 'Traditional Swiss Fondue Chalet'],
    bestSeason: 'Jun - Sep / Dec - Apr',
    popularityScore: 97,
    savesCount: 5120,
    viewsCount: 53900,
    distanceFromVijayawadaKm: 7200,
    sampleItinerary: [
      {
        day: 1,
        title: 'Car-Free Zermatt Arrival',
        morning: 'Glacier Express mountain train into car-free village of Zermatt',
        afternoon: 'Wander 500-year-old larchwood chalets of Hinterdorf',
        evening: 'Classic Swiss cheese fondue dinner with Valais white wine',
        estCostInr: 26000
      },
      {
        day: 2,
        title: 'Gornergrat & Lake Riffelsee',
        morning: 'Open-air cogwheel railway up to 3,089 meters',
        afternoon: 'Capture mirror reflection of Matterhorn in Lake Riffelsee',
        evening: 'Alpine wellness spa session overlooking 4,000m peaks',
        estCostInr: 29000
      },
      {
        day: 3,
        title: 'Matterhorn Glacier Paradise',
        morning: 'Highest cable car station in Europe; subterranean Ice Palace',
        afternoon: 'Hike along Furgg glacier moraine trails',
        evening: 'Stargazing at an altitude mountain refuge',
        estCostInr: 30000
      },
      {
        day: 4,
        title: 'Sunnegga Trail & Departure',
        morning: 'Funicular up to Sunnegga marmot habitat trail',
        afternoon: 'Swiss chocolate tasting and handcrafted souvenir collection',
        evening: 'Descent train towards Zurich / Geneva',
        estCostInr: 25000
      }
    ],
    expensesBreakdown: {
      accommodation: 48000,
      transport: 28000,
      food: 20000,
      activities: 14000
    },
    safetyRating: 5.0
  },
  {
    id: 'ubud-bali',
    name: 'Bali Tropical Haven',
    country: 'Indonesia',
    stateOrRegion: 'Bali',
    regionZone: 'International',
    coordinates: { lat: -8.5069, lng: 115.2625 },
    category: 'nature',
    climate: 'tropical',
    estimatedCostInr: 38000,
    estimatedCostUsd: 460,
    idealDurationDays: 4,
    travelStyleFit: ['budget-friendly', 'moderate', 'luxury', 'backpacker'],
    interests: ['nature', 'relaxation', 'photography', 'cultural', 'wellness'],
    imageUrl: '/src/assets/images/dest_bali_retreat_1792213545063.jpg',
    description: 'Emerald terraced rice paddies carved into jungle ravines, water temples, holistic yoga sanctuaries, and cascading waterfalls in the cultural heart of the Island of the Gods.',
    highlights: ['Tegallalang Rice Terraces', 'Tirta Empul Holy Water Temple', 'Campuhan Ridge Walk', 'Tegenungan Jungle Waterfall'],
    bestSeason: 'Apr - Oct',
    popularityScore: 95,
    savesCount: 4210,
    viewsCount: 46800,
    distanceFromVijayawadaKm: 4300,
    sampleItinerary: [
      {
        day: 1,
        title: 'Campuhan Ridge & Ubud Palace',
        morning: 'Early morning sunrise stroll along Campuhan Ridge Walk',
        afternoon: 'Explore Ubud Royal Palace and artisan woodcarving workshops',
        evening: 'Organic farm-to-table dinner surrounded by lotus ponds',
        estCostInr: 8500
      },
      {
        day: 2,
        title: 'Tegallalang Terraces & Jungle Swings',
        morning: 'Photogenic walk through cascading layers of Tegallalang terraces',
        afternoon: 'Coffee tasting including traditional brew; jungle swing experience',
        evening: 'Traditional Balinese Legong dance performance at Saraswati Temple',
        estCostInr: 10200
      },
      {
        day: 3,
        title: 'Sacred Water Cleansing & Waterfalls',
        morning: 'Spiritual purification bath ritual (Melukat) at Tirta Empul',
        afternoon: 'Swim in the cool mist pool beneath Tegenungan Waterfall',
        evening: 'Rejuvenating Balinese flower bath and herbal massage',
        estCostInr: 10500
      },
      {
        day: 4,
        title: 'Monkey Forest & Crafts',
        morning: 'Wander among mossy roots and friendly macaques in Monkey Forest',
        afternoon: 'Shop for rattan bags, linen wear, and batik art at Ubud Art Market',
        evening: 'Farewell sunset dinner overlooking jungle ravine',
        estCostInr: 8800
      }
    ],
    expensesBreakdown: {
      accommodation: 14000,
      transport: 10000,
      food: 8000,
      activities: 6000
    },
    safetyRating: 4.8
  }
];
