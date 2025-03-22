<template>
  <q-item clickable :to="route || link" v-if="route || link">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-icon :name="icon" :class="`${icon}-icon`" />
    </q-item-section>
  </q-item>
  <q-item clickable @click="executeAction" v-else-if="action">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-icon :name="icon" :class="`${icon}-icon`" />
    </q-item-section>
  </q-item>
  <q-item v-else>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-icon :name="icon" :class="`${icon}-icon`" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: String,
  caption: String,
  icon: String,
  link: String,
  route: String,
  action: String,
})

const emit = defineEmits(['shareApp'])

function executeAction() {
  if (props.action === 'shareApp') {
    emit('shareApp')
  } else if (props.action === 'openInAppBrowser') {
    const url = props.link
    if (window.cordova && window.cordova.InAppBrowser) {
      window.cordova.InAppBrowser.open(url, '_system')
    } else {
      window.open(url, '_blank')
    }
  }
}
</script>
