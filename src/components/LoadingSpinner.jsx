import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 1.4,
      ease: "linear",
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.03, 1],
    opacity: [0.95, 1, 0.95],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-500">
      <motion.div
        className="relative p-8 rounded-3xl border border-white/30 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/80 dark:bg-white/5 flex flex-col items-center gap-5"
        variants={pulseVariants}
        animate="animate"
      >
        {/* Glowing Spinner Circle */}
        <motion.div
          className="w-20 h-20 rounded-full border-[5px] border-t-transparent border-b-transparent border-l-blue-500 border-r-cyan-400 dark:border-l-cyan-300 dark:border-r-indigo-400"
          variants={spinnerVariants}
          animate="animate"
          style={{
            boxShadow:
              "0 0 20px rgba(0, 255, 255, 0.4), 0 0 10px rgba(0, 140, 255, 0.3)",
          }}
        />

        {/* Glowing Inner Circle (Samsung style pulse) */}
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 dark:from-cyan-400 dark:to-indigo-500 opacity-10 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />

        {/* Brand Text */}
        <motion.h2
          className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          StudySync
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-sm text-gray-500 dark:text-gray-400 italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Syncing your brain cells...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
