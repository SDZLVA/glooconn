# GlooConn - Flight Search Application

A modern web application for searching and booking flights using the Amadeus API.

## Features

- Real-time airport search with autocomplete
- Flight search with multiple filters
- Price analysis and comparison
- Seat map visualization
- Flight status tracking
- Responsive design for all devices

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- API: Amadeus Flight Search API
- Database: MongoDB (for user data and bookings)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Amadeus API credentials

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=5000
MONGODB_URI=your_mongodb_uri
NODE_ENV=development

# Amadeus API
AMADEUS_CLIENT_ID=your_amadeus_client_id
AMADEUS_CLIENT_SECRET=your_amadeus_client_secret
AMADEUS_ENV=test

# Client
REACT_APP_API_URL=http://localhost:5000
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/glooconn.git
cd glooconn
```

2. Install dependencies:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Start the development servers:
```bash
# Start the server (from server directory)
npm start

# Start the client (from client directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

- `GET /api/flights/airports/search` - Search airports
- `GET /api/flights/search` - Search flights
- `GET /api/flights/:offerId/seatmap` - Get seat map
- `GET /api/flights/price-analysis` - Get price analysis
- `GET /api/flights/status/:flightNumber` - Get flight status
- `GET /api/flights/airports/:iataCode` - Get airport info

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 