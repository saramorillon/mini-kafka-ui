import { initializeIcons } from '@fluentui/font-icons-mdl2'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './ui/App'

initializeIcons()

ReactDOM.render(<App />, document.getElementById('root'))
