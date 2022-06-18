import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ServersProvider } from '../contexts/ServersContext'
import { Header } from './components/Header'
import { Server } from './pages/Server'
import { Servers } from './pages/Servers'
import { Topics } from './pages/Topics'

export function App(): JSX.Element {
  return (
    <HashRouter>
      <ServersProvider>
        <header>
          <Header />
        </header>
        <main>
          <section className="p2">
            <Routes>
              <Route path="/servers" element={<Servers />} />
              <Route path="/server" element={<Server />} />
              <Route path="/server/:key" element={<Server />} />
              <Route path="/server/:key/topics" element={<Topics />} />
              <Route path="*" element={<Navigate to="/servers" />} />
            </Routes>
          </section>
        </main>
        <footer>Footer</footer>
      </ServersProvider>
    </HashRouter>
  )
}
