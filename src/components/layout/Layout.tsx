import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
        <main>
            <Outlet/>
        </main>
        <footer>
            <p>&copy; 2021</p>
        </footer>
    </div>
  )
}
