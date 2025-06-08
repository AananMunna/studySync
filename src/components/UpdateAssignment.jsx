import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate, useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const UpdateAssignment = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { data } = useLoaderData();
  // console.log("Loaded Assignment Data:", data);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    marks: "",
    thumbnail: "",
    difficulty: "easy",
    dueDate: new Date(),
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        dueDate: new Date(data.dueDate), 
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const { _id, ...cleanData } = formData;

    axios
      .put(`${import.meta.env.VITE_URL}/updateAssignment/${_id}`, {
        ...cleanData,
        dueDate: cleanData.dueDate.toISOString(),
        email: user?.email,
        creator: user?.displayName,
      })
      .then(() => {
        Swal.fire("✅ Updated!", "Assignment updated successfully.", "success");
        navigate("/assignments");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("❌ Error", "Something went wrong!", "error");
      });
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔽 Update Form UI */}
      <motion.form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-300 mb-6">
          Update Assignment
        </h2>

        {/* 🧾 Title Input */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {/* 🧾 Description */}
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {/* 🧾 Marks & Difficulty Level */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Marks"
            min="1"
            required
            className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* 🖼️ Thumbnail URL Input */}
        <input
          type="url"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail Image URL"
          required
          className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {/* 🖼️ Preview Thumbnail if URL is entered */}
        {formData.thumbnail && (
          <img
            src={formData.thumbnail}
            alt="Preview"
            className="rounded-md mt-2 w-full max-h-60 object-cover"
          />
        )}

        {/* 📅 Date Picker for Due Date */}
        <DatePicker
          selected={formData.dueDate}
          onChange={(date) =>
            setFormData((prev) => ({ ...prev, dueDate: date }))
          }
          dateFormat="dd/MM/yyyy"
          className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {/* ✅ Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Update Assignment
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default UpdateAssignment;
