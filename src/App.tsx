import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import './index.scss'
import ErrorPage from './pages/ErrorPage'
import Auth from './pages/auth'
import Users from './pages/users'
import Items from './pages/predmets'
import Tarifs from './pages/tarifs'
import Regions from './pages/regions'
import Cities from './pages/cities'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Users />} />
        <Route path='items' element={<Items />} />
        <Route path='regions' element={<Regions />} />
        <Route path='cities' element={<Cities />} />
        {/* <Route path='tarifs' element={<Tarifs />} /> */}
        <Route path='*' element={<ErrorPage />} />
      </Route>
      <Route path='/auth' element={<Auth />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
