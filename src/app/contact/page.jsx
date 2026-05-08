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
const WHATSAPP_NUMBER = "916371287364";
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

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
  { icon: Phone,  label: "Call Us",  value: "+91 9777915737",    sub: "Mon–Sat, 9am–7pm",         color: "text-yellow-400",  bg: "bg-yellow-400/10",  border: "hover:border-yellow-400/40" },
  { icon: Mail,   label: "Email Us", value: "scalemateservices25@gmail.com", sub: "Reply within 2 hours",      color: "text-blue-400",    bg: "bg-blue-400/10",    border: "hover:border-blue-400/40"   },
  { icon: MapPin, label: "Office",   value: "Bengaluru, KA",      sub: "Pan India services",        color: "text-emerald-400", bg: "bg-emerald-400/10", border: "hover:border-emerald-400/40"},
  { icon: Clock,  label: "Support",  value: "24/7 Available",     sub: "Always here for you",       color: "text-pink-400",    bg: "bg-pink-400/10",    border: "hover:border-pink-400/40"  },
];

const TRUST = [
  { icon: Star,           text: "4.9/5 Rating"  },
  { icon: Shield,         text: "100% Secure"   },
  { icon: Zap,            text: "Fast Response" },
  { icon: HeadphonesIcon, text: "24/7 Support"  },
];

/* ─── Floating Orb ─── */
function Orb({ className }) {
  return (
    <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
  );
}

/* ─── Field Wrapper ─── */
function Field({ label, icon: Icon, error, children, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase flex items-center gap-1">
        {Icon && <Icon size={11} className="text-yellow-400" />}
        {label}
        {required && <span className="text-yellow-400">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11.5px] text-red-400 m-0"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Contact() {
  const formRef = useRef(null);
  const inView = useInView(formRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", budget: "", message: "" });
  const [errors, setErrors]     = useState({});
  const [focused, setFocused]   = useState("");
  const [status, setStatus]     = useState("idle");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [budgetOpen, setBudgetOpen]   = useState(false);

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

  const sendToSheets = async () => {
    const payload = new FormData();
    Object.entries(form).forEach(([k, v]) => payload.append(k, v));
    payload.append("timestamp", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    await fetch(GOOGLE_SHEET_URL, { method: "POST", body: payload });
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Scalemate! 👋\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || "N/A"}\n*Service Needed:* ${form.service}\n*Budget:* ${form.budget || "Not specified"}\n\n*Message:*\n${form.message}\n\n_Sent from Scalemate Contact Form_`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStatus("loading");
    try {
      await sendToSheets();
      openWhatsApp();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service: "", budget: "", message: "" });
    } catch {
      openWhatsApp();
      setStatus("success");
    }
  };

  const set = (k) => (v) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  /* ── Shared input class builder ── */
  const inputCls = (key) =>
    `w-full bg-neutral-900 rounded-xl px-3.5 py-3 text-[14px] text-neutral-100 outline-none transition-all duration-200 font-[inherit]
     border ${errors[key] ? "border-red-400 shadow-none" : focused === key ? "border-yellow-400/50 shadow-[0_0_0_3px_rgba(250,204,21,0.08)]" : "border-white/10"}`;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-20 sm:pt-24 pb-16 sm:pb-20 relative overflow-hidden"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Background Orbs ── */}
      <Orb className="w-[360px] h-[360px] left-0 top-[5%] bg-yellow-400/5" />
      <Orb className="w-[280px] h-[280px] right-[5%] top-[15%] bg-blue-400/5" />
      <Orb className="w-[300px] h-[300px] right-[10%] bottom-[10%] bg-emerald-400/4" />
      <Orb className="w-[220px] h-[220px] left-[2%] bottom-[20%] bg-pink-400/5" />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ─── HERO ─── */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "backOut" }}
            className="inline-flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-5 text-[11px] sm:text-[11.5px] font-bold tracking-[0.1em] text-yellow-400 uppercase"
          >
            <Sparkles size={12} className="text-yellow-400" />
            Take the First Step — We Handle the Rest
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] mb-4 tracking-tight"
          >
            Let's{" "}
            <span className="text-yellow-400" style={{ textShadow: "0 0 48px rgba(250,204,21,0.35)" }}>
              Connect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 text-sm sm:text-[15px] max-w-[480px] mx-auto leading-relaxed px-2"
          >
            Fill the form below — your details go straight to our WhatsApp and our team will reach out within 30 minutes.
          </motion.p>
        </div>

        {/* ─── TRUST PILLS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center flex-wrap gap-2 sm:gap-2.5 mb-10 sm:mb-14"
        >
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="flex items-center gap-1.5 bg-neutral-900 border border-white/8 rounded-full px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs text-neutral-400">
                <Icon size={12} className="text-yellow-400" strokeWidth={2} />
                {t.text}
              </div>
            );
          })}
        </motion.div>

        {/* ─── MAIN GRID: stacks on mobile, 2-col on lg ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 lg:gap-6 items-start">

          {/* ══ FORM PANEL ══ */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/8 rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden order-1"
          >
            {/* Corner glow */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-radial from-yellow-400/7 to-transparent pointer-events-none rounded-3xl" />

            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-1">Send Us a Message</h2>
              <p className="text-[13px] text-neutral-600 mb-6">
                Submitting will open WhatsApp with your details pre-filled ✓
              </p>

              {/* ── Form Grid: 1-col on mobile, 2-col on sm+ ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Name */}
                <Field label="Full Name" icon={User} error={errors.name} required>
                  <input
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    placeholder="Rahul Sharma"
                    className={inputCls("name")}
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
                    className={inputCls("phone")}
                    inputMode="tel"
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
                    className={inputCls("email")}
                    inputMode="email"
                  />
                </Field>

                {/* Budget */}
                <Field label="Budget Range" icon={Briefcase} error={errors.budget}>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => { setBudgetOpen((p) => !p); setServiceOpen(false); }}
                      className={`${inputCls("budget")} flex items-center justify-between cursor-pointer text-left ${!form.budget ? "text-neutral-600" : ""}`}
                    >
                      {form.budget || "Select budget"}
                      <motion.div animate={{ rotate: budgetOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={15} className="text-neutral-600 flex-shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {budgetOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                          className="absolute top-[calc(100%+6px)] left-0 right-0 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                          style={{ transformOrigin: "top" }}
                        >
                          {BUDGETS.map((b) => (
                            <div
                              key={b}
                              onClick={() => { set("budget")(b); setBudgetOpen(false); }}
                              className={`px-3.5 py-2.5 text-[13.5px] cursor-pointer transition-colors duration-150
                                ${form.budget === b ? "text-yellow-400 bg-yellow-400/8" : "text-neutral-300 hover:bg-white/5"}`}
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
                <div className="col-span-1 sm:col-span-2">
                  <Field label="Service Required" icon={Briefcase} error={errors.service} required>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setServiceOpen((p) => !p); setBudgetOpen(false); }}
                        className={`${inputCls("service")} flex items-center justify-between cursor-pointer text-left ${!form.service ? "text-neutral-600" : ""}`}
                      >
                        {form.service || "Select a service"}
                        <motion.div animate={{ rotate: serviceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={15} className="text-neutral-600 flex-shrink-0" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {serviceOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
                            className="absolute top-[calc(100%+6px)] left-0 right-0 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                            style={{ transformOrigin: "top" }}
                          >
                            {/* 1-col on mobile, 2-col on sm+ */}
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                              {SERVICES.map((s) => (
                                <div
                                  key={s}
                                  onClick={() => { set("service")(s); setServiceOpen(false); }}
                                  className={`px-3.5 py-2.5 text-[13.5px] cursor-pointer transition-colors duration-150 flex items-center gap-1.5
                                    ${form.service === s ? "text-yellow-400 bg-yellow-400/8" : "text-neutral-300 hover:bg-white/5"}`}
                                >
                                  {form.service === s && <CheckCircle2 size={12} className="text-yellow-400 flex-shrink-0" />}
                                  {s}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Field>
                </div>

                {/* Message — full width */}
                <div className="col-span-1 sm:col-span-2">
                  <Field label="Your Message" icon={MessageCircle} error={errors.message} required>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      placeholder="Tell us about your business, what you need, and any questions you have..."
                      rows={4}
                      className={`${inputCls("message")} resize-y min-h-[110px]`}
                    />
                  </Field>
                </div>
              </div>

              {/* ── Submit Row ── */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 36px rgba(250,204,21,0.38)" }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 w-full sm:w-auto
                    bg-gradient-to-r from-yellow-400 to-amber-400 text-neutral-950 rounded-full
                    font-extrabold text-[14px] border-none cursor-pointer
                    shadow-[0_4px_20px_rgba(250,204,21,0.22)] transition-opacity duration-200
                    ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {status === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full"
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
                      className="flex items-center gap-1.5 text-[13px] text-emerald-400 font-semibold"
                    >
                      <CheckCircle2 size={15} className="text-emerald-400" />
                      Sent! WhatsApp opened ✓
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-[11.5px] text-neutral-700 mt-3">
                🔒 Your data is saved to our secure records and sent directly to our WhatsApp. We never share your info.
              </p>
            </div>
          </motion.div>

          {/* ══ RIGHT PANEL ══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 order-2"
          >
            {/* Info Cards — 2-col grid on mobile/tablet, 1-col on lg */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {INFO_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    whileHover={{ y: -2 }}
                    className={`bg-neutral-950 border border-white/7 rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-250 ${card.border}`}
                  >
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex-shrink-0 ${card.bg} flex items-center justify-center`}>
                      <Icon size={18} className={card.color} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[11px] text-neutral-600 font-semibold uppercase tracking-widest">
                        {card.label}
                      </div>
                      <div className="text-[13px] sm:text-[14px] font-bold text-neutral-200 mt-0.5 truncate">
                        {card.value}
                      </div>
                      <div className="text-[11px] text-neutral-600 mt-0.5">{card.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Scalemate! I'd like to know more about your services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 36px rgba(37,211,102,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-5 py-3.5
                bg-gradient-to-r from-[#25d366] to-[#128c7e] rounded-2xl no-underline
                text-white font-bold text-[14px] shadow-[0_4px_18px_rgba(37,211,102,0.2)]"
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
              className="bg-yellow-400/6 border border-yellow-400/18 rounded-2xl p-4 flex items-center gap-3"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-yellow-400 flex-shrink-0"
              />
              <div>
                <div className="text-[13px] font-bold text-yellow-400">
                  Average response: 28 minutes
                </div>
                <div className="text-[11.5px] text-neutral-600 mt-0.5">
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
          className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {["No spam, ever", "Free first consultation", "Reply in 30 mins", "20000+ businesses served"].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[12px] sm:text-[12.5px] text-neutral-600">
              <CheckCircle2 size={13} className="text-yellow-400 flex-shrink-0" />
              {t}
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}