# HomeSearch - Holiday Search Comparison Website

A modern, responsive holiday accommodation search and comparison website inspired by Airbnb and Booking.com for the search interface and Trovaprezzi.it for results display.

> ## ⚠️ **VIEWING THIS ON GITHUB?**
> 
> If you're viewing this on GitHub and links show "page not found", you're viewing the PR branch. The documentation files exist here in this branch but not in `main` yet.
>
> **Two ways to view the guides:**
> 1. **After PR is merged:** All links will work normally
> 2. **Right now:** Click "Files changed" tab above, then click on any .md file to view it
> 
> Or [**view all files in this branch →**](https://github.com/dodocuccaro/homesearch/tree/copilot/create-holiday-search-website)

---

> ## 🎯 **Documentation Guides** ⭐
>
> ### Not sure which guide to read? START-HERE will help you choose!
>
> ### 📚 **Quick Links to All Guides:**
> - 🔰 **[BEGINNERS-GUIDE.md](https://github.com/dodocuccaro/homesearch/blob/copilot/create-holiday-search-website/BEGINNERS-GUIDE.md)** - Never used Terminal before? Start here!
> - 🎨 **[VISUAL-GUIDE.md](https://github.com/dodocuccaro/homesearch/blob/copilot/create-holiday-search-website/VISUAL-GUIDE.md)** - Pictures and diagrams
> - ❓ **[FAQ.md](https://github.com/dodocuccaro/homesearch/blob/copilot/create-holiday-search-website/FAQ.md)** - Common questions answered
> - 📖 **[HOW-TO-VIEW.md](https://github.com/dodocuccaro/homesearch/blob/copilot/create-holiday-search-website/HOW-TO-VIEW.md)** - Complete instructions
> - ⚡ **[QUICK-START.md](https://github.com/dodocuccaro/homesearch/blob/copilot/create-holiday-search-website/QUICK-START.md)** - Just the commands
> - 🎯 **[START-HERE.md](https://github.com/dodocuccaro/homesearch/blob/copilot/create-holiday-search-website/START-HERE.md)** - Choose the right guide

![HomeSearch](https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop)

## 🌟 Features

- **Beautiful Landing Page**: Hero section with search form overlay inspired by leading travel platforms
- **Smart Search Form**: Intuitive search with destination, check-in/check-out dates, and guest selection
- **Multi-Platform Search**: Search across Airbnb, Booking.com, and VRBO simultaneously
- **Result Merging & Deduplication**: Combines results from multiple platforms and removes duplicates
- **Automatic Sorting**: Results automatically sorted by price (cheapest first)
- **Interactive Map View**: Display properties on an interactive map with Leaflet.js
- **List/Map Toggle**: Switch between list and map views of search results
- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices
- **Modern UI/UX**: Clean, professional design with smooth transitions and hover effects
- **Date Validation**: Intelligent date picker with automatic validation
- **Session Persistence**: Search parameters saved during browsing session
- **API Integration Ready**: Modular architecture supporting real API integration

## 📋 Property Features

The website showcases **15 varied holiday properties** including:

- **Destinations**: Greece, Czech Republic, France, Portugal, Netherlands, Spain, Switzerland, Italy, Austria, Hungary, Germany, England, Scotland
- **Property Types**: Villas, Apartments, Lofts, Bungalows, Houses, Hostels, Chalets, Farmhouses, Hotels, Penthouses, Treehouses, Cottages, Castles
- **Price Range**: €35 - €320 per night
- **Ratings**: 4.2 - 5.0 stars
- **High-Quality Images**: Curated from Unsplash

## 🚀 Getting Started

### Prerequisites

No build tools, frameworks, or dependencies required! This is a pure HTML/CSS/JavaScript website.

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/dodocuccaro/homesearch.git
cd homesearch
```

2. Open the website:
   - **Option 1**: Simply open `index.html` in your web browser
   - **Option 2**: Use a local server (recommended for best experience):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if you have it)
     npx http-server
     ```
   - Then navigate to `http://localhost:8000`

## 🌐 Deploying to GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select the branch you want to deploy (e.g., `main`)
4. Click **Save**
5. Your site will be published at: `https://dodocuccaro.github.io/homesearch/`

### Alternative: Using GitHub Desktop

1. Commit all your changes
2. Push to the `main` branch
3. Enable GitHub Pages in repository settings

## 📁 Project Structure

```
homesearch/
├── index.html          # Home page with search interface
├── results.html        # Results page with property listings and map
├── css/
│   └── style.css      # Complete styling (responsive design + map styles)
├── js/
│   ├── search.js      # Search form logic and validation
│   ├── results.js     # Results display controller
│   ├── config.js      # API configuration
│   ├── api-service.js # Multi-platform API service layer
│   └── map-service.js # Map integration with Leaflet.js
├── API-INTEGRATION-GUIDE.md  # Comprehensive API integration guide
└── README.md          # Documentation (this file)
```

## 🎨 Design Philosophy

### Color Scheme
- **Primary**: Blue (#0EA5E9) and Cyan (#06B6D4) - representing trust and travel
- **Typography**: Inter font family for modern, clean readability
- **Spacing**: Consistent padding and margins throughout

### User Experience
- **Mobile-First**: Designed for mobile, enhanced for desktop
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized images with lazy loading
- **Intuitive Navigation**: Clear call-to-actions and visual hierarchy

## 💻 Technical Implementation

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Flexbox and Grid layouts, CSS variables, animations
- **Vanilla JavaScript**: No frameworks or libraries required
- **Leaflet.js**: Open-source interactive map library
- **Google Fonts**: Inter font family
- **Unsplash**: High-quality property images

### Key Features Implementation

#### Multi-Platform API Integration (`api-service.js`)
- Parallel searches across multiple platforms (Airbnb, Booking.com, VRBO)
- Promise-based async operations with `Promise.allSettled()`
- Automatic result merging and deduplication
- Price-based sorting of combined results
- Mock data mode for development/testing
- Extensible adapter pattern for adding new platforms

#### Interactive Map (`map-service.js`)
- Leaflet.js for map rendering
- Marker clustering for better performance
- Custom price markers for each property
- Property popups with images and details
- Click-to-highlight property cards
- List/Map view toggle functionality

#### Search Form (`search.js`)
- Date validation (check-out must be after check-in)
- Minimum date set to today
- Form data stored in sessionStorage
- Smooth redirect to results page

#### Results Display (`results.js`)
- Dynamic HTML generation
- Async property fetching from API service
- Loading indicators during search
- Responsive grid layout
- Star rating system
- Integration with map service

## 🔮 Future Enhancements

- [x] **API Integration**: Modular architecture for connecting to real accommodation providers
- [x] **Map View**: Interactive map showing property locations with Leaflet.js
- [ ] **Advanced Filters**: Price range, amenities, property type
- [ ] **User Accounts**: Save favorites and booking history
- [ ] **Comparison Tool**: Side-by-side property comparison
- [ ] **Reviews System**: User ratings and reviews
- [ ] **Multi-language Support**: Internationalization
- [ ] **Currency Converter**: Dynamic price conversion
- [ ] **Booking System**: Complete reservation workflow
- [ ] **Dark Mode**: Theme toggle for better accessibility
- [ ] **Search History**: Recently searched destinations
- [ ] **Email Alerts**: Price drop notifications
- [ ] **Real API Keys**: Connect to actual booking platform APIs (see API-INTEGRATION-GUIDE.md)

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created with ❤️ for travelers seeking the best accommodation deals

## 🙏 Acknowledgments

- Design inspiration: Airbnb, Booking.com, Trovaprezzi.it
- Images: [Unsplash](https://unsplash.com)
- Icons: SVG icons created inline
- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

**Happy Travels! 🌍✈️**
