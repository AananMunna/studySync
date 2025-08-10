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
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        <p className="mb-6">
          Here you can find answers to the most frequently asked questions.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 className="font-semibold">{faq.question}</h2>
              <p className="mt-2 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
