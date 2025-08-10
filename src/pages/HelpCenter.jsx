import React from "react";

const faqs = [
  {
    question: "How do I create an assignment?",
    answer:
      "Go to the 'Create Assignment' page, fill in the details, and click submit. Make sure to provide a clear title and description.",
    emoji: "📝",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Click the 'Forgot Password' link on the login page, and follow the instructions sent to your registered email.",
    emoji: "🔑",
  },
  {
    question: "Can I update an assignment after publishing?",
    answer:
      "Yes, if you're the creator, edit your assignment from 'My Assignments'. Remember edits might affect submissions.",
    emoji: "✏️",
  },
  {
    question: "What browsers are supported?",
    answer:
      "StudySync supports the latest Chrome, Firefox, Safari, Edge, and Opera browsers for optimal performance.",
    emoji: "🌐",
  },
  {
    question: "How do I delete an assignment?",
    answer:
      "Creators can delete assignments from 'My Assignments'. This action is permanent, so proceed with caution.",
    emoji: "🗑️",
  },
  {
    question: "Is my data secure?",
    answer:
      "We use top-notch encryption and security protocols to keep your data safe from unauthorized access.",
    emoji: "🔒",
  },
  {
    question: "Can I collaborate with others?",
    answer:
      "Currently supports individual submissions. Group collaboration is on the roadmap, stay tuned!",
    emoji: "🤝",
  },
  {
    question: "How do I contact support?",
    answer:
      "Reach out through the Contact page or email support@studysync.com. We respond within 24 hours.",
    emoji: "📞",
  },
];

const baseColor = "bg-blue-50 dark:bg-blue-900";

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold mb-12 text-center">Help Center</h1>
        <p className="mb-16 text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Answers to your burning questions — quick, clear, and professional.
        </p>

        <div
          style={{ columnCount: 1, columnGap: "1.5rem" }}
          className="sm:column-count-2 md:column-count-3 lg:column-count-4 xl:column-count-5"
        >
          {faqs.map(({ question, answer, emoji }, index) => (
            <article
              key={index}
              tabIndex={0}
              aria-label={`FAQ: ${question}`}
              className={`
                break-inside-avoid
                mb-6
                rounded-2xl
                p-6
                shadow
                transition-shadow
                duration-300
                ${baseColor}
                hover:shadow-lg
                hover:bg-blue-100
                dark:hover:bg-blue-800
                transform
                will-change-transform
              `}
              style={{
                animation: `fadeSlideUp 0.5s ease forwards`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">{emoji}</span> {question}
              </h2>
              <p className="text-base text-gray-800 dark:text-gray-100 leading-relaxed">
                {answer}
              </p>
            </article>
          ))}
        </div>

        <style>{`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsive column count utility for Tailwind users */
          @media (min-width: 640px) {
            .sm\\:column-count-2 {
              column-count: 2;
            }
          }
          @media (min-width: 768px) {
            .md\\:column-count-3 {
              column-count: 3;
            }
          }
          @media (min-width: 1024px) {
            .lg\\:column-count-4 {
              column-count: 4;
            }
          }
          @media (min-width: 1280px) {
            .xl\\:column-count-5 {
              column-count: 5;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
