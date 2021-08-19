// import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { App } from './ui/App'
import './index.css'

initializeIcons()

ReactDOM.render(<App />, document.getElementById('root'))
