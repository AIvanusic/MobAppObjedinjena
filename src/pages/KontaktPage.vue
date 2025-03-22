<template>
  <div>
    <div ref="mapElement" style="width: 100%; height: 400px"></div>

    <q-card class="q-pa-md" style="max-width: 600px; width: 100%">
      <h2>Kontakt</h2>
      <q-card-section>
        <h4>mEvIDukacija developing</h4>
        <p>Adresa: Veseli studenti pri Trpimirovoj ulici, 51000 Rijeka</p>
        <p>Email: info@velerimevidukacija_developing.hr</p>
        <p>Telefon: +385 51 654 321</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
/* global google */
import { onMounted, ref } from 'vue'

const mapElement = ref(null) // Referenca na HTML element koji sadrži mapu
let map = null // globalna varaijbla za mapu
let marker = null // globalna varijabla za marker

// Funkcija za inicijalizaciju Google mape s početnom lokacijom
const initMap = (position = { lat: 45.338382, lng: 14.424261 }) => {
  if (!window.google || !window.google.maps) {
    console.error('Google Maps nije učitan!')
    return
  }

  map = new google.maps.Map(mapElement.value, {
    center: position,
    zoom: 16,
  })

  // Postavljanje markera početne lokacije na mapu
  marker = new google.maps.Marker({
    position,
    map,
    title: 'Trenutna lokacija',
  })

  // Pokreni geolokaciju
  initGeolocation()
  initDeviceOrientation()
}

// Funkcija za dobivanje GPS lokacije korisnika
const updateLocation = (position) => {
  if (!position || !position.coords) {
    console.error('Geolocation nije dostupan!')
    return
  }
  const { latitude, longitude } = position.coords
  const currentPosition = { lat: latitude, lng: longitude }

  console.log('Dobivena lokacija:', currentPosition)

  // Centriraj mapu na novu lokaciju
  if (map) map.setCenter(currentPosition)

  // Ažuriraj marker na novoj lokaciji
  if (marker) marker.setPosition(currentPosition)
}

// Funkcija za dohvaćanje GPS lokacije i postavljanje automatskog praćenja promjena
const initGeolocation = () => {
  if (!navigator.geolocation) {
    console.error('Geolocation API nije podržan u ovom pregledniku.')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Početna lokacija:', position)
      updateLocation(position) // Odmah ažuriraj lokaciju
    },
    (error) => console.error('Greška pri dohvaćanju lokacije:', error),
    { enableHighAccuracy: true },
  )

  navigator.geolocation.watchPosition(
    updateLocation,
    (error) => console.error('Greška pri praćenju lokacije:', error),
    { enableHighAccuracy: true },
  )
}

// Upravljanje zoom-om pomoću nagiba uređaja
const initDeviceOrientation = () => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
      const { gamma } = event

      //u ovom primjeru gamma / bočni nagib se može koristiti za promjenu zuma ili rotacije
      if (map && gamma) {
        //const zoomLevel = 15 + event.gamma / 10 // Prilagodi osjetljivost zoom-a
        //map.setZoom(Math.max(10, Math.min(20, zoomLevel))) // Ograniči zoom između 10 i 20
        map.setZoom(16 + gamma / 30)
      }
    })
  } else {
    console.error('Device Orientation API not supported by this browser')
  }
}

// Kada se komponenta učita, pokreni inicijalizaciju mape
onMounted(() => {
  // Učitaj Google Maps scriptu dinamički ako nije već učitana
  if (!window.google || !window.google.maps) {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAfDA0LE7Yv2nbo6Ay8HuESQ0yyeEPkUvE`
    script.async = true
    script.defer = true
    script.onload = () => {
      console.log('Google Maps API učitan!')
      initMap() // Kada se učita, pokreni mapu
    }
    document.head.appendChild(script)
  } else {
    initMap()
  }
})
</script>
