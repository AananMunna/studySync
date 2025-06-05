import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

const podiumData = [
  {
    name: "Munna",
    points: 980,
    avatar: "https://i.pravatar.cc/150?img=12",
    rank: 1,
  },
  {
    name: "Ayesha",
    points: 870,
    avatar: "https://i.pravatar.cc/150?img=5",
    rank: 2,
  },
  {
    name: "Zahin",
    points: 850,
    avatar: "https://i.pravatar.cc/150?img=33",
    rank: 3,
  },
];

const getPodiumStyle = (rank) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-300 to-yellow-500 h-52";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-400 h-40";
    case 3:
      return "bg-gradient-to-r from-orange-300 to-orange-400 h-36";
    default:
      return "bg-gray-200";
  }
};

const PodiumLeaderboard = () => {
  return (
    <section className="py-16 bg-[#f9fffc] dark:bg-gray-900 text-center">
      <motion.h2
        className="text-4xl font-bold mb-20 text-[#3dd8a7] dark:text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🏆 Top 3 Champions
      </motion.h2>

      <div className="flex justify-center items-end gap-6 max-w-5xl mx-auto px-4">
        {podiumData
          .sort((a, b) => a.rank - b.rank)
          .map((user, idx) => (
            <motion.div
              key={user.rank}
              className="flex flex-col items-center justify-end relative w-32"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              {user.rank === 1 && (
                <FaCrown className="absolute -top-10 text-yellow-500 text-3xl animate-bounce" />
              )}
              <img
                src={user.avatar}
                alt={user.name}
                className={`w-20 h-20 rounded-full ring-4 ring-white shadow-lg mb-2 ${
                  user.rank === 1 ? "scale-110" : ""
                }`}
              />
              <div
                className={`w-full rounded-t-xl text-white font-semibold flex items-center justify-center ${getPodiumStyle(
                  user.rank
                )}`}
              >
                #{user.rank}
              </div>
              <p className="mt-2 font-medium text-gray-700 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {user.points} pts
              </p>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default PodiumLeaderboard;
