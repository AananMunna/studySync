import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiPlus, FiSearch, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router";

const DashboardHeader = ({ assignments }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="top-0 z-10 backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-white/10 shadow-xl rounded-2xl px-4 py-4 sm:py-6 mb-6"
    >
      <div className="flex flex-col gap-4 sm:gap-3 md:flex-row md:items-center md:justify-between">
        {/* Title and count */}
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            StudySync Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {assignments.length} assignments found
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="flex items-center w-full sm:w-48 px-3 py-2 rounded-full border border-gray-300/50 dark:border-white/20 bg-white/60 dark:bg-gray-800/50 backdrop-blur-md shadow-inner transition-all focus-within:ring-2 ring-blue-400">
            <FiSearch className="text-gray-500 dark:text-gray-300 mr-2 text-sm" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* Difficulty dropdown */}
          <select
            className="text-sm px-3 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-300/50 dark:border-white/20 text-gray-800 dark:text-white shadow-inner appearance-none hover:ring-2 ring-blue-400 transition-all"
          >
            <option value="">All</option>
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>

          

          {/* New Assignment Button */}
          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <FiPlus className="text-base" />
            <span className="hidden sm:inline">New Assignment</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
