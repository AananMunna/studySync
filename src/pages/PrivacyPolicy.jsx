import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At StudySync, we respect your privacy and are committed to protecting
          your personal information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We may collect your name, email address, and usage data to improve our
          services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Information
        </h2>
        <p className="mb-4">
          Your information is used to provide and enhance the StudySync
          platform, communicate updates, and ensure security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this privacy policy periodically. Continued use of the
          platform means you accept the changes.
        </p>
      </div>
    </div>
  );
}
