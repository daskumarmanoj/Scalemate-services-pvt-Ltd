"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  Wallet,
  Building2,
  Briefcase,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

// ✅ Replace with your WhatsApp number (digits only, no + or spaces)
const WHATSAPP_NUMBER = "919777915737";

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  email: "",
  budget: "",
  natureOfBusiness: "",
  service: "",
  message: "",
};

const NATURE_OPTIONS = [
  "Retail",
  "E-Commerce",
  "Hospitality & Tourism",
  "Healthcare",
  "Education",
  "Real Estate",
  "Finance & Banking",
  "Manufacturing",
  "Technology",
  "Non-Profit",
  "Other",
];

const SERVICE_OPTIONS = [
  "Legal Compliances & Registration",
  "Fund Raising",
  "Certifications",
  "Digital Marketing",
  "Company Profiling",
];

// ─── WhatsApp SVG Icon ────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2C8.27 2 2 8.27 2 16c0 2.44.65 4.73 1.78 6.72L2 30l7.47-1.96A13.9 13.9 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm0 25.5a11.4 11.4 0 01-5.82-1.59l-.42-.25-4.33 1.14 1.15-4.2-.28-.44A11.45 11.45 0 014.5 16C4.5 9.6 9.6 4.5 16 4.5S27.5 9.6 27.5 16 22.4 27.5 16 27.5z"
        fill="currentColor"
      />
      <path
        d="M22.5 19.6c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Reusable Input with Icon ─────────────────────────────────────────────────
function InputField({ icon: Icon, as: Tag = "input", className = "", ...props }) {
  const [focused, setFocused] = useState(false);

  const ringClass = focused
    ? "border-amber-500 ring-2 ring-amber-500/20 bg-white"
    : "border-stone-200 bg-stone-50 hover:border-amber-300";

  if (Tag === "textarea") {
    return (
      <div className="relative">
        {Icon && (
          <Icon
            size={15}
            className="absolute left-3 top-3 text-amber-500 pointer-events-none"
          />
        )}
        <textarea
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 pt-2.5 pb-2.5 text-sm text-stone-800 rounded-lg border outline-none resize-none transition-all duration-200 font-sans ${ringClass} ${className}`}
        />
      </div>
    );
  }

  if (Tag === "select") {
    return (
      <div className="relative">
        {Icon && (
          <Icon
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none z-10"
          />
        )}
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none"
        />
        <select
          {...props}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full appearance-none ${Icon ? "pl-9" : "pl-3"} pr-8 py-2.5 text-sm text-stone-800 rounded-lg border outline-none transition-all duration-200 font-sans cursor-pointer ${ringClass} ${className}`}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none"
        />
      )}
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 text-sm text-stone-800 rounded-lg border outline-none transition-all duration-200 font-sans ${ringClass} ${className}`}
      />
    </div>
  );
}

// ─── Main Modal Component ─────────────────────────────────────────────────────
export default function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | success
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setErrorMsg("");
    if (!form.fullName.trim()) { setErrorMsg("Please enter your full name."); return; }
    if (!form.phone.trim())    { setErrorMsg("Please enter your phone number."); return; }
    if (!form.service)         { setErrorMsg("Please select a service."); return; }

    const lines = [
      "Hello! I'd like to request a free consultation.",
      "",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      form.email            ? `Email: ${form.email}`                      : null,
      form.budget           ? `Budget: ${form.budget}`                    : null,
      form.natureOfBusiness ? `Business Type: ${form.natureOfBusiness}`   : null,
      `Service Required: ${form.service}`,
      form.message          ? `Message: ${form.message}`                  : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    setStatus("success");
    setTimeout(() => window.open(url, "_blank"), 450);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setForm(INITIAL_FORM);
      setErrorMsg("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={handleClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] bg-white rounded-2xl border border-amber-400/60 shadow-2xl p-7"
          >
            {/* ── Header ── */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-amber-500 mb-1 font-sans">
                  Free Consultation
                </p>
                <h2 className="text-[22px] font-bold text-stone-900 leading-tight font-serif">
                  Get a Quote
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="mt-1 w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:border-amber-500 hover:text-amber-500 transition-all duration-150 flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* ── Gold Divider ── */}
            <div
              className="h-px mb-5 border-none"
              style={{
                background: "linear-gradient(90deg, transparent, #c8a84b99, transparent)",
              }}
            />

            {/* ── Success State ── */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10 px-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-4">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path
                      d="M5 13l6 6 10-10"
                      stroke="#fff"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xl font-bold text-stone-900 mb-2 font-serif">
                  Opening WhatsApp...
                </p>
                <p className="text-sm text-stone-500 leading-relaxed font-sans">
                  Your details are ready. Complete the conversation in WhatsApp to confirm your enquiry.
                </p>
              </motion.div>
            ) : (
              /* ── Form ── */
              <div className="space-y-3">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 max-[430px]:grid-cols-1">
                  <InputField
                    icon={User}
                    name="fullName"
                    type="text"
                    placeholder="Full Name *"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={Phone}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Row 2: Email + Budget */}
                <div className="grid grid-cols-2 gap-3 max-[430px]:grid-cols-1">
                  <InputField
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={Wallet}
                    name="budget"
                    type="text"
                    placeholder="Budget Range"
                    value={form.budget}
                    onChange={handleChange}
                  />
                </div>

                {/* Nature of Business */}
                <InputField
                  as="select"
                  icon={Building2}
                  name="natureOfBusiness"
                  value={form.natureOfBusiness}
                  onChange={handleChange}
                >
                  <option value="">Nature of Business</option>
                  {NATURE_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </InputField>

                {/* Service */}
                <InputField
                  as="select"
                  icon={Briefcase}
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a Service *</option>
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </InputField>

                {/* Message */}
                <InputField
                  as="textarea"
                  icon={MessageSquare}
                  name="message"
                  rows={3}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleChange}
                />

                {/* Error */}
                {errorMsg && (
                  <p className="text-xs text-red-500 text-center font-sans">{errorMsg}</p>
                )}

                {/* WhatsApp Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 font-sans mt-1"
                  style={{ background: "#25D366" }}
                >
                  <WhatsAppIcon size={20} />
                  Send via WhatsApp
                </button>

                <p className="text-[11px] text-stone-400 text-center font-sans">
                  WhatsApp will open with your details pre-filled
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}