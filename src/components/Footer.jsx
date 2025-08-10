import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link, Links } from "react-router";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative z-0 bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-6 py-20 sm:px-16 overflow-hidden"
    >
      {/* Glowing aura effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 blur-3xl opacity-30 pointer-events-none w-[500px] h-[500px] bg-gradient-to-br from-indigo-500 via-purple-600 to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-start lg:items-center text-center lg:text-left relative z-10">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
            📚 StudySync
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto lg:mx-0">
            Next-gen study platform to sync, submit, and score your group
            learning seamlessly.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center lg:justify-center gap-16 text-sm font-medium">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Product
            </h3>
            <Link
              to="/assignments"
              className="block text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              All Assignments
            </Link>
            <Link
              to="/submissions"
              className="block text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              My Submissions{" "}
            </Link>
            <Link
              to="/create"
              className="block text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Create{" "}
            </Link>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Support
            </h3>
            <Link
              to="/contact"
              className="block text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Contact
            </Link>
            <Link
              to="/help"
              className="block text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Help Center
            </Link>
            <Link
              to="/privacy"
              className="block text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center lg:items-end space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Follow Us
          </h3>
          <div className="flex space-x-5">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map(
              (Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  href="#"
                  className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white p-3 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/30 transition"
                >
                  <Icon />
                </motion.a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-16 border-t border-gray-300 dark:border-white/10 pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} StudySync. All rights reserved.
      </div>
    </motion.footer>
  );
}
