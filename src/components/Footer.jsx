import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        {/* Logo & Description */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <span role="img" aria-label="book">📘</span> StudySync
          </h1>
          <p className="text-sm md:text-base max-w-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Empowering your group study with easy assignment management and seamless collaboration.
          </p>
          <a
            href="#signup"
            className="mt-2 inline-block bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Get Started
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-24 text-sm md:text-base font-semibold">
          <div className="flex flex-col space-y-3">
            <h3 className="mb-2 text-gray-900 dark:text-gray-100 text-lg">Product</h3>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300">How It Works</a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300">Features</a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300">FAQ</a>
          </div>
          <div className="flex flex-col space-y-3">
            <h3 className="mb-2 text-gray-900 dark:text-gray-100 text-lg">Support</h3>
            <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300">Contact Us</Link>
            <Link to="/help" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300">Help Center</Link>
            <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300">Privacy Policy</Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-8 text-xl md:text-2xl mt-2 md:mt-0">
          {[{
            href: "https://facebook.com",
            label: "Facebook",
            icon: <FaFacebookF />
          },{
            href: "https://twitter.com",
            label: "Twitter",
            icon: <FaTwitter />
          },{
            href: "https://linkedin.com",
            label: "LinkedIn",
            icon: <FaLinkedinIn />
          },{
            href: "https://github.com",
            label: "GitHub",
            icon: <FaGithub />
          }].map(({href, label, icon}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-800 mt-12" />

      {/* Copyright */}
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 select-none">
        &copy; {new Date().getFullYear()} StudySync. All rights reserved.
      </div>
    </footer>
  );
}
