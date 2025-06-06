import React, { use, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(new Date());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { user } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !desc || !marks || !thumbnail || !difficulty || !dueDate) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    if (marks < 1) {
      setError("⚠️ Marks must be a positive number.");
      return;
    }

    // Submit
    setError("");
    setSuccess(true);

    const data = { title, desc, marks, thumbnail, difficulty, dueDate };
    data.email = user?.email;
    data.creator = user?.displayName;
    // console.log(data);
    
    axios.post(`${import.meta.env.VITE_URL}/createAssignment`,data)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    // Simulate API request
    setTimeout(() => {
      setSuccess(false);
      setTitle("");
      setDesc("");
      setMarks("");
      setThumbnail("");
      setDifficulty("easy");
      setDueDate(new Date());
    }, 3000);
    Swal.fire({
      title: "Assignment created successfully!",
      icon: "success",
      draggable: true,
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-2xl relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Back to Dashboard */}
        <Link
          to="/"
          className="absolute left-4 top-4 text-green-600 dark:text-green-300 hover:underline text-sm"
        >
          ← Back to Home
        </Link>

        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-300 mb-6">
          Create New Assignment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Marks</label>
              <input
                type="number"
                required
                min="1"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Difficulty</label>
              <select
                required
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Thumbnail Image URL
            </label>
            <input
              type="url"
              required
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {/* Image preview */}
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail Preview"
                className="mt-3 rounded-md w-full max-h-60 object-cover border dark:border-gray-600"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Due Date</label>
            <DatePicker
              selected={dueDate}
              readOnly
              onChange={(date) => setDueDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Create Assignment
          </motion.button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-600 mt-4 font-medium"
            >
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-700 dark:text-green-400 mt-4 font-medium"
            >
              ✅ Assignment created successfully!
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateAssignment;
