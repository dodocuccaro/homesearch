// Search form handling
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

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
        const destination = document.getElementById('destination').value;
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
            document.getElementById('destination').value = params.destination || '';
            checkinInput.value = params.checkin || '';
            checkoutInput.value = params.checkout || '';
            document.getElementById('guests').value = params.guests || '2';
        } catch (e) {
            console.error('Error loading saved search:', e);
        }
    }
});
