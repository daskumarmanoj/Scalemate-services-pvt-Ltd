"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import {
  Compass,
  FileText,
  PackageCheck,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Star,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  Users,
  BadgeCheck,
  MapPin,
  PhoneCall,
  ClipboardList,
  FileSearch,
  FilePen,
  Rocket,
  Headphones,
} from "lucide-react";
import Link from "next/link";

/* ─── DATA – 6 steps for the startup process ─── */
const STEPS = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Free Consultation",
    subtitle: "Talk to Our Experts",
    description:
      "Schedule a free 30-minute call with our certified professionals. We understand your business needs, goals, and challenges to craft the perfect solution.",
    duration: "30 mins",
    color: "#facc15",
    glow: "rgba(250,204,21,0.2)",
    checkpoints: [
      "Business needs analysis",
      "Goal identification",
      "Initial roadmap discussion",
    ],
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Requirement Gathering",
    subtitle: "Document & Plan",
    description:
      "Our team collects all necessary documents and details. We create a clear, structured plan tailored specifically to your business type and objectives.",
    duration: "1–2 Days",
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.2)",
    checkpoints: [
      "Document checklist shared",
      "KYC & verification",
      "Custom plan created",
    ],
  },
  {
    number: "03",
    icon: FileSearch,
    title: "Review & Approval",
    subtitle: "Expert Verification",
    description:
      "Our senior CAs and legal experts review every detail meticulously. We ensure 100% accuracy before proceeding to avoid any rejections or delays.",
    duration: "2–3 Days",
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
    checkpoints: [
      "Legal compliance check",
      "Document verification",
      "Expert sign-off",
    ],
  },
  {
    number: "04",
    icon: FilePen,
    title: "Filing & Processing",
    subtitle: "We Handle Everything",
    description:
      "We file all applications, forms, and documents on your behalf with the relevant government portals — MCA, GST, MSME, and more.",
    duration: "3–7 Days",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.2)",
    checkpoints: [
      "Government portal filing",
      "Real-time status updates",
      "Follow-up & tracking",
    ],
  },
  {
    number: "05",
    icon: Rocket,
    title: "Delivery & Launch",
    subtitle: "You're Officially Ready",
    description:
      "Receive your certificates, documents, and registrations digitally. We walk you through everything so you're fully prepared to operate.",
    duration: "Same Day",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
    checkpoints: [
      "Certificates delivered",
      "Complete documentation",
      "Onboarding walkthrough",
    ],
  },
  {
    number: "06",
    icon: Headphones,
    title: "Ongoing Support",
    subtitle: "We Stay With You",
    description:
      "Our relationship doesn't end at delivery. Get dedicated account management, compliance reminders, and expert support whenever you need it.",
    duration: "Always On",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.2)",
    checkpoints: [
      "Dedicated account manager",
      "Compliance reminders",
      "24/7 support access",
    ],
  },
];

const STATS = [
  { icon: Users, value: "26,000+", label: "Businesses supported" },
  {
    icon: BadgeCheck,
    value: "14,000+",
    label: "Registrations & certifications",
  },
  { icon: MapPin, value: "Pan-India", label: "Delivery model" },
  { icon: Star, value: "4.9 / 5", label: "Client rating" },
];

const PILLARS = [
  { icon: Zap, label: "Fast Turnaround", value: "48 hrs avg" },
  { icon: Shield, label: "100% Compliant", value: "Zero rejections" },
  { icon: Clock, label: "On-Time Guarantee", value: "Always on time" },
  { icon: Star, label: "Top Rated", value: "4.9 / 5 stars" },
];

/* ─── Floating orb ─── */
function Orb({ x, y, size, color, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], x: [0, 7, 0] }}
      transition={{
        duration: 9 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="absolute pointer-events-none rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(2px)",
      }}
    />
  );
}

/* ─── Step Card ─── */
function StepCard({ step, index, total }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -48 : 48 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex gap-0 items-stretch relative"
    >
      {/* Left: number + connector */}
      <div className="flex flex-col items-center w-14 sm:w-16 shrink-0">
        <motion.div
          animate={
            hovered
              ? { scale: 1.15, boxShadow: `0 0 28px ${step.glow}` }
              : { scale: 1, boxShadow: "none" }
          }
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 relative"
          style={{
            width: 50,
            height: 50,
            background: hovered ? step.color : "#1a1a1a",
            border: `2px solid ${hovered ? step.color : "rgba(255,255,255,0.1)"}`,
            color: hovered ? "#0B0B0B" : step.color,
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            transition: "background 0.3s, color 0.3s",
          }}
        >
          {step.number}
        </motion.div>

        {!isLast && (
          <div
            className="flex-1 w-0.5 mt-1.5 mb-1.5 relative"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${step.color}99, transparent)`,
                transformOrigin: "top",
              }}
            />
          </div>
        )}
      </div>

      {/* Right: Card */}
      <motion.div
        animate={{
          borderColor: hovered ? step.color + "55" : "rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? `0 4px 40px ${step.glow}, 0 2px 16px rgba(0,0,0,0.4)`
            : "0 2px 12px rgba(0,0,0,0.25)",
        }}
        transition={{ duration: 0.3 }}
        className="flex-1 ml-4 sm:ml-6 rounded-2xl p-6 sm:p-7 relative overflow-hidden"
        style={{
          marginBottom: isLast ? 0 : 28,
          background: "linear-gradient(145deg, #161616, #111)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Glow overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 0%, ${step.glow}, transparent 60%)`,
          }}
        />

        {/* Step label + duration */}
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: step.color }}
          >
            Step {step.number}
          </span>
          <div
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
            style={{
              background: step.color + "14",
              border: `1px solid ${step.color}33`,
              color: step.color,
            }}
          >
            <Clock size={10} color={step.color} />
            {step.duration}
          </div>
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={
              hovered ? { scale: 1.12, rotate: -8 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            className="rounded-xl p-2.5 flex items-center justify-center shrink-0"
            style={{
              background: hovered ? step.color + "28" : step.color + "14",
              transition: "background 0.3s",
            }}
          >
            <Icon size={22} color={step.color} strokeWidth={1.8} />
          </motion.div>
          <div>
            <p
              className="text-xs font-semibold mb-0.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {step.subtitle}
            </p>
            <h3
              className="text-lg sm:text-xl font-extrabold leading-tight"
              style={{ color: "#f0f0f0" }}
            >
              {step.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#777" }}>
          {step.description}
        </p>

        {/* Divider */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="h-px mb-4"
          style={{
            background: `linear-gradient(90deg, ${step.color}66, transparent)`,
            transformOrigin: "left",
          }}
        />

        {/* Checkpoints */}
        <div className="flex flex-col gap-2">
          {step.checkpoints.map((cp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex items-start gap-2 text-xs sm:text-sm"
              style={{ color: "#aaa" }}
            >
              <CheckCircle2
                size={13}
                color={step.color}
                strokeWidth={2.5}
                className="shrink-0 mt-0.5"
              />
              {cp}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN ─── */
export default function Process() {
  const stepsRef = useRef(null);
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "#0B0B0B",
        color: "#fff",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Background orbs */}
      <Orb x="0%" y="4%" size={340} color="rgba(250,204,21,0.07)" delay={0} />
      <Orb x="68%" y="18%" size={280} color="rgba(96,165,250,0.06)" delay={2} />
      <Orb x="25%" y="58%" size={320} color="rgba(52,211,153,0.05)" delay={1} />
      <Orb
        x="78%"
        y="74%"
        size={240}
        color="rgba(167,139,250,0.05)"
        delay={3}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Diagonal accent */}
      <div
        className="absolute top-0 pointer-events-none"
        style={{
          right: "22%",
          width: 1,
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent, rgba(250,204,21,0.05) 40%, transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto px-5 sm:px-6 relative">
        {/* ─── HERO ─── */}
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-5 text-xs font-bold tracking-widest uppercase"
            style={{
              background: "rgba(250,204,21,0.1)",
              border: "1px solid rgba(250,204,21,0.3)",
              color: "#facc15",
            }}
          >
            <Sparkles size={11} color="#facc15" />
            How We Work
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black leading-none mb-4 tracking-tight"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Six simple steps,{" "}
            <span
              style={{
                color: "#facc15",
                textShadow: "0 0 48px rgba(250,204,21,0.3)",
              }}
            >
              zero black boxes
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base leading-relaxed mb-8 mx-auto max-w-lg"
            style={{ color: "#777" }}
          >
            Built for Indian startups and MSMEs: know what happens before
            filings, during execution, and after handover — with documentation
            you can show to a bank, auditor, or investor without rewriting the
            story.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 36px rgba(250,204,21,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm cursor-pointer border-none"
                style={{
                  background: "linear-gradient(135deg, #facc15, #f59e0b)",
                  color: "#0B0B0B",
                  boxShadow: "0 4px 20px rgba(250,204,21,0.22)",
                }}
              >
                Start with a call
                <ArrowRight size={14} />
              </motion.button>
            </Link>
            <motion.button
              onClick={() => {
                stepsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(250,204,21,0.4)",
                color: "#facc15",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer"
              style={{
                background: "transparent",
                color: "#999",
                border: "1px solid rgba(255,255,255,0.14)",
                transition: "all 0.2s",
              }}
            >
              Review your journey
              <ChevronRight size={14} />
            </motion.button>
          </motion.div>

          {/* Pillars strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, borderColor: "rgba(250,204,21,0.4)" }}
                  className="flex items-center gap-2 rounded-xl px-4 py-2"
                  style={{
                    background: "#161616",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transition: "border-color 0.2s",
                  }}
                >
                  <Icon size={13} color="#facc15" strokeWidth={2} />
                  <span className="text-xs" style={{ color: "#aaa" }}>
                    {p.label}
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#facc15" }}
                  >
                    {p.value}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ─── Section label ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            The flow
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-lg sm:text-xl font-bold mb-10"
          style={{ color: "#e0e0e0" }}
        >
          From first call to ongoing support — a seamless journey
        </motion.p>

        {/* ─── STEPS ─── */}
        <div ref={stepsRef} className="mb-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <StepCard step={step} index={i} total={STEPS.length} />
            </motion.div>
          ))}
        </div>

        {/* ─── STATS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14"
        >
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4, borderColor: "rgba(250,204,21,0.3)" }}
                className="rounded-2xl p-4 text-center"
                style={{
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <Icon
                  size={16}
                  color="#facc15"
                  className="mx-auto mb-2"
                  strokeWidth={2}
                />
                <div
                  className="text-lg sm:text-2xl font-black mb-0.5"
                  style={{ color: "#facc15" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs leading-tight"
                  style={{ color: "#666" }}
                >
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── BOTTOM CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(250,204,21,0.09), rgba(250,204,21,0.02) 60%, transparent)",
            border: "1px solid rgba(250,204,21,0.2)",
            padding: "clamp(1.75rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)",
          }}
        >
          {/* Spinning ring accents */}
          {[180, 100].map((size, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 20 + i * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute pointer-events-none rounded-full"
              style={{
                top: -(size / 2),
                right: -(size / 2),
                width: size,
                height: size,
                border: "1px solid rgba(250,204,21,0.08)",
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 mb-4 text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(250,204,21,0.12)",
              border: "1px solid rgba(250,204,21,0.3)",
              color: "#facc15",
            }}
          >
            <Star size={11} color="#facc15" fill="#facc15" />
            Get Started Today
          </motion.div>

          <h2
            className="font-extrabold mb-3"
            style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)" }}
          >
            Tell us where you are stuck
          </h2>
          <p
            className="text-sm leading-relaxed max-w-md mx-auto mb-7"
            style={{ color: "#888" }}
          >
            Portal errors, branch returns, DPIIT RTR, thin DPR — we have seen
            the patterns. One diagnostic call to align the right phase and
            pillar.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href={"/contact"}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 36px rgba(250,204,21,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-none cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #facc15, #f59e0b)",
                  color: "#0B0B0B",
                  boxShadow: "0 4px 20px rgba(250,204,21,0.22)",
                }}
              >
                Schedule your call
                <ArrowRight size={14} />
              </motion.button>
            </Link>

            <Link href={"/faq"}>
              <motion.button
                whileHover={{
                  scale: 1.04,
                  borderColor: "rgba(250,204,21,0.4)",
                  color: "#facc15",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm cursor-pointer"
                style={{
                  background: "transparent",
                  color: "#999",
                  border: "1px solid rgba(255,255,255,0.14)",
                  transition: "all 0.2s",
                }}
              >
                Scheme & process FAQs
                <ChevronRight size={14} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
