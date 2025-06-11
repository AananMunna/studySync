import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen, FaChartLine, FaUserGraduate, FaLink, FaStickyNote } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router";
import SubmitAssignmentForm from "./SubmitAssignmentForm";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const AssignmentDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [assignment, setAssignment] = useState();
  const [isSticky, setIsSticky] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { data } = useLoaderData();
  useEffect(() => {
    setAssignment(data);
  }, [data]);

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
        payload
      );

      if (res.data?.insertedId || res.data?.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Your assignment was successfully submitted 🎉",
          confirmButtonColor: "#22c55e",
          background: 'rgba(255, 255, 255, 0.1)',
          backdrop: `
            rgba(10, 10, 10, 0.7)
            url("/images/nyan-cat.gif")
            center top
            no-repeat
          `,
          color: '#fff'
        });
        setDisable(true);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          error?.response?.data?.message ||
          "Failed to submit the assignment 😢",
        confirmButtonColor: "#ef4444",
        background: 'rgba(255, 255, 255, 0.1)',
        backdrop: `
          rgba(10, 10, 10, 0.7)
          center top
          no-repeat
        `,
        color: '#fff'
      });
    }
    navigate("/submissions");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-200/50 dark:bg-white/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glass morphism container */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden">
          {/* Hero section with gradient */}
          <div className="relative">
            <motion.img
              src={assignment?.thumbnail}
              alt="Assignment Thumbnail"
              className="w-full h-64 sm:h-80 object-cover object-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent dark:from-gray-950/90 dark:via-gray-950/30 dark:to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <motion.h1
                className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                {assignment?.title}
              </motion.h1>
              
              <motion.div 
                className="flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 text-sm font-medium">
                  {assignment?.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-sm font-medium">
                  {assignment?.marks} points
                </span>
              </motion.div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {assignment?.desc}
            </motion.p>

            {/* Metadata cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <motion.div 
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 backdrop-blur-sm"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                  <FaUserGraduate className="text-xl" />
                  <span className="font-medium">Creator</span>
                </div>
                <p className="mt-2 text-gray-900 dark:text-white">
                  {assignment?.creatorName === user?.displayName ? 'You' : assignment?.creatorName}
                </p>
              </motion.div>

              <motion.div 
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 backdrop-blur-sm"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                  <FaChartLine className="text-xl" />
                  <span className="font-medium">Marks</span>
                </div>
                <p className="mt-2 text-gray-900 dark:text-white">{assignment?.marks}</p>
              </motion.div>

              <motion.div 
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 backdrop-blur-sm"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
                  <FaBookOpen className="text-xl" />
                  <span className="font-medium">Difficulty</span>
                </div>
                <p className="mt-2 text-gray-900 dark:text-white">{assignment?.difficulty}</p>
              </motion.div>
            </div>

            {/* Submission button (positioned properly in flow) */}
            {user?.email !== assignment?.creatorEmail && (
              <div className="mt-10 flex justify-end">
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`${isSticky ? "fixed right-6 bottom-3 z-50" : "relative"}`}
                >
                  <motion.button
                    onClick={() => setShowForm(true)}
                    className={`px-6 py-3 text-lg font-semibold rounded-xl shadow-lg flex items-center gap-2 
                      ${disable ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'}`}
                    whileTap={{ scale: 0.97 }}
                    whileHover={disable ? {} : { scale: 1.04 }}
                    disabled={disable}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                  >
                    {disable ? "Already Submitted" : "Take Assignment"}
                    <motion.span
                      animate={{ x: isHovering && !disable ? 4 : 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal form */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className="fixed inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Submit Assignment</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>
              
              <div className="p-6">
                <SubmitAssignmentForm onSubmit={handleSubmitAssignment} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssignmentDetails;