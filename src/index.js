import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import WebFont from 'webfontloader'
import { BrowserRouter } from 'react-router-dom'

WebFont.load({
  google: {
    families: ['Exo 2:800:latin']
  },
  timeout: 2000
})

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
