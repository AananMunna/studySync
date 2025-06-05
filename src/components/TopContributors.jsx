import { motion } from "framer-motion";
import { FaStar, FaUserGraduate, FaTrophy } from "react-icons/fa";

const contributors = [
  {
    name: "Munna",
    role: "Assignment Master",
    avatar: "https://i.pravatar.cc/150?img=12",
    points: 980,
  },
  {
    name: "Ayesha",
    role: "Study Champ",
    avatar: "https://i.pravatar.cc/150?img=5",
    points: 870,
  },
  {
    name: "Zahin",
    role: "Code Guru",
    avatar: "https://i.pravatar.cc/150?img=33",
    points: 850,
  },
  {
    name: "Tanvir",
    role: "Top Reviewer",
    avatar: "https://i.pravatar.cc/150?img=15",
    points: 820,
  },
];

const TopContributors = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🌟 Top Contributors
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Meet the legends of the StudySync community!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contributors.map((contributor, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-indigo-500 dark:ring-purple-500"
              />
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                {contributor.name}
              </h3>
              <p className="text-sm text-center text-indigo-500 dark:text-indigo-300 font-medium">
                {contributor.role}
              </p>

              <div className="mt-4">
                <div className="flex items-center justify-center gap-2 text-yellow-500 dark:text-yellow-400 mb-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  {contributor.points} points
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
