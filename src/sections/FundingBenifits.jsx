"use client";
import Link from "next/link";
import React from "react";

const cards = [
  {
    tag: "PRIORITY SEGMENT",
    title: "Stand-Up India",
    value: "₹10 lakh – ₹1 crore",
  },
  {
    tag: "FOUNDATION LAYER",
    title: "DPIIT Recognition",
    value: "Tax benefits & compliance ease",
  },
  {
    tag: "FOOD & AGRI",
    title: "PMFME",
    value: "Credit-linked support",
  },
  {
    tag: "MOST ACCESSIBLE",
    title: "PM MUDRA",
    value: "Up to ₹20 lakh",
  },
];

export default function FundingBenifits() {
  return (
    <section className="bg-[#0a0a0a] text-white overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <p className="text-xs tracking-[3px] text-yellow-500 uppercase mb-4">
          Government & Bank Routes
        </p>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Funding and benefits{" "}
          <span className="text-yellow-400">worth preparing for</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-3xl mx-auto">
          Most businesses do not fail on ideas—they lose time on the wrong scheme,
          thin project reports, or files banks cannot process. We align your
          entity, numbers, and narrative to the route that actually matches your stage.
        </p>



        {/* Ribbon */}
        <div className="mt-8">
          <p className="text-green-400 text-xs tracking-widest">
            ● LIVE PROGRAMME RIBBON
          </p>
          <p className="text-gray-500 text-sm">
            Hover to pause · Every card links to a free eligibility conversation
          </p>
        </div>
      </div>

      {/* ================= SCROLL CARDS ================= */}
      <div className="relative">

        <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused] w-max px-6">

          {[...cards, ...cards].map((card, i) => (
            <div
              key={i}
              className="min-w-[260px] bg-[#121212] border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-400 transition duration-300"
            >
              <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">
                {card.tag}
              </span>

              <h3 className="mt-3 font-semibold text-white">
                {card.title}
              </h3>

              <p className="text-yellow-300 text-sm mt-1">
                {card.value}
              </p>

              <Link href={"/contact"}>
                <button className="mt-4 text-sm text-yellow-400 hover:underline">
                  Check eligibility →
                </button>
                </Link>
            </div>
          ))}

        </div>
      </div>

      {/* ================= TAG SECTION ================= */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="bg-[#111] border border-yellow-500/10 rounded-xl p-6 text-center">
          <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">
            Also on our radar
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "NSIC",
              "TReDS",
              "CLCSS",
              "ZED",
              "PM SVANidhi",
              "State CM funds",
              "Export incentives",
              "NRLM / DAY-NULM",
            ].map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="max-w-5xl mx-auto px-6 py-20">

        <div className="relative bg-[#111] border border-yellow-500/20 rounded-2xl p-10 text-center overflow-hidden">

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 blur-2xl" />

          {/* Content */}
          <div className="relative z-10">

            <h3 className="text-3xl md:text-4xl font-semibold text-white">
              Free eligibility conversation
            </h3>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Share your sector, stage, and last 2 years' trajectory. We reply with a
              short list of routes worth exploring and what to gather before you walk
              into a branch or portal.
            </p>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-yellow-400 mx-auto my-6 rounded-full" />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">

              {/* Book Eligibility */}
              <Link href="/contact">
                <button className="px-8 py-3 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition shadow-lg shadow-yellow-500/20">
                  Book eligibility review →
                </button>
              </Link>

              {/* Scheme FAQs */}
              <Link href="/faq">
                <button className="px-8 py-3 rounded-lg border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition">
                  Scheme FAQs
                </button>
              </Link>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}