"use client"
import { useState } from "react"
import Register from "./components/register"
import Login from "./components/login"
import Layout from "./components/layout"
import './App.css'

export default function HomePage() {
  const [currentView, setCurrentView] = useState("landing") // 'landing', 'login', 'register'
  const [user, setUser] = useState(null) // null when not logged in 

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView("landing")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView("landing")
  }

  const handleRegister = (userData) => {
    setUser(userData)
    setCurrentView("landing")
  }

  if (currentView === "login") {
    return (
      <Layout
        user={user}
        onLogin={() => setCurrentView("login")}
        onRegister={() => setCurrentView("register")}
        onHome={() => setCurrentView("landing")}
        onLogout={handleLogout}
      >
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView("register")}
          onBackToHome={() => setCurrentView("landing")}
        />
      </Layout>
    )
  }

  if (currentView === "register") {
    return (
      <Layout
        user={user}
        onLogin={() => setCurrentView("login")}
        onRegister={() => setCurrentView("register")}
        onHome={() => setCurrentView("landing")}
        onLogout={handleLogout}
      >
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView("login")}
          onBackToHome={() => setCurrentView("landing")}
        />
      </Layout>
    )
  }

  return (
    <Layout
      user={user}
      onLogin={() => setCurrentView("login")}
      onRegister={() => setCurrentView("register")}
      onHome={() => setCurrentView("landing")}
      onLogout={handleLogout}
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect. Collaborate. <span className="text-blue-600">Code.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              A community-driven social platform for developers to share, grow, and build together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setCurrentView("register")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </button>
              <button
                onClick={() => setCurrentView("login")}
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Login
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect</h3>
              <p className="text-gray-600">
                Build meaningful connections with developers from around the world and expand your professional network.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborate</h3>
              <p className="text-gray-600">
                Work together on projects, share ideas, and learn from experienced developers in the community.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Code</h3>
              <p className="text-gray-600">
                Share your code, get feedback, and discover new technologies to enhance your development skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
