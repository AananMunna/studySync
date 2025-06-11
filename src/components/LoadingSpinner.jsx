import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.8,
      ease: "linear",
    },
  },
};

const containerVariants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Vision Pro Glass Container - Modified shape */}
      <motion.div
        className="relative p-8 rounded-2xl md:rounded-[28px] w-[280px] h-[260px] border border-gray-200/50 dark:border-white/10 shadow-lg dark:shadow-[0_0_40px_rgba(100,255,255,0.1)] backdrop-blur-xl bg-white/70 dark:bg-gray-800/50 flex flex-col items-center justify-center gap-6"
        variants={containerVariants}
        animate="animate"
        style={{
          boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Holographic Orb */}
        <div className="relative w-20 h-20">
          {/* Glass Sphere Base */}
          <div className="absolute inset-0 rounded-full bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-gray-300/50 dark:border-white/10" />
          
          {/* Primary Spinner Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-500/80 border-r-cyan-500/80 dark:border-t-emerald-400/80 dark:border-r-cyan-400/80"
            variants={spinnerVariants}
            animate="animate"
          />
          
          {/* Secondary Counter-Rotating Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-b-cyan-400/60 border-l-emerald-400/60 dark:border-b-cyan-300/60 dark:border-l-emerald-300/60"
            animate={{
              rotate: -360,
              transition: {
                repeat: Infinity,
                duration: 2.4,
                ease: "linear",
              },
            }}
          />
          
          {/* Pulsing Core */}
          <motion.div
            className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Holographic Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/10 dark:bg-cyan-400/15 animate-pulse blur-xl" />
        </div>

        {/* Brand Text */}
        <motion.h2
          className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          StudySync
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-300 tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            textShadow: "0 0 8px rgba(100,255,255,0.1)"
          }}
        >
          Syncing your brain cells...
        </motion.p>
        
        {/* Ambient Light Projection */}
        <div className="absolute -inset-3 rounded-2xl md:rounded-[32px] bg-gradient-to-br from-emerald-400/5 to-cyan-400/5 dark:from-emerald-400/10 dark:to-cyan-400/10 pointer-events-none blur-md" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;