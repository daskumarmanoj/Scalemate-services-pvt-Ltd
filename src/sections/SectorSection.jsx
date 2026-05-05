"use client";
import QuoteModal from "@/Components/Ui/Modal";
import Link from "next/link";
import React, { useState } from "react";

const sectors = [
  {
    title: "Startups & DPIIT",
    desc: "Recognition, pitch readiness, and funding alignment for early-stage ventures.",
    points: [
      "DPIIT registration & compliance",
      "Pitch deck & documentation",
      "Seed / angel readiness",
    ],
    icon: "🚀",
  },
  {
    title: "Manufacturing & MSME",
    desc: "Factory setups, licenses, and funding support aligned with MSME policies.",
    points: [
      "Udyam & factory licenses",
      "Subsidy & loan structuring",
      "Compliance & documentation",
    ],
    icon: "🏭",
  },
  {
    title: "E-commerce & D2C",
    desc: "Online brands, GST setup, and working capital strategy.",
    points: [
      "GST & marketplace setup",
      "Brand & catalogue support",
      "Working capital planning",
    ],
    icon: "🛒",
  },
  {
    title: "Professional Services",
    desc: "Consultancies, agencies, and service firms with structured compliance.",
    points: [
      "LLP / Pvt Ltd setup",
      "Payroll & TDS compliance",
      "Client-ready documentation",
    ],
    icon: "💼",
  },
  {
    title: "Exporters & Traders",
    desc: "IEC, export incentives, and documentation for global trade.",
    points: [
      "IEC & export registration",
      "Shipping & compliance",
      "Incentives & subsidies",
    ],
    icon: "🌍",
  },
  {
    title: "Food & Agri",
    desc: "Food businesses with FSSAI and scheme-based growth support.",
    points: [
      "FSSAI licensing",
      "PMFME scheme support",
      "Processing unit setup",
    ],
    icon: "🌾",
  },
];

export default function SectorSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-[#0a0a0a] text-white py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[3px] text-yellow-500 uppercase mb-3">
            Sectors & Industries
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Every sector has different{" "}
            <span className="text-yellow-400">routes & requirements</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We align your business structure, documentation, and financials
            with the right schemes, portals, and funding opportunities.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {sectors.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 bg-[#111] border border-yellow-500/20 rounded-xl p-6 hover:border-yellow-400 transition"
            >

              {/* Icon */}
              <div className="min-w-[50px] h-[50px] flex items-center justify-center bg-yellow-500/10 text-yellow-400 rounded-lg text-xl">
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {item.desc}
                </p>

                <ul className="mt-3 space-y-1">
                  {item.points.map((point, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-yellow-400">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-[#111] border border-yellow-500/20 rounded-xl p-8 inline-block">

            <h4 className="text-lg font-semibold">
              Your sector not listed?
            </h4>

            <p className="text-gray-400 text-sm mt-2">
              Tell us about your business — we’ll map the right structure,
              schemes, and funding options.
            </p>
            <Link href={"/faq"}>
              <button className="mt-4 px-6 py-3 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-300 transition"
              >
                Discuss your business →
              </button>
            </Link>


          </div>
        </div>

      </div>
      {/* Modal */}
      <QuoteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}