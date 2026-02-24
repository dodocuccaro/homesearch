// API Configuration
// =================
//
// HOW TO GET REAL HOTEL AVAILABILITY DATA (Booking.com):
//
//   This app uses RapidAPI to access live Booking.com hotel data.
//   RapidAPI is a free API marketplace – no partnership with Booking.com required.
//
//   Steps to enable real data:
//     1. Create a FREE account at https://rapidapi.com
//     2. Go to https://rapidapi.com/apidojo/api/booking-com15 and click "Subscribe to Test"
//        (free tier available – check current limits on the RapidAPI page)
//     3. Copy your "X-RapidAPI-Key" shown in the code examples on that page
//     4. Paste it below to replace 'YOUR_RAPIDAPI_KEY'
//     5. Set  useMockData: false
//
//   Without a real key the app shows sample/demo data.
//
const API_CONFIG = {
    // RapidAPI – Booking.com hotel search (free tier available, no partnership needed)
    rapidapi: {
        enabled: true,
        apiKey: 'fb4900e267mshc72956dabe1e23fp12fefdjsn862210343379', // ← paste your key from rapidapi.com here
        host: 'booking-com15.p.rapidapi.com',
        useMockData: false            // ← set to true to use demo/sample data instead
    },

    // NOTE: Airbnb does not offer a public API (official partnership required).
    airbnb: {
        enabled: true,
        baseUrl: 'https://api.airbnb.com/v3',
        apiKey: 'YOUR_AIRBNB_API_KEY',
        useMockData: true
    },

    // NOTE: VRBO does not offer a public API (official partnership required).
    vrbo: {
        enabled: false,
        baseUrl: 'https://api.vrbo.com/v1',
        apiKey: 'YOUR_VRBO_API_KEY',
        useMockData: true
    }
};

// Map API configuration
const MAP_CONFIG = {
    provider: 'leaflet', // 'leaflet' or 'google'
    // For Google Maps, you would need: googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    defaultCenter: {
        lat: 48.8566,
        lng: 2.3522
    },
    defaultZoom: 6
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, MAP_CONFIG };
}
