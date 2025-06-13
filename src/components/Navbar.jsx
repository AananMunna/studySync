import { useContext, useState, useEffect, useRef } from "react";
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
  FaHourglassHalf,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeContext";
import ProfileDropdown from "./ProfileDropdown";
import { motion } from "framer-motion";

export default function Navbar(isAssignmentsPage) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const { user,dashboardUIFire } = useContext(AuthContext);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/assignments", label: "Assignments", icon: <FaTasks /> },
    { to: "/submissions", label: "My Submissions", icon: <FaClipboardList /> },
    { to: "/create", label: "Create", icon: <FaPlus /> },
    { to: "/pending", label: "Pending", icon: <FaHourglassHalf /> },
  ];

  useEffect(() => {
    function handleScroll() {
      const rotation = Math.min(window.scrollY / 5, 360);
      setScrollRotation(rotation);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  console.log(isAssignmentsPage.isAssignmentsPage);



  return (
    <>
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={` top-0 left-0 right-0 ${isAssignmentsPage.isAssignmentsPage ? 'z-0 sticky ' : 'z-50 fixed'}  backdrop-blur-md bg-white/60 dark:bg-black/40 border-b border-white/20 dark:border-gray-700 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo + rotation */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-xl text-gray-800 dark:text-gray-100"
        >
          <motion.span
            style={{ display: "inline-block" }}
            animate={{ rotate: scrollRotation }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            📘
          </motion.span>
          <span className="hidden md:inline-block">StudySync</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/40 dark:bg-gray-800/40 text-blue-600 dark:text-yellow-400 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/30"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
         

         

          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-gray-800"
            title="Toggle Theme"
          >
            {darkMode ? (
              <FaSun className="text-yellow-300 text-lg" />
            ) : (
              <FaMoon className="text-gray-700 text-lg" />
            )}
          </button>

          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <div className="hidden md:flex gap-2">
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:scale-105 transition-transform"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-full border border-blue-500 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                Register
              </NavLink>
            </div>
          )}

          {/* Hamburger */}
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-white/30 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? (
              <FaTimes className="text-xl text-gray-800 dark:text-yellow-300" />
            ) : (
              <FaBars className="text-xl text-gray-800 dark:text-yellow-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden px-6 pt-4 pb-6 bg-white/70 dark:bg-black/60 backdrop-blur-xl rounded-b-xl shadow-inner"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-800"
              >
                {link.icon} {link.label}
              </NavLink>
            ))}
            {!user && (
              <div className="flex flex-col gap-2 mt-3">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-center bg-blue-600 text-white rounded-full"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-center border border-blue-600 text-blue-600 dark:text-blue-300 rounded-full"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
{/* Vision Pro–style Bottom Nav (Icons Only, Floating, Glassy) */}
<div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[88%] max-w-sm px-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-300/50 dark:border-white/10 rounded-3xl shadow-xl flex justify-between items-center z-50">
  {navLinks.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) =>
        `w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
          isActive
            ? "bg-blue-100 text-blue-600 shadow-md dark:bg-white/10 dark:text-yellow-300"
            : "text-gray-700 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/10"
        }`
      }
    >
      {link.icon}
    </NavLink>
  ))}
</div>


    </>
  );
}
