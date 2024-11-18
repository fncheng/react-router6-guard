import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const resource = {
    'zh-CN': {
        translation: {
            start: '开始',
            cancel: '取消'
        }
    },
    'en-US': {
        translation: {
            start: 'start',
            cancel: 'cancel'
        }
    }
}

i18next.use(initReactI18next).init({
    resources: resource,
    fallbackLng: 'zh-CN',
    lng: 'zh-CN',
    interpolation: {
        escapeValue: false
    }
})

export default i18next
