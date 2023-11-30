import {createI18n} from 'vue-i18n';
// import messages from "@intlify/vite-plugin-vue-i18n/messages";
import en from './en.json';
import ko from './ko.json';

export default createI18n({
  legacy: false,
  locale: 'no',
  globalInjection: true,
  messages: {
    en,
    ko,
  },
});
