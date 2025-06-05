import { motion } from "framer-motion";
import { FaFileAlt } from "react-icons/fa";

const dummyAssignments = [
  {
    title: "React Hooks Deep Dive",
    difficulty: "Intermediate",
    marks: 50,
    subject: "Web Development",
  },
  {
    title: "Data Structures Quiz",
    difficulty: "Hard",
    marks: 40,
    subject: "Computer Science",
  },
  {
    title: "CSS Animation Challenge",
    difficulty: "Easy",
    marks: 20,
    subject: "Frontend Design",
  },
];

// Emoji badges
const difficultyBadges = {
  Easy: "🟢 😌",
  Intermediate: "🟡 🧠",
  Hard: "🔴 🔥",
};

const RecentAssignments = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            ✨ Recent Assignments
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Challenges with style and clarity!
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {dummyAssignments.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative group p-6 rounded-2xl border border-white/20 shadow-xl bg-white/10 dark:bg-gray-800/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.025] hover:shadow-indigo-500/30"
            >
              {/* Top floating icon */}
              <div className="absolute -top-5 left-6 bg-indigo-100 dark:bg-indigo-600 p-3 rounded-full shadow-md">
                <FaFileAlt className="text-indigo-600 dark:text-white text-xl" />
              </div>

              <div className="pl-1 pt-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  📘 Subject: <span className="font-medium">{item.subject}</span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {difficultyBadges[item.difficulty]} Difficulty:{" "}
                  <span className="font-semibold text-indigo-500 dark:text-indigo-300">
                    {item.difficulty}
                  </span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  🎯 Marks:{" "}
                  <span className="font-bold text-green-600 dark:text-green-300">
                    {item.marks}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentAssignments;
