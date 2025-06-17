import { useState } from "react";

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
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className={`collapse collapse-arrow transition-all duration-300 rounded-3xl border border-gray-300 dark:border-gray-700 ${
                  isOpen
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-xl"
                    : "bg-transparent text-gray-900 dark:text-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isOpen}
                  onChange={() => toggle(id)}
                />
                <div className="collapse-title text-xl sm:text-2xl font-semibold flex justify-between items-center gap-4">
                  {question}
                 
                </div>
                <div className="collapse-content text-lg leading-relaxed text-white dark:text-gray-300">
                  <p>{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
