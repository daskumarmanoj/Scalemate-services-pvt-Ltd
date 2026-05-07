/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Book a Free Consultation",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800",
  },
  {
    id: 2,
    title: "Choose the Services You Need",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800",
  },
  {
    id: 3,
    title: "We Execute with Expertise",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800",
  },
  {
    id: 4,
    title: "You Focus on Building Your Dream",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 80, rotate: -3 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6 },
  },
};

const HowItWorks = () => {
  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold">
            How It Works ?
          </h2>
          <p className="text-gray-400 mt-3">
            Simple process to grow your business with us
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {steps.map((step, i) => (
            <Link key={step.id} href={"/contact"}>
              <motion.div
                variants={card}
                whileHover={{ y: -12, rotate: 1.5, scale: 1.03 }}
                className="group bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:border-yellow-400/40 transition-all duration-300 relative cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-[200px] rounded-xl overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-sm font-semibold text-gray-200 group-hover:text-yellow-400 transition">
                  {step.title}
                </h3>

                {/* Step Number */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-bold shadow-md">
                  {i + 1}
                </div>

                {/* Arrow */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm group-hover:bg-yellow-400 group-hover:text-black transition">
                  →
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
