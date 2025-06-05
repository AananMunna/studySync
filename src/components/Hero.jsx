import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Lottie from "lottie-react";
import studyAnimation from "../assets/study2.json";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-24 md:py-32 text-gray-900 dark:text-white transition-colors duration-500 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] rounded-full bg-indigo-300 dark:bg-indigo-600 opacity-10 blur-[120px] z-0"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="text-center md:text-left space-y-6 max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Group Study, <span className="text-indigo-600 dark:text-indigo-400">Simplified</span>.
          </h1>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Submit, evaluate, and collaborate on assignments with friends. Perfect for MERN stack learners sharpening real-world dev skills.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2"
          >
            <Link
              to="/assignments"
              className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md hover:scale-[1.03] transition-transform duration-300"
            >
              Explore Assignments
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-300 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>

        {/* Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
          className="w-full max-w-md"
        >
          <Lottie animationData={studyAnimation} loop={true} />
        </motion.div>
      </div>
    </section>
  );
}
