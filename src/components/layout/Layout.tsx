import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/dashboard">
            <img src="/logoIcon.png" alt="Logo" />
          </a>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
