// API Configuration
// In a production environment, these would be environment variables
const API_CONFIG = {
    // API endpoints for different platforms
    airbnb: {
        enabled: true,
        // Note: Real Airbnb API requires partnership agreement
        // This is a placeholder for the implementation
        baseUrl: 'https://api.airbnb.com/v3',
        apiKey: process.env.AIRBNB_API_KEY || 'YOUR_AIRBNB_API_KEY',
        // For development, we'll use mock data
        useMockData: true
    },
    booking: {
        enabled: true,
        // Booking.com provides API access through their affiliate program
        baseUrl: 'https://distribution-xml.booking.com/2.9/json',
        apiKey: process.env.BOOKING_API_KEY || 'YOUR_BOOKING_API_KEY',
        useMockData: true
    },
    // Future platform integrations
    vrbo: {
        enabled: false,
        baseUrl: 'https://api.vrbo.com/v1',
        apiKey: process.env.VRBO_API_KEY || 'YOUR_VRBO_API_KEY',
        useMockData: true
    }
};

// Map API configuration
const MAP_CONFIG = {
    provider: 'leaflet', // 'leaflet' or 'google'
    // For Google Maps, you would need: googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
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
