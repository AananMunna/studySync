import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "linear",
    },
  },
};

const glowVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      repeat: Infinity,
      duration: 1.6,
      ease: "easeInOut",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-lime-100 to-emerald-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <motion.div
        className="relative flex flex-col items-center justify-center gap-4 p-10 rounded-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl backdrop-blur-lg border border-green-100 dark:border-green-700"
        variants={glowVariants}
        animate="animate"
      >
        {/* Spinner Leaf Circle */}
        <motion.div
          className="w-20 h-20 rounded-full border-[6px] border-t-green-600 border-b-emerald-400 border-l-transparent border-r-transparent"
          variants={spinnerVariants}
          animate="animate"
        />

        {/* Logo or Icon */}
        <motion.div
          className="text-4xl font-bold text-green-700 dark:text-green-300 tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          StudySync
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-green-800 dark:text-green-400 font-medium italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Please wait, your knowledge is syncing...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
