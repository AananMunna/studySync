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
    className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center p-6"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.form
      onSubmit={handleUpdate}
      className="w-full max-w-3xl bg-gray-100 dark:bg-zinc-900 rounded-3xl p-10 md:p-16 shadow-xl space-y-6"
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-center text-zinc-800 dark:text-white mb-10">
        Update Assignment
      </h2>

      <div className="space-y-6">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Assignment Title"
          required
          className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-lg px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />

        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Assignment Description"
          required
          rows={4}
          className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-lg px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Total Marks"
            min="1"
            required
            className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-lg px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-lg px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <input
          type="url"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail Image URL"
          required
          className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-lg px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />

        {formData.thumbnail && (
          <img
            src={formData.thumbnail}
            alt="Thumbnail"
            className="rounded-2xl w-full max-h-64 object-cover mt-2 shadow-md"
          />
        )}

        <DatePicker
          selected={formData.dueDate}
          onChange={(date) =>
            setFormData((prev) => ({ ...prev, dueDate: date }))
          }
          dateFormat="dd/MM/yyyy"
          className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-lg px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-medium py-4 rounded-xl transition-all duration-300"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.form>
  </motion.div>
);

};

export default UpdateAssignment;
