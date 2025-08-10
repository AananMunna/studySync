import { useState, useEffect, useContext } from "react";
import { FiPlus, FiSearch, FiFilter, FiX, FiRefreshCw } from "react-icons/fi";
import {
  MdPeopleOutline,
  MdPersonOutline,
} from "react-icons/md";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../context/AuthProvider";

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

  const {user} = useContext(AuthContext)

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
      <header
        className={`sticky top-0 z-10 bg-white/90 dark:bg-gray-900/95 border-b border-white/20 shadow-sm py-4 px-4 sm:px-6 backdrop-blur-lg`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Title and count */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
                  📚
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Dashboard
                </h1>
              </div>

              <div className="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-600" />

              <div className="hidden md:flex items-center gap-3">
                <p
                  className={`text-sm font-medium flex items-center gap-1 ${
                    assignments.length === 0
                      ? "text-red-500"
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
              <div className="flex items-center w-52 px-3 py-2 rounded-xl border border-gray-300/40 dark:border-white/20 bg-white/70 dark:bg-gray-800/70 shadow-sm">
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
                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              {/* Difficulty Filter */}
              <div
                className="relative"
                data-tooltip-id="tooltip"
                data-tooltip-content="Filter by difficulty"
              >
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="appearance-none text-sm px-3 pr-8 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-300/40 dark:border-white/20 text-gray-800 dark:text-white shadow-sm"
                >
                  <option value="">All Levels</option>
                  <option value="easy">🟢 Easy</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="hard">🔴 Hard</option>
                </select>
                <FiFilter className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 pointer-events-none" />
              </div>

              {/* My Assignments Toggle */}
              {user && <button
                onClick={() => {
                  setIsMyAssignments(!isMyAssignments);
                  isMyAssignments
                    ? fetchFilteredAssignments()
                    : handleMyAssignmentFilter();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-sm ${
                  isMyAssignments
                    ? "bg-purple-600 text-white"
                    : "bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white"
                }`}
                data-tooltip-id="tooltip"
                data-tooltip-content={
                  isMyAssignments ? "View all assignments" : "View my assignments"
                }
              >
                {isMyAssignments ? (
                  <MdPersonOutline className="text-lg" />
                ) : (
                  <MdPeopleOutline className="text-lg" />
                )}
                <span className="hidden lg:inline">
                  {isMyAssignments ? "My Assignments" : "All Assignments"}
                </span>
              </button>}

              {/* Refresh */}
              <button
                onClick={fetchFilteredAssignments}
                className="p-2 rounded-full bg-white/70 dark:bg-gray-800/70 border border-gray-300/40 dark:border-white/20 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-white shadow-md"
                data-tooltip-id="tooltip"
                data-tooltip-content="Refresh assignments"
              >
                <FiRefreshCw className="text-lg" />
              </button>

              {/* Create Button */}
              <Link
                to="/create"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium shadow-sm"
                data-tooltip-id="tooltip"
                data-tooltip-content="Create new assignment"
              >
                <FiPlus className="text-base" />
                <span className="hidden lg:inline">New Assignment</span>
              </Link>

              {/* Clear Filters */}
              {(searchText || difficulty || isMyAssignments) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <FiX size={16} />
                  <span className="hidden lg:inline">Clear</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <FiFilter className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden sticky top-16 left-0 right-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md px-4 py-3">
          <div className="flex flex-col gap-3">
            {/* Mobile Search */}
            <div className="flex items-center w-full px-3 py-2 rounded-xl border border-gray-300/40 dark:border-white/20 bg-white/70 dark:bg-gray-800/70 shadow-sm">
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
                  className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              {/* Mobile Difficulty */}
              <div className="flex-1 relative">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full text-sm px-3 pr-8 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-300/40 dark:border-white/20 text-gray-800 dark:text-white shadow-sm"
                >
                  <option value="">All Levels</option>
                  <option value="easy">🟢 Easy</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="hard">🔴 Hard</option>
                </select>
                <FiFilter className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 pointer-events-none" />
              </div>

              {(searchText || difficulty || isMyAssignments) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* Mobile Assignment Toggle */}
            <button
              onClick={() => {
                setIsMyAssignments(!isMyAssignments);
                isMyAssignments
                  ? fetchFilteredAssignments()
                  : handleMyAssignmentFilter();
              }}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-medium shadow-sm ${
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
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium shadow-sm"
            >
              <FiPlus className="text-base" />
              <span>New Assignment</span>
            </Link>
          </div>
        </div>
      )}

      {/* Tooltip Provider */}
      <Tooltip id="tooltip" className="z-50" />
    </>
  );
};

export default DashboardHeader;
