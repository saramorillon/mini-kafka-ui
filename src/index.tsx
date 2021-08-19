import React from 'react'
import ReactDOM from 'react-dom'
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { App } from './ui/App'

initializeIcons()

ReactDOM.render(<App />, document.getElementById('root'))
