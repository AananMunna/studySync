import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";


const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login, googleLogin } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setError("");

    login(email, password)
      .then((userCredential) => {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((err) => {
        setError("Invalid email or password.");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: err.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((err) => {
        setError("Google login failed.");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: err.message,
        });
      });
  };




  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 dark:bg-black">



      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-10 w-full max-w-md border border-white/20 shadow-xl dark:shadow-black/50"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-extrabold text-blue-800 dark:text-blue-400"
          >
            📘 StudySync Portal
          </motion.h2>
        </div>
        <p className="text-center text-sm text-blue-700 dark:text-blue-300 mb-6">
          Connect, Learn, and Elevate Your Study Journey 🚀
        </p>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-blue-900 dark:text-blue-300 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 dark:text-blue-300 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-700 dark:text-blue-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-bold shadow-md transition duration-300"
          >
            Login
          </button>
        </form>

       <button
          onClick={handleGoogleLogin}
          className="flex items-center mt-3 justify-center w-full border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md py-2 space-x-3 transition focus:ring-4 focus:ring-blue-400"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.35 11.1H12v2.8h5.25a4.5 4.5 0 01-4.35 3 4.74 4.74 0 01-4.75-4.75 4.75 4.75 0 014.75-4.75c1.3 0 2.35.48 3.2 1.26l2.24-2.24a7.92 7.92 0 00-5.44-2.26A7.88 7.88 0 004 12a7.87 7.87 0 007.88 7.88 8.03 8.03 0 007.54-5.5z" />
          </svg>
          <span className="font-semibold text-blue-700 dark:text-blue-400">
            Continue with Google
          </span>
        </button>

        <p className="mt-6 text-center text-sm text-blue-900 dark:text-blue-300">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
