searchIp();

function searchIp() {
  let ip = "";
  const inputValue = document.getElementById("ip").value;
  if (inputValue === "") {
    document.getElementById("ip").value = "8.8.8.8";
    ip = "8.8.8.8";
  } else {
    ip = document.getElementById("ip").value;
  }

  const api_key = "at_ktCVfugW7AGs7vMYNKdOca5rQ98mn";
  $(function () {
    $.ajax({
      url: "https://geo.ipify.org/api/v1",
      dataType: "json",
      data: { apiKey: api_key, ipAddress: ip },
      success: function (data) {
        const { ip, location, isp } = data;
        const { lat, lng } = location;
        setValuesOnScreen(ip, location, isp);
        renderOnMap(lat, lng);
      },
    });
  });
}

function setValuesOnScreen(ip, location, isp) {
  console.log({ ip, location, isp });
  document.getElementById("address").innerHTML = ip;
  document.getElementById(
    "location"
  ).innerHTML = `${location.city}, ${location.country} ${location.postalCode}, ${location.region}`;
  document.getElementById("timezone").innerHTML = location.timezone;
  document.getElementById("isp").innerHTML = isp;
}

function renderOnMap(lat, lng) {
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
  const map = L.map("map", { minZoom: 18, maxZoom: 18 });
  map.setView([lat, lng], 13);
  disableMapInteractions(map);

  // Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Ícone
  const marker = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [46, 56], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });
  L.marker([lat, lng], { icon: marker }).addTo(map).openPopup();
}

function disableMapInteractions(map) {
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  if (map.tap) map.tap.disable();
  document.getElementById("map").style.cursor = "default";
}
