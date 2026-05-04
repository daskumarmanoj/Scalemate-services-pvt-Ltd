/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   INLINE SVG SOCIAL ICONS
─────────────────────────────────────────────*/
const IGIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
  </svg>
);
const LIIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TWIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const YTIcon = ({ size = 16, color = "#ff0000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808" />
  </svg>
);
const FBIcon = ({ size = 16, color = "#1877f2" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const WAIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25d366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────────
   DATA — Scalemate  Branded
─────────────────────────────────────────────*/
const COMPANY = {
  whatsapp: "919898408689",
  phone: "+91 98984 08689",
  email: "info@Scalemate services.com",
  address: "Pan-India — Maharashtra, Gujarat, Delhi, Karnataka",
  description:
    "India's trusted startup & business growth partner. From incorporation to funding — we handle the complexity so you can focus on building.",
};

const LINKS = [
  {
    heading: "Services",
    items: [
      "Company Registration",
      "Legal Compliance",
      "Fund Raising",
      "Digital Marketing",
      "Company Profiling",
      "Certifications",
    ],
  },
  {
    heading: "Grow",
    items: [
      "Startup India (DPIIT)",
      "MSME Registration",
      "GST Filing",
      "ISO Certification",
      "Trademark Registration",
      "Pitch Deck & DPR",
    ],
  },
  {
    heading: "Company",
    items: [
      "About Us",
      "Our Team",
      "Careers",
      "Blog",
      "Testimonials",
      "Contact Us",
    ],
  },
];

const SOCIALS = [
  { Icon: IGIcon, label: "Instagram", color: "#e1306c", hoverBg: "rgba(225,48,108,0.15)", hoverBorder: "#e1306c55" },
  { Icon: LIIcon, label: "LinkedIn", color: "#0a66c2", hoverBg: "rgba(10,102,194,0.15)", hoverBorder: "#0a66c255" },
  { Icon: TWIcon, label: "Twitter/X", color: "#e7e9ea", hoverBg: "rgba(231,233,234,0.1)", hoverBorder: "#e7e9ea55" },
  { Icon: YTIcon, label: "YouTube", color: "#ff0000", hoverBg: "rgba(255,0,0,0.15)", hoverBorder: "#ff000055" },
  { Icon: FBIcon, label: "Facebook", color: "#1877f2", hoverBg: "rgba(24,119,242,0.15)", hoverBorder: "#1877f255" },
];

const STATS = [
  { value: "1000+", label: "Businesses Served" },
  { value: "6+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

const LEGAL = ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"];

/* ─── Mobile accordion ─── */
function Accordion({ heading, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.07]">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between py-3.5 bg-transparent border-none cursor-pointer text-white/90 text-sm font-bold tracking-wide"
      >
        {heading}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown size={16} color="#facc15" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: "easeInOut" }}
            className="overflow-hidden list-none p-0 m-0 mb-3"
          >
            {items.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="block py-1.5 text-[#666] text-sm hover:text-amber-400 transition-colors duration-200 no-underline"
                >
                  {item}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Contact row ─── */
function ContactRow({ icon: Icon, value, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 text-[#666] hover:text-amber-400 transition-colors duration-200 no-underline text-sm group"
    >
      <span className="w-7 h-7 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/20 transition-colors">
        <Icon size={13} color="#facc15" strokeWidth={2} />
      </span>
      {value}
    </a>
  );
}

/* ─────────────────────────────────────────────
   MAIN FOOTER
─────────────────────────────────────────────*/
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");

  const handleSubscribe = () => {
    if (!email.includes("@")) return;
    setSubStatus("success");
    setEmail("");
    setTimeout(() => setSubStatus("idle"), 3500);
  };

  return (
    <footer className="bg-[#080808] text-white relative overflow-hidden">

      {/* dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(250,204,21,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* top golden hairline */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/5 pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(250,204,21,0.5), transparent)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">

        {/* ── STATS BAR ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-white/[0.07]">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`py-7 px-3 text-center ${i < 3 ? "border-r border-white/[0.07]" : ""
                }`}
            >
              <div className="text-3xl sm:text-4xl font-black text-amber-400 leading-none tracking-tight">
                {s.value}
              </div>
              <div className="text-xs text-[#555] mt-1.5 font-medium tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-12 py-14">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="md:col-span-2 lg:col-span-1 pb-6 border-b border-white/[0.07] md:border-none"
          >
            {/* Logo mark */}
            <div className="flex items-center gap-2.5 mb-4">
              <div>
                <div>
                  <Image
                    src="/logosigle-removebg.png"
                    width={55}
                    height={55}
                    alt="logo"
                    priority
                  />
                  <span className="font-semibold text-lg hidden sm:block tracking-widest">
                    <span className="text-[lab(78_12.63_63.5)]">SCALE</span>
                    <span className="text-white">MATE</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[#555] text-sm leading-relaxed mb-5 max-w-xs">
              {COMPANY.description}
            </p>

            <div className="flex flex-col gap-2.5 mb-6">
              <ContactRow icon={Phone} value={COMPANY.phone} href={`tel:${COMPANY.phone}`} />
              <ContactRow icon={Mail} value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
              <ContactRow icon={MapPin} value={COMPANY.address} href="#" />
            </div>

            {/* WhatsApp pill */}
            <motion.a
              href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                "Hello Scalemate ! I'd like to know more about your services."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[#25d366] text-sm font-bold no-underline mb-6 border border-[#25d366]/30 bg-[#25d366]/10 hover:bg-[#25d366]/20 transition-colors duration-200"
            >
              <WAIcon size={15} />
              Chat on WhatsApp
            </motion.a>

            {/* Social icons */}
            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map(({ Icon, label, color, hoverBg, hoverBorder }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.18 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center no-underline border border-white/[0.09] bg-white/[0.05] transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = hoverBg;
                    e.currentTarget.style.borderColor = hoverBorder;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  }}
                >
                  <Icon size={15} color={color} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Desktop nav columns */}
          {LINKS.map((col, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + ci * 0.08, duration: 0.5 }}
              className="hidden md:block"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-4 h-0.5 bg-amber-400 rounded-full" />
                <span className="text-xs font-black text-white tracking-widest uppercase">
                  {col.heading}
                </span>
              </div>
              <ul className="list-none p-0 m-0">
                {col.items.map((item, ii) => (
                  <li key={ii}>
                    <a
                      href="#"
                      className="group flex items-center gap-1.5 text-[#555] text-sm hover:text-amber-400 transition-colors duration-200 no-underline py-1"
                    >
                      <ArrowRight
                        size={11}
                        color="#facc15"
                        className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Mobile accordions */}
          <div className="md:hidden col-span-1">
            {LINKS.map((col, i) => (
              <Accordion key={i} heading={col.heading} items={col.items} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="border-t border-white/[0.07] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs text-[#3a3a3a] leading-relaxed">
            © {new Date().getFullYear()} Scalemate  Services Pvt. Ltd. All rights reserved.
            <br />
            <span className="text-[#2e2e2e]">
              Website: Scalemate services.com · WhatsApp: +91 98984 08689
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {LEGAL.map((l, i) => (
              <a
                key={i}
                href="#"
                className="text-[#444] text-xs hover:text-amber-400 transition-colors duration-200 no-underline"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#333]">
            <span>Made with</span>
            <span className="text-amber-400 text-sm">♥</span>
            <span>in India 🇮🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
}