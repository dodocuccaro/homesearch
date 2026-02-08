// Mock property data
const properties = [
    {
        id: 1,
        name: "Luxury Villa with Sea View",
        location: "Santorini, Greece",
        type: "Villa",
        rating: 4.9,
        price: 285,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
        description: "Stunning luxury villa overlooking the Aegean Sea with infinity pool and private terrace",
        platform: "Airbnb",
        externalUrl: "https://www.airbnb.com"
    },
    {
        id: 2,
        name: "Cozy Studio in City Center",
        location: "Prague, Czech Republic",
        type: "Apartment",
        rating: 4.5,
        price: 45,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
        description: "Perfect studio apartment in the heart of Prague, walking distance to Old Town Square",
        platform: "Booking.com",
        externalUrl: "https://www.booking.com"
    },
    {
        id: 3,
        name: "Modern Loft with Eiffel View",
        location: "Paris, France",
        type: "Loft",
        rating: 4.8,
        price: 195,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
        description: "Chic modern loft with stunning views of the Eiffel Tower from the rooftop terrace",
        platform: "VRBO",
        externalUrl: "https://www.vrbo.com"
    },
    {
        id: 4,
        name: "Beachfront Bungalow",
        location: "Algarve, Portugal",
        type: "Bungalow",
        rating: 4.7,
        price: 120,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
        description: "Charming beachfront bungalow with direct access to golden sand beaches",
        platform: "Airbnb",
        externalUrl: "https://www.airbnb.com"
    },
    {
        id: 5,
        name: "Historic Canal House",
        location: "Amsterdam, Netherlands",
        type: "House",
        rating: 4.6,
        price: 165,
        image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop",
        description: "Beautiful 17th-century canal house in the Museum Quarter with authentic Dutch charm",
        platform: "Booking.com",
        externalUrl: "https://www.booking.com"
    },
    {
        id: 6,
        name: "Budget Hostel Private Room",
        location: "Barcelona, Spain",
        type: "Hostel",
        rating: 4.2,
        price: 35,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
        description: "Clean, comfortable private room in vibrant hostel near Gothic Quarter",
        platform: "Hostelworld",
        externalUrl: "https://www.hostelworld.com"
    },
    {
        id: 7,
        name: "Alpine Chalet Mountain View",
        location: "Swiss Alps, Switzerland",
        type: "Chalet",
        rating: 5.0,
        price: 320,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
        description: "Exclusive alpine chalet with breathtaking mountain views and private sauna",
        platform: "VRBO",
        externalUrl: "https://www.vrbo.com"
    },
    {
        id: 8,
        name: "Countryside Farmhouse",
        location: "Tuscany, Italy",
        type: "Farmhouse",
        rating: 4.8,
        price: 140,
        image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800&auto=format&fit=crop",
        description: "Authentic Tuscan farmhouse surrounded by vineyards and olive groves",
        platform: "Airbnb",
        externalUrl: "https://www.airbnb.com"
    },
    {
        id: 9,
        name: "Boutique Hotel Suite",
        location: "Vienna, Austria",
        type: "Hotel",
        rating: 4.7,
        price: 175,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        description: "Elegant suite in boutique hotel with baroque architecture and spa facilities",
        platform: "Booking.com",
        externalUrl: "https://www.booking.com"
    },
    {
        id: 10,
        name: "Riverside Apartment",
        location: "Budapest, Hungary",
        type: "Apartment",
        rating: 4.4,
        price: 68,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
        description: "Spacious apartment overlooking the Danube River with modern amenities",
        platform: "Airbnb",
        externalUrl: "https://www.airbnb.com"
    },
    {
        id: 11,
        name: "Penthouse with Acropolis View",
        location: "Athens, Greece",
        type: "Penthouse",
        rating: 4.9,
        price: 210,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
        description: "Luxury penthouse with panoramic views of the Acropolis and city skyline",
        platform: "VRBO",
        externalUrl: "https://www.vrbo.com"
    },
    {
        id: 12,
        name: "Eco-Friendly Treehouse",
        location: "Black Forest, Germany",
        type: "Treehouse",
        rating: 4.6,
        price: 95,
        image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=800&auto=format&fit=crop",
        description: "Unique eco-friendly treehouse experience in the heart of Black Forest",
        platform: "Airbnb",
        externalUrl: "https://www.airbnb.com"
    },
    {
        id: 13,
        name: "Coastal Cottage",
        location: "Cornwall, England",
        type: "Cottage",
        rating: 4.5,
        price: 110,
        image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=800&auto=format&fit=crop",
        description: "Charming coastal cottage with garden and short walk to sandy beaches",
        platform: "Booking.com",
        externalUrl: "https://www.booking.com"
    },
    {
        id: 14,
        name: "Designer Apartment Downtown",
        location: "Berlin, Germany",
        type: "Apartment",
        rating: 4.3,
        price: 88,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
        description: "Stylish designer apartment in trendy Mitte district with rooftop access",
        platform: "Airbnb",
        externalUrl: "https://www.airbnb.com"
    },
    {
        id: 15,
        name: "Castle Suite Experience",
        location: "Edinburgh, Scotland",
        type: "Castle",
        rating: 5.0,
        price: 299,
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
        description: "Stay in a real Scottish castle with period furnishings and modern comfort",
        platform: "VRBO",
        externalUrl: "https://www.vrbo.com"
    }
];

// Sort properties by price (ascending - cheapest first)
function sortPropertiesByPrice(props) {
    return [...props].sort((a, b) => a.price - b.price);
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '⭐';
    }
    
    return starsHTML;
}

// Create property card HTML
function createPropertyCard(property) {
    return `
        <a href="${property.externalUrl}" target="_blank" rel="noopener noreferrer" class="property-card">
            <img src="${property.image}" alt="${property.name}" class="property-image" loading="lazy">
            <div class="property-content">
                <div class="property-info">
                    <h3 class="property-title">${property.name}</h3>
                    <div class="property-location">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1C4.24 1 2 3.24 2 6C2 9.25 7 13 7 13C7 13 12 9.25 12 6C12 3.24 9.76 1 7 1ZM7 7.5C6.17 7.5 5.5 6.83 5.5 6C5.5 5.17 6.17 4.5 7 4.5C7.83 4.5 8.5 5.17 8.5 6C8.5 6.83 7.83 7.5 7 7.5Z" fill="currentColor"/>
                        </svg>
                        ${property.location}
                    </div>
                    <span class="property-type">${property.type}</span>
                    <p class="property-description">${property.description}</p>
                    <div class="property-rating">
                        ${generateStars(property.rating)}
                        <span>${property.rating}</span>
                    </div>
                </div>
            </div>
            <div class="property-platform">
                <div class="platform-name">${property.platform}</div>
                <div class="property-price">€${property.price}</div>
                <div class="price-label">per night</div>
                <div class="view-button">View on ${property.platform}</div>
            </div>
        </a>
    `;
}

// Display results
function displayResults(searchParams) {
    const sortedProperties = sortPropertiesByPrice(properties);
    const resultsContainer = document.getElementById('resultsContainer');
    const noResults = document.getElementById('noResults');
    
    if (sortedProperties.length === 0) {
        resultsContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    resultsContainer.innerHTML = sortedProperties.map(property => createPropertyCard(property)).join('');
    
    // Update search info
    const searchInfo = document.getElementById('searchInfo');
    if (searchParams) {
        const checkinDate = new Date(searchParams.checkin);
        const checkoutDate = new Date(searchParams.checkout);
        const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        
        searchInfo.textContent = `${searchParams.destination} • ${searchParams.checkin} to ${searchParams.checkout} • ${searchParams.guests} guest${searchParams.guests > 1 ? 's' : ''} • ${nights} night${nights > 1 ? 's' : ''}`;
    }
    
    // Update results count
    document.getElementById('resultsCount').textContent = `${sortedProperties.length} properties found`;
}

// View property details (placeholder function) - now opens external URL
function viewProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        window.open(property.externalUrl, '_blank');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load search parameters
    const savedSearch = sessionStorage.getItem('searchParams');
    let searchParams = null;
    
    if (savedSearch) {
        try {
            searchParams = JSON.parse(savedSearch);
        } catch (e) {
            console.error('Error loading search parameters:', e);
        }
    }
    
    // Display results
    displayResults(searchParams);
});
