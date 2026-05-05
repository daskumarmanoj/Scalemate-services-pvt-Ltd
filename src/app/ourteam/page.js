"use client";
import React from "react";
import { motion } from "framer-motion";

const TEAM_DATA = [
  {
    title: "100+ Strategic Consultants",
    desc: "Driving business growth with deep industry understanding and tailored strategic solutions.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    title: "20+ CA & CS Experts",
    desc: "Ensuring strong financial structuring, compliance, and regulatory excellence.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  },
  {
    title: "25+ Backend Specialists",
    desc: "Managing documentation, applications, and fund processes with accuracy and efficiency.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "10+ Digital Growth Experts",
    desc: "Building brand presence, visibility, and performance-driven digital strategies.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    title: "20+ Relationship Managers",
    desc: "Delivering consistent communication, regular updates, and seamless client support.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "One Unified Team",
    desc: "Collaborating across functions to deliver measurable outcomes and long-term business success.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 md:px-16 py-32 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[120px] rounded-full" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
          Expertise.{" "}
          <span className="text-yellow-400">Execution.</span>{" "}
          Excellence.
        </h1>

        <p className="text-gray-400 text-sm md:text-base">
          A multidisciplinary team built for precision, performance, and scale.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {TEAM_DATA.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
          >

            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[260px] object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition" />

            {/* Yellow gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-5 z-10">
              <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Border glow */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-yellow-400/40 rounded-2xl transition" />

            {/* Bottom highlight */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-yellow-400 group-hover:w-full transition-all duration-300" />

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Page;