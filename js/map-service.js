// Map Service for displaying properties on an interactive map
// Uses Leaflet.js (open-source alternative to Google Maps)

class MapService {
    constructor(containerId, config) {
        this.containerId = containerId;
        this.config = config;
        this.map = null;
        this.markers = [];
        this.markerCluster = null;
    }

    /**
     * Initialize the map
     */
    async initMap() {
        try {
            // Create map centered on default location
            this.map = L.map(this.containerId).setView(
                [this.config.defaultCenter.lat, this.config.defaultCenter.lng],
                this.config.defaultZoom
            );

            // Add tile layer (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(this.map);

            // Initialize marker cluster group for better performance with many markers
            this.markerCluster = L.markerClusterGroup({
                maxClusterRadius: 50,
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true
            });

            this.map.addLayer(this.markerCluster);

            return this.map;
        } catch (error) {
            console.error('Error initializing map:', error);
            throw error;
        }
    }

    /**
     * Add properties to the map as markers
     */
    addProperties(properties) {
        // Clear existing markers
        this.clearMarkers();

        if (!properties || properties.length === 0) {
            return;
        }

        // Create bounds to fit all markers
        const bounds = [];

        properties.forEach((property, index) => {
            if (property.lat && property.lng) {
                const marker = this.createPropertyMarker(property, index);
                this.markers.push(marker);
                this.markerCluster.addLayer(marker);
                bounds.push([property.lat, property.lng]);
            }
        });

        // Fit map to show all markers
        if (bounds.length > 0) {
            this.map.fitBounds(bounds, {
                padding: [50, 50],
                maxZoom: 12
            });
        }
    }

    /**
     * Create a marker for a property
     */
    createPropertyMarker(property, index) {
        // Create custom icon with price
        const iconHtml = `
            <div class="map-marker" data-property-id="${property.id}">
                <div class="marker-price">€${property.price}</div>
            </div>
        `;

        const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-marker',
            iconSize: [60, 30],
            iconAnchor: [30, 30]
        });

        // Create marker
        const marker = L.marker([property.lat, property.lng], {
            icon: customIcon
        });

        // Create popup content
        const popupContent = this.createPopupContent(property);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'property-popup'
        });

        // Add click event to highlight corresponding property card
        marker.on('click', () => {
            this.highlightPropertyCard(property.id);
        });

        return marker;
    }

    /**
     * Create popup content for a property
     */
    createPopupContent(property) {
        return `
            <div class="map-popup-content">
                <img src="${property.image}" alt="${property.name}" class="popup-image">
                <div class="popup-details">
                    <h4>${property.name}</h4>
                    <p class="popup-location">${property.location}</p>
                    <div class="popup-rating">
                        ${'⭐'.repeat(Math.floor(property.rating))} ${property.rating}
                    </div>
                    <div class="popup-price">
                        <span class="price-value">€${property.price}</span>
                        <span class="price-label">per night</span>
                    </div>
                    <div class="popup-platform">${property.platform}</div>
                    <a href="${property.externalUrl}" target="_blank" rel="noopener noreferrer" class="popup-button">
                        View Details
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Highlight property card when marker is clicked
     */
    highlightPropertyCard(propertyId) {
        // Remove previous highlights
        document.querySelectorAll('.property-card').forEach(card => {
            card.classList.remove('highlighted');
        });

        // Highlight the corresponding card
        const card = document.querySelector(`[data-property-id="${propertyId}"]`);
        if (card) {
            card.classList.add('highlighted');
            // Scroll to the card
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                card.classList.remove('highlighted');
            }, 3000);
        }
    }

    /**
     * Center map on a specific property
     */
    centerOnProperty(lat, lng, zoom = 14) {
        if (this.map) {
            this.map.setView([lat, lng], zoom, {
                animate: true,
                duration: 0.5
            });
        }
    }

    /**
     * Clear all markers from the map
     */
    clearMarkers() {
        if (this.markerCluster) {
            this.markerCluster.clearLayers();
        }
        this.markers = [];
    }

    /**
     * Destroy the map instance
     */
    destroy() {
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }

    /**
     * Toggle between map and list view
     */
    toggleView(showMap) {
        const mapContainer = document.getElementById(this.containerId);
        const listContainer = document.getElementById('resultsContainer');
        
        if (showMap) {
            mapContainer.style.display = 'block';
            listContainer.style.display = 'none';
            // Invalidate size to ensure map renders correctly
            if (this.map) {
                setTimeout(() => {
                    this.map.invalidateSize();
                }, 100);
            }
        } else {
            mapContainer.style.display = 'none';
            listContainer.style.display = 'grid';
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapService;
}
