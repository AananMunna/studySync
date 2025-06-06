import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
  const centerContributor = contributors[0];
  const orbiters = contributors.slice(1);

  return (
    <section className="relative py-20 bg-gradient-to-tr from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-visible">
      <div className="text-center mb-12 px-4">
        <motion.h2
          className="text-4xl font-bold dark:text-white text-gray-900"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌟 Top Contributors
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
          Not just stars — they’re StudySync's constellations!
        </p>
      </div>

      {/* Responsive Layout */}
      <div className="relative w-full max-w-5xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-10">
        {/* Center Contributor */}
        <motion.div
          className="z-20 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-full shadow-2xl ring-4 ring-yellow-400 transition cursor-pointer"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260 }}
          data-tooltip-id="tooltip-center"
          data-tooltip-content={`${centerContributor.name} — ${centerContributor.role} — ${centerContributor.points} pts`}
        >
          <img
            src={centerContributor.avatar}
            alt={centerContributor.name}
            className="w-24 h-24 rounded-full mb-2 ring-4 ring-indigo-500"
          />
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {centerContributor.name}
          </div>
          <div className="text-sm text-indigo-500 dark:text-indigo-300">
            {centerContributor.role}
          </div>
          <div className="flex mt-2 text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {centerContributor.points} pts
          </div>
        </motion.div>

        {/* Orbiters shown in a grid on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-center text-center">
          {orbiters.map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              data-tooltip-id={`tooltip-${i}`}
              data-tooltip-content={`${c.name} — ${c.role} — ${c.points} pts`}
            >
              <img
                src={c.avatar}
                alt={c.name}
                className="w-16 h-16 rounded-full ring-2 ring-indigo-400 shadow-md"
              />
              <div className="mt-1 text-sm font-medium dark:text-white text-gray-700">
                {c.name}
              </div>
              <div className="text-xs text-indigo-400 dark:text-indigo-300">
                {c.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltips */}
      {orbiters.map((_, i) => (
        <Tooltip key={i} id={`tooltip-${i}`} place="top" className="z-50" />
      ))}
      <Tooltip id="tooltip-center" place="top" className="z-50" />
    </section>
  );
};

export default TopContributors;
