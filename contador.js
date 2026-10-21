"use strict";

const URL_GEOJSON = "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/russia.geojson";
const POBLACION_ANIO = 2023;

const regiones = {
  "Republic of Adygea": ["Maykop", 501000],
  "Altai Republic": ["Gorno-Altaysk", 221000],
  "Altai Krai": ["Barnaul", 2130000],
  "Amur Oblast": ["Blagoveshchensk", 756000],
  "Arkhangelsk Oblast": ["Arkhangelsk", 1020000],
  "Astrakhan Oblast": ["Astrakhan", 960000],
  "Republic of Bashkortostan": ["Ufa", 4100000],
  "Belgorod Oblast": ["Belgorod", 1500000],
  "Bryansk Oblast": ["Bryansk", 1160000],
  "Republic of Buryatia": ["Ulan-Ude", 985000],
  "Vladimir Oblast": ["Vladimir", 1320000],
  "Volgograd Oblast": ["Volgograd", 2450000],
  "Vologda Oblast": ["Vologda", 1140000],
  "Voronezh Oblast": ["Voronezh", 2310000],
  "Republic of Dagestan": ["Makhachkala", 3230000],
  "Jewish Autonomous Oblast": ["Birobidzhan", 150000],
  "Zabaykalsky Krai": ["Chita", 1050000],
  "Ivanovo Oblast": ["Ivanovo", 927000],
  "Republic of Ingushetia": ["Magas", 515000],
  "Irkutsk Oblast": ["Irkutsk", 2360000],
  "Kabardino-Balkar Republic": ["Nalchik", 904000],
  "Kaliningrad Oblast": ["Kaliningrad", 1030000],
  "Republic of Kalmykia": ["Elista", 267000],
  "Kaluga Oblast": ["Kaluga", 1070000],
  "Kamchatka Krai": ["Petropavlovsk-Kamchatsky", 291000],
  "Karachay-Cherkess Republic": ["Cherkessk", 469000],
  "Republic of Karelia": ["Petrozavodsk", 533000],
  "Kemerovo Oblast": ["Kemerovo", 2600000],
  "Kirov Oblast": ["Kirov", 1220000],
  "Komi Republic": ["Syktyvkar", 737000],
  "Kostroma Oblast": ["Kostroma", 580000],
  "Krasnodar Krai": ["Krasnodar", 5800000],
  "Krasnoyarsk Krai": ["Krasnoyarsk", 2850000],
  "Kurgan Oblast": ["Kurgan", 776000],
  "Kursk Oblast": ["Kursk", 1070000],
  "Leningrad Oblast": ["Gatchina", 2000000],
  "Lipetsk Oblast": ["Lipetsk", 1120000],
  "Magadan Oblast": ["Magadan", 134000],
  "Mari El Republic": ["Yoshkar-Ola", 677000],
  "Republic of Mordovia": ["Saransk", 783000],
  "Moscow Oblast": ["Krasnogorsk", 8600000],
  "Murmansk Oblast": ["Murmansk", 667000],
  "Nenets Autonomous Okrug": ["Naryan-Mar", 42000],
  "Nizhny Novgorod Oblast": ["Nizhny Novgorod", 3080000],
  "Novgorod Oblast": ["Veliky Novgorod", 583000],
  "Novosibirsk Oblast": ["Novosibirsk", 2790000],
  "Republic of North Ossetia-Alania": ["Vladikavkaz", 687000],
  "Omsk Oblast": ["Omsk", 1850000],
  "Orenburg Oblast": ["Orenburg", 1830000],
  "Oryol Oblast": ["Oryol", 713000],
  "Penza Oblast": ["Penza", 1270000],
  "Perm Krai": ["Perm", 2530000],
  "Primorsky Krai": ["Vladivostok", 1820000],
  "Pskov Oblast": ["Pskov", 599000],
  "Rostov Oblast": ["Rostov-on-Don", 4150000],
  "Ryazan Oblast": ["Ryazan", 1100000],
  "Samara Oblast": ["Samara", 3150000],
  "Saratov Oblast": ["Saratov", 2400000],
  "Sakha (Yakutia) Republic": ["Yakutsk", 1000000],
  "Sakhalin Oblast": ["Yuzhno-Sakhalinsk", 458000],
  "Sverdlovsk Oblast": ["Yekaterinburg", 4270000],
  "Smolensk Oblast": ["Smolensk", 886000],
  "Stavropol Krai": ["Stavropol", 2900000],
  "Tambov Oblast": ["Tambov", 982000],
  "Republic of Tatarstan": ["Kazan", 4000000],
  "Tver Oblast": ["Tver", 1200000],
  "Tomsk Oblast": ["Tomsk", 1070000],
  "Tula Oblast": ["Tula", 1500000],
  "Tuva Republic": ["Kyzyl", 336000],
  "Tyumen Oblast": ["Tyumen", 1570000],
  "Udmurt Republic": ["Izhevsk", 1450000],
  "Ulyanovsk Oblast": ["Ulyanovsk", 1200000],
  "Yaroslavl Oblast": ["Yaroslavl", 1210000],
  "Chechen Republic": ["Grozny", 1510000],
  "Chelyabinsk Oblast": ["Chelyabinsk", 3430000],
  "Chukotka Autonomous Okrug": ["Anadyr", 48000],
  "Chuvash Republic": ["Cheboksary", 1190000],
  "Republic of Khakassia": ["Abakan", 536000],
  "Khanty–Mansi Autonomous Okrug – Yugra": ["Khanty-Mansiysk", 1730000],
  "Khabarovsk Krai": ["Khabarovsk", 1290000],
  "Yamalo-Nenets Autonomous Okrug": ["Salekhard", 510000],
  Moscow: ["Moscow", 13100000],
  "Saint Petersburg": ["Saint Petersburg", 5600000]
};

const mapaElement = document.getElementById("mapa");
const estadoMapa = document.getElementById("estado-mapa");
const nombreRegion = document.getElementById("nombre-region");
const tipoRegion = document.getElementById("tipo-region");
const ayudaRegion = document.getElementById("ayuda-region");
const datosRegion = document.getElementById("datos-region");
const capitalRegion = document.getElementById("capital-region");
const poblacionRegion = document.getElementById("poblacion-region");
const notaDatos = document.getElementById("nota-datos");
const botonReiniciar = document.getElementById("reiniciar-mapa");

const formatoPoblacion = new Intl.NumberFormat("es-ES");
const estiloNormal = {
  color: "#71977e",
  weight: 0.8,
  fillColor: "#b8d9c1",
  fillOpacity: 0.86
};
const estiloSeleccionado = {
  color: "#205e43",
  weight: 2,
  fillColor: "#68a77d",
  fillOpacity: 0.96
};

const mapa = L.map(mapaElement, {
  zoomControl: true,
  scrollWheelZoom: false,
  attributionControl: true
}).setView([61, 100], 2.7);

let capaRegiones;
let regionSeleccionada;

function mostrarEstado(texto) {
  estadoMapa.textContent = texto;
  estadoMapa.hidden = false;
}

function mostrarRegion(feature, capa) {
  if (regionSeleccionada) {
    regionSeleccionada.setStyle(estiloNormal);
  }

  regionSeleccionada = capa;
  capa.setStyle(estiloSeleccionado);
  if (typeof capa.bringToFront === "function") {
    capa.bringToFront();
  }

  const propiedades = feature.properties || {};
  const nombre = propiedades.name_latin || propiedades.name || "Región";
  const datos = regiones[nombre];
  nombreRegion.textContent = nombre;
  tipoRegion.textContent = "REGIÓN SELECCIONADA";
  ayudaRegion.hidden = Boolean(datos);
  ayudaRegion.textContent = datos
    ? `Datos aproximados de ${POBLACION_ANIO}.`
    : "No hay datos de población disponibles para esta región.";
  datosRegion.hidden = !datos;
  notaDatos.hidden = !datos;

  if (datos) {
    capitalRegion.textContent = datos[0];
    poblacionRegion.textContent = `${formatoPoblacion.format(datos[1])} habitantes`;
  }
}

function agregarInteraccion(feature, capa) {
  const nombre = feature.properties && (feature.properties.name_latin || feature.properties.name);
  capa.bindTooltip(nombre || "Región", { sticky: true });
  capa.on({
    click: () => mostrarRegion(feature, capa),
    mouseover: (evento) => {
      if (evento.target !== regionSeleccionada) {
        evento.target.setStyle({ fillOpacity: 1, weight: 1.5 });
      }
    },
    mouseout: (evento) => {
      if (evento.target !== regionSeleccionada) {
        capaRegiones.resetStyle(evento.target);
      }
    }
  });
}

function reiniciarSeleccion() {
  if (regionSeleccionada && capaRegiones) {
    capaRegiones.resetStyle(regionSeleccionada);
  }
  regionSeleccionada = null;
  nombreRegion.textContent = "Elige una región";
  tipoRegion.textContent = "EXPLORA EL MAPA";
  ayudaRegion.hidden = false;
  ayudaRegion.textContent = "Pulsa sobre cualquier zona coloreada para ver sus datos.";
  datosRegion.hidden = true;
  notaDatos.hidden = true;
}

async function cargarMapa() {
  try {
    const respuesta = await fetch(URL_GEOJSON);
    if (!respuesta.ok) {
      throw new Error(`El servidor respondió ${respuesta.status}`);
    }
    const geojson = await respuesta.json();
    capaRegiones = L.geoJSON(geojson, {
      style: () => estiloNormal,
      onEachFeature: agregarInteraccion
    }).addTo(mapa);
    mapa.setView([61, 100], 2.7);
    estadoMapa.hidden = true;
  } catch (error) {
    console.error("No se pudieron cargar los límites regionales:", error);
    mostrarEstado("No se pudo cargar el mapa. Comprueba tu conexión e inténtalo de nuevo.");
  }
}

botonReiniciar.addEventListener("click", reiniciarSeleccion);
cargarMapa();
