import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const AssignmentsPage = () => {
  const currentUserEmail = "creator@example.com";
  const [assignments, setAssignments] = useState([]);

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_URL}/getAllAssignments`)
    .then(res => setAssignments(res.data))
    .catch(err => console.log(err))
  },[])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-4 md:px-12 py-10 min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-900 dark:text-green-300"
      >
        📚 Study Assignments
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            variants={cardVariants}
            whileHover={{
              scale: 1.04,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
          >
            <motion.img
              src={assignment.thumbnail}
              alt={assignment.title}
              className="h-44 w-full object-cover"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
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
                <Link to={`/AssignmentDetails`}>
                {/* <Link to={`/assignment/view/${assignment.id}`}> */}
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
      </motion.div>
    </motion.div>
  );
};

const handleDelete = (id) => {
  console.log("🗑️ Trying to delete assignment ID:", id);
};

export default AssignmentsPage;
