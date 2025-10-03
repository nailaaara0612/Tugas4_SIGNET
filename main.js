mapboxgl.accessToken = 'pk.eyJ1IjoiY2hvaXJ1bm5pc2FhbiIsImEiOiJjbTlzNTFqb3AyNzVlMm5wcnVyNXppbmppIn0.kwmDHfRH8_1e_ubAb9x0SA';

const start = {
  center: [110.38855248498028, -7.805284666182359],
  zoom: 12.35,
  pitch: 0,
  bearing: 0
};

const end = {
  center: [110.361, -7.825577818071965],  // Adjusted longitude to move map left
  zoom: 16,
  pitch: 0,
  bearing: 0
};


const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: start.center,
  zoom: start.zoom
});

// Add navigation control
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

// Add directions control
const directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'metric',
  profile: 'mapbox/driving',
  language: 'id'
});
map.addControl(directions, 'top-right');

// Fly button functionality
let isAtStart = true;
document.getElementById('fly').addEventListener('click', () => {
  const target = isAtStart ? end : start;
  isAtStart = !isAtStart;
  map.flyTo({
    ...target,
    duration: 2000,
    essential: true
  });
});

// GeoJSON Layer Loading
const loadGeoJsonLayer = (layerId, filePath, fillColor) => {
  map.addSource(layerId, {
    type: 'geojson',
    data: filePath
  });

  map.addLayer({
    id: layerId,
    type: 'fill',
    source: layerId,
    paint: {
      'fill-color': fillColor,
      'fill-opacity': 0.7
    }
  });

  map.addLayer({
    id: `outline_${layerId}`,
    type: 'line',
    source: layerId,
    paint: {
      'line-color': 'black',
      'line-width': 2
    }
  });
};

map.on('load', () => {
  loadGeoJsonLayer('asrama_putra', 'assets/geojson/Asrama Putra.geojson', '#fe6365');
  loadGeoJsonLayer('asrama_putri', 'assets/geojson/Asrama Putri.geojson', '#ffe04d');
  loadGeoJsonLayer('bangunan_umum', 'assets/geojson/Bangunan Umum.geojson', '#ffc13b');
});

