import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout/AuthenticatedLayout'

import Thermostat from '@/pages/Thermostat/Thermostat'

import { ThermostatProvider } from '@/hooks/useThermostat'
const Root: React.FC = () => {
  return (
    <ThermostatProvider>
      <AuthenticatedLayout>
        <Routes>
          <Route path='/' element={<Thermostat />} />
        </Routes>
      </AuthenticatedLayout>
    </ThermostatProvider>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  )
}

export default App
