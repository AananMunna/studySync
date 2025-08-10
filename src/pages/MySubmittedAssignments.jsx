import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { Link } from "react-router";

const MySubmittedAssignments = () => {
  const [submittedAssignments, setSubmittedAssignments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = use(AuthContext);
console.log(submittedAssignments);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/my-assignment/${user?.email}`,{
        headers: {
          authorization: `Bearer ${user?.accessToken}`
        }
      })
      .then(response => {
        setSubmittedAssignments(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen  max-w-7xl mx-auto px-4 md:px-12 py-10 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-950/50 dark:to-gray-900/50">
      {/* Floating header with glass effect */}
      <motion.div 
        className="relative z-10 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                My Submissions
              </span>
            </h2>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Track your assignment evaluations
          </p>
        </div>
      </motion.div>

      {/* Depth effect background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-purple-500/10 opacity-20 dark:opacity-30"></div>
      </div>

      {/* Desktop Table - Vision Pro Style */}
      <div className="hidden md:block overflow-x-auto">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-700/30">
            <thead>
              <tr className="bg-white/50 dark:bg-gray-800/50">
                {["Title", "Status", "Total Marks", "Obtained", "Feedback", "Examiner"].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/30">
              {submittedAssignments.map((assignment, index) => (
                <motion.tr
                  key={assignment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {assignment?.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        assignment.status === "pending"
                          ? "bg-yellow-100/70 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                          : "bg-green-100/70 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {assignment.totalMark}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {assignment?.givenMark ?? (
                      <span className="italic text-gray-400 dark:text-gray-500">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {assignment.feedback ?? (
                      <span className="italic text-gray-400 dark:text-gray-500">Not available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {assignment.examiner ?? (
                      <span className="italic text-gray-400 dark:text-gray-500">-</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Layout - Vision Pro Style */}
      <div className="md:hidden space-y-4">
        {submittedAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl"
          >
            {/* Depth effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-20 -z-10"></div>
            
            {/* Glass card */}
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-1">
                  {assignment.title}
                </h3>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {assignment.totalMark} pts
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2 mb-3">
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    assignment.status === "pending"
                      ? "bg-yellow-100/70 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                      : "bg-green-100/70 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">Obtained:</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {assignment?.givenMark ?? (
                      <span className="italic text-gray-400 dark:text-gray-500">Pending</span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">Feedback:</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {assignment?.feedback ?? (
                      <span className="italic text-gray-400 dark:text-gray-500">None</span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">Examiner:</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {assignment?.examiner ?? (
                      <span className="italic text-gray-400 dark:text-gray-500">Not assigned</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {submittedAssignments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 shadow-lg max-w-md w-full">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2zm3-14v.01M12 12v.01"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No Submissions Yet
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              You haven't submitted any assignments yet.
            </p>
            <Link
              to="/assignments"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Your First Assignment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubmittedAssignments;