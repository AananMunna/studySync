import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-900 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <img
          src="https://media.tenor.com/1cL5fzcjpaQAAAAM/laptop.gif"
          alt="Cat Studying Illustration"
          className="w-64 mt-5 mx-auto mb-8 rounded-xl shadow-lg"
        />

        <h1 className="text-6xl font-extrabold text-blue-700 dark:text-blue-400 mb-2 select-none animate-pulse">
          404
        </h1>

        <h2 className="text-2xl md:text-4xl font-semibold text-blue-900 dark:text-blue-200 mb-4">
          Lost in the Pages?
        </h2>

        <p className="text-blue-700 dark:text-blue-300 text-base md:text-lg mb-8">
          This page doesn’t exist, but our study cat is still focused! Let’s get you back to your lessons.
        </p>

        <Link
          to="/"
          className="inline-block mb-5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
