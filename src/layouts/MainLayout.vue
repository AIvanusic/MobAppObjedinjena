<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <!-- Verzija aplikacije u gornjem lijevom kutu -->
        <div>v{{ $q.version }}</div>

        <!-- Poravnanje naslova alatne trake desno -->
        <q-toolbar-title class="q-ml-auto"> mEvIDukacija </q-toolbar-title>

        <!-- Hamburger menu u gornjem desnom kutu -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
          class="menu-icon"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" show-if-above bordered>
      <q-list>
        <q-item-label header> mEvIDukacija </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          @shareApp="shareApp"
          active-class="text-turquoise"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const $q = useQuasar()
const { t } = useI18n()

const linksList = [
  {
    title: t('administrator'),
    caption: t('administratorCaption'),
    icon: 'school',
    route: '/administrator',
  },
  {
    title: t('nastavnik'),
    caption: t('nastavnikCaption'),
    icon: 'work',
    route: '/nastavnik',
  },
  {
    title: t('polaznik'),
    caption: t('polaznikCaption'),
    icon: 'person',
    route: '/polaznik',
  },
  {
    title: t('postavke'),
    caption: t('postavkeCaption'),
    icon: 'settings',
    link: '/postavke',
  },
  {
    title: t('kontakt'),
    caption: t('contactCaption'),
    icon: 'rss_feed',
    link: '/kontakt',
  },
  {
    title: t('podijeli'),
    caption: t('podijeliCaption'),
    icon: 'share',
    action: 'shareApp',
  },
]

const rightDrawerOpen = ref(false)

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function shareApp() {
  const shareUrl = 'https://www.veleri.hr'

  if (window.cordova && window.cordova.InAppBrowser) {
    window.cordova.InAppBrowser.open(shareUrl, '_system')
  } else {
    window.open(shareUrl, '_blank')
  }
}
</script>

<style>
.custom-header {
  background-color: #346c69;
  color: white;
}

.q-btn--flat {
  color: #346c69;
}

.q-item--clickable:hover {
  background-color: rgba(52, 108, 105, 0.1);
}

.q-item--clickable:active {
  background-color: rgba(52, 108, 105, 0.2);
}

.menu-icon {
  color: white;
}

/* Stilovi za odabrane stavke u meniju */
.q-item--active .q-item-label,
.q-item--active .q-icon {
  color: #346c69 !important;
}

/* Dodajte dodatne stilove po potrebi */
.text-turquoise {
  color: #346c69 !important;
}

.school-icon {
  color: #346c69;
}

.work-icon {
  color: #346c69;
}

.person-icon {
  color: #346c69;
}

.settings-icon {
  color: #346c69;
}

.rss_feed-icon {
  color: #346c69;
}

.share-icon {
  color: #346c69;
}
</style>
