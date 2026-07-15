import { Link, useNavigate } from "react-router-dom";
import Profile from "./profile";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Feed", path: "#" },
    { name: "Explore", path: "#" },
    { name: "Projects", path: "#" },
    { name: "Community", path: "#" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span className="text-blue-600">Dev</span>Connect
          </button>

          {/* Navigation Links show only when user is loggen in */}
          {user && (
            <div className="hidden md:flex space-x-4 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Profile user={user} onLogout={onLogout} />
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {user && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50 px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
