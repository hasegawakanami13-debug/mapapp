let map;
let directionsService;
let directionsRenderer;

const HIROME = { lat: 33.5597, lng: 133.5311 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: HIROME,
    zoom: 16,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: "#7a1f1f",
      strokeWeight: 5,
    },
  });

  directionsRenderer.setMap(map);
}

document.getElementById("routeBtn").addEventListener("click", () => {
  generateRoute();
});

function generateRoute() {
  const drunkLevel = parseFloat(document.getElementById("drunkLevel").value);
  const stayTime = parseInt(document.getElementById("stayTime").value);

  const destination = {
    lat: 33.5585 + Math.random() * 0.002,
    lng: 133.532 + Math.random() * 0.002,
  };

  directionsService.route(
    {
      origin: HIROME,
      destination,
      travelMode: google.maps.TravelMode.WALKING,
    },
    (result, status) => {
      if (status === "OK") {
        const route = result.routes[0];
        const path = route.overview_path;

        const wobblePath = path.map((p) => ({
          lat: p.lat() + randomOffset(drunkLevel),
          lng: p.lng() + randomOffset(drunkLevel),
        }));

        directionsRenderer.setDirections(result);
        drawWobbleLine(wobblePath);

        const drinks = Math.floor(stayTime / 10);
        document.getElementById("info").innerText =
          `返杯モード：この店で ${drinks} 杯はいけるき 🍺`;
      }
    }
  );
}

function randomOffset(level) {
  return (Math.random() - 0.5) * level;
}

function drawWobbleLine(path) {
  new google.maps.Polyline({
    path,
    strokeColor: "#333",
    strokeOpacity: 0.7,
    strokeWeight: 3,
    map,
  });
}
