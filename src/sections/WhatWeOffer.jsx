"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  FileText,
  DollarSign,
  BadgeCheck,
  Globe,
  BookOpen,
  Award,
  Zap,
  HeartHandshake,
  Users,
  Shield,
} from "lucide-react";

const GOLD = "#F5C518";

const SERVICES = [
  {
    title: "Growth Strategy",
    icon: TrendingUp,
    tag: "Strategic",
    color: "#f472b6",
    description:
      "Strategic planning for business expansion, market entry, and digital transformation.",
    features: [
      "Business Plan Development",
      "Market Research",
      "Digital Marketing",
    ],
  },
  {
    title: "Legal Registration",
    icon: FileText,
    tag: "Most Popular",
    color: "#F5C518",
    description:
      "Complete company registration with MCA compliance and documentation.",
    features: ["Pvt Ltd", "LLP & OPC", "Startup India"],
  },
  {
    title: "Fund Raising",
    icon: DollarSign,
    tag: "High Demand",
    color: "#60a5fa",
    description:
      "End-to-end support for grants, loans, and investor funding.",
    features: ["Grants", "Angel Funding", "MSME Loans"],
  },
  {
    title: "Certifications",
    icon: BadgeCheck,
    tag: "Trust",
    color: "#34d399",
    description:
      "Government-backed certifications like ISO, MSME, Trademark.",
    features: ["ISO", "MSME", "Trademark"],
  },
  {
    title: "Digital Marketing",
    icon: Globe,
    tag: "Grow Online",
    color: "#e879f9",
    description:
      "SEO, social media, website development & lead generation.",
    features: ["SEO", "Social Media", "Website Dev"],
  },
  {
    title: "Company Profiling",
    icon: BookOpen,
    tag: "Brand Identity",
    color: "#fb923c",
    description:
      "Pitch decks, DPR, branding & financial projections.",
    features: ["Pitch Deck", "DPR", "Logo Design"],
  },
];

const WHY_US = [
  {
    icon: Award,
    title: "Expert Team",
    description: "Certified professionals with years of experience.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Quick turnaround & 100% online documentation.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden charges, fully transparent pricing.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "24/7 support via call, WhatsApp & email.",
  },
  {
    icon: Users,
    title: "Pan India Service",
    description: "Serving clients across all major states.",
  },
  {
    icon: Shield,
    title: "Government Support",
    description: "Expert help in govt schemes & approvals.",
  },
];

const STATS = [
  { value: "1000+", label: "Businesses Served" },
  { value: "6+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" },
  { value: "100Cr+", label: "Funding Secured" },
  { value: "500+", label: "Registrations" },
];

const WhatWeOffer = () => {
  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold">
            What We Offer
          </h2>
          <p className="mt-4 text-gray-400">
            Premium consultancy services to grow your business faster.
          </p>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {SERVICES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-yellow-400/40 transition"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl mb-4"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  <Icon size={26} />
                </div>

                <h3 className="text-lg font-semibold hover:text-yellow-400">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400">{item.tag}</p>

                <p className="text-sm text-gray-400 mt-3">
                  {item.description}
                </p>

                <ul className="mt-4 space-y-1">
                  {item.features.map((f, idx) => (
                    <li
                      key={idx}
                      className="text-xs flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Why Us */}
        <div className="mt-24">
          <h3 className="text-2xl text-center font-bold">
            Why Choose Us
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-yellow-400/40"
                >
                  <Icon className="text-yellow-400 mb-3" size={28} />
                  <h4>{item.title}</h4>
                  <p className="text-sm text-gray-400 mt-2">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {STATS.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl py-6"
            >
              <h4 className="text-2xl font-bold text-yellow-400">
                {item.value}
              </h4>
              <p className="text-xs text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold">
            Ready to Grow Your Business?
          </h3>
          <button
            className="mt-6 px-8 py-3 rounded-full font-semibold text-black"
            style={{
              backgroundColor: GOLD,
              boxShadow: `0 10px 30px ${GOLD}55`,
            }}
          >
            Get Started
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhatWeOffer;
