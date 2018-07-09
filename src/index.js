import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Exo 2:800:latin']
  },
  timeout: 2000
})

ReactDOM.render(<App />, document.getElementById('root'))
