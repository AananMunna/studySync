import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaFileUpload, FaUsers, FaCheckCircle, FaRocket } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaFileUpload />,
    title: "Submit Assignment",
    description:
      "Upload your assignments easily with our intuitive submission system.",
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "Collaborate with Friends",
    description:
      "Invite friends to join your study group and work together seamlessly.",
  },
  {
    id: 3,
    icon: <FaCheckCircle />,
    title: "Evaluate & Get Feedback",
    description:
      "Review submitted assignments and give constructive feedback instantly.",
  },
  {
    id: 4,
    icon: <FaRocket />,
    title: "Boost Your Skills",
    description:
      "Track progress and improve your skills with our easy-to-use platform.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);
  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const totalHeight =
        containerRef.current.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - (containerRef.current.offsetTop || 0);
      const scrollPercent = Math.min(Math.max(scrolled / totalHeight, 0), 1);

      setProgressHeight(scrollPercent * containerRef.current.scrollHeight);

      const stepElements = containerRef.current.querySelectorAll(".step-item");
      let currentStep = 1;
      stepElements.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          currentStep = i + 1;
        }
      });
      setActiveStep(currentStep);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pulseVariants = {
    pulse: {
      boxShadow: [
        "0 0 0 0 rgba(99,102,241, 0.7)",
        "0 0 10px 8px rgba(99,102,241, 0)",
        "0 0 0 0 rgba(99,102,241, 0.7)",
      ],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants = {
    float: {
      y: [0, -6, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const scrollToStep = (index) => {
    if (!containerRef.current) return;
    const stepElements = containerRef.current.querySelectorAll(".step-item");
    const target = stepElements[index];
    if (target) {
      window.scrollTo({
        top:
          window.scrollY +
          target.getBoundingClientRect().top -
          window.innerHeight / 4,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="how-it-works"
      className="bg-white dark:bg-gray-900 py-20 px-6 sm:px-8 lg:px-12 text-gray-900 dark:text-white"
    >
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold tracking-tight"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
        >
          Follow these simple steps to get started and make the most of your
          group study experience.
        </motion.p>
      </div>

      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto"
        style={{ minHeight: "600px" }}
      >
        {/* Timeline background bar */}
        <div className="absolute top-0 left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-[4px] h-full bg-indigo-200 dark:bg-indigo-500 z-0 rounded-full" />

        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-[4px] bg-indigo-600 dark:bg-indigo-400 rounded-full z-10"
          style={{ height: progressHeight }}
          layout
        />

        <div className="flex flex-col gap-20 relative z-20">
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`step-item relative flex flex-col md:flex-row items-center md:items-start ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                } md:gap-10`}
              >
                {/* Dot */}
                <motion.div
                  onClick={() => scrollToStep(index)}
                  title={`Step ${step.id}: ${step.title}`}
                  variants={pulseVariants}
                  animate="pulse"
                  className={`cursor-pointer absolute top-0 left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 z-30 flex items-center justify-center
                    ${
                      isActive
                        ? "bg-indigo-600 dark:bg-indigo-400 shadow-[0_0_10px_4px_rgba(99,102,241,0.8)]"
                        : "bg-indigo-400 dark:bg-indigo-700"
                    }
                  `}
                >
                  <motion.span
                    className="text-white dark:text-gray-900 font-bold select-none"
                    animate={{
                      scale: isActive ? [1, 1.3, 1] : 1,
                      opacity: isActive ? [1, 0.7, 1] : 1,
                    }}
                    transition={{
                      repeat: isActive ? Infinity : 0,
                      duration: 2,
                    }}
                  >
                    {step.id}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <div
                  className={`md:w-1/2  flex flex-col items-center md:items-start text-center md:text-left space-y-3 px-6 md:px-0 pt-10 md:pt-0 ${
                    isActive ? "text-indigo-700 dark:text-indigo-300" : ""
                  }`}
                >
                  <motion.div
                    variants={iconVariants}
                    animate="float"
                    className={`mb-2 mx-5 text-3xl ${
                      isActive
                        ? "text-indigo-700 dark:text-indigo-300"
                        : "text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-2xl mx-5 font-bold">{step.title}</h3>
                  <p
                    className={`text-gray-600 mx-5 dark:text-gray-300 ${
                      isActive ? "font-semibold" : ""
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
