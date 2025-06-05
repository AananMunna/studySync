import { useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaChartLine, FaUserGraduate } from "react-icons/fa";

const AssignmentDetails = () => {
  const [showForm, setShowForm] = useState(false);

  const assignment = {
    title: "React Fundamentals Project",
    description:
      "Create a responsive React application demonstrating useState, props, conditional rendering, and component hierarchy. Style with Tailwind CSS.",
    marks: 100,
    difficulty: "Intermediate",
    creatorName: "Munna",
    thumbnail: "https://source.unsplash.com/800x400/?react,code,technology",
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
    <motion.div
      className="max-w-5xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={assignment.thumbnail}
        alt="Assignment Thumbnail"
        className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg border border-gray-300 dark:border-gray-700"
        whileHover={{ scale: 1.01 }}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {assignment.title}
        </motion.h1>

        <motion.button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:brightness-110 transition"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.04 }}
        >
          Take Assignment
        </motion.button>
      </div>

      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {assignment.description}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="flex items-center gap-3 text-blue-700 dark:text-blue-400 font-medium">
          <FaUserGraduate className="text-xl" />
          <span>Marks: {assignment.marks}</span>
        </div>
        <div className="flex items-center gap-3 text-green-700 dark:text-green-400 font-medium">
          <FaChartLine className="text-xl" />
          <span>Difficulty: {assignment.difficulty}</span>
        </div>
        <div className="flex items-center gap-3 text-fuchsia-700 dark:text-fuchsia-400 font-medium">
          <FaBookOpen className="text-xl" />
          <span>Creator: {assignment.creatorName}</span>
        </div>
      </div>

      {showForm && (
        <motion.div
          className="p-6 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-inner mt-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Submit Assignment
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Google Docs Link
              </label>
              <input
                type="url"
                placeholder="https://docs.google.com/..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Note (optional)
              </label>
              <textarea
                rows={4}
                placeholder="Add any notes for the reviewer..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition duration-300"
            >
              Submit Now
            </button>
          </form>
        </motion.div>
      )}
    </motion.div>
    </div>
  );
};

export default AssignmentDetails;
