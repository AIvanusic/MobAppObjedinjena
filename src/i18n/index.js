import { createI18n } from 'vue-i18n'
import en from './en'
import hr from './hr'

const messages = {
  en,
  hr,
}

const i18n = createI18n({
  locale: 'hr', // Početni jezik
  fallbackLocale: 'en', // Ako prijevod ne postoji, koristi engleski
  messages,
})

export default i18n
