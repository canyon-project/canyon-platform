import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en_US: {
    translation: {
      HelloWorld: 'HelloWorld',
      登录: 'SIGN IN',
      文档: 'DOCS',
      开始使用: 'GET STARTED',
    },
  },
  zh_CN: {
    translation: {
      HelloWorld: '你好世界',
      登录: '登录',
      文档: '文档',
      开始使用: '开始使用',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'zh_CN', //设置当前语言

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
