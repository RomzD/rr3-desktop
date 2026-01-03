import {createI18n} from "vue-i18n";
import {en, ru} from './locales'

export const i18n = createI18n({
  locale: 'ru',
  messages: {
    en,
    ru
  }
})

