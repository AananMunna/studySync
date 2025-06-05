import React from "react";
import { motion } from "framer-motion";

const submittedAssignments = [
  {
    id: 1,
    title: "JavaScript Basics",
    totalMarks: 50,
    obtainedMarks: 45,
    status: "Reviewed",
    feedback: "Well done! Just missed edge cases.",
  },
  {
    id: 2,
    title: "React Hooks Advanced",
    totalMarks: 80,
    obtainedMarks: null,
    status: "Pending",
    feedback: null,
  },
];

const MySubmittedAssignments = () => {
  return (
    <div className="px-4 md:px-12 py-10 min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900 dark:text-blue-300"
      >
        📝 My Submitted Assignments
      </motion.h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-blue-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Title</th>
              <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Total Marks</th>
              <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Obtained</th>
              <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((assignment, index) => (
              <motion.tr
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3 text-gray-800 dark:text-gray-200">{assignment.title}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      assignment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                        : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </td>
                <td className="p-3 text-gray-800 dark:text-gray-200">{assignment.totalMarks}</td>
                <td className="p-3 text-gray-800 dark:text-gray-200">
                  {assignment.obtainedMarks !== null ? assignment.obtainedMarks : "-"}
                </td>
                <td className="p-3 text-gray-800 dark:text-gray-400">
                  {assignment.feedback || (
                    <span className="italic text-gray-400 dark:text-gray-600">
                      Not reviewed yet
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-6">
        {submittedAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-4 border rounded-xl shadow-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">
              {assignment.title}
            </h3>
            <p className="mt-2 text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  assignment.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                    : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                }`}
              >
                {assignment.status}
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              <strong>Total Marks:</strong> {assignment.totalMarks}
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              <strong>Obtained:</strong>{" "}
              {assignment.obtainedMarks !== null ? assignment.obtainedMarks : "-"}
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
              <strong>Feedback:</strong>{" "}
              {assignment.feedback || (
                <span className="italic text-gray-400 dark:text-gray-600">Not reviewed yet</span>
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MySubmittedAssignments;
