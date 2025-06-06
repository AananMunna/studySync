import React, { useState } from "react";

const SubmitAssignmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ url: "", note: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    // URL Validation: required + must be valid url + google docs link check
    if (!formData.url.trim()) {
      newErrors.url = "Google Docs link is required";
    } else {
      try {
        const url = new URL(formData.url);
        if (!url.hostname.includes("docs.google.com")) {
          newErrors.url = "Please enter a valid Google Docs URL";
        }
      } catch {
        newErrors.url = "Please enter a valid URL";
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null })); // clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // no errors
      onSubmit(formData);
      setFormData({ url: "", note: "" }); // reset form
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-md max-w-md mx-auto"
      noValidate
    >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Submit Assignment
            </h2>
      <div>
        <label
          htmlFor="url"
          className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
        >
          Google Docs Link <span className="text-red-500">*</span>
        </label>
        <input
          id="url"
          type="url"
          name="url"
          placeholder="https://docs.google.com/..."
          value={formData.url}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.url
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-500"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition focus:outline-none focus:ring-2`}
          autoComplete="off"
          required
        />
        {errors.url && (
          <p className="mt-1 text-sm text-red-500 font-medium">{errors.url}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="note"
          className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
        >
          Note (optional)
        </label>
        <textarea
          id="note"
          name="note"
          rows={4}
          placeholder="Add any notes for the reviewer..."
          value={formData.note}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-300 focus:ring-4 focus:ring-indigo-400"
      >
        Submit Now
      </button>
    </form>
  );
};

export default SubmitAssignmentForm;
