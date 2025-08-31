import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";

const plants = [
  { name: "XYZ Hydrogen Plant", lat: 12.9716, lng: 77.5946 }, // Bangalore
  { name: "ABC Hydrogen Plant", lat: 19.076, lng: 72.8777 },   // Mumbai
  { name: "DEF Hydrogen Plant", lat: 22.5726, lng: 88.3639 },  // Kolkata
  { name: "XYZ Green Hydrogen Plant", lat: 13.0827, lng: 80.2707 }, // Chennai
];

// HQ (Delhi)
const myLocation = { name: "My HQ", lat: 28.6139, lng: 77.2090 };

export default function App() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(null);
  const [search, setSearch] = useState("");
  const markersRef = useRef([]);
  const abortRef = useRef(null);

  // Track selected location from dropdown
  const [selectedArea, setSelectedArea] = useState(null);

  const VITE_MAPLIBRE_KEY = import.meta.env.VITE_MAPLIBRE_KEY;
  const VITE_OPENROUTESERVICE_API_KEY = import.meta.env.VITE_OPENROUTESERVICE_API_KEY;

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${VITE_MAPLIBRE_KEY}`,
      center: [77.209, 28.6139],
      zoom: 5,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // HQ marker
    new maplibregl.Marker({ color: "blue" })
      .setLngLat([myLocation.lng, myLocation.lat])
      .setPopup(new maplibregl.Popup().setText("My Location (HQ)"))
      .addTo(mapRef.current);
  }, []);

  const handleSearch = () => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtered = plants.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.forEach((plant) => {
      const marker = new maplibregl.Marker({ color: "green" })
        .setLngLat([plant.lng, plant.lat])
        .setPopup(new maplibregl.Popup().setText(plant.name))
        .addTo(mapRef.current);

      markersRef.current.push(marker);

      marker.getElement().addEventListener("click", async () => {
        await getRoute(myLocation, plant);
      });
    });

    if (filtered.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      filtered.forEach((p) => bounds.extend([p.lng, p.lat]));
      mapRef.current.fitBounds(bounds, { padding: 50 });
    }
  };

  async function getRoute(from, to) {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${VITE_OPENROUTESERVICE_API_KEY}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`;
    const res = await fetch(url);
    const data = await res.json();

    const route = data.features[0].geometry;
    const distKm = data.features[0].properties.summary.distance / 1000;
    setDistance(distKm.toFixed(2));

    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    mapRef.current.addSource("route", {
      type: "geojson",
      data: { type: "Feature", geometry: route },
    });

    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      paint: { "line-color": "#ef4444", "line-width": 4 },
    });

    const coords = route.coordinates.map((c) => c);
    const bounds = coords.reduce(
      (b, coord) => b.extend(coord),
      new maplibregl.LngLatBounds(coords[0], coords[0])
    );
    mapRef.current.fitBounds(bounds, { padding: 50 });
  }

  const allowedTypes = new Set([
    "city", "town", "village", "hamlet",
    "state", "region", "province", "county", "country",
    "municipality", "district", "administrative",
  ]);

  const loadAreaOptions = async (inputValue) => {
    if (!inputValue || inputValue.trim().length < 2) return [];

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    const url =
      `https://nominatim.openstreetmap.org/search?` +
      new URLSearchParams({
        q: inputValue,
        format: "jsonv2",
        addressdetails: "1",
        limit: "10",
        dedupe: "1",
        polygon_geojson: "0",
        extratags: "1",
      }).toString();

    try {
      const res = await fetch(url, { signal: abortRef.current.signal });
      const data = await res.json();

      // accept cities/states/countries/worldwide
      const filtered = data.filter((p) => {
        if (allowedTypes.has(p.type)) return true;

        // fallback: boundary with administrative level
        if (p.class === "boundary" && p.type === "administrative") return true;

        return false;
      });

      return filtered.map((p) => {
        const lat = parseFloat(p.lat);
        const lng = parseFloat(p.lon);

        // Best guess for display name
        const mainName =
          p.address?.city ||
          p.address?.town ||
          p.address?.village ||
          p.address?.state ||
          p.address?.region ||
          p.address?.province ||
          p.address?.country ||
          p.display_name;

        const secondary = [
          p.address?.state,
          p.address?.country,
        ].filter(Boolean).join(", ");

        const label = secondary ? `${mainName} — ${secondary}` : mainName;

        return {
          label,
          value: {
            lat,
            lng,
            type: p.type,
            bbox: p.boundingbox,
            display_name: p.display_name,
            id: p.place_id,
          },
        };
      });
    } catch (e) {
      if (e.name === "AbortError") return [];
      console.error(e);
      return [];
    }
  };

  const fitToNominatimBBox = (bbox) => {
    if (!bbox || bbox.length !== 4) return;
    const south = parseFloat(bbox[0]);
    const north = parseFloat(bbox[1]);
    const west = parseFloat(bbox[2]);
    const east = parseFloat(bbox[3]);
    const bounds = new maplibregl.LngLatBounds([west, south], [east, north]);
    mapRef.current.fitBounds(bounds, { padding: 48, maxZoom: 12 });
  };

  const handleBestLocation = async () => {
    if (!selectedArea) {
      alert("Please select a city from the dropdown first.");
      return;
    }

    try {
      const parts = selectedArea.display_name.split(",").map(p => p.trim());

      const city = parts[0] || "";
      const state = parts.length > 1 ? parts[1] : "";
      const country = parts[parts.length - 1] || "";
      const body = {
        city: city,
        state: state || "",
        country: country || "",
      };

      const res = await fetch("http://127.0.0.1:5000/api/predict_all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      console.log("Prediction response:", data);

      // Clean old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Place marker at predicted location (lat/lon from backend)
      const { latitude, longitude } = data.location;
      const marker = new maplibregl.Marker({ color: "purple" })
        .setLngLat([longitude, latitude])
        .setPopup(
          new maplibregl.Popup().setHTML(`
          <div>
            <b>Suitability Score:</b> ${data.predictions.overall_suitability_score}<br/>
            <b>Project Type:</b> ${data.predictions.recommended_project_type}<br/>
            <b>Constraint:</b> ${data.predictions.primary_constraint_factor}<br/>
            <b>Investment Risk:</b> ${data.predictions.investment_risk_profile}
          </div>
        `)
        )
        .addTo(mapRef.current);

      markersRef.current.push(marker);

      // Fly to predicted location
      mapRef.current.flyTo({ center: [longitude, latitude], zoom: 10 });

      alert(`Best location predicted for ${body.city}, ${body.state}, ${body.country}`);
    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Could not fetch predictions.");
    }
  };


  return (
    <div className="h-screen w-full relative">
      {/* Plant Search - Top Left */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur rounded-2xl shadow-lg p-3 flex gap-2 w-80">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search hydrogen plant..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-[0.99] transition"
        >
          Search
        </button>
      </div>

      {/* Area Dropdown + Button - Top Right */}
      <div className="absolute top-4 right-4 z-30 w-80 space-y-3">
        <AsyncSelect
          cacheOptions
          defaultOptions={false}
          loadOptions={loadAreaOptions}
          placeholder="Search city, state, or country..."
          onChange={(opt) => {
            if (!opt?.value) return;
            const v = opt.value;
            setSelectedArea(v); // save selected
            if (v.bbox) fitToNominatimBBox(v.bbox);
            else mapRef.current.flyTo({ center: [v.lng, v.lat], zoom: 8 });
          }}
          menuPortalTarget={typeof document !== "undefined" ? document.body : null}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          className="text-sm"
        />

        {/* Find Best Location Button */}
        <button
          onClick={handleBestLocation}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Find Best Location
        </button>
      </div>

      {/* Map */}
      <div ref={mapContainer} className="h-full w-full" />

      {/* Distance Info */}
      {distance && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl shadow-lg px-4 py-2 text-sm">
          🚗 Distance: <b>{distance} km</b>
        </div>
      )}
    </div>
  );
}
