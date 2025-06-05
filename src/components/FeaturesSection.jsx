import { motion } from "framer-motion";
import { FaUsers, FaRobot, FaLock, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers />,
    title: "Real-Time Collaboration",
    description: "Team up with classmates to complete assignments simultaneously in real time.",
  },
  {
    icon: <FaRobot />,
    title: "AI Auto Grading",
    description: "Smart evaluation gives instant grades with detailed feedback and suggestions.",
  },
  {
    icon: <FaLock />,
    title: "Secure Login",
    description: "Login with Google or email securely using encrypted Firebase Authentication.",
  },
  {
    icon: <FaChartLine />,
    title: "Progress Analytics",
    description: "Visual charts to track assignment scores, ranking, and activity logs.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative bg-white dark:bg-gray-950 px-6 py-24 transition-colors duration-500">
      {/* Background Gradient Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500 opacity-20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 opacity-20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center md:text-left space-y-6"
        >
          <h2 className="text-4xl font-bold leading-snug text-gray-900 dark:text-white">
            Supercharge Your Group Study Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explore our smart tools designed to boost your collaboration, productivity, and learning — all in one place.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
