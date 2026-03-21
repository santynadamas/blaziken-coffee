"use client";

import React from "react";
import { Check } from "lucide-react";

export default function PolicyPage() {
  const policySections = [
    {
      title: "Information We Collect",
      text: "We may collect personal information such as your name, email address, and payment details to provide you with the best possible service.",
    },
    {
      title: "How We Use Your Information",
      text: "Your information is used to process orders, improve our services, communicate promotions, and ensure a secure shopping experience.",
    },
    {
      title: "Sharing Your Information",
      text: "We do not sell your personal information. It may be shared with trusted partners who help us operate our store or deliver services.",
    },
    {
      title: "Security Measures",
      text: "We implement industry-standard security measures to protect your personal data against unauthorized access and breaches.",
    },
    {
      title: "Your Rights",
      text: "You have the right to access, correct, or request deletion of your personal information. Contact us anytime for assistance.",
    },
    {
      title: "Updates to This Policy",
      text: "Our privacy policy may change from time to time. We encourage you to review this page periodically for the latest updates.",
    },
  ];

  return (
    <main className="relative w-full py-12 bg-gradient-to-b from-[#FFF8F0] to-[#F8F4E3] dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 dark:opacity-20 pointer-events-none"></div>
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6">
        <section className="relative flex flex-col items-center justify-center gap-6 text-center h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white drop-shadow-lg">
            Privacy & Policy
          </h1>
          <p className="max-w-2xl mt-4 text-base text-gray-700 sm:text-lg md:text-xl dark:text-gray-200 drop-shadow-md">
            We care about your data and privacy. Learn how we protect it.
          </p>
        </section>
        <section className="mt-12 space-y-10">
          {policySections.map((section, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transition-transform hover:scale-[1.01]"
            >
              <div className="flex-shrink-0 p-4 rounded-full bg-amber-700/10 dark:bg-amber-400/20">
                <Check className="w-6 h-6 text-amber-700 dark:text-amber-400" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base md:text-lg">
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </section>
        <section className="px-4 py-12 mt-12 text-center shadow-inner rounded-2xl bg-orange-50 dark:bg-gray-900 sm:px-6 sm:py-16">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
            Questions? Were here to help!
          </h2>
          <p className="mb-6 text-sm text-gray-700 sm:text-base md:text-lg dark:text-gray-300">
            Reach out to our support team anytime for assistance.
          </p>
          <button className="px-6 py-3 text-sm font-semibold text-white transition-transform bg-orange-500 rounded-lg shadow-lg sm:px-8 sm:py-4 hover:bg-orange-600 hover:scale-105 sm:text-base md:text-lg">
            CONTACT SUPPORT - SANTIAGOROJASS018@GMAIL.COM
          </button>
        </section>
      </div>
    </main>
  );
}