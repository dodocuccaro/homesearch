# API Integration Guide

This document explains how to integrate real APIs from accommodation booking platforms (Airbnb, Booking.com, etc.) into the HomeSearch application.

## Overview

The HomeSearch application now supports multi-platform property search with the following features:

1. **Multi-Platform Search**: Searches across Airbnb, Booking.com, and VRBO simultaneously
2. **Result Merging**: Combines results from all platforms into a single list
3. **Price Sorting**: Automatically sorts merged results by price (ascending)
4. **Deduplication**: Removes duplicate properties that appear on multiple platforms
5. **Map View**: Displays properties on an interactive map with location markers
6. **List/Map Toggle**: Switch between list and map views of search results

## Architecture

### Components

1. **config.js**: Configuration for API endpoints and credentials
2. **api-service.js**: Service layer handling API calls to different platforms
3. **map-service.js**: Map integration using Leaflet.js
4. **results.js**: Results page controller (updated to use new services)

### API Integration Approaches

There are two main approaches to integrate with booking platforms:

#### Option 1: Official APIs (Recommended)

Use official APIs provided by the platforms. This is the most reliable and legal approach.

**Airbnb:**
- Requires partnership agreement
- Not publicly available for most developers
- Alternative: Use third-party aggregators that have Airbnb partnerships

**Booking.com:**
- Available through Booking.com Affiliate Partner Program
- Free to join: https://www.booking.com/affiliate-program/
- Provides XML/JSON API for hotel searches
- Returns property data, pricing, and availability

**VRBO/HomeAway:**
- Part of Expedia Group
- API access through Expedia Partner Solutions (EPS)
- Requires partnership agreement

#### Option 2: Third-Party Aggregators

Use services that aggregate data from multiple platforms:

- **RapidAPI**: Offers various travel APIs (Booking.com, Hotels.com)
- **Amadeus Travel APIs**: Enterprise-grade travel API platform
- **SerpApi**: Web scraping service (be aware of ToS compliance)

## Setup Instructions

### 1. Obtain API Keys

#### Booking.com
1. Sign up at https://www.booking.com/affiliate-program/
2. Complete the registration process
3. Access your affiliate dashboard
4. Generate API credentials
5. Add credentials to `js/config.js`

#### RapidAPI (Alternative)
1. Sign up at https://rapidapi.com/
2. Subscribe to a travel/hotel API (e.g., "Booking.com API")
3. Get your API key from the dashboard
4. Update the configuration accordingly

### 2. Configure API Credentials

Edit `js/config.js` and add your API keys:

```javascript
const API_CONFIG = {
    airbnb: {
        enabled: true,
        baseUrl: 'YOUR_API_BASE_URL',
        apiKey: 'YOUR_AIRBNB_API_KEY',
        useMockData: false  // Set to false to use real API
    },
    booking: {
        enabled: true,
        baseUrl: 'https://distribution-xml.booking.com/2.9/json',
        apiKey: 'YOUR_BOOKING_API_KEY',
        useMockData: false  // Set to false to use real API
    }
};
```

### 3. Environment Variables (Production)

For production deployments, use environment variables instead of hardcoding API keys:

```javascript
const API_CONFIG = {
    airbnb: {
        apiKey: process.env.AIRBNB_API_KEY || 'fallback_key',
        // ... other config
    }
};
```

## Implementation Details

### API Service Layer

The `PropertyAPIService` class handles all API interactions:

```javascript
// Initialize service
const apiService = new PropertyAPIService(API_CONFIG);

// Search properties
const results = await apiService.searchProperties({
    destination: 'Paris',
    checkin: '2024-06-01',
    checkout: '2024-06-07',
    guests: 2
});
```

### Key Features

1. **Parallel Searching**: All enabled platforms are searched simultaneously using `Promise.allSettled()`
2. **Error Handling**: If one platform fails, others continue
3. **Data Normalization**: Each platform's response is normalized to a common format
4. **Deduplication**: Removes duplicate properties based on name and location
5. **Price Sorting**: Results are sorted by price in ascending order

### Map Integration

The map functionality uses Leaflet.js (open-source):

```javascript
// Initialize map
const mapService = new MapService('mapContainer', MAP_CONFIG);
await mapService.initMap();

// Add properties
mapService.addProperties(properties);

// Toggle views
mapService.toggleView(true);  // Show map
mapService.toggleView(false); // Show list
```

## Mock Data vs Real APIs

The application currently uses mock data by default (`useMockData: true`). This allows:

- Development and testing without API keys
- Demonstration of the application's capabilities
- Avoiding API rate limits during development

To switch to real APIs:
1. Set `useMockData: false` in config.js
2. Provide valid API credentials
3. Implement the API-specific normalization functions

## API Response Normalization

Each platform returns data in different formats. The normalization functions convert them to our standard format:

```javascript
{
    id: 'unique-id',
    name: 'Property Name',
    location: 'City, Country',
    type: 'Villa/Apartment/etc',
    rating: 4.5,
    price: 120,
    image: 'image-url',
    description: 'Property description',
    platform: 'Airbnb/Booking.com/VRBO',
    externalUrl: 'booking-url',
    lat: 48.8566,
    lng: 2.3522
}
```

## Cost Considerations

### Free Tiers
- **Booking.com Affiliate**: Free, commission-based revenue
- **RapidAPI**: Many APIs offer free tiers (limited requests)

### Paid Options
- Most comprehensive APIs require paid subscriptions
- Consider implementing caching to reduce API calls
- Monitor usage to stay within limits

## Rate Limiting

Implement rate limiting to avoid exceeding API quotas:

```javascript
// Add to api-service.js
class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }

    async throttle() {
        const now = Date.now();
        this.requests = this.requests.filter(
            time => now - time < this.timeWindow
        );

        if (this.requests.length >= this.maxRequests) {
            const oldestRequest = this.requests[0];
            const waitTime = this.timeWindow - (now - oldestRequest);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.requests.push(now);
    }
}
```

## Caching Strategy

Implement caching to improve performance and reduce API costs:

```javascript
class CacheService {
    constructor(ttl = 3600000) { // 1 hour default
        this.cache = new Map();
        this.ttl = ttl;
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    set(key, data) {
        this.cache.set(key, {
            data,
            expiry: Date.now() + this.ttl
        });
    }
}
```

## Security Best Practices

1. **Never commit API keys** to version control
2. Use environment variables for sensitive data
3. Implement server-side proxy for API calls in production
4. Validate and sanitize all user inputs
5. Use HTTPS for all API communications
6. Implement CORS properly if using server-side proxy

## Testing

Test the API integration:

1. **Unit Tests**: Test individual API service methods
2. **Integration Tests**: Test complete search flow
3. **Mock Testing**: Use mock data during development
4. **Error Handling**: Test API failure scenarios

## Troubleshooting

### Common Issues

1. **CORS Errors**: 
   - Solution: Implement server-side proxy
   - Many booking APIs require server-side calls

2. **Authentication Failures**:
   - Verify API key is correct
   - Check API key permissions
   - Ensure endpoint URLs are correct

3. **Rate Limiting**:
   - Implement request throttling
   - Add caching layer
   - Consider upgrading API plan

4. **Data Format Issues**:
   - Review API documentation
   - Update normalization functions
   - Add extensive error logging

## Future Enhancements

1. **Advanced Filtering**: Add filters for amenities, property type, etc.
2. **Price Tracking**: Track price changes over time
3. **Availability Calendar**: Show property availability
4. **User Reviews**: Aggregate reviews from all platforms
5. **Comparison Tool**: Side-by-side property comparison
6. **Currency Conversion**: Support multiple currencies
7. **Multi-language Support**: Internationalization

## Additional Resources

- [Booking.com Affiliate Program](https://www.booking.com/affiliate-program/)
- [RapidAPI Travel APIs](https://rapidapi.com/category/Travel)
- [Leaflet.js Documentation](https://leafletjs.com/)
- [Amadeus Travel APIs](https://developers.amadeus.com/)

## Support

For questions or issues with the API integration:

1. Check the platform's API documentation
2. Review error logs in browser console
3. Test with mock data first
4. Verify API credentials are correct
5. Check API rate limits and quotas

---

**Note**: Always comply with each platform's Terms of Service and API usage policies. Respect rate limits and implement appropriate caching and throttling mechanisms.
