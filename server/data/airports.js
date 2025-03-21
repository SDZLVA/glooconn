const airports = [
  // Asia
  // Sri Lanka
  {
    code: 'CMB',
    city: 'Colombo',
    name: 'Bandaranaike International Airport',
    country: 'Sri Lanka',
    region: 'Asia'
  },
  {
    code: 'HRI',
    city: 'Hambantota',
    name: 'Mattala Rajapaksa International Airport',
    country: 'Sri Lanka',
    region: 'Asia'
  },
  // India
  {
    code: 'DEL',
    city: 'New Delhi',
    name: 'Indira Gandhi International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'BOM',
    city: 'Mumbai',
    name: 'Chhatrapati Shivaji International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'MAA',
    city: 'Chennai',
    name: 'Chennai International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'BLR',
    city: 'Bangalore',
    name: 'Kempegowda International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'HYD',
    city: 'Hyderabad',
    name: 'Rajiv Gandhi International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'CCU',
    city: 'Kolkata',
    name: 'Netaji Subhas Chandra Bose International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'COK',
    city: 'Kochi',
    name: 'Cochin International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'TRV',
    city: 'Thiruvananthapuram',
    name: 'Trivandrum International Airport',
    country: 'India',
    region: 'Asia'
  },
  // Southeast Asia
  {
    code: 'BKK',
    city: 'Bangkok',
    name: 'Suvarnabhumi Airport',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    code: 'DMK',
    city: 'Bangkok',
    name: 'Don Mueang International Airport',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    code: 'HKT',
    city: 'Phuket',
    name: 'Phuket International Airport',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    code: 'CNX',
    city: 'Chiang Mai',
    name: 'Chiang Mai International Airport',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    code: 'SIN',
    city: 'Singapore',
    name: 'Singapore Changi Airport',
    country: 'Singapore',
    region: 'Asia'
  },
  {
    code: 'KUL',
    city: 'Kuala Lumpur',
    name: 'Kuala Lumpur International Airport',
    country: 'Malaysia',
    region: 'Asia'
  },
  {
    code: 'CGK',
    city: 'Jakarta',
    name: 'Soekarno-Hatta International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'DPS',
    city: 'Denpasar',
    name: 'Ngurah Rai International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'MNL',
    city: 'Manila',
    name: 'Ninoy Aquino International Airport',
    country: 'Philippines',
    region: 'Asia'
  },
  {
    code: 'CEB',
    city: 'Cebu',
    name: 'Mactan-Cebu International Airport',
    country: 'Philippines',
    region: 'Asia'
  },
  // East Asia
  {
    code: 'HKG',
    city: 'Hong Kong',
    name: 'Hong Kong International Airport',
    country: 'Hong Kong',
    region: 'Asia'
  },
  {
    code: 'PEK',
    city: 'Beijing',
    name: 'Beijing Capital International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'PKX',
    city: 'Beijing',
    name: 'Beijing Daxing International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'PVG',
    city: 'Shanghai',
    name: 'Shanghai Pudong International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'CAN',
    city: 'Guangzhou',
    name: 'Guangzhou Baiyun International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'SZX',
    city: 'Shenzhen',
    name: 'Shenzhen Bao\'an International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'CTU',
    city: 'Chengdu',
    name: 'Chengdu Shuangliu International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'HND',
    city: 'Tokyo',
    name: 'Haneda Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'NRT',
    city: 'Tokyo',
    name: 'Narita International Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'KIX',
    city: 'Osaka',
    name: 'Kansai International Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'ICN',
    city: 'Seoul',
    name: 'Incheon International Airport',
    country: 'South Korea',
    region: 'Asia'
  },
  {
    code: 'GMP',
    city: 'Seoul',
    name: 'Gimpo International Airport',
    country: 'South Korea',
    region: 'Asia'
  },
  {
    code: 'TPE',
    city: 'Taipei',
    name: 'Taoyuan International Airport',
    country: 'Taiwan',
    region: 'Asia'
  },
  // Central Asia and Other Asian Regions
  {
    code: 'TAS',
    city: 'Tashkent',
    name: 'Islam Karimov Tashkent International Airport',
    country: 'Uzbekistan',
    region: 'Asia'
  },
  {
    code: 'FRU',
    city: 'Bishkek',
    name: 'Manas International Airport',
    country: 'Kyrgyzstan',
    region: 'Asia'
  },
  {
    code: 'DYU',
    city: 'Dushanbe',
    name: 'Dushanbe International Airport',
    country: 'Tajikistan',
    region: 'Asia'
  },
  {
    code: 'ASB',
    city: 'Ashgabat',
    name: 'Ashgabat International Airport',
    country: 'Turkmenistan',
    region: 'Asia'
  },
  {
    code: 'IKA',
    city: 'Tehran',
    name: 'Imam Khomeini International Airport',
    country: 'Iran',
    region: 'Asia'
  },
  {
    code: 'BGW',
    city: 'Baghdad',
    name: 'Baghdad International Airport',
    country: 'Iraq',
    region: 'Asia'
  },
  {
    code: 'DAM',
    city: 'Damascus',
    name: 'Damascus International Airport',
    country: 'Syria',
    region: 'Asia'
  },
  {
    code: 'BEY',
    city: 'Beirut',
    name: 'Beirut–Rafic Hariri International Airport',
    country: 'Lebanon',
    region: 'Asia'
  },
  {
    code: 'AMM',
    city: 'Amman',
    name: 'Queen Alia International Airport',
    country: 'Jordan',
    region: 'Asia'
  },
  {
    code: 'TLV',
    city: 'Tel Aviv',
    name: 'Ben Gurion International Airport',
    country: 'Israel',
    region: 'Asia'
  },
  {
    code: 'KBL',
    city: 'Kabul',
    name: 'Hamid Karzai International Airport',
    country: 'Afghanistan',
    region: 'Asia'
  },
  {
    code: 'ISB',
    city: 'Islamabad',
    name: 'Islamabad International Airport',
    country: 'Pakistan',
    region: 'Asia'
  },
  {
    code: 'BWN',
    city: 'Bandar Seri Begawan',
    name: 'Brunei International Airport',
    country: 'Brunei',
    region: 'Asia'
  },
  {
    code: 'DIL',
    city: 'Dili',
    name: 'Presidente Nicolau Lobato International Airport',
    country: 'Timor-Leste',
    region: 'Asia'
  },
  {
    code: 'PBH',
    city: 'Paro',
    name: 'Paro International Airport',
    country: 'Bhutan',
    region: 'Asia'
  },
  {
    code: 'ULB',
    city: 'Ulaanbaatar',
    name: 'Chinggis Khaan International Airport',
    country: 'Mongolia',
    region: 'Asia'
  },
  {
    code: 'MFM',
    city: 'Macau',
    name: 'Macau International Airport',
    country: 'Macau',
    region: 'Asia'
  },
  {
    code: 'CEB',
    city: 'Cebu',
    name: 'Mactan-Cebu International Airport',
    country: 'Philippines',
    region: 'Asia'
  },
  {
    code: 'DVO',
    city: 'Davao',
    name: 'Francisco Bangoy International Airport',
    country: 'Philippines',
    region: 'Asia'
  },
  {
    code: 'KHV',
    city: 'Khabarovsk',
    name: 'Khabarovsk Novy Airport',
    country: 'Russia',
    region: 'Asia'
  },
  {
    code: 'VVO',
    city: 'Vladivostok',
    name: 'Vladivostok International Airport',
    country: 'Russia',
    region: 'Asia'
  },
  {
    code: 'ICN',
    city: 'Seoul',
    name: 'Incheon International Airport',
    country: 'South Korea',
    region: 'Asia'
  },
  {
    code: 'PUS',
    city: 'Busan',
    name: 'Gimhae International Airport',
    country: 'South Korea',
    region: 'Asia'
  },
  {
    code: 'CJU',
    city: 'Jeju',
    name: 'Jeju International Airport',
    country: 'South Korea',
    region: 'Asia'
  },
  {
    code: 'ULN',
    city: 'Ulaanbaatar',
    name: 'Buyant-Ukhaa International Airport',
    country: 'Mongolia',
    region: 'Asia'
  },
  {
    code: 'MCT',
    city: 'Muscat',
    name: 'Muscat International Airport',
    country: 'Oman',
    region: 'Asia'
  },
  {
    code: 'SLL',
    city: 'Salalah',
    name: 'Salalah Airport',
    country: 'Oman',
    region: 'Asia'
  },
  {
    code: 'KWI',
    city: 'Kuwait City',
    name: 'Kuwait International Airport',
    country: 'Kuwait',
    region: 'Asia'
  },
  {
    code: 'BAH',
    city: 'Manama',
    name: 'Bahrain International Airport',
    country: 'Bahrain',
    region: 'Asia'
  },
  {
    code: 'YNB',
    city: 'Yanbu',
    name: 'Yanbu Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'AHB',
    city: 'Abha',
    name: 'Abha Regional Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  // Middle East
  {
    code: 'DXB',
    city: 'Dubai',
    name: 'Dubai International Airport',
    country: 'UAE',
    region: 'Middle East'
  },
  {
    code: 'DWC',
    city: 'Dubai',
    name: 'Al Maktoum International Airport',
    country: 'UAE',
    region: 'Middle East'
  },
  {
    code: 'AUH',
    city: 'Abu Dhabi',
    name: 'Abu Dhabi International Airport',
    country: 'UAE',
    region: 'Middle East'
  },
  {
    code: 'DOH',
    city: 'Doha',
    name: 'Hamad International Airport',
    country: 'Qatar',
    region: 'Middle East'
  },
  {
    code: 'JED',
    city: 'Jeddah',
    name: 'King Abdulaziz International Airport',
    country: 'Saudi Arabia',
    region: 'Middle East'
  },
  {
    code: 'RUH',
    city: 'Riyadh',
    name: 'King Khalid International Airport',
    country: 'Saudi Arabia',
    region: 'Middle East'
  },
  {
    code: 'MCT',
    city: 'Muscat',
    name: 'Muscat International Airport',
    country: 'Oman',
    region: 'Middle East'
  },
  {
    code: 'BAH',
    city: 'Manama',
    name: 'Bahrain International Airport',
    country: 'Bahrain',
    region: 'Middle East'
  },
  {
    code: 'KWI',
    city: 'Kuwait City',
    name: 'Kuwait International Airport',
    country: 'Kuwait',
    region: 'Middle East'
  },
  // Europe
  {
    code: 'LHR',
    city: 'London',
    name: 'Heathrow Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'LGW',
    city: 'London',
    name: 'Gatwick Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'STN',
    city: 'London',
    name: 'Stansted Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'MAN',
    city: 'Manchester',
    name: 'Manchester Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'CDG',
    city: 'Paris',
    name: 'Charles de Gaulle Airport',
    country: 'France',
    region: 'Europe'
  },
  {
    code: 'ORY',
    city: 'Paris',
    name: 'Orly Airport',
    country: 'France',
    region: 'Europe'
  },
  {
    code: 'FRA',
    city: 'Frankfurt',
    name: 'Frankfurt Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'MUC',
    city: 'Munich',
    name: 'Munich Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'TXL',
    city: 'Berlin',
    name: 'Berlin Brandenburg Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'AMS',
    city: 'Amsterdam',
    name: 'Amsterdam Airport Schiphol',
    country: 'Netherlands',
    region: 'Europe'
  },
  {
    code: 'MAD',
    city: 'Madrid',
    name: 'Adolfo Suárez Madrid–Barajas Airport',
    country: 'Spain',
    region: 'Europe'
  },
  {
    code: 'BCN',
    city: 'Barcelona',
    name: 'Barcelona–El Prat Airport',
    country: 'Spain',
    region: 'Europe'
  },
  {
    code: 'FCO',
    city: 'Rome',
    name: 'Leonardo da Vinci International Airport',
    country: 'Italy',
    region: 'Europe'
  },
  {
    code: 'MXP',
    city: 'Milan',
    name: 'Milan Malpensa Airport',
    country: 'Italy',
    region: 'Europe'
  },
  {
    code: 'IST',
    city: 'Istanbul',
    name: 'Istanbul Airport',
    country: 'Turkey',
    region: 'Europe'
  },
  {
    code: 'SAW',
    city: 'Istanbul',
    name: 'Sabiha Gökçen International Airport',
    country: 'Turkey',
    region: 'Europe'
  },
  {
    code: 'DME',
    city: 'Moscow',
    name: 'Moscow Domodedovo Airport',
    country: 'Russia',
    region: 'Europe'
  },
  {
    code: 'SVO',
    city: 'Moscow',
    name: 'Sheremetyevo International Airport',
    country: 'Russia',
    region: 'Europe'
  },
  {
    code: 'VKO',
    city: 'Moscow',
    name: 'Vnukovo International Airport',
    country: 'Russia',
    region: 'Europe'
  },
  {
    code: 'ZRH',
    city: 'Zurich',
    name: 'Zurich Airport',
    country: 'Switzerland',
    region: 'Europe'
  },
  {
    code: 'GVA',
    city: 'Geneva',
    name: 'Geneva Airport',
    country: 'Switzerland',
    region: 'Europe'
  },
  {
    code: 'VIE',
    city: 'Vienna',
    name: 'Vienna International Airport',
    country: 'Austria',
    region: 'Europe'
  },
  {
    code: 'CPH',
    city: 'Copenhagen',
    name: 'Copenhagen Airport',
    country: 'Denmark',
    region: 'Europe'
  },
  {
    code: 'ARN',
    city: 'Stockholm',
    name: 'Stockholm Arlanda Airport',
    country: 'Sweden',
    region: 'Europe'
  },
  {
    code: 'OSL',
    city: 'Oslo',
    name: 'Oslo Airport, Gardermoen',
    country: 'Norway',
    region: 'Europe'
  },
  {
    code: 'HEL',
    city: 'Helsinki',
    name: 'Helsinki-Vantaa Airport',
    country: 'Finland',
    region: 'Europe'
  },
  // North America
  {
    code: 'JFK',
    city: 'New York',
    name: 'John F. Kennedy International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'LGA',
    city: 'New York',
    name: 'LaGuardia Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'EWR',
    city: 'Newark',
    name: 'Newark Liberty International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'LAX',
    city: 'Los Angeles',
    name: 'Los Angeles International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SFO',
    city: 'San Francisco',
    name: 'San Francisco International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'ORD',
    city: 'Chicago',
    name: 'O\'Hare International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'MDW',
    city: 'Chicago',
    name: 'Chicago Midway International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'DFW',
    city: 'Dallas',
    name: 'Dallas/Fort Worth International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'MIA',
    city: 'Miami',
    name: 'Miami International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'ATL',
    city: 'Atlanta',
    name: 'Hartsfield-Jackson Atlanta International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'DEN',
    city: 'Denver',
    name: 'Denver International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SEA',
    city: 'Seattle',
    name: 'Seattle-Tacoma International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'BOS',
    city: 'Boston',
    name: 'Boston Logan International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'LAS',
    city: 'Las Vegas',
    name: 'Harry Reid International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'YYZ',
    city: 'Toronto',
    name: 'Toronto Pearson International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YVR',
    city: 'Vancouver',
    name: 'Vancouver International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YUL',
    city: 'Montreal',
    name: 'Montréal-Pierre Elliott Trudeau International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YYC',
    city: 'Calgary',
    name: 'Calgary International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'MEX',
    city: 'Mexico City',
    name: 'Benito Juárez International Airport',
    country: 'Mexico',
    region: 'North America'
  },
  // South America
  {
    code: 'GRU',
    city: 'São Paulo',
    name: 'São Paulo/Guarulhos International Airport',
    country: 'Brazil',
    region: 'South America'
  },
  {
    code: 'CGH',
    city: 'São Paulo',
    name: 'Congonhas Airport',
    country: 'Brazil',
    region: 'South America'
  },
  {
    code: 'GIG',
    city: 'Rio de Janeiro',
    name: 'Rio de Janeiro/Galeão International Airport',
    country: 'Brazil',
    region: 'South America'
  },
  {
    code: 'BSB',
    city: 'Brasília',
    name: 'Presidente Juscelino Kubitschek International Airport',
    country: 'Brazil',
    region: 'South America'
  },
  {
    code: 'EZE',
    city: 'Buenos Aires',
    name: 'Ministro Pistarini International Airport',
    country: 'Argentina',
    region: 'South America'
  },
  {
    code: 'AEP',
    city: 'Buenos Aires',
    name: 'Jorge Newbery Airpark',
    country: 'Argentina',
    region: 'South America'
  },
  {
    code: 'SCL',
    city: 'Santiago',
    name: 'Arturo Merino Benítez International Airport',
    country: 'Chile',
    region: 'South America'
  },
  {
    code: 'LIM',
    city: 'Lima',
    name: 'Jorge Chávez International Airport',
    country: 'Peru',
    region: 'South America'
  },
  {
    code: 'BOG',
    city: 'Bogotá',
    name: 'El Dorado International Airport',
    country: 'Colombia',
    region: 'South America'
  },
  {
    code: 'CCS',
    city: 'Caracas',
    name: 'Simón Bolívar International Airport',
    country: 'Venezuela',
    region: 'South America'
  },
  // Australia & Pacific
  {
    code: 'SYD',
    city: 'Sydney',
    name: 'Sydney Airport',
    country: 'Australia',
    region: 'Oceania'
  },
  {
    code: 'MEL',
    city: 'Melbourne',
    name: 'Melbourne Airport',
    country: 'Australia',
    region: 'Oceania'
  },
  {
    code: 'BNE',
    city: 'Brisbane',
    name: 'Brisbane Airport',
    country: 'Australia',
    region: 'Oceania'
  },
  {
    code: 'PER',
    city: 'Perth',
    name: 'Perth Airport',
    country: 'Australia',
    region: 'Oceania'
  },
  {
    code: 'ADL',
    city: 'Adelaide',
    name: 'Adelaide Airport',
    country: 'Australia',
    region: 'Oceania'
  },
  {
    code: 'AKL',
    city: 'Auckland',
    name: 'Auckland Airport',
    country: 'New Zealand',
    region: 'Oceania'
  },
  {
    code: 'CHC',
    city: 'Christchurch',
    name: 'Christchurch International Airport',
    country: 'New Zealand',
    region: 'Oceania'
  },
  {
    code: 'WLG',
    city: 'Wellington',
    name: 'Wellington International Airport',
    country: 'New Zealand',
    region: 'Oceania'
  },
  {
    code: 'NAN',
    city: 'Nadi',
    name: 'Nadi International Airport',
    country: 'Fiji',
    region: 'Oceania'
  },
  // Africa
  {
    code: 'JNB',
    city: 'Johannesburg',
    name: 'O.R. Tambo International Airport',
    country: 'South Africa',
    region: 'Africa'
  },
  {
    code: 'CPT',
    city: 'Cape Town',
    name: 'Cape Town International Airport',
    country: 'South Africa',
    region: 'Africa'
  },
  {
    code: 'DUR',
    city: 'Durban',
    name: 'King Shaka International Airport',
    country: 'South Africa',
    region: 'Africa'
  },
  {
    code: 'CAI',
    city: 'Cairo',
    name: 'Cairo International Airport',
    country: 'Egypt',
    region: 'Africa'
  },
  {
    code: 'HRG',
    city: 'Hurghada',
    name: 'Hurghada International Airport',
    country: 'Egypt',
    region: 'Africa'
  },
  {
    code: 'LOS',
    city: 'Lagos',
    name: 'Murtala Muhammed International Airport',
    country: 'Nigeria',
    region: 'Africa'
  },
  {
    code: 'NBO',
    city: 'Nairobi',
    name: 'Jomo Kenyatta International Airport',
    country: 'Kenya',
    region: 'Africa'
  },
  {
    code: 'ADD',
    city: 'Addis Ababa',
    name: 'Bole International Airport',
    country: 'Ethiopia',
    region: 'Africa'
  },
  {
    code: 'CMN',
    city: 'Casablanca',
    name: 'Mohammed V International Airport',
    country: 'Morocco',
    region: 'Africa'
  },
  {
    code: 'RAK',
    city: 'Marrakesh',
    name: 'Marrakesh Menara Airport',
    country: 'Morocco',
    region: 'Africa'
  },
  // Additional Indian Airports
  {
    code: 'AMD',
    city: 'Ahmedabad',
    name: 'Sardar Vallabhbhai Patel International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'PNQ',
    city: 'Pune',
    name: 'Pune Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'JAI',
    city: 'Jaipur',
    name: 'Jaipur International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'LKO',
    city: 'Lucknow',
    name: 'Chaudhary Charan Singh International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'IXC',
    city: 'Chandigarh',
    name: 'Chandigarh International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'PAT',
    city: 'Patna',
    name: 'Jay Prakash Narayan International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'GAU',
    city: 'Guwahati',
    name: 'Lokpriya Gopinath Bordoloi International Airport',
    country: 'India',
    region: 'Asia'
  },
  // Additional Chinese Airports
  {
    code: 'SHA',
    city: 'Shanghai',
    name: 'Shanghai Hongqiao International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'XIY',
    city: "Xi'an",
    name: "Xi'an Xianyang International Airport",
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'CKG',
    city: 'Chongqing',
    name: 'Chongqing Jiangbei International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'TAO',
    city: 'Qingdao',
    name: 'Qingdao Liuting International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'HGH',
    city: 'Hangzhou',
    name: 'Hangzhou Xiaoshan International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'CSX',
    city: 'Changsha',
    name: 'Changsha Huanghua International Airport',
    country: 'China',
    region: 'Asia'
  },
  // Additional Japanese Airports
  {
    code: 'ITM',
    city: 'Osaka',
    name: 'Osaka International Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'FUK',
    city: 'Fukuoka',
    name: 'Fukuoka Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'CTS',
    city: 'Sapporo',
    name: 'New Chitose Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'NGO',
    city: 'Nagoya',
    name: 'Chubu Centrair International Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'OKA',
    city: 'Okinawa',
    name: 'Naha Airport',
    country: 'Japan',
    region: 'Asia'
  },
  // Additional Southeast Asian Airports
  {
    code: 'RGN',
    city: 'Yangon',
    name: 'Yangon International Airport',
    country: 'Myanmar',
    region: 'Asia'
  },
  {
    code: 'DAD',
    city: 'Da Nang',
    name: 'Da Nang International Airport',
    country: 'Vietnam',
    region: 'Asia'
  },
  {
    code: 'HAN',
    city: 'Hanoi',
    name: 'Noi Bai International Airport',
    country: 'Vietnam',
    region: 'Asia'
  },
  {
    code: 'SGN',
    city: 'Ho Chi Minh City',
    name: 'Tan Son Nhat International Airport',
    country: 'Vietnam',
    region: 'Asia'
  },
  {
    code: 'PNH',
    city: 'Phnom Penh',
    name: 'Phnom Penh International Airport',
    country: 'Cambodia',
    region: 'Asia'
  },
  {
    code: 'REP',
    city: 'Siem Reap',
    name: 'Siem Reap International Airport',
    country: 'Cambodia',
    region: 'Asia'
  },
  {
    code: 'VTE',
    city: 'Vientiane',
    name: 'Wattay International Airport',
    country: 'Laos',
    region: 'Asia'
  },
  {
    code: 'LPQ',
    city: 'Luang Prabang',
    name: 'Luang Prabang International Airport',
    country: 'Laos',
    region: 'Asia'
  },
  // Additional European Airports
  {
    code: 'BHX',
    city: 'Birmingham',
    name: 'Birmingham Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'EDI',
    city: 'Edinburgh',
    name: 'Edinburgh Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'GLA',
    city: 'Glasgow',
    name: 'Glasgow Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'BRS',
    city: 'Bristol',
    name: 'Bristol Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'NCL',
    city: 'Newcastle',
    name: 'Newcastle International Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'LBA',
    city: 'Leeds',
    name: 'Leeds Bradford Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  {
    code: 'EMA',
    city: 'East Midlands',
    name: 'East Midlands Airport',
    country: 'United Kingdom',
    region: 'Europe'
  },
  // Additional French Airports
  {
    code: 'LYS',
    city: 'Lyon',
    name: 'Lyon-Saint Exupéry Airport',
    country: 'France',
    region: 'Europe'
  },
  {
    code: 'MRS',
    city: 'Marseille',
    name: 'Marseille Provence Airport',
    country: 'France',
    region: 'Europe'
  },
  {
    code: 'TLS',
    city: 'Toulouse',
    name: 'Toulouse-Blagnac Airport',
    country: 'France',
    region: 'Europe'
  },
  {
    code: 'NCE',
    city: 'Nice',
    name: 'Nice Côte d\'Azur Airport',
    country: 'France',
    region: 'Europe'
  },
  {
    code: 'BOD',
    city: 'Bordeaux',
    name: 'Bordeaux-Mérignac Airport',
    country: 'France',
    region: 'Europe'
  },
  {
    code: 'NTE',
    city: 'Nantes',
    name: 'Nantes Atlantique Airport',
    country: 'France',
    region: 'Europe'
  },
  // Additional German Airports
  {
    code: 'DUS',
    city: 'Düsseldorf',
    name: 'Düsseldorf Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'HAM',
    city: 'Hamburg',
    name: 'Hamburg Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'STR',
    city: 'Stuttgart',
    name: 'Stuttgart Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'CGN',
    city: 'Cologne',
    name: 'Cologne Bonn Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'NUE',
    city: 'Nuremberg',
    name: 'Nuremberg Airport',
    country: 'Germany',
    region: 'Europe'
  },
  {
    code: 'LEJ',
    city: 'Leipzig',
    name: 'Leipzig/Halle Airport',
    country: 'Germany',
    region: 'Europe'
  },
  // Additional Italian Airports
  {
    code: 'VCE',
    city: 'Venice',
    name: 'Venice Marco Polo Airport',
    country: 'Italy',
    region: 'Europe'
  },
  {
    code: 'NAP',
    city: 'Naples',
    name: 'Naples International Airport',
    country: 'Italy',
    region: 'Europe'
  },
  {
    code: 'BLQ',
    city: 'Bologna',
    name: 'Bologna Guglielmo Marconi Airport',
    country: 'Italy',
    region: 'Europe'
  },
  {
    code: 'CTA',
    city: 'Catania',
    name: 'Catania-Fontanarossa Airport',
    country: 'Italy',
    region: 'Europe'
  },
  {
    code: 'PSA',
    city: 'Pisa',
    name: 'Pisa International Airport',
    country: 'Italy',
    region: 'Europe'
  },
  // Additional Spanish Airports
  {
    code: 'AGP',
    city: 'Málaga',
    name: 'Málaga Airport',
    country: 'Spain',
    region: 'Europe'
  },
  {
    code: 'ALC',
    city: 'Alicante',
    name: 'Alicante Airport',
    country: 'Spain',
    region: 'Europe'
  },
  {
    code: 'VLC',
    city: 'Valencia',
    name: 'Valencia Airport',
    country: 'Spain',
    region: 'Europe'
  },
  {
    code: 'SVQ',
    city: 'Seville',
    name: 'Seville Airport',
    country: 'Spain',
    region: 'Europe'
  },
  {
    code: 'BIO',
    city: 'Bilbao',
    name: 'Bilbao Airport',
    country: 'Spain',
    region: 'Europe'
  },
  // Additional US Airports
  {
    code: 'IAD',
    city: 'Washington',
    name: 'Washington Dulles International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'DCA',
    city: 'Washington',
    name: 'Ronald Reagan Washington National Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'BWI',
    city: 'Baltimore',
    name: 'Baltimore/Washington International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'PHL',
    city: 'Philadelphia',
    name: 'Philadelphia International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'DTW',
    city: 'Detroit',
    name: 'Detroit Metropolitan Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'MSP',
    city: 'Minneapolis',
    name: 'Minneapolis-Saint Paul International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'CLT',
    city: 'Charlotte',
    name: 'Charlotte Douglas International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'PHX',
    city: 'Phoenix',
    name: 'Phoenix Sky Harbor International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'IAH',
    city: 'Houston',
    name: 'George Bush Intercontinental Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'HOU',
    city: 'Houston',
    name: 'William P. Hobby Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'MCO',
    city: 'Orlando',
    name: 'Orlando International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'FLL',
    city: 'Fort Lauderdale',
    name: 'Fort Lauderdale-Hollywood International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'TPA',
    city: 'Tampa',
    name: 'Tampa International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SAN',
    city: 'San Diego',
    name: 'San Diego International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SJC',
    city: 'San Jose',
    name: 'Norman Y. Mineta San Jose International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'OAK',
    city: 'Oakland',
    name: 'Oakland International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'PDX',
    city: 'Portland',
    name: 'Portland International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SLC',
    city: 'Salt Lake City',
    name: 'Salt Lake City International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'AUS',
    city: 'Austin',
    name: 'Austin-Bergstrom International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'BNA',
    city: 'Nashville',
    name: 'Nashville International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'MSY',
    city: 'New Orleans',
    name: 'Louis Armstrong New Orleans International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'RDU',
    city: 'Raleigh',
    name: 'Raleigh-Durham International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SAT',
    city: 'San Antonio',
    name: 'San Antonio International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'RSW',
    city: 'Fort Myers',
    name: 'Southwest Florida International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'IND',
    city: 'Indianapolis',
    name: 'Indianapolis International Airport',
    country: 'United States',
    region: 'North America'
  },
  // Additional Canadian Airports
  {
    code: 'YOW',
    city: 'Ottawa',
    name: 'Ottawa Macdonald-Cartier International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YEG',
    city: 'Edmonton',
    name: 'Edmonton International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YHZ',
    city: 'Halifax',
    name: 'Halifax Stanfield International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YWG',
    city: 'Winnipeg',
    name: 'Winnipeg James Armstrong Richardson International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YQB',
    city: 'Quebec City',
    name: 'Québec City Jean Lesage International Airport',
    country: 'Canada',
    region: 'North America'
  },
  // Additional European Airports
  {
    code: 'DUB',
    city: 'Dublin',
    name: 'Dublin Airport',
    country: 'Ireland',
    region: 'Europe'
  },
  {
    code: 'SNN',
    city: 'Shannon',
    name: 'Shannon Airport',
    country: 'Ireland',
    region: 'Europe'
  },
  {
    code: 'LIS',
    city: 'Lisbon',
    name: 'Lisbon Airport',
    country: 'Portugal',
    region: 'Europe'
  },
  {
    code: 'OPO',
    city: 'Porto',
    name: 'Francisco Sá Carneiro Airport',
    country: 'Portugal',
    region: 'Europe'
  },
  {
    code: 'ATH',
    city: 'Athens',
    name: 'Athens International Airport',
    country: 'Greece',
    region: 'Europe'
  },
  {
    code: 'SKG',
    city: 'Thessaloniki',
    name: 'Thessaloniki Airport',
    country: 'Greece',
    region: 'Europe'
  },
  {
    code: 'HER',
    city: 'Heraklion',
    name: 'Heraklion International Airport',
    country: 'Greece',
    region: 'Europe'
  },
  {
    code: 'WAW',
    city: 'Warsaw',
    name: 'Warsaw Chopin Airport',
    country: 'Poland',
    region: 'Europe'
  },
  {
    code: 'KRK',
    city: 'Kraków',
    name: 'John Paul II International Airport',
    country: 'Poland',
    region: 'Europe'
  },
  {
    code: 'GDN',
    city: 'Gdańsk',
    name: 'Gdańsk Lech Wałęsa Airport',
    country: 'Poland',
    region: 'Europe'
  },
  {
    code: 'PRG',
    city: 'Prague',
    name: 'Václav Havel Airport Prague',
    country: 'Czech Republic',
    region: 'Europe'
  },
  {
    code: 'BUD',
    city: 'Budapest',
    name: 'Budapest Ferenc Liszt International Airport',
    country: 'Hungary',
    region: 'Europe'
  },
  {
    code: 'BTS',
    city: 'Bratislava',
    name: 'M. R. Štefánik Airport',
    country: 'Slovakia',
    region: 'Europe'
  },
  {
    code: 'OTP',
    city: 'Bucharest',
    name: 'Henri Coandă International Airport',
    country: 'Romania',
    region: 'Europe'
  },
  {
    code: 'SOF',
    city: 'Sofia',
    name: 'Sofia Airport',
    country: 'Bulgaria',
    region: 'Europe'
  },
  {
    code: 'BEG',
    city: 'Belgrade',
    name: 'Belgrade Nikola Tesla Airport',
    country: 'Serbia',
    region: 'Europe'
  },
  {
    code: 'ZAG',
    city: 'Zagreb',
    name: 'Zagreb Airport',
    country: 'Croatia',
    region: 'Europe'
  },
  {
    code: 'LJU',
    city: 'Ljubljana',
    name: 'Ljubljana Jože Pučnik Airport',
    country: 'Slovenia',
    region: 'Europe'
  },
  {
    code: 'TLL',
    city: 'Tallinn',
    name: 'Lennart Meri Tallinn Airport',
    country: 'Estonia',
    region: 'Europe'
  },
  {
    code: 'RIX',
    city: 'Riga',
    name: 'Riga International Airport',
    country: 'Latvia',
    region: 'Europe'
  },
  {
    code: 'VNO',
    city: 'Vilnius',
    name: 'Vilnius International Airport',
    country: 'Lithuania',
    region: 'Europe'
  },
  // Additional Asian Airports
  {
    code: 'ULN',
    city: 'Ulaanbaatar',
    name: 'Chinggis Khaan International Airport',
    country: 'Mongolia',
    region: 'Asia'
  },
  {
    code: 'KHH',
    city: 'Kaohsiung',
    name: 'Kaohsiung International Airport',
    country: 'Taiwan',
    region: 'Asia'
  },
  {
    code: 'TSA',
    city: 'Taipei',
    name: 'Taipei Songshan Airport',
    country: 'Taiwan',
    region: 'Asia'
  },
  {
    code: 'MFM',
    city: 'Macau',
    name: 'Macau International Airport',
    country: 'Macau',
    region: 'Asia'
  },
  {
    code: 'CRK',
    city: 'Clark',
    name: 'Clark International Airport',
    country: 'Philippines',
    region: 'Asia'
  },
  {
    code: 'DVO',
    city: 'Davao',
    name: 'Francisco Bangoy International Airport',
    country: 'Philippines',
    region: 'Asia'
  },
  {
    code: 'SUB',
    city: 'Surabaya',
    name: 'Juanda International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'UPG',
    city: 'Makassar',
    name: 'Sultan Hasanuddin International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'PEN',
    city: 'Penang',
    name: 'Penang International Airport',
    country: 'Malaysia',
    region: 'Asia'
  },
  {
    code: 'BKI',
    city: 'Kota Kinabalu',
    name: 'Kota Kinabalu International Airport',
    country: 'Malaysia',
    region: 'Asia'
  },
  {
    code: 'KCH',
    city: 'Kuching',
    name: 'Kuching International Airport',
    country: 'Malaysia',
    region: 'Asia'
  },
  {
    code: 'USM',
    city: 'Ko Samui',
    name: 'Samui Airport',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    code: 'CEI',
    city: 'Chiang Rai',
    name: 'Chiang Rai International Airport',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    code: 'HDY',
    city: 'Hat Yai',
    name: 'Hat Yai International Airport',
    country: 'Thailand',
    region: 'Asia'
  },
  {
    code: 'DAC',
    city: 'Dhaka',
    name: 'Hazrat Shahjalal International Airport',
    country: 'Bangladesh',
    region: 'Asia'
  },
  {
    code: 'CGP',
    city: 'Chittagong',
    name: 'Shah Amanat International Airport',
    country: 'Bangladesh',
    region: 'Asia'
  },
  {
    code: 'KTM',
    city: 'Kathmandu',
    name: 'Tribhuvan International Airport',
    country: 'Nepal',
    region: 'Asia'
  },
  {
    code: 'PKR',
    city: 'Pokhara',
    name: 'Pokhara International Airport',
    country: 'Nepal',
    region: 'Asia'
  },
  {
    code: 'MLE',
    city: 'Male',
    name: 'Velana International Airport',
    country: 'Maldives',
    region: 'Asia'
  },
  // Additional North American Airports
  {
    code: 'CLE',
    city: 'Cleveland',
    name: 'Cleveland Hopkins International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'CVG',
    city: 'Cincinnati',
    name: 'Cincinnati/Northern Kentucky International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'MCI',
    city: 'Kansas City',
    name: 'Kansas City International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'MKE',
    city: 'Milwaukee',
    name: 'Milwaukee Mitchell International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'PIT',
    city: 'Pittsburgh',
    name: 'Pittsburgh International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'STL',
    city: 'St. Louis',
    name: 'St. Louis Lambert International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'CMH',
    city: 'Columbus',
    name: 'John Glenn Columbus International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'PVD',
    city: 'Providence',
    name: 'T. F. Green Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'BDL',
    city: 'Hartford',
    name: 'Bradley International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'JAX',
    city: 'Jacksonville',
    name: 'Jacksonville International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'BUF',
    city: 'Buffalo',
    name: 'Buffalo Niagara International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'ROC',
    city: 'Rochester',
    name: 'Greater Rochester International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SYR',
    city: 'Syracuse',
    name: 'Syracuse Hancock International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'ALB',
    city: 'Albany',
    name: 'Albany International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'YSJ',
    city: 'Saint John',
    name: 'Saint John Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YFC',
    city: 'Fredericton',
    name: 'Fredericton International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YYT',
    city: 'St. John\'s',
    name: 'St. John\'s International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YQM',
    city: 'Moncton',
    name: 'Greater Moncton Roméo LeBlanc International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YQR',
    city: 'Regina',
    name: 'Regina International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YXE',
    city: 'Saskatoon',
    name: 'Saskatoon John G. Diefenbaker International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YLW',
    city: 'Kelowna',
    name: 'Kelowna International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YQT',
    city: 'Thunder Bay',
    name: 'Thunder Bay International Airport',
    country: 'Canada',
    region: 'North America'
  },
  // Additional European Airports
  {
    code: 'KBP',
    city: 'Kiev',
    name: 'Boryspil International Airport',
    country: 'Ukraine',
    region: 'Europe'
  },
  {
    code: 'IEV',
    city: 'Kiev',
    name: 'Igor Sikorsky Kyiv International Airport',
    country: 'Ukraine',
    region: 'Europe'
  },
  {
    code: 'LED',
    city: 'St. Petersburg',
    name: 'Pulkovo Airport',
    country: 'Russia',
    region: 'Europe'
  },
  {
    code: 'KGD',
    city: 'Kaliningrad',
    name: 'Khrabrovo Airport',
    country: 'Russia',
    region: 'Europe'
  },
  {
    code: 'TBS',
    city: 'Tbilisi',
    name: 'Tbilisi International Airport',
    country: 'Georgia',
    region: 'Europe'
  },
  {
    code: 'EVN',
    city: 'Yerevan',
    name: 'Zvartnots International Airport',
    country: 'Armenia',
    region: 'Europe'
  },
  {
    code: 'GYD',
    city: 'Baku',
    name: 'Heydar Aliyev International Airport',
    country: 'Azerbaijan',
    region: 'Europe'
  },
  {
    code: 'MSQ',
    city: 'Minsk',
    name: 'Minsk National Airport',
    country: 'Belarus',
    region: 'Europe'
  },
  {
    code: 'KIV',
    city: 'Chisinau',
    name: 'Chisinau International Airport',
    country: 'Moldova',
    region: 'Europe'
  },
  // Additional Asian Airports
  {
    code: 'BBI',
    city: 'Bhubaneswar',
    name: 'Biju Patnaik International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'IXM',
    city: 'Madurai',
    name: 'Madurai Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'VTZ',
    city: 'Visakhapatnam',
    name: 'Visakhapatnam Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'IXR',
    city: 'Ranchi',
    name: 'Birsa Munda Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'RPR',
    city: 'Raipur',
    name: 'Swami Vivekananda Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'URC',
    city: 'Urumqi',
    name: 'Urumqi Diwopu International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'KMG',
    city: 'Kunming',
    name: 'Kunming Changshui International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'NKG',
    city: 'Nanjing',
    name: 'Nanjing Lukou International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'FOC',
    city: 'Fuzhou',
    name: 'Fuzhou Changle International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'TNA',
    city: 'Jinan',
    name: 'Jinan Yaoqiang International Airport',
    country: 'China',
    region: 'Asia'
  },
  {
    code: 'KMQ',
    city: 'Komatsu',
    name: 'Komatsu Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'SDJ',
    city: 'Sendai',
    name: 'Sendai Airport',
    country: 'Japan',
    region: 'Asia'
  },
  {
    code: 'TAE',
    city: 'Daegu',
    name: 'Daegu International Airport',
    country: 'South Korea',
    region: 'Asia'
  },
  {
    code: 'CJJ',
    city: 'Cheongju',
    name: 'Cheongju International Airport',
    country: 'South Korea',
    region: 'Asia'
  },
  // Additional North American Airports
  {
    code: 'ONT',
    city: 'Ontario',
    name: 'Ontario International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'BUR',
    city: 'Burbank',
    name: 'Hollywood Burbank Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SNA',
    city: 'Santa Ana',
    name: 'John Wayne Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'SMF',
    city: 'Sacramento',
    name: 'Sacramento International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'ABQ',
    city: 'Albuquerque',
    name: 'Albuquerque International Sunport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'TUS',
    city: 'Tucson',
    name: 'Tucson International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'ELP',
    city: 'El Paso',
    name: 'El Paso International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'OKC',
    city: 'Oklahoma City',
    name: 'Will Rogers World Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'TUL',
    city: 'Tulsa',
    name: 'Tulsa International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'OMA',
    city: 'Omaha',
    name: 'Eppley Airfield',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'BOI',
    city: 'Boise',
    name: 'Boise Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'GEG',
    city: 'Spokane',
    name: 'Spokane International Airport',
    country: 'United States',
    region: 'North America'
  },
  {
    code: 'YXX',
    city: 'Abbotsford',
    name: 'Abbotsford International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YCD',
    city: 'Nanaimo',
    name: 'Nanaimo Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YXS',
    city: 'Prince George',
    name: 'Prince George Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YXC',
    city: 'Cranbrook',
    name: 'Canadian Rockies International Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YQL',
    city: 'Lethbridge',
    name: 'Lethbridge Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YXH',
    city: 'Medicine Hat',
    name: 'Medicine Hat Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YQU',
    city: 'Grande Prairie',
    name: 'Grande Prairie Airport',
    country: 'Canada',
    region: 'North America'
  },
  {
    code: 'YZF',
    city: 'Yellowknife',
    name: 'Yellowknife Airport',
    country: 'Canada',
    region: 'North America'
  },
  // Additional South Asian Airports
  {
    code: 'ZYL',
    city: 'Sylhet',
    name: 'Osmani International Airport',
    country: 'Bangladesh',
    region: 'Asia'
  },
  {
    code: 'JSR',
    city: 'Jashore',
    name: 'Jashore Airport',
    country: 'Bangladesh',
    region: 'Asia'
  },
  {
    code: 'BZL',
    city: 'Barisal',
    name: 'Barisal Airport',
    country: 'Bangladesh',
    region: 'Asia'
  },
  {
    code: 'SKT',
    city: 'Sialkot',
    name: 'Sialkot International Airport',
    country: 'Pakistan',
    region: 'Asia'
  },
  {
    code: 'PEW',
    city: 'Peshawar',
    name: 'Peshawar International Airport',
    country: 'Pakistan',
    region: 'Asia'
  },
  {
    code: 'MUX',
    city: 'Multan',
    name: 'Multan International Airport',
    country: 'Pakistan',
    region: 'Asia'
  },
  {
    code: 'KHI',
    city: 'Karachi',
    name: 'Jinnah International Airport',
    country: 'Pakistan',
    region: 'Asia'
  },
  {
    code: 'LHE',
    city: 'Lahore',
    name: 'Allama Iqbal International Airport',
    country: 'Pakistan',
    region: 'Asia'
  },
  {
    code: 'BHO',
    city: 'Bhopal',
    name: 'Raja Bhoj Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'NAG',
    city: 'Nagpur',
    name: 'Dr. Babasaheb Ambedkar International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'SXR',
    city: 'Srinagar',
    name: 'Sheikh ul-Alam International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'IXB',
    city: 'Siliguri',
    name: 'Bagdogra Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'GOP',
    city: 'Gorakhpur',
    name: 'Gorakhpur Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'BDO',
    city: 'Bandung',
    name: 'Husein Sastranegara International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'JOG',
    city: 'Yogyakarta',
    name: 'Yogyakarta International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'KNO',
    city: 'Medan',
    name: 'Kualanamu International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'PKU',
    city: 'Pekanbaru',
    name: 'Sultan Syarif Kasim II International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'PLM',
    city: 'Palembang',
    name: 'Sultan Mahmud Badaruddin II International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'PKY',
    city: 'Palangkaraya',
    name: 'Tjilik Riwut Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'BPN',
    city: 'Balikpapan',
    name: 'Sultan Aji Muhammad Sulaiman Sepinggan International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'MDC',
    city: 'Manado',
    name: 'Sam Ratulangi International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'KOE',
    city: 'Kupang',
    name: 'El Tari International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'AMI',
    city: 'Mataram',
    name: 'Lombok International Airport',
    country: 'Indonesia',
    region: 'Asia'
  },
  {
    code: 'TRZ',
    city: 'Tiruchirappalli',
    name: 'Tiruchirappalli International Airport',
    country: 'India',
    region: 'Asia'
  },
  {
    code: 'VNS',
    city: 'Varanasi',
    name: 'Lal Bahadur Shastri International Airport',
    country: 'India',
    region: 'Asia'
  },
  // Additional Southeast Asian Airports
  {
    code: 'NPE',
    city: 'Napyidaw',
    name: 'Naypyidaw International Airport',
    country: 'Myanmar',
    region: 'Asia'
  },
  {
    code: 'MDL',
    city: 'Mandalay',
    name: 'Mandalay International Airport',
    country: 'Myanmar',
    region: 'Asia'
  },
  {
    code: 'NYU',
    city: 'Nyaung U',
    name: 'Nyaung U Airport',
    country: 'Myanmar',
    region: 'Asia'
  },
  {
    code: 'HEH',
    city: 'Heho',
    name: 'Heho Airport',
    country: 'Myanmar',
    region: 'Asia'
  },
  {
    code: 'PKZ',
    city: 'Pakse',
    name: 'Pakse International Airport',
    country: 'Laos',
    region: 'Asia'
  },
  {
    code: 'LXG',
    city: 'Luang Namtha',
    name: 'Luang Namtha Airport',
    country: 'Laos',
    region: 'Asia'
  },
  {
    code: 'ZVK',
    city: 'Savannakhet',
    name: 'Savannakhet Airport',
    country: 'Laos',
    region: 'Asia'
  },
  {
    code: 'UIH',
    city: 'Qui Nhon',
    name: 'Phu Cat Airport',
    country: 'Vietnam',
    region: 'Asia'
  },
  {
    code: 'VCS',
    city: 'Con Dao',
    name: 'Con Dao Airport',
    country: 'Vietnam',
    region: 'Asia'
  },
  {
    code: 'PQC',
    city: 'Phu Quoc',
    name: 'Phu Quoc International Airport',
    country: 'Vietnam',
    region: 'Asia'
  },
  {
    code: 'VCL',
    city: 'Tam Ky',
    name: 'Chu Lai International Airport',
    country: 'Vietnam',
    region: 'Asia'
  },
  {
    code: 'KOS',
    city: 'Sihanoukville',
    name: 'Sihanoukville International Airport',
    country: 'Cambodia',
    region: 'Asia'
  },
  // Additional Middle Eastern Airports
  {
    code: 'MED',
    city: 'Medina',
    name: 'Prince Mohammad bin Abdulaziz International Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'DMM',
    city: 'Dammam',
    name: 'King Fahd International Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'TIF',
    city: 'Taif',
    name: 'Taif Regional Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'ELQ',
    city: 'Buraidah',
    name: 'Prince Nayef bin Abdulaziz Regional Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'GIZ',
    city: 'Jizan',
    name: 'King Abdullah bin Abdulaziz Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'HAS',
    city: 'Hail',
    name: 'Hail Regional Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'TUU',
    city: 'Tabuk',
    name: 'Tabuk Regional Airport',
    country: 'Saudi Arabia',
    region: 'Asia'
  },
  {
    code: 'SHJ',
    city: 'Sharjah',
    name: 'Sharjah International Airport',
    country: 'UAE',
    region: 'Asia'
  },
  {
    code: 'AAN',
    city: 'Al Ain',
    name: 'Al Ain International Airport',
    country: 'UAE',
    region: 'Asia'
  },
  {
    code: 'FJR',
    city: 'Fujairah',
    name: 'Fujairah International Airport',
    country: 'UAE',
    region: 'Asia'
  },
  {
    code: 'RKT',
    city: 'Ras Al Khaimah',
    name: 'Ras Al Khaimah International Airport',
    country: 'UAE',
    region: 'Asia'
  },
  {
    code: 'KWI',
    city: 'Kuwait City',
    name: 'Kuwait International Airport',
    country: 'Kuwait',
    region: 'Asia'
  },
  {
    code: 'BSR',
    city: 'Basra',
    name: 'Basra International Airport',
    country: 'Iraq',
    region: 'Asia'
  },
  {
    code: 'NJF',
    city: 'Najaf',
    name: 'Al Najaf International Airport',
    country: 'Iraq',
    region: 'Asia'
  },
  {
    code: 'ISU',
    city: 'Sulaymaniyah',
    name: 'Sulaymaniyah International Airport',
    country: 'Iraq',
    region: 'Asia'
  },
  {
    code: 'EBL',
    city: 'Erbil',
    name: 'Erbil International Airport',
    country: 'Iraq',
    region: 'Asia'
  },
  {
    code: 'AQJ',
    city: 'Aqaba',
    name: 'King Hussein International Airport',
    country: 'Jordan',
    region: 'Asia'
  },
  {
    code: 'MHD',
    city: 'Mashhad',
    name: 'Mashhad International Airport',
    country: 'Iran',
    region: 'Asia'
  },
  {
    code: 'SYZ',
    city: 'Shiraz',
    name: 'Shiraz International Airport',
    country: 'Iran',
    region: 'Asia'
  },
  {
    code: 'IFN',
    city: 'Isfahan',
    name: 'Isfahan International Airport',
    country: 'Iran',
    region: 'Asia'
  },
  {
    code: 'TBZ',
    city: 'Tabriz',
    name: 'Tabriz International Airport',
    country: 'Iran',
    region: 'Asia'
  }
];

// Helper function to search airports
const searchAirports = (query) => {
  if (!query) return [];
  
  const searchTerm = query.toLowerCase().trim();
  console.log('Searching for:', searchTerm);
  
  const results = airports.filter(airport => {
    const cityMatch = airport.city.toLowerCase().includes(searchTerm);
    const codeMatch = airport.code.toLowerCase().includes(searchTerm);
    const countryMatch = airport.country.toLowerCase().includes(searchTerm);
    const nameMatch = airport.name.toLowerCase().includes(searchTerm);
    
    return cityMatch || codeMatch || countryMatch || nameMatch;
  });
  
  console.log('Found', results.length, 'results');
  return results;
};

// Export both the airports array and search function
module.exports = {
  airports,
  searchAirports
}; 