import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiEdit, FiEye, FiTrash2, FiPlus } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";
import DashboardHeader from "../components/DashboardHeader";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  const currentUserEmail = user?.email;

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`${import.meta.env.VITE_URL}/getAllAssignments`)
  //     .then((res) => setAssignments(res.data))
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, []);

  const [searchText, setSearchText] = useState("");
  const [difficulty, setDifficulty] = useState("");
  console.log(searchText, difficulty);

  const fetchFilteredAssignments  = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/getAllAssignments?search=${searchText}&difficulty=${difficulty}`
      );
      const data = await response.json();
      setAssignments(data); // ফিল্টার করা assignment গুলো এখানে আসবে
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
    setLoading(false)
  };

  useEffect(() => {
  fetchFilteredAssignments();
}, [searchText, difficulty]); 

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
          "bg-white dark:bg-gray-800/90 backdrop-blur-md text-gray-800 dark:text-gray-100 rounded-2xl border border-gray-200/50 dark:border-white/10",
        title: "text-xl font-semibold",
        htmlContainer: "text-base",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg dark:bg-blue-500/90 dark:hover:bg-blue-600/90 transition-all",
        cancelButton:
          "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg ml-3 dark:bg-gray-700/90 dark:hover:bg-gray-600/90 dark:text-gray-100 transition-all",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_URL}/delete-one/${id}`)
          .catch((err) => console.log(err));

        Swal.fire({
          title: "Deleted!",
          text: "Assignment has been deleted.",
          icon: "success",
          customClass: {
            popup:
              "bg-white dark:bg-gray-800/90 backdrop-blur-md text-gray-800 dark:text-gray-100 rounded-2xl border border-gray-200/50 dark:border-white/10",
          },
          buttonsStyling: false,
        });

        const remaining = assignments.filter((ass) => ass._id !== id);
        setAssignments(remaining);
      }
    });
  };

  // Group assignments by status (example grouping)
  const groupedAssignments = {
    active: assignments.filter((ass) => !ass.completed),
    completed: assignments.filter((ass) => ass.completed),
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-4 md:px-8 py-8 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
    >
      {/* Header with floating glass effect */}
      <DashboardHeader
        assignments={assignments}
        searchText={searchText}
        setSearchText={setSearchText}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-8">
          {/* Active Assignments Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Assignments
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedAssignments.active.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                  user={user}
                  currentUserEmail={currentUserEmail}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </motion.section>

          {/* Completed Assignments Section */}
          {groupedAssignments.completed.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Completed Assignments
              </h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupedAssignments.completed.map((assignment) => (
                  <AssignmentCard
                    key={assignment._id}
                    assignment={assignment}
                    user={user}
                    currentUserEmail={currentUserEmail}
                    handleDelete={handleDelete}
                    isCompleted
                  />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      )}
    </motion.div>
  );
};

// Extracted Assignment Card Component for better readability
const AssignmentCard = ({
  assignment,
  user,
  currentUserEmail,
  handleDelete,
  isCompleted = false,
}) => {
  return (
    <motion.div
      key={assignment._id}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`relative group backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-md border ${
        isCompleted
          ? "border-gray-300/50 dark:border-gray-600/30"
          : "border-gray-200/50 dark:border-white/10"
      } transition-all duration-300`}
    >
      {/* Thumbnail with glass overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={assignment.thumbnail}
          alt={assignment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {isCompleted && (
          <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            Completed
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-1">
          {assignment.title}
        </h3>

        <div className="space-y-2.5 text-sm">
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                assignment.difficulty === "easy"
                  ? "bg-emerald-500"
                  : assignment.difficulty === "medium"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            ></span>
            {assignment.difficulty.charAt(0).toUpperCase() +
              assignment.difficulty.slice(1)}
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Marks:</span> {assignment.marks}
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">By:</span>{" "}
            {assignment?.creatorEmail === user?.email
              ? "You"
              : assignment?.creatorName}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Link to={`/assignment/view/${assignment._id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-md transition-all shadow-xs hover:shadow-sm"
              title="View"
            >
              <FiEye className="text-emerald-600 dark:text-emerald-400 text-lg" />
            </motion.button>
          </Link>

          {currentUserEmail === assignment.creatorEmail && (
            <>
              <Link to={`/assignment/update/${assignment._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="p-2 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-md transition-all shadow-xs hover:shadow-sm"
                  title="Edit"
                >
                  <FiEdit className="text-blue-600 dark:text-blue-400 text-lg" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(assignment._id)}
                className="p-2 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-md transition-all shadow-xs hover:shadow-sm"
                title="Delete"
              >
                <FiTrash2 className="text-red-600 dark:text-red-400 text-lg" />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AssignmentsPage;
