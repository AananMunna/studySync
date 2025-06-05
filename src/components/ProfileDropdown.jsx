import { useState, useEffect, useRef, use } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

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
          // // Optional: redirect to login or homepage
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
  {/* Avatar Click */}
  <div
    onClick={() => setOpen(!open)}
    className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center cursor-pointer border-2 border-emerald-300 hover:border-emerald-200 transition-all dark:border-emerald-700 dark:hover:border-emerald-500"
  >
    {user.photoURL ? (
      <img
        className="rounded-full h-9 w-10 object-cover"
        src={user.photoURL}
        alt="Profile"
      />
    ) : (
      <FaUser className="text-white text-lg" />
    )}
  </div>

  {/* Dropdown Panel */}
  <div
    className={`absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-green-100 transition-all duration-300 transform dark:bg-gray-800 dark:border-green-700 dark:shadow-black ${
      open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
    }`}
  >
    <div className="px-4 py-3 border-b border-emerald-50 dark:border-emerald-700">
      <p className="text-sm text-gray-800 font-medium uppercase dark:text-gray-200">
        {user.displayName}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
    </div>
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors dark:text-gray-300 dark:hover:bg-emerald-700"
    >
      Logout
    </button>
  </div>
</div>

    )
  );
};

export default ProfileDropdown;
