"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  FileText,
  Landmark,
  ShieldCheck,
  Users,
  BarChart2,
  Globe,
  Lightbulb,
  Rocket,
  Target,
  Award,
} from "lucide-react";
import Modal from "@/Components/Ui/Modal";

// ─── Slide Data ───────────────────────────────────────────────────────────────

const slides = [
  {
    id: 0,
    bg: "/bg-1.jpg",
    eyebrow: "Trusted by 1000+ Businesses",
    heading: (
      <>
        Grow Your Business with <br /> Expert Consultancy
      </>
    ),
    subtext:
      "We help startups, MSMEs, and entrepreneurs with company registration, funding, legal compliance, and digital growth strategies to scale faster and smarter.",
    services: [
      { icon: Briefcase, title: "Business Setup" },
      { icon: FileText, title: "Legal Compliance" },
      { icon: Landmark, title: "Funding Support" },
      { icon: TrendingUp, title: "Growth Strategy" },
    ],
    ctaLabel: "Book Consultation",
    accentColor: "#F5C518",
    glowLeft: "bg-blue-500",
    glowRight: "bg-purple-500",
  },
  {
    id: 1,
    bg: "/bg2.jpg",
    eyebrow: "100% Regulatory Coverage",
    heading: (
      <>
        Stay Compliant, <br /> Stay Protected
      </>
    ),
    subtext:
      "From GST registration and ROC filings to labour law compliance — our experts handle every regulatory requirement so you can focus on what matters most: building your business.",
    services: [
      { icon: ShieldCheck, title: "GST & Tax Filing" },
      { icon: FileText, title: "ROC Compliance" },
      { icon: Users, title: "Labour Law" },
      { icon: Globe, title: "Import / Export" },
    ],
    ctaLabel: "Get Compliance Audit",
    accentColor: "#4ADE80",
    glowLeft: "bg-green-500",
    glowRight: "bg-teal-500",
  },
  {
    id: 2,
    bg: "/bg-3.jpg",
    eyebrow: "Strategy That Delivers Results",
    heading: (
      <>
        Turn Vision Into <br /> Measurable Growth
      </>
    ),
    subtext:
      "Our strategic advisors work alongside your team to identify opportunities, eliminate bottlenecks, and execute growth plans that deliver real, trackable results.",
    services: [
      { icon: Lightbulb, title: "Strategy Design" },
      { icon: Rocket, title: "Market Expansion" },
      { icon: Target, title: "Performance KPIs" },
      { icon: Award, title: "Brand Positioning" },
    ],
    ctaLabel: "Start Growing Today",
    accentColor: "#818CF8",
    glowLeft: "bg-indigo-500",
    glowRight: "bg-pink-500",
  },
];

// ─── Slide variants ───────────────────────────────────────────────────────────
// Key fix: opacity stays at 1 throughout — only X translates.
// This eliminates the white flash caused by both slides going transparent simultaneously.

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sliding, setSliding] = useState(false);

  const goTo = (index, dir) => {
    if (sliding) return;
    setSliding(true);
    setDirection(dir);
    setCurrent(index);
    setTimeout(() => setSliding(false), 700); // matches transition duration
  };

  const next = () => goTo((current + 1) % slides.length, 1);
  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);

  // Preload next slide image to prevent flash on slow connections
  useEffect(() => {
    const nextIndex = (current + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIndex].bg;
  }, [current]);

  const slide = slides[current];

  return (
    // ← FIXED: bg-black on wrapper is the safety net for any gap between slides
    <div className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* ── Slides ── */}
      {/* ← FIXED: mode="sync" ensures exit and enter animate simultaneously (push effect) */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Ambient glows */}
          <div
            className={`absolute top-20 left-10 w-32 h-32 ${slide.glowLeft} opacity-20 blur-3xl rounded-full animate-pulse`}
          />
          <div
            className={`absolute bottom-20 right-10 w-40 h-40 ${slide.glowRight} opacity-20 blur-3xl rounded-full animate-pulse`}
          />

          {/* Content */}
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 text-center pt-24 pb-28 sm:py-20">
            <motion.div
              key={`content-${current}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center w-full max-w-4xl mx-auto mt-15"
            >
              {/* Heading */}
              <motion.h1
                variants={itemVariant}
                className="text-white font-extrabold text-3xl sm:text-5xl md:text-7xl leading-tight"
              >
                {slide.heading}
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariant}
                className="mt-4 sm:mt-6 max-w-2xl text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0"
              >
                {slide.subtext}
              </motion.p>

              {/* Service Icons */}
              <motion.div
                variants={itemVariant}
                className="mt-7 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full"
              >
                {slide.services.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.08 }}
                      className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/20 shadow-lg"
                    >
                      <Icon size={22} style={{ color: slide.accentColor }} />
                      <p className="text-xs sm:text-sm text-gray-200 text-center">{item.title}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariant} className="mt-8 sm:mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold tracking-widest cursor-pointer text-black text-sm sm:text-base shadow-xl transition"
                  style={{
                    backgroundColor: slide.accentColor,
                    boxShadow: `0 8px 30px ${slide.accentColor}55`,
                  }}
                >
                  {slide.ctaLabel}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Arrow Controls ── */}
      <button
        onClick={prev}
        disabled={sliding}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition text-xl"
      >
        ‹
      </button>
      <button
        onClick={next}
        disabled={sliding}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition text-xl"
      >
        ›
      </button>

      {/* ── Dot Indicators ── */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === current ? 28 : 8,
              backgroundColor:
                i === current
                  ? slides[current].accentColor
                  : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* ── Slide Counter ── */}
      <div className="absolute bottom-5 sm:bottom-8 right-6 z-20 text-white/40 text-xs tracking-widest font-mono">
        0{current + 1} / 0{slides.length}
      </div>

      {/* ── Modal ── */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Hero;