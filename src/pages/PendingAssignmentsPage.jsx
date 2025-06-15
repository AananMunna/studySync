import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit3 } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

const PendingAssignmentsPage = () => {
  const [selected, setSelected] = useState(null);
  const [givenMark, setGivenMark] = useState("");
  const [feedback, setFeedback] = useState("");
  const [pendingAssignments, SetPendingAssignments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = use(AuthContext);

  const handleOpenModal = (assignment) => {
    setSelected(assignment);
    setGivenMark("");
    setFeedback("");
  };

  const handleSubmit = () => {
    selected.givenMark = givenMark;
    selected.feedback = feedback;
    selected.examinerEmail = user?.email;
    selected.examiner = user?.displayName;
    selected.status = "reviewed";

    axios
      .put(`${import.meta.env.VITE_URL}/give-mark/${selected._id}`, selected,{
        headers: {
          authorization: `Bearer ${user?.accessToken}`
        }
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Marks Given!",
            text: "The assignment was marked successfully.",
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Update",
            text: "Nothing was changed.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
    setSelected(null);
    const remaining = pendingAssignments.filter((a) => a.status === "pending");
    SetPendingAssignments(remaining);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/pending-assignment`,{
        headers: {
          authorization: `Bearer ${user?.accessToken}`
        }
      })
      .then((response) => {
        SetPendingAssignments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen px-4 md:px-12 py-10 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-950/50 dark:to-gray-900/50">
      {/* Floating header */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Pending Assignments
            </span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Review and evaluate submitted work
          </p>
        </div>
      </motion.div>

      {/* Content area */}
      <div className="relative mt-12">
        {/* Depth effect background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-purple-500/10 opacity-20 dark:opacity-30"></div>
        </div>

        {pendingAssignments.length > 0 ? (
          <motion.div
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {pendingAssignments.map((assignment) => (
              <motion.div
                key={assignment?._id}
                className="relative group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {/* Glass card with depth */}
                <div className="relative overflow-hidden rounded-2xl h-full">
                  {/* Depth layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl"></div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {assignment?.title}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                          {assignment?.totalMark} pts
                        </span>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Submitted by:</span>{" "}
                          {assignment?.examineEmail === user.email
                            ? "You"
                            : assignment?.examineName}
                        </p>
                        
                        {assignment.examineEmail === user.email && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            Awaiting review by an examiner
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {assignment?.examineEmail !== user.email && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOpenModal(assignment)}
                        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <FiEdit3 className="text-blue-500" />
                        <span>Evaluate</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
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
                No Pending Assignments
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                All assignments have been reviewed. Great job!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 w-full max-w-lg border border-white/30 dark:border-gray-700/30 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Depth effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-30 -z-10"></div>
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Evaluate Submission
                  </span>
                </h3>

                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-white/30 dark:border-gray-700/30">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{selected.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Notes:</span> {selected.note}
                    </p>
                    <a
                      href={selected.docsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View submission <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Grade
                      </label>
                      <input
                        type="number"
                        placeholder="Enter marks"
                        required
                        className="w-full px-4 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={givenMark}
                        onChange={(e) => setGivenMark(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Feedback
                      </label>
                      <textarea
                        placeholder="Provide detailed feedback..."
                        required
                        rows="4"
                        className="w-full px-4 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity shadow-md"
                      >
                        <MdOutlineAssignmentTurnedIn className="text-lg" />
                        Submit Evaluation
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                        onClick={() => setSelected(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingAssignmentsPage;