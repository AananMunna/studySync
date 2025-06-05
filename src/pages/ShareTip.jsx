import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const ShareTip = () => {

  const {user} = useContext(AuthContext)
// console.log(user.displayName);
  const userName = user.displayName;
  const userEmail = user.email;

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    difficulty: "",
    imageUrl: "",
    category: "",
    availability: "",
    description: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
  e.preventDefault();

  // Validate all fields
  const isEmpty = Object.values(formData).some((val) => val.trim() === "");
  if (isEmpty) {
    setError(true);
    return;
  }

  setError(false);

  const tipData = {
    ...formData,
    userName,
    userEmail,
    totalLike:0
  };

  fetch("https://gardening-hub-server.vercel.app/tips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tipData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        Swal.fire({
          title: "Data added successfully to Database!",
          icon: "success",
          draggable: true,
        });

        //  Reset form after successful submission
        setFormData({
          title: "",
          topic: "",
          difficulty: "",
          imageUrl: "",
          category: "",
          availability: "",
          description: "",
        });

      } else {
        Swal.fire({
          title: "Failed to add tip!",
          icon: "error",
        });
      }
    })
    .catch((err) => {
      console.error("Submit error:", err);
      Swal.fire({
        title: "Something went wrong!",
        icon: "error",
      });
    });
};


  return (
   <div className="min-h-screen bg-[#f6f9f4] dark:bg-gray-900 flex flex-col md:flex-row items-center justify-center p-6">
  {/* Illustration */}
  <motion.div
    className="md:w-1/2 mb-8 md:mb-0 flex justify-center"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <img
      src="https://img.freepik.com/free-vector/gardening-concept-illustration_114360-2757.jpg"
      alt="Garden illustration"
      className="w-[90%] max-w-md"
    />
  </motion.div>

  {/* Form */}
  <motion.div
    className={`md:w-1/2 bg-white dark:bg-gray-800 border border-[#dfe8dc] dark:border-gray-700 rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-xl ${
      error ? "ring-2 ring-red-400" : ""
    }`}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 15 }}
  >
    <h2 className="text-3xl font-bold text-[#3b5323] dark:text-green-300 mb-6 text-center">
      Share a Garden Tip 🌼
    </h2>

    <form className="space-y-4 text-sm md:text-base" onSubmit={handleSubmit}>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="text"
        name="title"
        placeholder="Tip Title"
        value={formData.title}
        onChange={handleChange}
        className="form-input dark:bg-gray-700 dark:text-green-200 dark:border-gray-600"
        required
      />
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="text"
        name="topic"
        placeholder="Plant Type / Topic"
        value={formData.topic}
        onChange={handleChange}
        className="form-input dark:bg-gray-700 dark:text-green-200 dark:border-gray-600"
        required
      />
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="form-input dark:bg-gray-700 dark:text-green-200 dark:border-gray-600"
        required
      >
        <option value="" disabled>
          Difficulty Level
        </option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
        className="form-input dark:bg-gray-700 dark:text-green-200 dark:border-gray-600"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="form-input dark:bg-gray-700 dark:text-green-200 dark:border-gray-600"
        required
      >
        <option value="" disabled>
          Category
        </option>
        <option>Composting</option>
        <option>Plant Care</option>
        <option>Vertical Gardening</option>
        <option>Indoor Plants</option>
      </select>
      <select
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        className="form-input dark:bg-gray-700 dark:text-green-200 dark:border-gray-600"
        required
      >
        <option value="" disabled>
          Availability
        </option>
        <option>Public</option>
        <option>Hidden</option>
      </select>
      <textarea
        name="description"
        rows="4"
        placeholder="Describe your tip..."
        value={formData.description}
        onChange={handleChange}
        className="form-input resize-none dark:bg-gray-700 dark:text-green-200 dark:border-gray-600"
        required
      ></textarea>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={userName}
          readOnly
          className="form-input bg-gray-100 dark:bg-gray-600 dark:text-green-200 cursor-not-allowed"
        />
        <input
          type="email"
          value={userEmail}
          readOnly
          className="form-input bg-gray-100 dark:bg-gray-600 dark:text-green-200 cursor-not-allowed"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="w-full bg-[#6b8e23] hover:bg-[#56751c] dark:bg-green-700 dark:hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
      >
        Submit Garden Tip 🌱
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-2 text-center"
          >
            Please fill in all the fields!
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  </motion.div>
</div>

  );
};

export default ShareTip;
