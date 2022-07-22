import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}

class EventEmitter extends EventTarget {}

window.eventEmitter = new EventEmitter()
