import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";

const AssignmentsPage = () => {
  const currentUserEmail = "creator@example.com";
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/getAllAssignments`)
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    console.log("🗑️ Trying to delete assignment ID:", id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-4 md:px-12 py-10 bg-gradient-to-b from-[#f4f7fa] to-white dark:from-[#0a0c10] dark:to-[#111318]"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white tracking-tight"
      >
        📱 StudySync Dashboard
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <motion.div
            key={assignment._id}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative group bg-white/70 dark:bg-[#1c1f25] backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={assignment.thumbnail}
              alt={assignment.title}
              className="rounded-xl h-44 w-full object-cover mb-4 border border-gray-200 dark:border-gray-800"
            />

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {assignment.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🎯 Difficulty: <span className="font-medium text-gray-900 dark:text-gray-200">{assignment.difficulty}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📝 Marks: <span className="font-medium text-gray-900 dark:text-gray-200">{assignment.marks}</span>
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <Link to={`/assignment/view/${assignment._id}`}>
                <button
                  className="p-2 rounded-xl bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 backdrop-blur-md transition-all shadow-sm hover:shadow-md cursor-pointer"
                  title="View"
                >
                  <FiEye className="text-green-600 dark:text-green-300 text-lg" />
                </button>
              </Link>

              <Link to={`/assignment/update/${assignment._id}`}>
                <button
                  disabled={currentUserEmail !== assignment.creatorEmail}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm hover:shadow-md ${
                    currentUserEmail === assignment.creatorEmail
                      ? "bg-blue-100/50 dark:bg-blue-900/20 hover:bg-blue-200/60 dark:hover:bg-blue-700/30 cursor-pointer"
                      : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                  }`}
                  title="Edit"
                >
                  <FiEdit className="text-blue-500 dark:text-blue-300 text-lg" />
                </button>
              </Link>

              <button
                onClick={() => handleDelete(assignment._id)}
                disabled={currentUserEmail !== assignment.creatorEmail}
                className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm hover:shadow-md ${
                  currentUserEmail === assignment.creatorEmail
                    ? "bg-red-100/50 dark:bg-red-900/20 hover:bg-red-200/60 dark:hover:bg-red-700/30 cursor-pointer"
                    : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                }`}
                title="Delete"
              >
                <FiTrash2 className="text-red-500 dark:text-red-300 text-lg" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AssignmentsPage;
