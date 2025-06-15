import { useState, useEffect, useRef, use } from "react";
import { FaClipboardList, FaPlus, FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router";

const ProfileDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  //  useEffect to handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const { logout } = use(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        // console.log("User signed out successfully.");
        Swal.fire({
          title: "Signed out successfully.",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        // console.error("Logout error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: error.message,
        });
      });
  };

  return (
    user && (
     <div ref={dropdownRef} className="relative">
  {/* Avatar Button */}
  <div
    onClick={() => setOpen(!open)}
    className="w-10 h-10 z-50 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center cursor-pointer border-2 border-white dark:border-emerald-500 hover:scale-105 transition-transform duration-200 shadow-md"
  >
    {user.photoURL ? (
      <img
        className="rounded-full h-9 w-9 object-cover"
        src={user.photoURL}
        alt="Profile"
      />
    ) : (
      <FaUser className="text-white text-lg" />
    )}
  </div>

  {/* Dropdown Panel */}
  <div
    className={`absolute right-0 mt-4 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-xl border border-emerald-100 dark:border-emerald-800 z-50 transform transition-all duration-300 ease-in-out ${
      open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
    }`}
  >
    {/* User Info */}
    <div className="px-5 py-4 border-b border-emerald-100 dark:border-emerald-700">
      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{user.displayName}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
    </div>

    {/* Nav Links */}
    <div className="px-4 py-4 space-y-3">
      <NavLink
        to="/create"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-emerald-500 text-white shadow"
              : "text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-800 hover:text-emerald-900 dark:hover:text-white"
          }`
        }
      >
        <FaPlus className="text-base" />
        Create Assignment
      </NavLink>

      <NavLink
        to="/submissions"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
          ${
            isActive
              ? "bg-emerald-500 text-white shadow"
              : "text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-800 hover:text-emerald-900 dark:hover:text-white"
          }`
        }
      >
        <FaClipboardList className="text-base" />
        My Submissions
      </NavLink>
    </div>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="w-full text-left cursor-pointer px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-b-xl transition-colors duration-200"
    >
      Logout
    </button>
  </div>
</div>

    )
  );
};

export default ProfileDropdown;
