// ひろめ市場
const HIROME = [33.5597, 133.5311];

let map;
let routeLine;

initMap();

function initMap() {
  map = L.map("map").setView(HIROME, 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker(HIROME).addTo(map).bindPopup("ひろめ市場").openPopup();
}

document.getElementById("routeBtn").addEventListener("click", generateRoute);

function generateRoute() {
  const drunkLevel = parseFloat(document.getElementById("drunkLevel").value);
  const stayTime = parseInt(document.getElementById("stayTime").value);

  // 仮の目的地（周辺居酒屋を想定）
  const destination = [
    HIROME[0] + (Math.random() - 0.5) * 0.004,
    HIROME[1] + (Math.random() - 0.5) * 0.004,
  ];

  const path = createWobblyPath(HIROME, destination, drunkLevel);

  if (routeLine) {
    map.removeLayer(routeLine);
  }

  routeLine = L.polyline(path, {
    color: "#333",
    weight: 4,
    opacity: 0.8,
  }).addTo(map);

  map.fitBounds(routeLine.getBounds());

  const drinks = Math.floor(stayTime / 10);
  document.getElementById("info").innerText =
    `返杯モード：この店で ${drinks} 杯はいけるき 🍶`;
}

// 直線＋千鳥足ノイズ
function createWobblyPath(start, end, level) {
  const points = [];
  const steps = 20;

  for (let i = 0; i <= steps; i++) {
    const lat =
      start[0] + (end[0] - start[0]) * (i / steps) +
      (Math.random() - 0.5) * level;
    const lng =
      start[1] + (end[1] - start[1]) * (i / steps) +
      (Math.random() - 0.5) * level;

    points.push([lat, lng]);
  }

  return points;
}
