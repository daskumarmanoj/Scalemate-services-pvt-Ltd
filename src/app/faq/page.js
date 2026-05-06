"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "@/Components/Ui/Modal";

const faqs = [
  {
    question: "What is Startup India?",
    answer:
      "Startup India is a Government of India initiative that supports startups through funding, tax benefits, and simplified compliance.",
  },
  {
    question: "Who can register under Startup India?",
    answer:
      "Businesses less than 10 years old, with turnover under ₹100 crore, and focused on innovation or scalable models are eligible.",
  },
  {
    question: "What are the key benefits of Startup India registration?",
    answer:
      "Tax exemptions, easier compliance, funding opportunities, IPR support, and increased credibility.",
  },
  {
    question: "What types of funding are available for startups?",
    answer:
      "Government grants, seed funding, venture capital, angel investment, and business loans.",
  },
  {
    question: "What is a government grant?",
    answer:
      "A grant is financial support provided by the government that does not need to be repaid.",
  },
  {
    question: "How is a grant different from a loan?",
    answer:
      "Grants are non-repayable, while loans must be repaid with interest.",
  },
  {
    question: "How much funding can a startup receive?",
    answer:
      "Funding can range from ₹10 lakh to several crores depending on the scheme and business profile.",
  },
  {
    question: "What is the Startup India Seed Fund Scheme (SISFS)?",
    answer:
      "It is a scheme that provides funding for idea validation, prototype development, and early-stage growth.",
  },
  {
    question: "Is funding guaranteed under Startup India?",
    answer:
      "No, approvals depend on eligibility, documentation, and evaluation by authorities.",
  },
  {
    question: "Can I apply for multiple funding schemes?",
    answer:
      "Yes, applying to multiple schemes increases the chances of securing funding.",
  },
  {
    question: "What documents are required for funding?",
    answer:
      "Company registration certificate, PAN, business plan, pitch deck, and financial projections.",
  },
  {
    question: "Do I need a registered company to apply?",
    answer:
      "Yes, most schemes require a registered entity like Pvt Ltd, LLP, or partnership firm.",
  },
  {
    question: "How long does the funding process take?",
    answer:
      "Typically a few weeks to several months depending on the scheme.",
  },
  {
    question: "What happens if my application is rejected?",
    answer:
      "You can reapply after correcting the issues highlighted by authorities.",
  },
  {
    question: "Can startups without revenue get funding?",
    answer:
      "Yes, early-stage startups can receive grants or seed funding based on their idea and potential.",
  },
  {
    question: "What is the role of a pitch deck?",
    answer:
      "It presents your business idea, market potential, and financials to investors or authorities.",
  },
  {
    question: "How do investors evaluate startups?",
    answer:
      "They evaluate business model, scalability, market size, team strength, and growth potential.",
  },
  {
    question: "Are there tax benefits for startups?",
    answer:
      "Yes, eligible startups can get tax exemptions under certain conditions.",
  },
  {
    question: "Can I get both grant and investor funding?",
    answer:
      "Yes, startups can combine grants with VC or angel funding for better growth.",
  },
  {
    question: "Am I eligible for funding?",
    answer:
      "If you have a registered business with a scalable idea, there’s a strong chance you qualify. We assess and guide you.",
  },
  {
    question: "How much funding can I actually get?",
    answer:
      "You can secure anywhere from ₹10 lakh to ₹1+ crore depending on your business profile.",
  },
  {
    question: "Is funding non-repayable?",
    answer:
      "Grants are non-repayable, but loans and investor funding may involve repayment or equity.",
  },
  {
    question: "What if my application gets rejected?",
    answer:
      "We identify the reasons, fix the gaps, and reapply for better success.",
  },
  {
    question: "What documents do I need to start?",
    answer:
      "Basic documents like company registration, PAN, and business plan are enough—we handle the rest.",
  },
  {
    question: "Do I need prior experience or revenue?",
    answer:
      "Not necessarily. Even early-stage startups can qualify with a strong idea and execution plan.",
  },
  {
    question: "Why should I choose Scalemate?",
    answer:
      "Scalemate provides end-to-end support—from eligibility check and documentation to approvals, follow-ups, and funding strategy.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-[#0a0a0a] text-white py-40 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-black">
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </h2>

          <p className="text-gray-400 mt-4">
            Everything you need to know about funding & Startup India.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-yellow-500/20 rounded-xl bg-[#111]"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full text-left px-6 py-5 flex justify-between items-center"
              >
                <span className="text-sm md:text-base">
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  className="text-yellow-400 text-xl"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-400 text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-400 mb-4">Still have questions?</p>

          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-300 transition"
          >
            Talk to Expert →
          </button>
        </div>
      </div>

      <QuoteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}