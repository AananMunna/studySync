import { useContext, useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaBell,
  FaSearch,
  FaHome,
  FaTasks,
  FaUserAlt,
  FaPlus,
  FaClipboardList,
  FaHourglassHalf 
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeContext";
import ProfileDropdown from "./ProfileDropdown";
import { motion } from "framer-motion";

export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/assignments", label: "Assignments", icon: <FaTasks /> },
    { to: "/submissions", label: "My Submissions", icon: <FaClipboardList /> },
    { to: "/create", label: "Create", icon: <FaPlus /> },
    { to: "/pending", label: "Pending", icon: <FaHourglassHalf  /> },
  ];

  useEffect(() => {
    function handleScroll() {
      // Calculate rotation based on scrollY, limit max rotation for smoothness
      const rotation = Math.min(window.scrollY / 5, 360);
      setScrollRotation(rotation);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-yellow-400 flex items-center space-x-2"
          aria-label="Home"
        >
          {/* Rotating book icon on scroll */}
          <motion.span
            style={{ display: "inline-block" }}
            animate={{ rotate: scrollRotation }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            📘
          </motion.span>

          {/* Show site name only on md+ screens */}
          <span className="font-sans tracking-wide hidden md:inline-block">
            StudySync
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-4">
          {" "}
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-2 rounded-md flex items-center gap-1 transition-all ${
                  isActive
                    ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-yellow-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-yellow-300"
                }`
              }
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            title="Notifications"
          >
            <FaBell className="text-lg text-gray-700 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </button>

          {/* Search */}
          <button
            onClick={() => alert("Command Menu Coming Soon")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            title="Search"
          >
            <FaSearch className="text-lg text-gray-700 dark:text-gray-300" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            title="Toggle Theme"
          >
            {darkMode ? (
              <FaSun className="text-yellow-300 text-xl" />
            ) : (
              <FaMoon className="text-gray-700 text-xl" />
            )}
          </button>

          {/* Auth & Menu toggle */}
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <div className="hidden md:flex space-x-2">
              <NavLink
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition"
              >
                Register
              </NavLink>
            </div>
          )}

          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes
                size={20}
                className={darkMode ? "text-yellow-400" : "text-gray-800"}
              />
            ) : (
              <FaBars
                size={20}
                className={darkMode ? "text-yellow-400" : "text-gray-800"}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                {link.icon} {link.label}
              </div>
            </NavLink>
          ))}

          {!user && (
            <div className="flex flex-col gap-2 mt-3">
              <NavLink
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white text-center rounded-md"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 text-center rounded-md"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}

      {/* Bottom Nav for mobile */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white dark:bg-gray-900 shadow-t z-50 flex justify-around py-2 border-t dark:border-gray-700">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive
                  ? "text-blue-600 dark:text-yellow-400"
                  : "text-gray-500 dark:text-gray-300"
              }`
            }
          >
            {link.icon}
            <span className="mt-1">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
