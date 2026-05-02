"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  PhoneCall,
  ClipboardList,
  FileSearch,
  FilePen,
  Rocket,
  HeadphonesIcon,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";

/* ─── DATA ─── */
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
    checkpoints: ["Business needs analysis", "Goal identification", "Initial roadmap discussion"],
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
    checkpoints: ["Document checklist shared", "KYC & verification", "Custom plan created"],
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
    checkpoints: ["Legal compliance check", "Document verification", "Expert sign-off"],
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
    checkpoints: ["Government portal filing", "Real-time status updates", "Follow-up & tracking"],
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
    checkpoints: ["Certificates delivered", "Complete documentation", "Onboarding walkthrough"],
  },
  {
    number: "06",
    icon: HeadphonesIcon,
    title: "Ongoing Support",
    subtitle: "We Stay With You",
    description:
      "Our relationship doesn't end at delivery. Get dedicated account management, compliance reminders, and expert support whenever you need it.",
    duration: "Always On",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.2)",
    checkpoints: ["Dedicated account manager", "Compliance reminders", "24/7 support access"],
  },
];

const PILLARS = [
  { icon: Zap, label: "Fast Turnaround", value: "48hrs avg" },
  { icon: Shield, label: "100% Compliant", value: "Zero rejections" },
  { icon: Clock, label: "Always On Time", value: "On-time guarantee" },
  { icon: Star, label: "Top Rated", value: "4.9 / 5 stars" },
];

/* ─── Floating orb ─── */
function Orb({ x, y, size, color, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute", left: x, top: y,
        width: size, height: size, borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        pointerEvents: "none", filter: "blur(1px)",
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
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 0, alignItems: "stretch", position: "relative" }}
    >
      {/* Left: Number + Line */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        width: 64, flexShrink: 0,
      }}>
        {/* Number bubble */}
        <motion.div
          animate={hovered
            ? { scale: 1.15, boxShadow: `0 0 28px ${step.glow}` }
            : { scale: 1, boxShadow: "0 0 0px transparent" }
          }
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: hovered ? step.color : "#1a1a1a",
            border: `2px solid ${hovered ? step.color : "rgba(255,255,255,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'DM Mono', monospace",
            fontSize: 13, fontWeight: 700, flexShrink: 0,
            color: hovered ? "#0B0B0B" : step.color,
            transition: "background 0.3s, color 0.3s",
            zIndex: 2, position: "relative",
          }}
        >
          {step.number}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <div style={{ flex: 1, width: 2, background: "rgba(255,255,255,0.06)", marginTop: 6, marginBottom: 6, position: "relative" }}>
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              style={{
                position: "absolute", inset: 0,
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
          boxShadow: hovered ? `0 4px 40px ${step.glow}, 0 2px 16px rgba(0,0,0,0.4)` : "0 2px 12px rgba(0,0,0,0.25)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          flex: 1, marginLeft: 20, marginBottom: isLast ? 0 : 28,
          background: "linear-gradient(145deg, #161616, #111)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20, padding: "1.6rem 1.75rem",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Glow sweep */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 20% 0%, ${step.glow}, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.div
              animate={hovered ? { scale: 1.12, rotate: -8 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              style={{
                padding: 10, borderRadius: 12,
                background: hovered ? step.color + "28" : step.color + "14",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s",
              }}
            >
              <Icon size={22} color={step.color} strokeWidth={1.8} />
            </motion.div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: step.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                {step.subtitle}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f0f0f0", lineHeight: 1.1 }}>
                {step.title}
              </h3>
            </div>
          </div>

          {/* Duration badge */}
          <div style={{
            flexShrink: 0, padding: "5px 12px", borderRadius: 99,
            background: step.color + "14", border: `1px solid ${step.color}33`,
            fontSize: 11, fontWeight: 700, color: step.color,
            whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4,
          }}>
            <Clock size={10} color={step.color} />
            {step.duration}
          </div>
        </div>

        {/* Description */}
        <p style={{ color: "#777", fontSize: 13.5, lineHeight: 1.7, marginBottom: "1.1rem" }}>
          {step.description}
        </p>

        {/* Animated divider */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            height: 1, background: `linear-gradient(90deg, ${step.color}66, transparent)`,
            marginBottom: "1rem", transformOrigin: "left",
          }}
        />

        {/* Checkpoints */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {step.checkpoints.map((cp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#aaa" }}
            >
              <CheckCircle2 size={12} color={step.color} strokeWidth={2.5} />
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
  return (
    <div style={{
      minHeight: "100vh", background: "#0B0B0B", color: "#fff",
      paddingTop: "6rem", paddingBottom: "5rem",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background orbs */}
      <Orb x="0%" y="5%" size={340} color="rgba(250,204,21,0.07)" delay={0} />
      <Orb x="70%" y="20%" size={280} color="rgba(96,165,250,0.06)" delay={2} />
      <Orb x="30%" y="60%" size={320} color="rgba(167,139,250,0.05)" delay={1} />
      <Orb x="80%" y="75%" size={240} color="rgba(52,211,153,0.06)" delay={3} />

      {/* Dot grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Diagonal accent line */}
      <div style={{
        position: "absolute", top: 0, right: "20%",
        width: 1, height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(250,204,21,0.06) 40%, transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1.25rem", position: "relative" }}>

        {/* ─── HERO ─── */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.3)",
              borderRadius: 99, padding: "5px 16px", marginBottom: "1.5rem",
              fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em",
              color: "#facc15", textTransform: "uppercase",
            }}
          >
            <Sparkles size={12} color="#facc15" />
            Simple · Transparent · Reliable
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1rem", letterSpacing: "-0.02em" }}
          >
            How We{" "}
            <span style={{ color: "#facc15", textShadow: "0 0 48px rgba(250,204,21,0.35)" }}>
              Work
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "#777", fontSize: 15, maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.75 }}
          >
            From your first call to ongoing compliance support — our 6-step process is designed for zero stress and maximum speed.
          </motion.p>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}
          >
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, borderColor: "rgba(250,204,21,0.4)" }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#161616", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12, padding: "8px 16px", transition: "border-color 0.2s",
                  }}
                >
                  <Icon size={14} color="#facc15" strokeWidth={2} />
                  <span style={{ fontSize: 12, color: "#aaa" }}>{p.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#facc15" }}>{p.value}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ─── STEPS ─── */}
        <div style={{ marginBottom: "4.5rem" }}>
          {STEPS.map((step, i) => (
            <StepCard key={i} step={step} index={i} total={STEPS.length} />
          ))}
        </div>

        {/* ─── BOTTOM CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(250,204,21,0.09), rgba(250,204,21,0.02) 60%, transparent)",
            border: "1px solid rgba(250,204,21,0.2)",
            borderRadius: 24, padding: "clamp(1.75rem, 4vw, 3rem)",
            textAlign: "center",
          }}
        >
          {/* Spinning ring accents */}
          {[180, 100].map((size, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", top: -(size / 2), right: -(size / 2),
                width: size, height: size, borderRadius: "50%",
                border: "1px solid rgba(250,204,21,0.08)",
                pointerEvents: "none",
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.3)",
              borderRadius: 99, padding: "4px 14px", marginBottom: "1rem",
              fontSize: 11, fontWeight: 700, color: "#facc15", textTransform: "uppercase", letterSpacing: "0.1em",
            }}
          >
            <Star size={11} color="#facc15" fill="#facc15" />
            Get Started Today
          </motion.div>

          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Ready to Begin Your Journey?
          </h2>
          <p style={{ color: "#888", fontSize: 14, maxWidth: 420, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Start with a free consultation. No commitments, no hidden fees — just expert guidance from day one.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 36px rgba(250,204,21,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 30px",
                background: "linear-gradient(135deg, #facc15, #f59e0b)",
                color: "#0B0B0B", borderRadius: 99,
                fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(250,204,21,0.22)",
              }}
            >
              Start Your Process
              <ArrowRight size={15} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, borderColor: "rgba(250,204,21,0.4)", color: "#facc15" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "13px 26px",
                background: "transparent", color: "#999",
                borderRadius: 99, fontSize: 14, fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.14)", cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              View All Services
              <ChevronRight size={15} />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}