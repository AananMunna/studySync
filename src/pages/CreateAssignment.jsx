import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { FiArrowLeft, FiCalendar, FiImage, FiBook, FiFileText, FiAward, FiBarChart2 } from "react-icons/fi";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(new Date());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
  

  const { user } = use(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!title || !desc || !marks || !thumbnail || !difficulty || !dueDate) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    if (marks < 1) {
      setError("Marks must be a positive number");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = { 
        title, 
        desc, 
        marks, 
        thumbnail, 
        difficulty, 
        dueDate,
        creatorEmail: user?.email,
        creatorName: user?.displayName
      };
      
      await axios.post(`${import.meta.env.VITE_URL}/createAssignment`, data,{
        headers: {
          authorization: `Bearer ${user?.accessToken}`
        }
      });
      
      setSuccess(true);
      Swal.fire({
        title: "Assignment Created",
        text: "Your assignment has been successfully created",
        icon: "success",
        background: 'rgba(255, 255, 255, 0.9)',
        backdrop: `
          rgba(0, 0, 0, 0.5)
          url("/images/nyan-cat.gif")
          center top
          no-repeat
        `,
        showConfirmButton: false,
        timer: 2000
      });
      navigate("/assignments");

      // Reset form
      setTitle("");
      setDesc("");
      setMarks("");
      setThumbnail("");
      setDifficulty("easy");
      setDueDate(new Date());
      setError("");
    } catch (err) {
      setError("Failed to create assignment. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
        className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-700/50 shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center">
          <Link
            to="/"
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Dashboard
          </Link>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mx-auto">
            New Assignment
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiBook className="mr-2" />
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Assignment title"
            />
          </div>

           {/* Description */}
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
      <FiFileText className="mr-2" />
      Description
    </label>
    <textarea
      required
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      rows={4}
      placeholder="Detailed assignment description"
    />
    {desc.length > 0 && desc.length < 20 && (
      <p className="text-red-500 text-sm">📝 "Please write a bit more! The description should be at least 20 characters long so others can clearly understand your assignment."</p>
    )}
  </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Marks */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <FiAward className="mr-2" />
                Marks
              </label>
              <input
                type="number"
                required
                min="1"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Total marks"
              />
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <FiBarChart2 className="mr-2" />
                Difficulty
              </label>
              <select
                required
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiImage className="mr-2" />
              Thumbnail URL
            </label>
            <input
              type="url"
              required
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="https://example.com/image.jpg"
            />
            {thumbnail && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={thumbnail}
                  alt="Thumbnail Preview"
                  className="w-full h-48 object-cover"
                />
              </motion.div>
            )}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiCalendar className="mr-2" />
              Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              popperClassName="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-4 py-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-xl flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-4 py-3 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Assignment created successfully!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
            }`}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Assignment'
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateAssignment;