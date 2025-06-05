import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

const assignments = [
  {
    id: 1,
    title: "JavaScript Basics",
    marks: 50,
    level: "Easy",
    thumbnail: "https://i.ibb.co/PrBrp6S/js-basic.jpg",
    creatorEmail: "creator@example.com",
  },
  {
    id: 2,
    title: "React Hooks Advanced",
    marks: 80,
    level: "Hard",
    thumbnail: "https://i.ibb.co/7WZs5Bb/react-hooks.jpg",
    creatorEmail: "someone@example.com",
  },
];

const AssignmentsPage = () => {
  const currentUserEmail = "creator@example.com"; // use actual logged-in user email

  return (
    <div className="px-4 md:px-12 py-10 min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-900 dark:text-green-300">
        📚 Study Assignments
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <motion.div
            key={assignment.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
          >
            <img
              src={assignment.thumbnail}
              alt={assignment.title}
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                {assignment.title}
              </h3>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                Difficulty: <span className="font-medium">{assignment.level}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Marks: <span className="font-medium">{assignment.marks}</span>
              </p>

              <div className="flex justify-between items-center mt-4 space-x-2">
                <Link to={`/assignment/view/${assignment.id}`}>
                  <button className="p-2 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-700 transition">
                    <FiEye className="text-green-600 dark:text-green-300" />
                  </button>
                </Link>

                <Link to={`/assignment/update/${assignment.id}`}>
                  <button
                    disabled={currentUserEmail !== assignment.creatorEmail}
                    className={`p-2 rounded-lg transition ${
                      currentUserEmail === assignment.creatorEmail
                        ? "bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-700"
                        : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                    }`}
                  >
                    <FiEdit className="text-blue-500 dark:text-blue-300" />
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(assignment.id)}
                  disabled={currentUserEmail !== assignment.creatorEmail}
                  className={`p-2 rounded-lg transition ${
                    currentUserEmail === assignment.creatorEmail
                      ? "bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-700"
                      : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  <FiTrash2 className="text-red-500 dark:text-red-300" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const handleDelete = (id) => {
  // 🔐 Future scope: show confirmation modal and then delete from DB
  console.log("Trying to delete assignment ID:", id);
};

export default AssignmentsPage;
