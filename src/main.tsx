import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import App from './App'
import 'antd/dist/antd.min.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import './locales/i18n'
import {BrowserRouter, HashRouter} from "react-router-dom";

import codemirror from 'codemirror'
window.CodeMirror = codemirror
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/jsx/jsx.js'
import 'codemirror/theme/idea.css'




ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

)
