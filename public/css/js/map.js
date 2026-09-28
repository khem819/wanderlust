window.addEventListener("load", () => {

    const mapElement = document.getElementById("map");

    if (!mapElement) return;

    const token = mapElement.dataset.mapToken || "";
    const place = mapElement.dataset.mapPlace || "";

    if (!token || !window.mapboxgl) {
        mapElement.textContent = "Map is currently unavailable.";
        return;
    }

    mapboxgl.accessToken = token;

    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?limit=1&access_token=${encodeURIComponent(token)}`
    )
    .then((response) => {

        if (!response.ok) {
            throw new Error(`Map geocoding failed: ${response.status}`);
        }

        return response.json();
    })
    .then((data) => {

        const feature = data.features && data.features[0];

        if (!feature || !Array.isArray(feature.center)) {
            throw new Error("No map location found.");
        }

        // Create map at the geocoded location
        const map = new mapboxgl.Map({
            container: mapElement,
            style: "mapbox://styles/mapbox/standard",
            center: feature.center,
            zoom: 12
        });

        // Add marker
        new mapboxgl.Marker()
            .setLngLat(feature.center)
            .addTo(map);

    })
    .catch((error) => {

        console.error(error);

        mapElement.textContent =
            "Map location could not be loaded.";

    });

});