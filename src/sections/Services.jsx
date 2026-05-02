/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Briefcase, FileText, Landmark, TrendingUp, Shield, Users,
  CheckCircle2, Globe, DollarSign, BookOpen, BarChart3, Rocket,
  ArrowRight, Star, Zap, Award, HeartHandshake, Sparkles,
  BadgeCheck, ChevronRight, Phone,
} from "lucide-react";

const SERVICES = [
  {
    icon: Briefcase,
    title: "Company Registration",
    tag: "Most Popular",
    color: "#facc15",
    glow: "rgba(250,204,21,0.18)",
    description: "Complete assistance for Pvt Ltd, LLP, OPC, and Partnership registration with MCA compliance.",
    features: ["Private Limited Company", "Limited Liability Partnership", "One Person Company", "Name Approval & DSC"],
  },
  {
    icon: FileText,
    title: "Legal Compliance",
    tag: "Essential",
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    description: "End-to-end compliance management including ROC filings, annual returns, and statutory audits.",
    features: ["ROC Annual Filing", "Income Tax Returns", "GST Registration & Filing", "Trademark Registration"],
  },
  {
    icon: Landmark,
    title: "Funding & Loans",
    tag: "High Demand",
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.15)",
    description: "Expert guidance for startup funding, business loans, and government subsidy schemes.",
    features: ["Business Loan Assistance", "Startup Funding Support", "MSME Loans & Subsidies", "Investor Pitch Deck"],
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    tag: "Strategic",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.15)",
    description: "Strategic planning for business expansion, market entry, and digital transformation.",
    features: ["Business Plan Development", "Market Research & Analysis", "Digital Marketing Strategy", "Sales & Distribution"],
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    tag: "Protect",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    description: "Protect your brand and innovations with trademark, copyright, and patent registration.",
    features: ["Trademark Registration", "Copyright Protection", "Patent Filing", "Design Registration"],
  },
  {
    icon: Users,
    title: "HR & Payroll",
    tag: "Team",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.15)",
    description: "Complete HR solutions including payroll management, PF/ESI registration, and labor compliance.",
    features: ["Payroll Processing", "PF & ESI Registration", "Labor Law Compliance", "Employee Contracts"],
  },
  {
    icon: BookOpen,
    title: "Accounting Services",
    tag: "Finance",
    color: "#2dd4bf",
    glow: "rgba(45,212,191,0.15)",
    description: "Professional bookkeeping, financial reporting, and tax planning for growing businesses.",
    features: ["Bookkeeping & Accounting", "Financial Statements", "Tax Planning & Advisory", "MIS Reporting"],
  },
  {
    icon: BarChart3,
    title: "Business Consulting",
    tag: "Advisory",
    color: "#e879f9",
    glow: "rgba(232,121,249,0.15)",
    description: "Expert advisory for business restructuring, valuation, due diligence, and mergers.",
    features: ["Business Restructuring", "Valuation Services", "Due Diligence", "M&A Advisory"],
  },
  {
    icon: Globe,
    title: "Import Export",
    tag: "Global",
    color: "#f87171",
    glow: "rgba(248,113,113,0.15)",
    description: "Complete support for IEC license, FSSAI, customs clearance, and international trade.",
    features: ["IEC License", "FSSAI Registration", "Customs Documentation", "Export Compliance"],
  },
];

const WHY_US = [
  { icon: Award, title: "Expert Team", description: "Certified CAs, CS, and legal professionals with 10+ years experience" },
  { icon: Zap, title: "Fast Processing", description: "Quick turnaround with 100% online documentation and real-time tracking" },
  { icon: DollarSign, title: "Transparent Pricing", description: "Competitive rates with no hidden charges or surprise fees" },
  { icon: HeartHandshake, title: "Guaranteed Support", description: "Dedicated account manager and 24/7 customer support" },
];

const STATS = [
  { value: "5000+", label: "Businesses Served" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

/* ─── Animated counter ─── */
function Counter({ value }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(numeric)) { setDisplay(value); return; }
    const suffix = value.replace(/[\d]/g, "");
    let start = 0;
    const step = Math.ceil(numeric / 40);
    const timer = setInterval(() => {
      start = Math.min(start + step, numeric);
      setDisplay(start + suffix);
      if (start >= numeric) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

/* ─── Floating orb bg ─── */
function Orb({ x, y, size, color, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute", left: x, top: y,
        width: size, height: size, borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: "none", filter: "blur(2px)",
      }}
    />
  );
}

/* ─── Service Card ─── */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", background: "linear-gradient(145deg,#161616,#101010)",
        border: `1px solid ${hovered ? service.color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20, padding: "1.75rem", cursor: "pointer",
        overflow: "hidden", transition: "border-color 0.3s",
        boxShadow: hovered ? `0 0 32px ${service.glow}, 0 8px 32px rgba(0,0,0,0.5)` : "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Glow bg sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 30% 0%, ${service.glow}, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Tag pill */}
      <div style={{
        display: "inline-block", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 99,
        background: service.color + "22", color: service.color,
        border: `1px solid ${service.color}44`,
        marginBottom: "1rem", textTransform: "uppercase",
      }}>
        {service.tag}
      </div>

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        style={{
          display: "inline-flex", padding: 12, borderRadius: 14,
          background: service.color + "18", marginBottom: "1rem",
        }}
      >
        <Icon size={26} color={service.color} strokeWidth={1.8} />
      </motion.div>

      {/* Title */}
      <motion.h3
        animate={{ color: hovered ? service.color : "#e5e5e5" }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: 16, fontWeight: 700, marginBottom: "0.5rem" }}
      >
        {service.title}
      </motion.h3>

      {/* Description */}
      <p style={{ color: "#777", fontSize: 13, lineHeight: 1.6, marginBottom: "1rem" }}>
        {service.description}
      </p>

      {/* Divider */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.35 }}
        style={{ height: 1, background: service.color + "44", marginBottom: "1rem", transformOrigin: "left" }}
      />

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
        {service.features.map((f, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.07 + i * 0.05 + 0.2 }}
            style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12.5, color: "#aaa" }}
          >
            <CheckCircle2 size={13} color={service.color} style={{ flexShrink: 0, marginTop: 2 }} />
            {f}
          </motion.li>
        ))}
      </ul>

      {/* Learn more */}
      <motion.div
        animate={{ gap: hovered ? 10 : 5 }}
        style={{ display: "flex", alignItems: "center", gap: 5, marginTop: "1.25rem" }}
      >
        <span style={{ fontSize: 12.5, fontWeight: 700, color: service.color }}>Learn More</span>
        <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400 }}>
          <ChevronRight size={14} color={service.color} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Why card ─── */
function WhyCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "backOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#131313",
        border: `1px solid ${hovered ? "rgba(250,204,21,0.35)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16, padding: "1.5rem",
        boxShadow: hovered ? "0 0 24px rgba(250,204,21,0.12)" : "none",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      <motion.div
        animate={hovered ? { rotate: [0, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        style={{
          display: "inline-flex", padding: 10, borderRadius: 12,
          background: hovered ? "rgba(250,204,21,0.18)" : "rgba(250,204,21,0.09)",
          marginBottom: "0.85rem", transition: "background 0.25s",
        }}
      >
        <Icon size={22} color="#facc15" strokeWidth={1.8} />
      </motion.div>
      <h3 style={{ color: "#e5e5e5", fontSize: 15, fontWeight: 700, marginBottom: "0.4rem" }}>{item.title}</h3>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6 }}>{item.description}</p>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh", background: "#0B0B0B", color: "#fff",
        paddingTop: "6rem", paddingBottom: "5rem",
        fontFamily: "'Inter', system-ui, sans-serif",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <Orb x="5%" y="8%" size={320} color="rgba(250,204,21,0.07)" delay={0} />
      <Orb x="75%" y="15%" size={260} color="rgba(96,165,250,0.06)" delay={1.5} />
      <Orb x="50%" y="55%" size={380} color="rgba(167,139,250,0.05)" delay={2.5} />
      <Orb x="10%" y="75%" size={220} color="rgba(52,211,153,0.06)" delay={1} />
      <Orb x="80%" y="80%" size={280} color="rgba(244,114,182,0.06)" delay={3} />

      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.25rem", position: "relative" }}>

        {/* ─── HERO ─── */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.3)",
              borderRadius: 99, padding: "5px 16px", marginBottom: "1.5rem",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#facc15",
              textTransform: "uppercase",
            }}
          >
            <Sparkles size={13} color="#facc15" />
            Trusted by 5000+ Businesses Across India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem" }}
          >
            Our{" "}
            <span style={{
              color: "#facc15",
              textShadow: "0 0 40px rgba(250,204,21,0.4)",
            }}>
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "#888", fontSize: 16, maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.7 }}
          >
            Comprehensive business solutions for startups, MSMEs, and entrepreneurs.
            From company registration to growth strategy — we've got you covered.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, borderColor: "rgba(250,204,21,0.45)" }}
                style={{
                  background: "#161616", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, padding: "10px 20px", textAlign: "center",
                  transition: "border-color 0.2s",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, color: "#facc15" }}>
                  <Counter value={s.value} />
                </div>
                <div style={{ fontSize: 11.5, color: "#666", marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── SERVICES GRID ─── */}
        <div style={{ marginBottom: "5rem" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
              What We <span style={{ color: "#facc15" }}>Offer</span>
            </h2>
            <p style={{ color: "#666", fontSize: 14 }}>9 comprehensive service areas for your business</p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
          }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* ─── WHY SCALEMATE ─── */}
        <div style={{ marginBottom: "5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
              Why Choose <span style={{ color: "#facc15" }}>Scalemate</span>?
            </h2>
            <p style={{ color: "#666", fontSize: 14 }}>Your trusted partner for business growth and compliance</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {WHY_US.map((item, i) => (
              <WhyCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ─── CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(250,204,21,0.1), rgba(250,204,21,0.03) 60%, transparent)",
            border: "1px solid rgba(250,204,21,0.22)",
            borderRadius: 28, padding: "clamp(2rem, 5vw, 4rem)",
            textAlign: "center",
          }}
        >
          {/* Animated corner accent */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              border: "1px solid rgba(250,204,21,0.1)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", top: -30, right: -30,
              width: 120, height: 120, borderRadius: "50%",
              border: "1px solid rgba(250,204,21,0.08)",
              pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              display: "inline-flex", padding: "10px 20px", borderRadius: 99,
              background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.3)",
              color: "#facc15", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: "1.25rem", alignItems: "center", gap: 6,
            }}
          >
            <Star size={12} color="#facc15" fill="#facc15" />
            Free Consultation Available
          </motion.div>

          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Ready to Scale Your Business?
          </h2>
          <p style={{ color: "#999", fontSize: 15, maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Book a free consultation with our experts and discover how we can help you achieve your business goals faster.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 40px rgba(250,204,21,0.45)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px",
                background: "linear-gradient(135deg, #facc15, #f59e0b)",
                color: "#0B0B0B", borderRadius: 99,
                fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(250,204,21,0.25)",
                transition: "box-shadow 0.25s",
              }}
            >
              Book Free Consultation
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(250,204,21,0.5)", color: "#facc15" }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px",
                background: "transparent",
                color: "#bbb", borderRadius: 99,
                fontWeight: 600, fontSize: 14,
                border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Phone size={15} />
              Talk to an Expert
            </motion.button>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: "2rem", flexWrap: "wrap" }}
          >
            {["MCA Registered", "ISO Certified", "100% Secure"].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#666" }}>
                <BadgeCheck size={14} color="#facc15" />
                {b}
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}