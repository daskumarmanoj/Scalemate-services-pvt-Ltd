"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  FileText,
  Landmark,
} from "lucide-react";

const services = [
  { icon: Briefcase, title: "Business Setup" },
  { icon: FileText, title: "Legal Compliance" },
  { icon: Landmark, title: "Funding Support" },
  { icon: TrendingUp, title: "Growth Strategy" },
];

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden py-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/herobg-2.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight"
        >
          Grow Your Business with <br /> Expert Consultancy
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-2xl text-gray-300 text-lg"
        >
          We help startups, MSMEs, and entrepreneurs with company registration,
          funding, legal compliance, and digital growth strategies to scale
          faster and smarter.
        </motion.p>

        {/* Service Icons Row */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {services.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 shadow-lg"
              >
                <Icon className="text-white" size={28} />
                <p className="text-sm text-gray-200">{item.title}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex gap-4 flex-wrap justify-center"
        >

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} 
            className="px-10 py-4 bg-yellow-500 text-black rounded-full font-semibold shadow-xl hover:shadow-yellow-500/50 transition"
          >
            Book Consultation
          </motion.button>
        </motion.div>

        {/* Floating Glow Effect */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 opacity-20 blur-3xl rounded-full animate-pulse" />

      </div>
    </div>
  );
};

export default Hero;