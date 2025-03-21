<template>
  <GoogleMap api-key="xxx" style="width: 100%; height: 400px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>

  <q-card class="q-pa-md" style="max-width: 600px; width: 100%">
    <h2>Kontakt</h2>
    <q-card-section>
      <h4>mEvIDukacija developing</h4>
      <p>Adresa: Veseli studenti pri Trpimirovoj ulici, 51000 Rijeka</p>
      <p>Email: info@velerimevidukacija_developing.hr</p>
      <p>Telefon: +385 51 654 321</p>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 45.338382, lng: 14.424261 }
</script>
