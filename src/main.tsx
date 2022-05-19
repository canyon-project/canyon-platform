import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'antd/dist/antd.min.css'
import './locales/i18n'
import { BrowserRouter } from 'react-router-dom'

async function bootstrap() {
  const d: any = document.getElementById('root')
  ReactDOM.createRoot(d).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}
bootstrap()
