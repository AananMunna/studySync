import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const [expanded, setExpanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      Swal.fire({
        title: "Google login successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/assignments");
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Google login failed",
        text: error.message,
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then(() => {
        Swal.fire("Success!", "Logged in!", "success");
        navigate("/assignments");
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  const containerVariants = {
    collapsed: { width: 180, height: 60 },
    expanded: { width: 360, height: "auto" },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-black px-4">
      <motion.div
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden p-4 group"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          // Collapse only on desktop (not on touch devices)
          if (window.matchMedia("(hover: hover)").matches) {
            setExpanded(false);
          }
        }}
      >
        {/* Animated border when collapsed */}
        {!expanded && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-xl blur-sm opacity-75 animate-border-spin z-0 shadow-[0_0_10px_rgba(99,102,241,0.6)] pointer-events-none"></div>
        )}

        <div className="relative z-10">
          {!expanded ? (
            <motion.button
              onClick={() => setExpanded(true)}
              className="w-full h-full text-white font-bold bg-blue-700 hover:bg-blue-800 rounded-md shadow-inner tracking-wider text-lg cursor-pointer"
              style={{
                borderRadius: "6px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              Login
            </motion.button>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300 text-center">
                Login to StudySync
              </h2>

              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm dark:text-white focus:outline-none"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm dark:text-white focus:outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-semibold"
              >
                Login
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border cursor-pointer border-blue-600 py-2 rounded-md text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-800"
              >
                
                Login with Google
              </button>

              <div className="text-center text-sm text-blue-700 dark:text-blue-300">
                Don't have an account?{" "}
                <Link to="/register" className="underline">
                  Register
                </Link>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="text-sm cursor-pointer text-blue-600 dark:text-blue-400 underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* Custom CSS for animated border */}
      <style>
        {`
          @keyframes borderSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-border-spin {
            animation: borderSpin 3s linear infinite;
            background-size: 300% 300%;
            background-position: 0% 50%;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
