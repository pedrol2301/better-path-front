import React from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import LoginPage from '../pages/Login'
import Layout from '../components/layout/Layout'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'

export default function Router() {

    const jwt = localStorage.getItem("jwt");

  return (
    <BrowserRouter basename='/'>
        <Routes>
            <Route path="/" element={
                    jwt ? <Navigate to="/dashboard"/> : <Navigate to="/login" />
                }/>
            <Route path="/login" element={
                    jwt ? <Navigate to="/dashboard"/> : <LoginPage />
                } />
            <Route path="/register" element={<Register/>} />
        </Routes>
        <Routes>
            {
                <Route element={
                    jwt ? <Outlet/> : <Navigate to="/login" />
                }>
                    <Route path="/" element={<Layout/>} >
                        <Route index path='/dashboard' element={<Dashboard/>} />
                    </Route>  
                </Route>
            }
        </Routes>
    </BrowserRouter>
)
}
