"use client"

import Navbar from "./navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
export default function Layout({ children, user, onLogin, onRegister, onHome, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogin={onLogin} onRegister={onRegister} onHome={onHome} onLogout={onLogout} />
      <Outlet/>
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  )
}
