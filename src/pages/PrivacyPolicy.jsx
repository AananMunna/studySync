import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          Privacy Policy
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          At StudySync, your privacy is our top priority. We are committed to
          protecting your personal information and being transparent about how
          it is collected, used, and safeguarded.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            We collect the following types of information to provide you with a
            personalized and secure experience:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Personal Data:</strong> Name, email address, and profile information.</li>
            <li><strong>Usage Data:</strong> How you interact with StudySync, including pages visited and actions taken.</li>
            <li><strong>Cookies & Tracking:</strong> Data collected through cookies and similar technologies to enhance your experience.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            Your information helps us to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Provide, maintain, and improve the StudySync platform and services.</li>
            <li>Personalize your experience and respond to your inquiries.</li>
            <li>Send you important updates, security alerts, and support messages.</li>
            <li>Analyze trends and usage to enhance functionality.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking Technologies</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            StudySync uses cookies and similar tracking technologies to collect information to improve your experience. You can control cookie settings in your browser preferences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            We implement industry-standard security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of marketing communications.</li>
            <li>Request data portability or restrict certain data processing.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update this privacy policy occasionally to reflect changes in our practices or legal requirements. Continued use of StudySync means you accept these changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out to us at{" "}
            <a
              href="mailto:support@studysync.com"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              support@studysync.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
