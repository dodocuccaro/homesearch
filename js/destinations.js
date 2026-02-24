// Standardized destination repository
// Each destination has a unique value (used internally) and a display label (City, Country in English)
const DESTINATIONS = [
    { value: "algarve-portugal", label: "Algarve, Portugal" },
    { value: "amsterdam-netherlands", label: "Amsterdam, Netherlands" },
    { value: "athens-greece", label: "Athens, Greece" },
    { value: "barcelona-spain", label: "Barcelona, Spain" },
    { value: "berlin-germany", label: "Berlin, Germany" },
    { value: "black-forest-germany", label: "Black Forest, Germany" },
    { value: "brussels-belgium", label: "Brussels, Belgium" },
    { value: "budapest-hungary", label: "Budapest, Hungary" },
    { value: "copenhagen-denmark", label: "Copenhagen, Denmark" },
    { value: "cornwall-england", label: "Cornwall, England" },
    { value: "dubrovnik-croatia", label: "Dubrovnik, Croatia" },
    { value: "edinburgh-scotland", label: "Edinburgh, Scotland" },
    { value: "florence-italy", label: "Florence, Italy" },
    { value: "lisbon-portugal", label: "Lisbon, Portugal" },
    { value: "london-england", label: "London, England" },
    { value: "madrid-spain", label: "Madrid, Spain" },
    { value: "milan-italy", label: "Milan, Italy" },
    { value: "munich-germany", label: "Munich, Germany" },
    { value: "paris-france", label: "Paris, France" },
    { value: "prague-czech-republic", label: "Prague, Czech Republic" },
    { value: "rome-italy", label: "Rome, Italy" },
    { value: "santorini-greece", label: "Santorini, Greece" },
    { value: "seville-spain", label: "Seville, Spain" },
    { value: "stockholm-sweden", label: "Stockholm, Sweden" },
    { value: "swiss-alps-switzerland", label: "Swiss Alps, Switzerland" },
    { value: "tuscany-italy", label: "Tuscany, Italy" },
    { value: "vienna-austria", label: "Vienna, Austria" },
    { value: "warsaw-poland", label: "Warsaw, Poland" }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DESTINATIONS;
}
