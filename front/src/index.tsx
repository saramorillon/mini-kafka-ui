import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'

window.addEventListener('pywebviewready', function () {
  const container = document.getElementById('root')
  if (container) {
    const root = createRoot(container)
    root.render(<App />)
  }
})
