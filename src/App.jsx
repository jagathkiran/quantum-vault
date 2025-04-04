import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Vault from './components/Vault'
import MainSidebar from './components/MainSidebar'

export default function App() {
  const [entries, setEntries] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={<Dashboard entries={entries} />} 
        />
        <Route 
          path="/vault" 
          element={<Vault entries={entries} setEntries={setEntries} />} 
        />
      </Routes>
    </BrowserRouter>
  )
}