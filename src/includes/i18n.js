import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import vi from '@/locales/vi.json'
export default createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en,
        vi,
    },
    numberFormats: {
        en: {
            currency: {
                style: "currency",
                currency: "USD"
            }
        },
        vi: {
            currency: {
                style: "currency",
                currency: "VND"
            }
        }
    }
});

//https://kazupon.github.io/vue-i18n/guide/pluralization.html