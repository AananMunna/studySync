import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const AssignmentsPage = () => {
  // const [currentUserEmail, setCurrentUserEmail] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  // console.log(user);
  const currentUserEmail = user?.email;
  // console.log(assignments);
  useEffect(() => {
    setLoading(true); // 👉 ডেটা লোড শুরু
    axios
      .get(`${import.meta.env.VITE_URL}/getAllAssignments`)
      .then((res) => setAssignments(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // ✅ ডেটা লোড শেষ হলে
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup:
          "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl",
        title: "text-xl font-semibold",
        htmlContainer: "text-base",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded dark:bg-blue-500 dark:hover:bg-blue-600",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ml-2 dark:bg-red-500 dark:hover:bg-red-600",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_URL}/delete-one/${id}`)
          .catch((err) => console.log(err));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          customClass: {
            popup:
              "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl",
            title: "text-xl font-semibold",
            htmlContainer: "text-base",
          },
          buttonsStyling: false,
        });

        const remaining = assignments.filter((ass) => ass._id !== id);
        setAssignments(remaining);
      }
    });
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

     {assignments.length === 0 ? <div className="flex flex-col items-center justify-center text-center py-24 px-6 md:px-10 bg-gradient-to-br from-white via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-inner border border-dashed border-indigo-400 dark:border-indigo-600 transition duration-500">
  
  <div className="text-6xl mb-6 animate-pulse">📚</div>
  
  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
    No Assignments Yet!
  </h2>

  <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
    You haven’t added any assignments yet. Start by creating your first one and help others learn better! 🚀
  </p>

  <Link
    to="/create"
    className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
  >
    ➕ Add Assignment
  </Link>
</div>
:  loading ? <LoadingSpinner/> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            {/* {console.log(assignment.creator)} */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {assignment.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🎯 Difficulty:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-200">
                {assignment.difficulty}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📝 Marks:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-200">
                {assignment.marks}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📝 Created by:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-200">
                {assignment.email === user?.email ? "You" : assignment.creator}
              </span>
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
                  disabled={currentUserEmail !== assignment.email}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm hover:shadow-md ${
                    currentUserEmail === assignment.email
                      ? "bg-blue-100/50 dark:bg-blue-900/20 hover:bg-blue-200/60 dark:hover:bg-blue-700/30 cursor-pointer"
                      : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                  }`}
                  title={`${
                    currentUserEmail === assignment.email
                      ? "Edit"
                      : "🙃 Nice try! This assignment isn’t yours — you can’t ✏️ edit someone else’s masterpiece 🧠💡."
                  }`}
                >
                  <FiEdit className="text-blue-500 dark:text-blue-300 text-lg" />
                </button>
              </Link>

              <button
                onClick={() => handleDelete(assignment._id)}
                disabled={currentUserEmail !== assignment.email}
                className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm hover:shadow-md ${
                  currentUserEmail === assignment.email
                    ? "bg-red-100/50 dark:bg-red-900/20 hover:bg-red-200/60 dark:hover:bg-red-700/30 cursor-pointer"
                    : "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                }`}
                title={`${
                  currentUserEmail === assignment.email
                    ? "Edit"
                    : "🙅‍♂️ Nice try! This assignment isn’t yours — you can’t 🗑️ delete someone else’s hard-earned masterpiece 🧠🎯."
                }`}
              >
                <FiTrash2 className="text-red-500 dark:text-red-300 text-lg" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>}
     {/* {console.log(assignments)} */}
    </motion.div>
  );
};

export default AssignmentsPage;
