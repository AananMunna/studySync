import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "How do I submit an assignment?",
    answer:
      "Simply go to the 'Assignments' section, choose your assignment, and upload your files via the submission form.",
  },
  {
    id: 2,
    question: "Can I collaborate with my friends?",
    answer:
      "Yes! You can invite friends to join your study group and work on assignments together in real time.",
  },
  {
    id: 3,
    question: "How do I get feedback on my submission?",
    answer:
      "Your peers and instructors can evaluate your assignments and provide feedback directly on the platform.",
  },
  {
    id: 4,
    question: "Is my data safe and secure?",
    answer:
      "Absolutely! We use industry-standard encryption and security practices to keep your data private and safe.",
  },
  {
    id: 5,
    question: "Can I track my progress over time?",
    answer:
      "Yes, our dashboard provides insightful progress tracking to help you monitor your improvement.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="w-full bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 py-24 px-6 sm:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center mb-20 text-gray-900 dark:text-white tracking-tight drop-shadow-md">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.map(({ id, question, answer }) => {
            const isOpen = id === openId;
            return (
              <motion.div
                key={id}
                initial={false}
                animate={{
                  background:
                    isOpen
                      ? "linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)"
                      : "transparent",
                  boxShadow: isOpen
                    ? "0 10px 20px rgba(99, 102, 241, 0.3)"
                    : "0 2px 6px rgba(0,0,0,0.05)",
                }}
                className="border border-gray-300 dark:border-gray-700 rounded-3xl cursor-pointer transition-all duration-500 select-none"
                onClick={() => toggle(id)}
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.header
                  className="flex items-center justify-between p-6"
                  layout
                >
                  <h3
                    className={`text-xl sm:text-2xl font-semibold transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`${
                      isOpen
                        ? "text-indigo-300"
                        : "text-indigo-600 dark:text-indigo-400"
                    } flex-shrink-0`}
                  >
                    {isOpen ? (
                      <FaChevronUp size={24} />
                    ) : (
                      <FaChevronDown size={24} />
                    )}
                  </motion.div>
                </motion.header>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: {
                          opacity: 1,
                          height: "auto",
                          padding: "0 24px 24px",
                          transition: { duration: 0.5, ease: "easeInOut" },
                        },
                        collapsed: {
                          opacity: 0,
                          height: 0,
                          padding: "0 24px",
                          transition: { duration: 0.4, ease: "easeInOut" },
                        },
                      }}
                      className="text-gray-100 dark:text-gray-300 overflow-hidden"
                    >
                      <p className="text-lg leading-relaxed">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
