import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ServersProvider } from '../contexts/ServersContext'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Server } from './pages/Server'
import { Servers } from './pages/Servers'
import { Topics } from './pages/Topics'

export function App(): JSX.Element {
  return (
    <HashRouter>
      <ServersProvider>
        <Navbar />
        <Routes>
          <Route path="/topics" element={<Topics />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/server" element={<Server />} />
          <Route path="/server/:key" element={<Server />} />
          <Route path="*" element={<Navigate to="/topics" />} />
        </Routes>
        <Footer />
      </ServersProvider>
    </HashRouter>
  )
}
