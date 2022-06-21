import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ServersProvider } from '../contexts/ServersContext'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Server } from './pages/Server'
import { Servers } from './pages/Servers'
import { Topic } from './pages/Topic'
import { Topics } from './pages/Topics'

export function App(): JSX.Element {
  return (
    <HashRouter>
      <ServersProvider>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topic/:key/:topic" element={<Topic />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/server" element={<Server />} />
          <Route path="/server/:key" element={<Server />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </ServersProvider>
    </HashRouter>
  )
}
