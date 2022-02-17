import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './App'
import 'antd/dist/antd.min.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import './locales/i18n'
import { HashRouter } from "react-router-dom";

import codemirror from 'codemirror'
window.CodeMirror = codemirror
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/jsx/jsx.js'
import 'codemirror/theme/idea.css'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
