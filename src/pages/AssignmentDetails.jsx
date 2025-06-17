import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaChartLine,
  FaUserGraduate,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router";
import SubmitAssignmentForm from "./SubmitAssignmentForm";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { formatDistanceToNow } from 'date-fns';


const AssignmentDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [assignment, setAssignment] = useState();
  const [disable, setDisable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
// console.log(assignment?.dueDate);
  const { data } = useLoaderData();
  useEffect(() => setAssignment(data), [data]);

  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleSubmitAssignment = async (formData) => {
    const payload = {
      totalMark: assignment?.marks,
      title: assignment.title,
      examineEmail: user?.email,
      examineName: user?.displayName,
      assignmentId: assignment._id,
      docsLink: formData.url,
      note: formData.note,
      status: "pending",
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/submitAssignment`,
        payload,
        { headers: { authorization: `Bearer ${user?.accessToken}` } }
      );

      if (res.data?.insertedId || res.data?.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Assignment submitted successfully 🎉",
          confirmButtonColor: "#22c55e",
          background: "#1f1f1f",
          color: "#fff",
        });
        setDisable(true);
      } else throw new Error("Something went wrong!");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          error?.response?.data?.message ||
          "Failed to submit the assignment 😢",
        confirmButtonColor: "#ef4444",
        background: "#1f1f1f",
        color: "#fff",
      });
    }
    navigate("/submissions");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-12 px-4">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl border border-white/10"
      >
        <div className="relative">
          <img
            src={assignment?.thumbnail}
            alt="Assignment"
            className="w-full h-72 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-white text-4xl sm:text-5xl font-bold drop-shadow-xl">
              {assignment?.title}
            </h1>
            <div className="flex gap-4 mt-2">
              <span className="text-xs bg-purple-600 text-white rounded-full px-3 py-1">
                {assignment?.difficulty}
              </span>
              <span className="text-xs bg-green-600 text-white rounded-full px-3 py-1">
                {assignment?.marks} Marks
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-8">
          <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
            {assignment?.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-10">
  <InfoCard
    icon={<FaUserGraduate />}
    label="Creator"
    value={assignment?.creatorName === user?.displayName ? "You" : assignment?.creatorName}
  />
  <InfoCard
    icon={<FaChartLine />}
    label="Marks"
    value={assignment?.marks}
  />
  <InfoCard
    icon={<FaBookOpen />}
    label="Difficulty"
    value={assignment?.difficulty}
  />
<InfoCard
  icon={<FaChartLine />}
  label="Due Date"
  value={
    assignment?.dueDate
      ? new Date(assignment?.dueDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A"
  }
/>


</div>
{/* {console.log(assignment.dueDate)} */}

          {user?.email !== assignment?.creatorEmail && (
            <div className="mt-12 text-right">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={!disable ? { scale: 1.05 } : {}}
                onClick={() => setShowForm(true)}
                disabled={disable}
                className={`px-6 py-3 text-lg font-semibold rounded-xl transition-all shadow-md flex items-center gap-2 ${
                  disable
                    ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {disable ? "Already Submitted" : "Take Assignment"}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-xl w-full shadow-2xl border border-gray-300 dark:border-white/10"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex justify-between items-center border-b border-gray-300 dark:border-white/10 pb-4 mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Submit Assignment</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 dark:text-white hover:text-red-500"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <SubmitAssignmentForm onSubmit={handleSubmitAssignment} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Info Card Reusable Component
const InfoCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm"
  >
    <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-300">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <p className="mt-2 text-gray-800 dark:text-white font-semibold">{value}</p>
  </motion.div>
);

export default AssignmentDetails;