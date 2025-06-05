import { motion } from "framer-motion";

const leafVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 2,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const LoadingSpinner = () => {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-lime-50 dark:from-green-900 dark:via-emerald-900 dark:to-lime-800">
  <motion.div
    variants={pulseVariants}
    animate="animate"
    className="relative p-8 rounded-full shadow-2xl bg-white/80 backdrop-blur-md dark:bg-gray-800/80 dark:shadow-black/60"
  >
    <motion.div
      className="w-16 h-16 rounded-full border-[6px] border-t-green-600 border-b-green-400 border-l-transparent border-r-transparent"
      variants={leafVariants}
      animate="animate"
    />

    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-green-700 font-semibold tracking-wide text-lg font-serif dark:text-green-300">
        Loading...
      </span>
    </div>
  </motion.div>
</div>

  );
};

export default LoadingSpinner;
