<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t('darkMode') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            :model-value="$q.dark.isActive"
            @update:model-value="toggleDarkMode"
            color="primary"
            keep-color
          >
            <template v-slot:thumb>
              <q-icon name="dark_mode" class="dark-mode-icon" />
            </template>
          </q-toggle>
        </q-item-section>
      </q-item>

      <q-item clickable @click="changeLanguage">
        <q-item-section>
          <q-item-label>{{ $t('changeLanguage') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-icon name="language" class="language-icon" />
        </q-item-section>
      </q-item>

      <q-item clickable @click="showBatteryStatus">
        <q-item-section>
          <q-item-label>Baterija</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-icon name="battery_full" class="battery_full-icon" />
        </q-item-section>
      </q-item>

      <q-item clickable @click="showNetworkStatus">
        <q-item-section>
          <q-item-label>Mreža</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-icon name="network_wifi" class="network_wifi-icon" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
//import { i18n } from 'boot/i18n'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const $q = useQuasar()
const { locale } = useI18n() // Pravilno dohvaćanje jezika i funkcije za prijevod

console.log('Trenutni jezik:', locale.value) // Ispisuje trenutni jezik

function toggleDarkMode(value) {
  $q.dark.set(value)
}

function changeLanguage() {
  const newLang = locale.value === 'hr' ? 'en' : 'hr'
  locale.value = newLang
  localStorage.setItem('lang', newLang) // Pohrani odabir jezika
  console.log('Novi jezik:', locale.value) // Ispis nakon promjene jezika
}

function onBatteryStatus(status) {
  alert('Baterija: ' + status.level + '%')
}

function showNetworkStatus() {
  if (window.cordova && navigator.connection) {
    const networkState = navigator.connection.type
    const states = {
      unknown: 'Unknown connection',
      ethernet: 'Ethernet connection',
      wifi: 'WiFi connection',
      '2g': 'Cell 2G connection',
      '3g': 'Cell 3G connection',
      '4g': 'Cell 4G connection',
      cellular: 'Cell generic connection',
      none: 'No network connection',
    }

    alert('Mreža: ' + (states[networkState] || 'Nepoznato'))
  } else {
    alert('Network information plugin nije dostupan.')
  }
}

onMounted(() => {
  document.addEventListener(
    'deviceready',
    () => {
      console.log('Device is ready')
      // Osigurajte da su pluginovi dostupni nakon što je uređaj spreman
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.batteryStatus) {
        window.addEventListener('batterystatus', onBatteryStatus, false)
      }
    },
    false,
  )
})
</script>

<style>
/* Ikona unutar thumb-a mijenja boju kada je dark mode aktivan */
.dark-mode-icon {
  color: white !important;
}

.language-icon {
  color: #346c69;
}

.battery_full-icon {
  color: #346c69;
}

.network_wifi-icon {
  color: #346c69;
}

/* Dodavanje još stilskog oblikovanja po potrebi */
</style>
