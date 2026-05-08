/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  User,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Star,
  Shield,
  Zap,
  HeadphonesIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   🔧 CONFIGURATION — update these two values
──────────────────────────────────────────────*/
const WHATSAPP_NUMBER = "916371287364"; // Your WhatsApp number with country code (no +)
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // Your Apps Script Web App URL

/* ─── OPTIONS ─── */
const SERVICES = [
  "Company Registration",
  "Legal Compliance",
  "Funding & Loans",
  "Growth Strategy",
  "Intellectual Property",
  "HR & Payroll",
  "Accounting Services",
  "Business Consulting",
  "Import Export",
  "Other",
];

const BUDGETS = [
  "Below ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹50,000",
  "₹50,000+",
  "Let's discuss",
];

const INFO_CARDS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 97779 15737",
    sub: "Mon–Sat, 9am–7pm",
    color: "#facc15",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "scalemateservices25@gmail.com",
    sub: "Reply within 2 hours",
    color: "#60a5fa",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Bengaluru, Karnataka",
    sub: "India — Pan India services",
    color: "#34d399",
  },
  {
    icon: Clock,
    label: "Support",
    value: "24/7 Available",
    sub: "Always here for you",
    color: "#f472b6",
  },
];

const TRUST = [
  { icon: Star, text: "4.9/5 Rating" },
  { icon: Shield, text: "100% Secure" },
  { icon: Zap, text: "Fast Response" },
  { icon: HeadphonesIcon, text: "24/7 Support" },
];

/* ─── Floating Orb ─── */
function Orb({ x, y, size, color, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute", left: x, top: y,
        width: size, height: size, borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        pointerEvents: "none", filter: "blur(2px)",
      }}
    />
  );
}

/* ─── Styled Input ─── */
function Field({ label, icon: Icon, error, children, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#aaa", letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
        {Icon && <Icon size={11} color="#facc15" />}
        {label} {required && <span style={{ color: "#facc15" }}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: 11.5, color: "#f87171", margin: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = (focused, error) => ({
  width: "100%",
  background: "#111",
  border: `1px solid ${error ? "#f87171" : focused ? "rgba(250,204,21,0.5)" : "rgba(255,255,255,0.1)"}`,
  borderRadius: 12,
  padding: "12px 14px",
  color: "#f0f0f0",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.25s, box-shadow 0.25s",
  boxShadow: focused && !error ? "0 0 0 3px rgba(250,204,21,0.08)" : "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
});

/* ─── MAIN COMPONENT ─── */
export default function Contact() {
  const formRef = useRef(null);
  const inView = useInView(formRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serviceOpen, setServiceOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim()) e.message = "Tell us about your business";
    return e;
  };

  /* ── Send to Google Sheets ── */
  const sendToSheets = async () => {
    const payload = new FormData();
    Object.entries(form).forEach(([k, v]) => payload.append(k, v));
    payload.append("timestamp", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));

    await fetch(GOOGLE_SHEET_URL, { method: "POST", body: payload });
  };

  /* ── Open WhatsApp ── */
  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Scalemate! 👋\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email || "N/A"}\n` +
      `*Service Needed:* ${form.service}\n` +
      `*Budget:* ${form.budget || "Not specified"}\n\n` +
      `*Message:*\n${form.message}\n\n` +
      `_Sent from Scalemate Contact Form_`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  /* ── Submit Handler ── */
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus("loading");

    try {
      // 1️⃣ Send to Google Sheets
      await sendToSheets();
      // 2️⃣ Open WhatsApp with pre-filled message
      openWhatsApp();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service: "", budget: "", message: "" });
    } catch {
      // Even if Sheets fails, open WhatsApp
      openWhatsApp();
      setStatus("success");
    }
  };

  const set = (k) => (v) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0B0B0B", color: "#fff",
      paddingTop: "6rem", paddingBottom: "5rem",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Orbs */}
      <Orb x="0%" y="5%" size={360} color="rgba(250,204,21,0.07)" delay={0} />
      <Orb x="65%" y="15%" size={280} color="rgba(96,165,250,0.06)" delay={2} />
      <Orb x="80%" y="70%" size={300} color="rgba(52,211,153,0.05)" delay={1.5} />
      <Orb x="5%" y="70%" size={220} color="rgba(244,114,182,0.06)" delay={3} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 1.25rem", position: "relative" }}>

        {/* ─── HERO ─── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
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
            Take the First Step — We Handle the Rest
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: "1rem", letterSpacing: "-0.02em" }}
          >
            Let's{" "}
            <span style={{ color: "#facc15", textShadow: "0 0 48px rgba(250,204,21,0.35)" }}>Connect</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: "#777", fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}
          >
            Fill the form below — your details go straight to our WhatsApp and our team will reach out within 30 minutes.
          </motion.p>
        </div>

        {/* ─── TRUST PILLS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginBottom: "3.5rem" }}
        >
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#161616", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 99, padding: "6px 14px",
                fontSize: 12, color: "#aaa",
              }}>
                <Icon size={13} color="#facc15" strokeWidth={2} />
                {t.text}
              </div>
            );
          })}
        </motion.div>

        {/* ─── MAIN GRID ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, alignItems: "start" }}>

          {/* ── FORM PANEL ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "linear-gradient(145deg, #161616, #101010)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, padding: "2.25rem",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Corner glow */}
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: 200, height: 200,
              background: "radial-gradient(circle at 0% 0%, rgba(250,204,21,0.07), transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: "0.35rem" }}>
                Send Us a Message
              </h2>
              <p style={{ fontSize: 13, color: "#666", marginBottom: "2rem" }}>
                Submitting will open WhatsApp with your details pre-filled ✓
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                {/* Name */}
                <Field label="Full Name" icon={User} error={errors.name} required>
                  <input
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    placeholder="Rahul Sharma"
                    style={inputStyle(focused === "name", errors.name)}
                  />
                </Field>

                {/* Phone */}
                <Field label="Phone Number" icon={Phone} error={errors.phone} required>
                  <input
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused("")}
                    placeholder="+91 97779 15737"
                    style={inputStyle(focused === "phone", errors.phone)}
                  />
                </Field>

                {/* Email */}
                <Field label="Email Address" icon={Mail} error={errors.email}>
                  <input
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    placeholder="rahul@company.com"
                    style={inputStyle(focused === "email", errors.email)}
                  />
                </Field>

                {/* Budget */}
                <Field label="Budget Range" icon={Briefcase} error={errors.budget}>
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => { setBudgetOpen((p) => !p); setServiceOpen(false); }}
                      style={{
                        ...inputStyle(budgetOpen, errors.budget),
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        cursor: "pointer", textAlign: "left",
                        color: form.budget ? "#f0f0f0" : "#555",
                      }}
                    >
                      {form.budget || "Select budget"}
                      <motion.div animate={{ rotate: budgetOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={15} color="#666" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {budgetOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                          style={{
                            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                            background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 12, overflow: "hidden", zIndex: 50,
                            boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
                            transformOrigin: "top",
                          }}
                        >
                          {BUDGETS.map((b) => (
                            <div
                              key={b}
                              onClick={() => { set("budget")(b); setBudgetOpen(false); }}
                              style={{
                                padding: "10px 14px", fontSize: 13.5, cursor: "pointer",
                                color: form.budget === b ? "#facc15" : "#ccc",
                                background: form.budget === b ? "rgba(250,204,21,0.08)" : "transparent",
                                transition: "background 0.15s",
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = form.budget === b ? "rgba(250,204,21,0.08)" : "transparent"}
                            >
                              {b}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Field>

                {/* Service — full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Service Required" icon={Briefcase} error={errors.service} required>
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => { setServiceOpen((p) => !p); setBudgetOpen(false); }}
                        style={{
                          ...inputStyle(serviceOpen, errors.service),
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          cursor: "pointer", textAlign: "left",
                          color: form.service ? "#f0f0f0" : "#555",
                        }}
                      >
                        {form.service || "Select a service"}
                        <motion.div animate={{ rotate: serviceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={15} color="#666" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {serviceOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            style={{
                              position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                              background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 12, overflow: "hidden", zIndex: 50,
                              boxShadow: "0 12px 36px rgba(0,0,0,0.6)",
                              display: "grid", gridTemplateColumns: "1fr 1fr",
                              transformOrigin: "top",
                            }}
                          >
                            {SERVICES.map((s) => (
                              <div
                                key={s}
                                onClick={() => { set("service")(s); setServiceOpen(false); }}
                                style={{
                                  padding: "10px 14px", fontSize: 13.5, cursor: "pointer",
                                  color: form.service === s ? "#facc15" : "#ccc",
                                  background: form.service === s ? "rgba(250,204,21,0.08)" : "transparent",
                                  transition: "background 0.15s",
                                  display: "flex", alignItems: "center", gap: 6,
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = form.service === s ? "rgba(250,204,21,0.08)" : "transparent"}
                              >
                                {form.service === s && <CheckCircle2 size={12} color="#facc15" />}
                                {s}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Field>
                </div>

                {/* Message — full width */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <Field label="Your Message" icon={MessageCircle} error={errors.message} required>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      placeholder="Tell us about your business, what you need, and any questions you have..."
                      rows={4}
                      style={{ ...inputStyle(focused === "message", errors.message), resize: "vertical", minHeight: 110 }}
                    />
                  </Field>
                </div>
              </div>

              {/* Submit */}
              <div style={{ marginTop: "1.75rem", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <motion.button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 36px rgba(250,204,21,0.38)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "13px 28px",
                    background: "linear-gradient(135deg, #facc15, #f59e0b)",
                    color: "#0B0B0B", borderRadius: 99,
                    fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(250,204,21,0.22)",
                    opacity: status === "loading" ? 0.7 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        style={{ width: 15, height: 15, border: "2px solid #0B0B0B", borderTopColor: "transparent", borderRadius: "50%" }}
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <MessageCircle size={16} />
                      Send via WhatsApp
                      <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#34d399", fontWeight: 600 }}
                    >
                      <CheckCircle2 size={15} color="#34d399" />
                      Sent! WhatsApp opened ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p style={{ fontSize: 11.5, color: "#555", marginTop: "1rem" }}>
                🔒 Your data is saved to our secure records and sent directly to our WhatsApp. We never share your info.
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT PANEL ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {/* Info cards */}
            {INFO_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -3, borderColor: card.color + "55" }}
                  style={{
                    background: "#131313",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, padding: "1rem 1.25rem",
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "border-color 0.25s, box-shadow 0.25s",
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: card.color + "14",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={19} color={card.color} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {card.label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e5e5e5", marginTop: 2 }}>
                      {card.value}
                    </div>
                    <div style={{ fontSize: 11.5, color: "#666", marginTop: 1 }}>{card.sub}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* WhatsApp direct CTA */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Scalemate! I'd like to know more about your services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 36px rgba(37,211,102,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "13px 20px",
                background: "linear-gradient(135deg, #25d366, #128c7e)",
                borderRadius: 16, textDecoration: "none",
                color: "#fff", fontWeight: 700, fontSize: 14,
                boxShadow: "0 4px 18px rgba(37,211,102,0.2)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp Directly
            </motion.a>

            {/* Response time card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
              style={{
                background: "rgba(250,204,21,0.06)",
                border: "1px solid rgba(250,204,21,0.18)",
                borderRadius: 16, padding: "1rem 1.25rem",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 10, height: 10, borderRadius: "50%", background: "#facc15", flexShrink: 0 }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#facc15" }}>
                  Average response: 28 minutes
                </div>
                <div style={{ fontSize: 11.5, color: "#666", marginTop: 2 }}>
                  Our team is online Mon–Sat 9AM–7PM IST
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ─── BOTTOM REASSURANCE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            marginTop: "3rem", textAlign: "center",
            display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap",
          }}
        >
          {["No spam, ever", "Free first consultation", "Reply in 30 mins", "20000+ businesses served"].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#555" }}>
              <CheckCircle2 size={13} color="#facc15" />
              {t}
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}