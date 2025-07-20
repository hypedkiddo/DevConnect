"use client"

import Profile from "./profile"

export default function Navbar({ user, onLogin, onRegister, onHome, onLogout }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={onHome}
              className="flex-shrink-0 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span className="text-blue-600">Dev</span>Connect
            </button>

            {/* Navigation Links - Only show when logged in */}
            {user && (
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Feed
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Explore
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Community
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Profile or Auth buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Profile user={user} onLogout={onLogout} />
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onLogin}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onRegister}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Only show when logged in */}
      {user && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Feed
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Explore
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Community
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
