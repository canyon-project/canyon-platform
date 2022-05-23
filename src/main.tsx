import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './assets/css/index.css'
import 'antd/dist/antd.min.css'
import './locales/i18n'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'

import codemirror from 'codemirror'
window.CodeMirror = codemirror
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/jsx/jsx.js'
import 'codemirror/theme/idea.css'

async function bootstrap() {
  const d: any = document.getElementById('root')
  ReactDOM.createRoot(d).render(
    <ConfigProvider locale={enUS}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>,
  )
}
bootstrap()
