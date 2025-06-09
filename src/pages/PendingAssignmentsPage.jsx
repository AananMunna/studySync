import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit3 } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

// const pendingAssignments = [
//   {
//     id: 1,
//     title: "Intro to HTML",
//     marks: 50,
//     examineeName: "Alice Khan",
//     examineeEmail: "alice@example.com",
//     status: "Pending",
//     docLink: "https://docs.google.com/document/d/1abc123",
//     notes: "I have completed all the tasks and added screenshots in the doc.",
//   },
//   {
//     id: 2,
//     title: "CSS Flexbox Project",
//     marks: 80,
//     examineeName: "Bob Islam",
//     examineeEmail: "bob@example.com",
//     status: "Pending",
//     docLink: "https://docs.google.com/document/d/2xyz456",
//     notes: "Please check the last part of the project, I was confused there.",
//   },
// ];


const PendingAssignmentsPage = () => {
  const [selected, setSelected] = useState(null);
  const [givenMark, setGivenMark] = useState("");
  const [feedback, setFeedback] = useState("");

  const [pendingAssignments, SetPendingAssignments] = useState(null); // state to store fetched data
  const [loading, setLoading] = useState(true); // state to track loading
  const [error, setError] = useState(null); // state to track errors
  const { user } = use(AuthContext);

  const handleOpenModal = (assignment) => {
    setSelected(assignment);
    setGivenMark("");
    setFeedback("");
  };

  const handleSubmit = () => {
    selected.givenMark = givenMark;
    selected.feedback = feedback;
    selected.examinerEmail = user.email;
    selected.examiner = user.displayName;
    selected.status = "reviewed";
    console.log(selected);
    
      axios.put(`${import.meta.env.VITE_URL}/give-mark/${selected._id}`, selected)
    .then(res => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Marks Given!',
          text: 'The assignment was marked successfully.',
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Update',
          text: 'Nothing was changed.',
        });
      }
    })
    .catch(err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    });
    setSelected(null);
    const remaining = pendingAssignments.filter(a => a.status === 'pending');
    SetPendingAssignments(remaining);
  };


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/pending-assignment`)
      .then((response) => {
        SetPendingAssignments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []); // empty dependency array = run once on mount

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen px-4 md:px-12 py-10 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-800 dark:text-indigo-300"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🧾 Pending Assignments
      </motion.h2>

      {pendingAssignments.length > 0 ? <motion.div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-200">
              {assignment?.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Marks: {assignment?.totalMark}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Examinee: {assignment?.userEmail === user.email ? 'You': assignment?.userName}
            </p>

            <button
              onClick={() => handleOpenModal(assignment)}
              className={`mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-700 transition ${assignment?.userEmail === user.email ? 'hidden': 'cursor-pointer'}`}
            >
              <FiEdit3 /> Give Mark
            </button>
          </motion.div>
        ))}
      </motion.div>:<div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2zm3-14v.01M12 12v.01" />
  </svg>
  <h2 className="text-xl font-semibold text-gray-600">No Pending Assignments</h2>
  <p className="text-sm text-gray-400">All assignments have been reviewed. Great job!</p>
</div>}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg mx-4 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-2xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">
                🧠 Evaluate Assignment
              </h3>

              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                <strong>Notes:</strong> {selected.note}
              </p>

              <a
                href={selected.docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Google Doc <FaExternalLinkAlt />
              </a>

              <div className="mt-4 space-y-3">
                <input
                  type="number"
                  placeholder="Enter marks"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={givenMark}
                  onChange={(e) => setGivenMark(e.target.value)}
                />
                <textarea
                  placeholder="Feedback"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <MdOutlineAssignmentTurnedIn className="inline-block mr-2" />
                  Submit Evaluation
                </button>
                <button
                  className="w-full text-sm mt-2 text-gray-500 hover:text-red-500"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingAssignmentsPage;
