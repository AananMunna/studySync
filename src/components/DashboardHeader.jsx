import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiFilter, FiX } from "react-icons/fi";
import { MdPeopleOutline, MdPersonOutline, MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const DashboardHeader = ({
  assignments,
  searchText,
  setSearchText,
  difficulty,
  setDifficulty,
  handleMyAssignmentFilter,
  fetchFilteredAssignments,
  isFilterActive,
}) => {
  const [isMyAssignments, setIsMyAssignments] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearFilters = () => {
    setSearchText("");
    setDifficulty("");
    if (isMyAssignments) {
      setIsMyAssignments(false);
      fetchFilteredAssignments();
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 z-50 bg-white/90 dark:bg-gray-900/95 border-b border-white/20 shadow-sm ${
          hasScrolled ? "py-3" : "py-4 sm:py-6"
        } px-4 sm:px-6 backdrop-blur-lg transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Title and count */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 group"
                data-tooltip-id="tooltip"
                data-tooltip-content="Return to homepage"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md"
                >
                  <MdOutlineDashboard className="text-2xl text-white" />
                </motion.div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  StudySync
                </h1>
              </Link>

              <div className="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-600" />

              <div className="hidden md:flex items-center gap-3">
                <p
                  className={`text-sm font-medium flex items-center gap-1 transition-all duration-500 ${
                    assignments.length === 0
                      ? "text-red-500 animate-pulse"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {assignments.length === 0 ? (
                    <>
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300">
                        !
                      </span>
                      <span>No assignments</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300">
                        {assignments.length}
                      </span>
                      <span>assignments</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center w-52 px-3 py-2 rounded-xl border border-gray-300/40 dark:border-white/20 bg-white/70 dark:bg-gray-800/70 shadow-sm hover:shadow-md backdrop-blur transition-all duration-300 focus-within:ring-2 ring-blue-400"
              >
                <FiSearch className="text-gray-500 dark:text-gray-300 mr-2 text-base" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                {searchText && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={() => setSearchText("")}
                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <FiX size={16} />
                  </motion.button>
                )}
              </motion.div>

              {/* Difficulty Filter */}
              <div className="relative group" data-tooltip-id="tooltip" data-tooltip-content="Filter by difficulty">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="appearance-none text-sm px-3 pr-8 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-300/40 dark:border-white/20 text-gray-800 dark:text-white shadow-sm hover:shadow-md hover:ring-2 ring-blue-400 transition-all cursor-pointer"
                >
                  <option value="">All Levels</option>
                  <option value="easy">🟢 Easy</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="hard">🔴 Hard</option>
                </select>
                <FiFilter className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 pointer-events-none" />
              </div>

              {/* My Assignments Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setIsMyAssignments(!isMyAssignments);
                  isMyAssignments ? fetchFilteredAssignments() : handleMyAssignmentFilter();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all ${
                  isMyAssignments
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-white/70 dark:bg-gray-800/70 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
                }`}
                data-tooltip-id="tooltip"
                data-tooltip-content={isMyAssignments ? "View all assignments" : "View my assignments"}
              >
                {isMyAssignments ? (
                  <MdPersonOutline className="text-lg" />
                ) : (
                  <MdPeopleOutline className="text-lg" />
                )}
                <span className="hidden lg:inline">
                  {isMyAssignments ? "My Assignments" : "All Assignments"}
                </span>
              </motion.button>

              {/* Create New Assignment Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/create"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Create new assignment"
                >
                  <FiPlus className="text-base" />
                  <span className="hidden lg:inline">New Assignment</span>
                </Link>
              </motion.div>

              {/* Clear Filters Button (conditional) */}
              {(searchText || difficulty || isMyAssignments) && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FiX size={16} />
                  <span className="hidden lg:inline">Clear</span>
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="text-xl" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md px-4 py-3"
          >
            <div className="flex flex-col gap-3">
              {/* Mobile Search Box */}
              <div className="flex items-center w-full px-3 py-2 rounded-xl border border-gray-300/40 dark:border-white/20 bg-white/70 dark:bg-gray-800/70 shadow-sm backdrop-blur transition-all duration-300 focus-within:ring-2 ring-blue-400">
                <FiSearch className="text-gray-500 dark:text-gray-300 mr-2 text-base" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                {searchText && (
                  <button
                    onClick={() => setSearchText("")}
                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                {/* Mobile Difficulty Filter */}
                <div className="flex-1 relative">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full text-sm px-3 pr-8 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-300/40 dark:border-white/20 text-gray-800 dark:text-white shadow-sm transition-all"
                  >
                    <option value="">All Levels</option>
                    <option value="easy">🟢 Easy</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="hard">🔴 Hard</option>
                  </select>
                  <FiFilter className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 pointer-events-none" />
                </div>

                {/* Mobile Clear Button */}
                {(searchText || difficulty || isMyAssignments) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              {/* Mobile Assignment Toggle */}
              <button
                onClick={() => {
                  setIsMyAssignments(!isMyAssignments);
                  isMyAssignments ? fetchFilteredAssignments() : handleMyAssignmentFilter();
                }}
                className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-all ${
                  isMyAssignments
                    ? "bg-purple-600 text-white"
                    : "bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white"
                }`}
              >
                {isMyAssignments ? (
                  <>
                    <MdPersonOutline className="text-lg" />
                    <span>My Assignments</span>
                  </>
                ) : (
                  <>
                    <MdPeopleOutline className="text-lg" />
                    <span>All Assignments</span>
                  </>
                )}
              </button>

              {/* Mobile Create Button */}
              <Link
                to="/create"
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-sm transition-all"
              >
                <FiPlus className="text-base" />
                <span>New Assignment</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip provider */}
      <Tooltip id="tooltip" className="z-50" />
    </>
  );
};

export default DashboardHeader;