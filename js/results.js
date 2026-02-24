// Global variables for service instances
let apiService = null;
let mapService = null;
let currentView = 'list'; // 'list' or 'map'

// Constants
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

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
        <a href="${property.externalUrl}" target="_blank" rel="noopener noreferrer" class="property-card" data-property-id="${property.id}">
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
async function displayResults(searchParams) {
    const resultsContainer = document.getElementById('resultsContainer');
    const noResults = document.getElementById('noResults');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    try {
        // Show loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
        resultsContainer.style.display = 'none';
        noResults.style.display = 'none';
        
        // Initialize API service if not already done
        if (!apiService && typeof API_CONFIG !== 'undefined') {
            apiService = new PropertyAPIService(API_CONFIG);
        }
        
        // Fetch properties from API
        let sortedProperties = [];
        if (apiService && searchParams) {
            sortedProperties = await apiService.searchProperties(searchParams);
        }
        
        // Hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        
        if (sortedProperties.length === 0) {
            resultsContainer.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        // Display results in list view
        resultsContainer.style.display = 'grid';
        resultsContainer.innerHTML = sortedProperties.map(property => createPropertyCard(property)).join('');
        
        // Update search info
        const searchInfo = document.getElementById('searchInfo');
        if (searchParams) {
            const checkinDate = new Date(searchParams.checkin);
            const checkoutDate = new Date(searchParams.checkout);
            const nights = Math.ceil((checkoutDate - checkinDate) / MILLISECONDS_PER_DAY);
            
            searchInfo.textContent = `${searchParams.destination} • ${searchParams.checkin} to ${searchParams.checkout} • ${searchParams.guests} guest${searchParams.guests > 1 ? 's' : ''} • ${nights} night${nights > 1 ? 's' : ''}`;
        }
        
        // Update results count
        document.getElementById('resultsCount').textContent = `${sortedProperties.length} properties found`;
        
        // Initialize map if map container exists and Leaflet is available
        if (typeof MAP_CONFIG !== 'undefined' && typeof MapService !== 'undefined' && typeof L !== 'undefined') {
            const mapContainer = document.getElementById('mapContainer');
            if (mapContainer && !mapService) {
                try {
                    mapService = new MapService('mapContainer', MAP_CONFIG);
                    await mapService.initMap();
                    mapService.addProperties(sortedProperties);
                } catch (error) {
                    console.warn('Map initialization failed:', error);
                    // Hide map controls if map failed to initialize
                    const mapViewBtn = document.getElementById('mapViewBtn');
                    if (mapViewBtn) {
                        mapViewBtn.style.display = 'none';
                    }
                }
            } else if (mapService) {
                mapService.addProperties(sortedProperties);
            }
        } else {
            // Hide map controls if Leaflet is not available
            const mapViewBtn = document.getElementById('mapViewBtn');
            if (mapViewBtn) {
                mapViewBtn.style.display = 'none';
            }
        }
        
        return sortedProperties;
        
    } catch (error) {
        console.error('Error displaying results:', error);
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        noResults.style.display = 'block';
        resultsContainer.style.display = 'none';
    }
}

// Toggle between list and map view
function toggleView(view) {
    currentView = view;
    
    const listBtn = document.getElementById('listViewBtn');
    const mapBtn = document.getElementById('mapViewBtn');
    
    if (view === 'list') {
        listBtn.classList.add('active');
        mapBtn.classList.remove('active');
        if (mapService) {
            mapService.toggleView(false);
        }
    } else {
        mapBtn.classList.add('active');
        listBtn.classList.remove('active');
        if (mapService) {
            mapService.toggleView(true);
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async function() {
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
    await displayResults(searchParams);
    
    // Set up view toggle buttons if they exist
    const listViewBtn = document.getElementById('listViewBtn');
    const mapViewBtn = document.getElementById('mapViewBtn');
    
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => toggleView('list'));
    }
    
    if (mapViewBtn) {
        mapViewBtn.addEventListener('click', () => toggleView('map'));
    }
});
