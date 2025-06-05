import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, googleLogin } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;

    setError("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters, including 1 uppercase, 1 lowercase, and 1 special character."
      );
      return;
    }

    try {
      const userCredential = await register(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || undefined,
      });

      Swal.fire({
        title: "Welcome aboard!",
        text: `Hello, ${name}! Your account was successfully created.`,
        icon: "success",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      Swal.fire({
        title: "Google login successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: "error",
        title: "Google login failed",
        text: error.message,
      });
    }
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center flex items-center justify-center dark:bg-gray-900"
      
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 my-5 dark:bg-black/60 p-8 rounded-2xl shadow-lg max-w-md w-full backdrop-blur-md dark:shadow-black"
      >
        <h2 className="text-3xl font-extrabold text-blue-800 dark:text-blue-400 text-center mb-6 select-none">
          📚 Register to StudySync
        </h2>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-blue-800 dark:text-blue-400 mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-blue-800 dark:text-blue-400 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="block text-sm font-semibold text-blue-800 dark:text-blue-400 mb-1"
            >
              Photo URL <small className="text-gray-500">(optional)</small>
            </label>
            <input
              id="photoURL"
              name="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-blue-800 dark:text-blue-400 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$"
              title="At least 8 characters, including 1 uppercase, 1 lowercase, and 1 special character"
              placeholder="At least 8 characters with uppercase, lowercase, and special char"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-blue-600 dark:text-blue-400"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9a8.96 8.96 0 011.1-4.475m3.9-2.4A9.96 9.96 0 0112 5c5 0 9 4 9 9a8.96 8.96 0 01-1.1 4.475m-3.9 2.4L3 3"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 8 characters, 1 uppercase, 1 lowercase, and 1 special character.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 text-white font-semibold py-3 rounded-md transition"
          >
            Register
          </button>
        </form>

        <div className="my-6 text-center text-gray-700 dark:text-gray-300">
          Or register with
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md py-2 space-x-3 transition focus:ring-4 focus:ring-blue-400"
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

        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            Log in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
