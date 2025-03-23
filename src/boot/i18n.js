import { createI18n } from 'vue-i18n'
import messagesHR from 'src/i18n/hr.js'
import messagesEN from 'src/i18n/en.js'

const i18n = createI18n({
  legacy: false, // Dodano za Composition API
  locale: localStorage.getItem('lang') || 'hr',
  fallbackLocale: 'hr',
  messages: {
    hr: messagesHR,
    en: messagesEN,
  },
})

export default ({ app }) => {
  app.use(i18n)
}

export { i18n }
