import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login'
import Layout from '../components/layout/Layout'
import Register from '../pages/Register'

export default function Router() {
  return (
    <BrowserRouter basename='/'>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<Layout />} >
                <Route path="/dashboard" element={<div>oi</div>} />
            </Route>
        </Routes>
    </BrowserRouter>
)
}
