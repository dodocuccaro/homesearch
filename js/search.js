// Search form handling
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const destinationSelect = document.getElementById('destination');

    // Populate destination dropdown from the destinations repository
    if (typeof DESTINATIONS !== 'undefined') {
        DESTINATIONS.forEach(function(dest) {
            const option = document.createElement('option');
            option.value = dest.value;
            option.textContent = dest.label;
            destinationSelect.appendChild(option);
        });
    }

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    checkoutInput.min = today;

    // Update checkout minimum when checkin changes
    checkinInput.addEventListener('change', function() {
        const checkinDate = new Date(this.value);
        const nextDay = new Date(checkinDate);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutInput.min = nextDay.toISOString().split('T')[0];
        
        // Reset checkout if it's before the new minimum
        if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
            checkoutInput.value = '';
        }
    });

    // Form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const destination = destinationSelect.value
            ? destinationSelect.options[destinationSelect.selectedIndex].text
            : '';
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;
        const guests = document.getElementById('guests').value;

        // Validate dates
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (checkoutDate <= checkinDate) {
            alert('Check-out date must be after check-in date');
            return;
        }

        // Store search parameters in sessionStorage
        const searchParams = {
            destination: destination,
            checkin: checkin,
            checkout: checkout,
            guests: guests,
            timestamp: new Date().toISOString()
        };

        sessionStorage.setItem('searchParams', JSON.stringify(searchParams));

        // Redirect to results page
        window.location.href = 'results.html';
    });

    // Load previous search if available
    const savedSearch = sessionStorage.getItem('searchParams');
    if (savedSearch) {
        try {
            const params = JSON.parse(savedSearch);
            // Restore destination by matching the stored label against option text
            for (let i = 0; i < destinationSelect.options.length; i++) {
                if (destinationSelect.options[i].text === params.destination) {
                    destinationSelect.selectedIndex = i;
                    break;
                }
            }
            checkinInput.value = params.checkin || '';
            checkoutInput.value = params.checkout || '';
            document.getElementById('guests').value = params.guests || '2';
        } catch (e) {
            console.error('Error loading saved search:', e);
        }
    }
});
