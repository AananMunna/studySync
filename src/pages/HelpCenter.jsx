import React from "react";

export default function HelpCenter() {
  const faqs = [
    {
      question: "How do I create an assignment?",
      answer:
        "Go to the 'Create Assignment' page, fill in the details, and click submit.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Navigate to the 'Forgot Password' link on the login page and follow the instructions.",
    },
    {
      question: "Can I update an assignment after publishing?",
      answer:
        "Yes, but only if you are the creator of the assignment. Go to 'My Assignments' and click 'Edit'.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "StudySync works best on the latest versions of Chrome, Firefox, Safari, and Edge.",
    },
    {
      question: "How do I delete an assignment?",
      answer:
        "Only assignment creators can delete their assignments from the 'My Assignments' page. Use the Delete button carefully!",
    },
    {
      question: "Is my data secure?",
      answer:
        "We use industry-standard security measures to protect your information.",
    },
    {
      question: "Can I collaborate with others?",
      answer:
        "Currently, StudySync supports individual submissions, but collaboration features are coming soon!",
    },
    {
      question: "How do I contact support?",
      answer:
        "Use the Contact page or email support@studysync.com for any assistance.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Help Center</h1>
        <p className="mb-12 text-center max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Find answers to the most common questions and get the help you need.
        </p>

        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-6
            auto-rows-fr
          "
        >
          {faqs.map((faq, index) => {
            // Make some cards bigger for dynamic vibe
            const isBigCard = index % 5 === 0; // every 5th card big

            return (
              <div
                key={index}
                className={`
                  relative 
                  border 
                  rounded-xl 
                  p-6 
                  bg-gray-50 
                  dark:bg-gray-800 
                  dark:border-gray-700 
                  shadow-md
                  hover:shadow-xl
                  transition-shadow
                  cursor-pointer
                  flex
                  flex-col
                  justify-between
                  ${isBigCard ? "lg:col-span-2 lg:row-span-2" : ""}
                  hover:scale-[1.03] 
                  transform
                  duration-300
                `}
                tabIndex={0}
                aria-label={`FAQ: ${faq.question}`}
              >
                <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">{faq.answer}</p>
               
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
