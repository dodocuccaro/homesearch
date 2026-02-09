// API Service Layer for Property Search
// This module handles API calls to different booking platforms

class PropertyAPIService {
    constructor(config) {
        this.config = config;
    }

    /**
     * Search properties across all enabled platforms
     * @param {Object} searchParams - Search parameters (destination, checkin, checkout, guests)
     * @returns {Promise<Array>} - Combined and sorted property results
     */
    async searchProperties(searchParams) {
        const { destination, checkin, checkout, guests } = searchParams;
        
        try {
            // Start searches on all enabled platforms in parallel
            const searchPromises = [];
            
            if (this.config.airbnb.enabled) {
                searchPromises.push(this.searchAirbnb(searchParams));
            }
            
            if (this.config.booking.enabled) {
                searchPromises.push(this.searchBooking(searchParams));
            }
            
            if (this.config.vrbo.enabled) {
                searchPromises.push(this.searchVRBO(searchParams));
            }
            
            // Wait for all searches to complete
            const results = await Promise.allSettled(searchPromises);
            
            // Combine successful results
            const allProperties = [];
            results.forEach(result => {
                if (result.status === 'fulfilled' && Array.isArray(result.value)) {
                    allProperties.push(...result.value);
                } else if (result.status === 'rejected') {
                    console.error('Platform search failed:', result.reason);
                }
            });
            
            // Remove duplicates based on name and location
            const uniqueProperties = this.deduplicateProperties(allProperties);
            
            // Sort by price (ascending)
            return this.sortByPrice(uniqueProperties);
            
        } catch (error) {
            console.error('Error searching properties:', error);
            throw error;
        }
    }

    /**
     * Search Airbnb properties
     */
    async searchAirbnb(searchParams) {
        if (this.config.airbnb.useMockData) {
            return this.getAirbnbMockData(searchParams);
        }
        
        // Real API implementation would go here
        try {
            const response = await fetch(`${this.config.airbnb.baseUrl}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Airbnb-API-Key': this.config.airbnb.apiKey
                },
                body: JSON.stringify({
                    location: searchParams.destination,
                    checkin: searchParams.checkin,
                    checkout: searchParams.checkout,
                    guests: searchParams.guests
                })
            });
            
            if (!response.ok) {
                throw new Error(`Airbnb API error: ${response.status}`);
            }
            
            const data = await response.json();
            return this.normalizeAirbnbData(data);
        } catch (error) {
            console.error('Airbnb API error:', error);
            return [];
        }
    }

    /**
     * Search Booking.com properties
     */
    async searchBooking(searchParams) {
        if (this.config.booking.useMockData) {
            return this.getBookingMockData(searchParams);
        }
        
        // Real API implementation would go here
        try {
            const response = await fetch(`${this.config.booking.baseUrl}/hotels`, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${btoa(this.config.booking.apiKey)}`,
                    'Content-Type': 'application/json'
                },
                // Query parameters would be added here
            });
            
            if (!response.ok) {
                throw new Error(`Booking.com API error: ${response.status}`);
            }
            
            const data = await response.json();
            return this.normalizeBookingData(data);
        } catch (error) {
            console.error('Booking.com API error:', error);
            return [];
        }
    }

    /**
     * Search VRBO properties
     */
    async searchVRBO(searchParams) {
        if (this.config.vrbo.useMockData) {
            return this.getVRBOMockData(searchParams);
        }
        
        // Real API implementation would go here
        try {
            const response = await fetch(`${this.config.vrbo.baseUrl}/properties/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.vrbo.apiKey}`
                },
                body: JSON.stringify({
                    location: searchParams.destination,
                    arrival: searchParams.checkin,
                    departure: searchParams.checkout,
                    adults: searchParams.guests
                })
            });
            
            if (!response.ok) {
                throw new Error(`VRBO API error: ${response.status}`);
            }
            
            const data = await response.json();
            return this.normalizeVRBOData(data);
        } catch (error) {
            console.error('VRBO API error:', error);
            return [];
        }
    }

    /**
     * Get mock Airbnb data for development/testing
     */
    getAirbnbMockData(searchParams) {
        // Simulate API delay
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 'airbnb-1',
                        name: "Luxury Villa with Sea View",
                        location: "Santorini, Greece",
                        type: "Villa",
                        rating: 4.9,
                        price: 285,
                        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
                        description: "Stunning luxury villa overlooking the Aegean Sea with infinity pool and private terrace",
                        platform: "Airbnb",
                        externalUrl: "https://www.airbnb.com",
                        lat: 36.3932,
                        lng: 25.4615
                    },
                    {
                        id: 'airbnb-4',
                        name: "Beachfront Bungalow",
                        location: "Algarve, Portugal",
                        type: "Bungalow",
                        rating: 4.7,
                        price: 120,
                        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
                        description: "Charming beachfront bungalow with direct access to golden sand beaches",
                        platform: "Airbnb",
                        externalUrl: "https://www.airbnb.com",
                        lat: 37.0179,
                        lng: -7.9304
                    },
                    {
                        id: 'airbnb-8',
                        name: "Countryside Farmhouse",
                        location: "Tuscany, Italy",
                        type: "Farmhouse",
                        rating: 4.8,
                        price: 140,
                        image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800&auto=format&fit=crop",
                        description: "Authentic Tuscan farmhouse surrounded by vineyards and olive groves",
                        platform: "Airbnb",
                        externalUrl: "https://www.airbnb.com",
                        lat: 43.7696,
                        lng: 11.2558
                    },
                    {
                        id: 'airbnb-10',
                        name: "Riverside Apartment",
                        location: "Budapest, Hungary",
                        type: "Apartment",
                        rating: 4.4,
                        price: 68,
                        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
                        description: "Spacious apartment overlooking the Danube River with modern amenities",
                        platform: "Airbnb",
                        externalUrl: "https://www.airbnb.com",
                        lat: 47.4979,
                        lng: 19.0402
                    },
                    {
                        id: 'airbnb-12',
                        name: "Eco-Friendly Treehouse",
                        location: "Black Forest, Germany",
                        type: "Treehouse",
                        rating: 4.6,
                        price: 95,
                        image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=800&auto=format&fit=crop",
                        description: "Unique eco-friendly treehouse experience in the heart of Black Forest",
                        platform: "Airbnb",
                        externalUrl: "https://www.airbnb.com",
                        lat: 48.3668,
                        lng: 8.2041
                    },
                    {
                        id: 'airbnb-14',
                        name: "Designer Apartment Downtown",
                        location: "Berlin, Germany",
                        type: "Apartment",
                        rating: 4.3,
                        price: 88,
                        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
                        description: "Stylish designer apartment in trendy Mitte district with rooftop access",
                        platform: "Airbnb",
                        externalUrl: "https://www.airbnb.com",
                        lat: 52.5200,
                        lng: 13.4050
                    }
                ]);
            }, 500);
        });
    }

    /**
     * Get mock Booking.com data for development/testing
     */
    getBookingMockData(searchParams) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 'booking-2',
                        name: "Cozy Studio in City Center",
                        location: "Prague, Czech Republic",
                        type: "Apartment",
                        rating: 4.5,
                        price: 45,
                        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
                        description: "Perfect studio apartment in the heart of Prague, walking distance to Old Town Square",
                        platform: "Booking.com",
                        externalUrl: "https://www.booking.com",
                        lat: 50.0755,
                        lng: 14.4378
                    },
                    {
                        id: 'booking-5',
                        name: "Historic Canal House",
                        location: "Amsterdam, Netherlands",
                        type: "House",
                        rating: 4.6,
                        price: 165,
                        image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop",
                        description: "Beautiful 17th-century canal house in the Museum Quarter with authentic Dutch charm",
                        platform: "Booking.com",
                        externalUrl: "https://www.booking.com",
                        lat: 52.3676,
                        lng: 4.9041
                    },
                    {
                        id: 'booking-9',
                        name: "Boutique Hotel Suite",
                        location: "Vienna, Austria",
                        type: "Hotel",
                        rating: 4.7,
                        price: 175,
                        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
                        description: "Elegant suite in boutique hotel with baroque architecture and spa facilities",
                        platform: "Booking.com",
                        externalUrl: "https://www.booking.com",
                        lat: 48.2082,
                        lng: 16.3738
                    },
                    {
                        id: 'booking-13',
                        name: "Coastal Cottage",
                        location: "Cornwall, England",
                        type: "Cottage",
                        rating: 4.5,
                        price: 110,
                        image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=800&auto=format&fit=crop",
                        description: "Charming coastal cottage with garden and short walk to sandy beaches",
                        platform: "Booking.com",
                        externalUrl: "https://www.booking.com",
                        lat: 50.2660,
                        lng: -5.0527
                    }
                ]);
            }, 600);
        });
    }

    /**
     * Get mock VRBO data for development/testing
     */
    getVRBOMockData(searchParams) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 'vrbo-3',
                        name: "Modern Loft with Eiffel View",
                        location: "Paris, France",
                        type: "Loft",
                        rating: 4.8,
                        price: 195,
                        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
                        description: "Chic modern loft with stunning views of the Eiffel Tower from the rooftop terrace",
                        platform: "VRBO",
                        externalUrl: "https://www.vrbo.com",
                        lat: 48.8566,
                        lng: 2.3522
                    },
                    {
                        id: 'vrbo-7',
                        name: "Alpine Chalet Mountain View",
                        location: "Swiss Alps, Switzerland",
                        type: "Chalet",
                        rating: 5.0,
                        price: 320,
                        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
                        description: "Exclusive alpine chalet with breathtaking mountain views and private sauna",
                        platform: "VRBO",
                        externalUrl: "https://www.vrbo.com",
                        lat: 46.8182,
                        lng: 8.2275
                    },
                    {
                        id: 'vrbo-11',
                        name: "Penthouse with Acropolis View",
                        location: "Athens, Greece",
                        type: "Penthouse",
                        rating: 4.9,
                        price: 210,
                        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
                        description: "Luxury penthouse with panoramic views of the Acropolis and city skyline",
                        platform: "VRBO",
                        externalUrl: "https://www.vrbo.com",
                        lat: 37.9838,
                        lng: 23.7275
                    },
                    {
                        id: 'vrbo-15',
                        name: "Castle Suite Experience",
                        location: "Edinburgh, Scotland",
                        type: "Castle",
                        rating: 5.0,
                        price: 299,
                        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
                        description: "Stay in a real Scottish castle with period furnishings and modern comfort",
                        platform: "VRBO",
                        externalUrl: "https://www.vrbo.com",
                        lat: 55.9533,
                        lng: -3.1883
                    }
                ]);
            }, 550);
        });
    }

    /**
     * Normalize Airbnb API response to common format
     */
    normalizeAirbnbData(data) {
        // Transform Airbnb-specific format to our common format
        // This would depend on the actual Airbnb API response structure
        return data;
    }

    /**
     * Normalize Booking.com API response to common format
     */
    normalizeBookingData(data) {
        // Transform Booking.com-specific format to our common format
        return data;
    }

    /**
     * Normalize VRBO API response to common format
     */
    normalizeVRBOData(data) {
        // Transform VRBO-specific format to our common format
        return data;
    }

    /**
     * Remove duplicate properties based on name and location similarity
     */
    deduplicateProperties(properties) {
        const uniqueMap = new Map();
        
        properties.forEach(property => {
            const key = `${property.name.toLowerCase()}-${property.location.toLowerCase()}`;
            
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, property);
            } else {
                // Keep the one with better price
                const existing = uniqueMap.get(key);
                if (property.price < existing.price) {
                    uniqueMap.set(key, property);
                }
            }
        });
        
        return Array.from(uniqueMap.values());
    }

    /**
     * Sort properties by price (ascending)
     */
    sortByPrice(properties) {
        return [...properties].sort((a, b) => a.price - b.price);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PropertyAPIService;
}
