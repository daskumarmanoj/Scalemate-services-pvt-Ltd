/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  ShoppingBag,
  Utensils,
  Laptop,
  Truck,
  HeartPulse,
} from "lucide-react";

/* ─── TESTIMONIALS DATA ─── */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Founder, TechNova Solutions",
    location: "Bengaluru",
    avatar: "AM",
    avatarBg: "#facc15",
    avatarText: "#0B0B0B",
    rating: 5,
    service: "Company Registration",
    icon: Laptop,
    iconColor: "#60a5fa",
    review:
      "Scalemate made registering my Pvt Ltd company incredibly seamless. Within 7 days I had my certificate in hand. Their team guided me through every step — I had zero legal knowledge going in, and they made it feel effortless.",
    highlight: "Registered in 7 days",
    featured: true,
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Co-Founder, Spice Route Foods",
    location: "Kochi",
    avatar: "PN",
    avatarBg: "#f472b6",
    avatarText: "#fff",
    rating: 5,
    service: "FSSAI & Import Export",
    icon: Utensils,
    iconColor: "#34d399",
    review:
      "Getting our FSSAI license and IEC code done together was a breeze with Scalemate. They tracked everything in real time and never let a deadline slip. Truly a professional team that understands what food businesses need.",
    highlight: "Both licenses in 10 days",
    featured: true,
  },
  {
    id: 3,
    name: "Rohan Desai",
    role: "MD, Desai Logistics",
    location: "Pune",
    avatar: "RD",
    avatarBg: "#60a5fa",
    avatarText: "#fff",
    rating: 5,
    service: "Business Consulting",
    icon: Truck,
    iconColor: "#fb923c",
    review:
      "We were stuck in a legal mess with our old partnership structure. Scalemate's consulting team restructured our business into an LLP in under 3 weeks. Saved us lakhs in taxes and potential disputes.",
    highlight: "Restructured in 3 weeks",
    featured: true,
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Owner, Luxe Boutique",
    location: "Mumbai",
    avatar: "SK",
    avatarBg: "#a78bfa",
    avatarText: "#fff",
    rating: 5,
    service: "Trademark Registration",
    icon: ShoppingBag,
    iconColor: "#a78bfa",
    review:
      "Someone was copying my brand name! Scalemate filed a trademark for my boutique within 48 hours and also helped with the cease & desist. They're more than a compliance firm — they genuinely protect your business.",
    highlight: "Trademark filed in 48hrs",
    featured: false,
  },
  {
    id: 5,
    name: "Vikram Rao",
    role: "CEO, BuildRight Infra",
    location: "Hyderabad",
    avatar: "VR",
    avatarBg: "#34d399",
    avatarText: "#0B0B0B",
    rating: 5,
    service: "MSME & Funding",
    icon: Building2,
    iconColor: "#facc15",
    review:
      "Scalemate got us MSME registration and connected us with a government subsidy scheme I didn't even know existed. We received ₹18 lakh in subsidy. Their knowledge of government schemes is unmatched.",
    highlight: "₹18L subsidy unlocked",
    featured: false,
  },
  {
    id: 6,
    name: "Dr. Ananya Bose",
    role: "Director, CareFirst Clinics",
    location: "Kolkata",
    avatar: "AB",
    avatarBg: "#fb923c",
    avatarText: "#fff",
    rating: 5,
    service: "HR & Payroll",
    icon: HeartPulse,
    iconColor: "#f472b6",
    review:
      "Managing payroll for 40+ staff across 3 clinic branches was a nightmare. Scalemate set up a completely automated payroll system with PF/ESI compliance. Now everything runs like clockwork every month.",
    highlight: "40+ staff automated",
    featured: false,
  },
  {
    id: 7,
    name: "Kiran Shetty",
    role: "Founder, GreenLeaf Organic",
    location: "Mangalore",
    avatar: "KS",
    avatarBg: "#2dd4bf",
    avatarText: "#0B0B0B",
    rating: 5,
    service: "GST & Accounting",
    icon: Truck,
    iconColor: "#2dd4bf",
    review:
      "Filing GST returns used to take us 2 days every month. After Scalemate took over our accounting, it's completely off our plate. Accurate, on time, every time. Best investment we made for our small business.",
    highlight: "GST fully automated",
    featured: false,
  },
  {
    id: 8,
    name: "Meera Joshi",
    role: "Partner, Joshi & Associates",
    location: "Ahmedabad",
    avatar: "MJ",
    avatarBg: "#e879f9",
    avatarText: "#fff",
    rating: 5,
    service: "LLP Registration",
    icon: Building2,
    iconColor: "#e879f9",
    review:
      "We converted our old partnership firm to an LLP with Scalemate's help. The entire process, documentation, and MCA filing was handled flawlessly. Extremely responsive team — replied to every query within the hour.",
    highlight: "LLP done in 8 days",
    featured: false,
  },
];

const STATS = [
  { value: "5,000+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "98%", label: "Would Recommend" },
  { value: "10+", label: "Years of Trust" },
];

/* ─── Star Rating ─── */
function Stars({ count = 5, size = 13 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} color="#facc15" fill="#facc15" />
      ))}
    </div>
  );
}

/* ─── Avatar Circle ─── */
function Avatar({ initials, bg, textColor, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: textColor,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: size * 0.32, flexShrink: 0,
      letterSpacing: "0.02em",
    }}>
      {initials}
    </div>
  );
}

/* ─── Featured Card ─── */
function FeaturedCard({ t, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = t.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "linear-gradient(145deg,#181818,#111)",
        border: `1px solid ${hovered ? "rgba(250,204,21,0.4)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 24, padding: "2rem",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 0 40px rgba(250,204,21,0.12), 0 8px 40px rgba(0,0,0,0.5)"
          : "0 2px 16px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-6px)" : "none",
      }}
    >
      {/* Glow sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 20% 0%, rgba(250,204,21,0.08), transparent 65%)",
        }}
      />

      {/* Service badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: t.iconColor + "18", border: `1px solid ${t.iconColor}33`,
        borderRadius: 99, padding: "4px 12px", marginBottom: "1.25rem",
        fontSize: 11, fontWeight: 700, color: t.iconColor,
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        <Icon size={11} color={t.iconColor} strokeWidth={2.5} />
        {t.service}
      </div>

      {/* Quote icon */}
      <Quote
        size={28} color="rgba(250,204,21,0.15)"
        style={{ position: "absolute", top: 20, right: 20 }}
      />

      {/* Stars */}
      <Stars size={14} />

      {/* Review text */}
      <p style={{
        color: "#c8c8c8", fontSize: 14.5, lineHeight: 1.75,
        margin: "1rem 0 1.5rem", fontStyle: "italic",
        position: "relative",
      }}>
        "{t.review}"
      </p>

      {/* Highlight pill */}
      <motion.div
        animate={hovered ? { scale: 1.04 } : { scale: 1 }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.25)",
          borderRadius: 99, padding: "4px 12px", marginBottom: "1.25rem",
          fontSize: 11.5, fontWeight: 700, color: "#facc15",
        }}
      >
        <TrendingUp size={11} color="#facc15" />
        {t.highlight}
      </motion.div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "1rem 0" }} />

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar initials={t.avatar} bg={t.avatarBg} textColor={t.avatarText} size={44} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#f0f0f0" }}>{t.name}</span>
            <BadgeCheck size={14} color="#facc15" />
          </div>
          <div style={{ fontSize: 12, color: "#777", marginTop: 1 }}>{t.role}</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>📍 {t.location}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Marquee Row ─── */
function MarqueeRow({ items, direction = 1, speed = 35 }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 16, width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <MarqueeCard key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

function MarqueeCard({ t }) {
  const Icon = t.icon;
  return (
    <div style={{
      width: 300, flexShrink: 0,
      background: "#141414",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 18, padding: "1.25rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <Stars size={12} />
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          fontSize: 10, fontWeight: 700, color: t.iconColor,
          background: t.iconColor + "15", padding: "3px 8px",
          borderRadius: 99, border: `1px solid ${t.iconColor}25`,
        }}>
          <Icon size={9} color={t.iconColor} strokeWidth={2.5} />
          {t.service}
        </div>
      </div>
      <p style={{ color: "#999", fontSize: 12.5, lineHeight: 1.65, marginBottom: 12, fontStyle: "italic" }}>
"{t.review.slice(0, 110)}…"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar initials={t.avatar} bg={t.avatarBg} textColor={t.avatarText} size={32} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#e0e0e0" }}>{t.name}</div>
          <div style={{ fontSize: 10.5, color: "#666" }}>{t.location}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Slider (non-featured) ─── */
function SliderSection() {
  const nonFeatured = TESTIMONIALS.filter((t) => !t.featured);
  const [active, setActive] = useState(0);
  const total = nonFeatured.length;

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = nonFeatured[active];
  const Icon = t.icon;

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            background: "linear-gradient(145deg,#171717,#111)",
            border: "1px solid rgba(250,204,21,0.15)",
            borderRadius: 24, padding: "2.25rem",
            position: "relative", overflow: "hidden",
            boxShadow: "0 0 40px rgba(250,204,21,0.06)",
          }}
        >
          {/* Bg glow */}
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 240, height: 240, borderRadius: "50%",
            background: `radial-gradient(circle, ${t.iconColor}12, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <Quote size={36} color="rgba(250,204,21,0.1)" style={{ marginBottom: "1rem" }} />

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: t.iconColor + "18", border: `1px solid ${t.iconColor}33`,
            borderRadius: 99, padding: "4px 12px", marginBottom: "1rem",
            fontSize: 11, fontWeight: 700, color: t.iconColor, textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            <Icon size={10} color={t.iconColor} />
            {t.service}
          </div>

          <Stars size={15} />

          <p style={{
            color: "#c5c5c5", fontSize: 16, lineHeight: 1.8,
            margin: "1.1rem 0 1.5rem", fontStyle: "italic",
          }}>
            "{t.review}"
          </p>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.2)",
            borderRadius: 99, padding: "4px 12px", marginBottom: "1.5rem",
            fontSize: 11.5, fontWeight: 700, color: "#facc15",
          }}>
            <TrendingUp size={11} color="#facc15" />
            {t.highlight}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "1.25rem" }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={t.avatar} bg={t.avatarBg} textColor={t.avatarText} size={48} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#f0f0f0" }}>{t.name}</span>
                  <BadgeCheck size={14} color="#facc15" />
                </div>
                <div style={{ fontSize: 12.5, color: "#777" }}>{t.role}</div>
                <div style={{ fontSize: 11.5, color: "#555" }}>📍 {t.location}</div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
              {nonFeatured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 22 : 7,
                    height: 7, borderRadius: 99, border: "none", cursor: "pointer",
                    background: i === active ? "#facc15" : "rgba(255,255,255,0.15)",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
        {[{ fn: prev, Icon: ArrowLeft }, { fn: next, Icon: ArrowRight }].map(({ fn, Icon: Ic }, i) => (
          <motion.button
            key={i}
            onClick={fn}
            whileHover={{ scale: 1.1, borderColor: "rgba(250,204,21,0.5)" }}
            whileTap={{ scale: 0.93 }}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#161616", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "border-color 0.2s",
            }}
          >
            <Ic size={16} color="#facc15" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─── Orb ─── */
function Orb({ x, y, size, color, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], x: [0, 7, 0] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute", left: x, top: y, width: size, height: size,
        borderRadius: "50%", background: `radial-gradient(circle, ${color}, transparent 70%)`,
        pointerEvents: "none", filter: "blur(1px)",
      }}
    />
  );
}

/* ─── MAIN ─── */
export default function Testimonials() {
  const featured = TESTIMONIALS.filter((t) => t.featured);
  const all = TESTIMONIALS;
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div style={{
      minHeight: "100vh", background: "#0B0B0B", color: "#fff",
      paddingTop: "6rem", paddingBottom: "5rem",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Orbs */}
      <Orb x="0%" y="5%" size={380} color="rgba(250,204,21,0.07)" delay={0} />
      <Orb x="70%" y="10%" size={280} color="rgba(96,165,250,0.06)" delay={2} />
      <Orb x="40%" y="55%" size={320} color="rgba(167,139,250,0.05)" delay={1.5} />
      <Orb x="5%" y="75%" size={220} color="rgba(52,211,153,0.05)" delay={3} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.25rem", position: "relative" }}>

        {/* ─── HERO ─── */}
        <div ref={heroRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, ease: "backOut" }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.3)",
              borderRadius: 99, padding: "5px 16px", marginBottom: "1.25rem",
              fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em",
              color: "#facc15", textTransform: "uppercase",
            }}
          >
            <Sparkles size={12} color="#facc15" />
            Real Stories · Real Results
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: "1rem", letterSpacing: "-0.02em" }}
          >
            Businesses That{" "}
            <span style={{ color: "#facc15", textShadow: "0 0 48px rgba(250,204,21,0.35)" }}>
              Trust Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{ color: "#777", fontSize: 15, maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.75 }}
          >
            Over 5,000 entrepreneurs, startups, and MSMEs have grown their businesses with Scalemate. Here's what they say.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, borderColor: "rgba(250,204,21,0.4)" }}
                style={{
                  background: "#161616", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14, padding: "10px 22px", textAlign: "center",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, color: "#facc15" }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: "#666", marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ─── FEATURED CARDS ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "1.75rem" }}
        >
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 800 }}>
            Featured <span style={{ color: "#facc15" }}>Reviews</span>
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18, marginBottom: "4rem",
        }}>
          {featured.map((t, i) => <FeaturedCard key={t.id} t={t} index={i} />)}
        </div>

        {/* ─── MARQUEE ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 800 }}>
              What Everyone's <span style={{ color: "#facc15" }}>Saying</span>
            </h2>
            <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Continuously scrolling — all real clients</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <MarqueeRow items={all} direction={1} speed={40} />
            <MarqueeRow items={[...all].reverse()} direction={-1} speed={35} />
          </div>
        </motion.div>

        {/* ─── SLIDER ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 800 }}>
              More Success <span style={{ color: "#facc15" }}>Stories</span>
            </h2>
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <SliderSection />
          </div>
        </motion.div>

        {/* ─── BOTTOM CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(250,204,21,0.09), rgba(250,204,21,0.02) 60%, transparent)",
            border: "1px solid rgba(250,204,21,0.2)", borderRadius: 24,
            padding: "clamp(2rem, 4vw, 3.5rem)", textAlign: "center",
          }}
        >
          {[180, 100].map((sz, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 22 + i * 8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", top: -(sz / 2), right: -(sz / 2),
                width: sz, height: sz, borderRadius: "50%",
                border: "1px solid rgba(250,204,21,0.07)", pointerEvents: "none",
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.7 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.3)",
              borderRadius: 99, padding: "4px 14px", marginBottom: "1rem",
              fontSize: 11, fontWeight: 700, color: "#facc15", textTransform: "uppercase", letterSpacing: "0.1em",
            }}
          >
            <Star size={11} color="#facc15" fill="#facc15" />
            Join 5,000+ Happy Clients
          </motion.div>

          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Your Success Story Starts Here
          </h2>
          <p style={{ color: "#888", fontSize: 14, maxWidth: 420, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Book a free consultation and let's write your Scalemate story together.
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
              Get Free Consultation
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
              <Shield size={14} />
              View All Services
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}