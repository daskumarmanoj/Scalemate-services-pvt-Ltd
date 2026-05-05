/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FileText,
  Landmark,
  TrendingUp,
  Shield,
  Globe,
  CheckCircle2,
  DollarSign,
  BookOpen,
  BarChart3,
  ArrowRight,
  Star,
  Zap,
  Award,
  HeartHandshake,
  Sparkles,
  BadgeCheck,
  ChevronRight,
  Phone,
  Users,
  X,
} from "lucide-react";
import Modal from "@/Components/Ui/Modal";

const YELLOW = "lab(78_12.63_63.5)";

const SERVICES = [
  {
    id: "growth",
    icon: TrendingUp, // lucide-react icon (import karna padega)
    title: "Growth Strategy",
    tag: "Strategic",
    color: "#f472b6",
    twColor: "text-pink-400",
    twBg: "bg-pink-400",
    twBorder: "border-pink-400",
    twRing: "ring-pink-400",
    description:
      "Strategic planning for business expansion, market entry, and digital transformation.",
    features: [
      "Business Plan Development",
      "Market Research & Analysis",
      "Digital Marketing Strategy",
      "Sales & Distribution",
    ],
    detail: {
      subheadline:
        "We help businesses grow with structured strategies, data-driven insights, and execution-focused planning to achieve sustainable success.",

      tableHead: ["Service", "Description"],

      tableRows: [
        [
          "Business Plan Development",
          "We provide comprehensive business plan development services designed to transform your ideas into a structured, investor-ready document. Our approach includes detailed financial projections, revenue models, operational strategies, and growth roadmaps. We focus on aligning your business vision with market opportunities, ensuring a strong foundation for funding, scalability, and long-term success.",
        ],
        [
          "Market Research & Analysis",
          "Our market research and analysis services help you make informed, data-driven decisions. We conduct in-depth industry analysis, competitor benchmarking, and customer behavior studies to identify market trends and opportunities. This enables you to understand demand, position your product effectively, and minimize risks while maximizing growth potential.",
        ],
        [
          "Digital Marketing Strategy",
          "We design result-oriented digital marketing strategies tailored to your business goals. From brand positioning and social media management to performance marketing and lead generation, we ensure your business reaches the right audience. Our strategies focus on increasing online visibility, driving engagement, and converting leads into loyal customers.",
        ],
        [
          "Sales & Distribution",
          "Our sales and distribution solutions are focused on building strong revenue channels and expanding market reach. We help design effective sales strategies, develop distribution networks, and optimize channel partnerships. Whether online or offline, we ensure your products and services reach the right customers efficiently, boosting overall sales performance.",
        ],
      ],

      extras: [
        "Startup Strategy",
        "Go-To-Market Planning",
        "Brand Positioning",
        "Revenue Strategy",
        "Customer Acquisition Plan",
        "Growth Hacking Techniques",
      ],

      ctaLabel: "Learn More",
      ctaUrl: "https://leostartsservices.com/contacts/",
    },
  },
  {
    id: "registration",
    icon: FileText,
    title: "Legal Compliances & Registration",
    tag: "Most Popular",
    color: YELLOW,
    twColor: "text-[lab(78_12.63_63.5)]",
    twBg: "bg-[lab(78_12.63_63.5)]",
    twBorder: "border-[lab(78_12.63_63.5)]",
    twRing: "ring-[lab(78_12.63_63.5)]",
    description:
      "End-to-end business registration for Pvt Ltd, LLP, OPC, Partnership & more with complete MCA compliance.",
    features: [
      "Private Limited Company",
      "LLP & OPC Registration",
      "Startup India (DPIIT)",
      "MSME / Udyam Registration",
    ],
    detail: {
      subheadline:
        "Turn your idea into a legally recognized business with expert guidance and hassle-free registration support. We handle the entire process so you can focus on building your vision.",
      tableHead: ["Registration Type", "Description"],
      tableRows: [
        [
          "Private Limited Company",
          "Complete incorporation with MCA compliance and documentation.",
        ],
        [
          "Limited Liability Partnership (LLP)",
          "Flexible business structure with limited liability protection.",
        ],
        [
          "One Person Company (OPC)",
          "Ideal structure for solo founders with corporate benefits.",
        ],
        [
          "Partnership Firm",
          "Traditional partnership registration with legal agreement.",
        ],
        [
          "Sole Proprietorship",
          "Simple and quick registration for small businesses.",
        ],
        [
          "Startup India Registration",
          "DPIIT recognition for startup benefits and tax exemptions.",
        ],
        [
          "MSME (Udyam) Registration",
          "Government registration for MSME benefits and schemes.",
        ],
        [
          "Firm Registration",
          "Legal registration of firms under applicable laws.",
        ],
      ],
      extras: [
        "GST Registration & Filing",
        "Income Tax Returns",
        "ROC Annual Filing",
        "Trademark Registration",
        "Name Approval & DSC",
        "MCA Compliance",
      ],
      ctaLabel: "Start Your Registration",
      ctaUrl: "https://leostartsservices.com/contacts/",
    },
  },
  {
    id: "funding",
    icon: DollarSign,
    title: "Fund Raising",
    tag: "High Demand",
    color: "#60a5fa",
    twColor: "text-blue-400",
    twBg: "bg-blue-400",
    twBorder: "border-blue-400",
    twRing: "ring-blue-400",
    description:
      "Strategic guidance and end-to-end support to help startups & MSMEs secure government grants, angel funding, and loans.",
    features: [
      "Grant funding support ₹10L – ₹10Cr",
      "Angel Funding ₹5Cr – ₹500Cr",
      "MSME Loans ₹1Cr – ₹15Cr",
      "Government Grants ₹10L – ₹20Cr ",
    ],
    detail: {
      subheadline:
        "Access the funding you need to scale, innovate, and expand. We provide strategic guidance and end-to-end support from pitch to disbursal.",
      tableHead: ["Funding Type", "Amount", "Who Can Apply"],
      tableRows: [
        [
          "Grant Funding Support",
          "₹10L – ₹10Crr*",
          "Startups & MSMEs meeting government grant criteria",
        ],
        [
          "MSME Loans",
          "₹1Cr – ₹15Cr*",
          "MSME-registered businesses with financial records",
        ],
        [
          "Angel Funding",
          "₹5Cr – ₹500Cr*",
          "Early-stage startups with scalable business ideas",
        ],
        [
          "Government Grants",
          "₹10L – ₹20Cr*",
          "DPIIT-recognized startups in eligible sectors",
        ],
        [
          "Debt Funding",
          "₹10L – ₹20Cr*",
          "Revenue-generating businesses with repayment capacity",
        ],
      ],
      extras: [
        "NAIFF Loans (₹2 Cr)",
        "Collateral Free Loans (₹5 Cr)",
        "Startup Seed Support (₹1 Cr)",
        "PMEGP (₹2 Cr)",
        "Seed Fund (₹20L)",
        "Investor Pitch Deck",
      ],
      ctaLabel: "Apply for Funding",
      ctaUrl: "https://leostartsservices.com/contacts/",
    },
  },
  {
    id: "certifications",
    icon: BadgeCheck,
    title: "Certifications",
    tag: "Protect & Grow",
    color: "#34d399",
    twColor: "text-emerald-400",
    twBg: "bg-emerald-400",
    twBorder: "border-emerald-400",
    twRing: "ring-emerald-400",
    description:
      "Build trust and legal credibility with government-backed certifications — from Startup India to ISO, FSSAI, and Trademark.",
    features: [
      "Startup India Certificate",
      "MSME (Udyam) Certificate",
      "ISO Certification",
      "Trademark Certificate",
    ],
    detail: {
      subheadline:
        "Our certifications demonstrate commitment to compliance, transparency, and industry best practices. Each credential reflects the highest professional and regulatory standards.",
      tableHead: ["Certification", "Description"],
      tableRows: [
        [
          "Startup India Certificate",
          "DPIIT recognition for startup benefits, tax exemptions, and funding support.",
        ],
        [
          "State Startup Registration",
          "State-level startup recognition for local incentives and schemes.",
        ],
        [
          "MSME (Udyam) Certificate",
          "Government MSME registration to avail subsidies and business benefits.",
        ],
        [
          "IEC Certificate",
          "Import Export Code registration for international trade.",
        ],
        [
          "ISO Certification",
          "Quality management certification to build trust and compliance.",
        ],
        [
          "ZED Certification",
          "Zero Defect Zero Effect certification for manufacturing excellence.",
        ],
        [
          "Tax Exemption Certificate",
          "Certification to avail income tax benefits for eligible startups.",
        ],
        [
          "GST Certificate",
          "GST registration certificate for legal tax compliance.",
        ],
        [
          "FSSAI Certificate",
          "License required for legal food manufacturing and sale.",
        ],
        [
          "Trademark Certificate",
          "Legal protection for unique brand name, logo, and slogan.",
        ],
      ],
      extras: [
        "Copyright Registration",
        "Patent Filing",
        "Design Registration",
        "Drug License",
        "Shop & Establishment Act",
        "Professional Tax Registration",
      ],
      ctaLabel: "Apply for Certification",
      ctaUrl: "https://leostartsservices.com/contacts/",
    },
  },
  {
    id: "digital",
    icon: Globe,
    title: "Digital Marketing",
    tag: "Grow Online",
    color: "#e879f9",
    twColor: "text-fuchsia-400",
    twBg: "bg-fuchsia-400",
    twBorder: "border-fuchsia-400",
    twRing: "ring-fuchsia-400",
    description:
      "Powerful digital strategies to attract, engage, and convert — SEO, social media, website development, app creation, and more.",
    features: [
      "Website Development",
      "SEO & Google Ads / PPC",
      "Social Media Management",
      "Application Development",
    ],
    detail: {
      subheadline:
        "In today's digital world, your online presence defines your success. We create powerful digital strategies that attract, engage, and convert your target audience.",
      tableHead: ["Service", "Description"],
      tableRows: [
        [
          "Letter Head Design",
          "Professional and creative letterhead designs to enhance your business branding.",
        ],
        [
          "Application Development",
          "Custom mobile and web application development solutions tailored to your business.",
        ],
        [
          "Social Media Management",
          "Complete management of accounts, content posting, and audience engagement strategies.",
        ],
        [
          "Website Development",
          "Modern, responsive, and SEO-friendly website development for businesses and startups.",
        ],
        [
          "Search Engine Optimization (SEO)",
          "Improve website rankings and increase organic traffic through advanced SEO strategies.",
        ],
        [
          "Social Media Marketing",
          "Promote your brand across Instagram, Facebook, and LinkedIn.",
        ],
        [
          "Google Ads / PPC",
          "Drive instant traffic and quality leads with highly targeted paid advertising campaigns.",
        ],
        [
          "Content Marketing",
          "Create engaging blogs, articles, and promotional content to attract customers.",
        ],
        [
          "Email Marketing",
          "Reach your audience directly with personalized email campaigns and automation.",
        ],
        [
          "Website Analytics",
          "Track user behavior, campaign performance, and business growth insights.",
        ],
        [
          "Brand Strategy",
          "Develop strong online branding and positioning for long-term market growth.",
        ],
        [
          "Lead Generation",
          "Generate high-quality business leads through strategic digital campaigns.",
        ],
      ],
      extras: [
        "Flyers & Poster Design",
        "Brochure Design",
        "Logo Designing",
        "Corporate Video",
        "Influencer Marketing",
        "WhatsApp Marketing",
      ],
      ctaLabel: "Start Your Campaign",
      ctaUrl: "https://leostartsservices.com/contacts/",
    },
  },
  {
    id: "profiling",
    icon: BookOpen,
    title: "Company Profiling",
    tag: "Brand Identity",
    color: "#fb923c",
    twColor: "text-orange-400",
    twBg: "bg-orange-400",
    twBorder: "border-orange-400",
    twRing: "ring-orange-400",
    description:
      "Craft a powerful business identity with investor-ready pitch decks, DPRs, logo design, brochures, and financial projections.",
    features: [
      "Pitch Deck Design",
      "Detailed Project Report (DPR)",
      "Logo & Brand Design",
      "Financial Projections",
    ],
    detail: {
      subheadline:
        "Your company profile is more than a document — it's your brand story, credibility statement, and investor introduction. We craft professional profiles that build trust and attract opportunities.",
      tableHead: ["Service", "Description"],
      tableRows: [
        [
          "Company Profile Creation",
          "Professionally structured profiles for branding, investors, and stakeholders.",
        ],
        [
          "Pitch Deck Design",
          "Clean, concise, and investor-focused pitch decks for funding presentations.",
        ],
        [
          "Investor Deck",
          "Strategic decks highlighting growth, traction, and financial performance.",
        ],
        [
          "Business Brochure",
          "Premium corporate brochures for digital and print branding.",
        ],
        [
          "Flyers & Creatives",
          "Minimalist creatives aligned with corporate and startup branding.",
        ],
        [
          "Logo Designing",
          "Timeless logo designs that reflect brand identity and values.",
        ],
        [
          "Detailed Project Report",
          "End-to-end DPR covering feasibility, costing, compliance, and execution strategy.",
        ],
        [
          "Fund Utilization Planning",
          "Structured allocation plans ensuring transparent and efficient use of funds.",
        ],
        [
          "Financial Projections",
          "Data-driven forecasts including revenue, expenses, cash flow, and profitability.",
        ],
      ],
      extras: [
        "Business Plan Development",
        "Market Research & Analysis",
        "SWOT Analysis",
        "Feasibility Report",
        "MIS Reporting",
        "Corporate Presentations",
      ],
      ctaLabel: "Consult Our Experts",
      ctaUrl: "https://leostartsservices.com/contacts/",
    },
  },
];

const WHY_US = [
  {
    icon: Award,
    title: "Expert Team",
    description:
      "Certified CAs, CS & legal professionals with 10+ years of startup consulting experience",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description:
      "Quick turnaround with 100% online documentation and real-time tracking",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "Competitive rates with no hidden charges or surprise fees — ever",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description:
      "Dedicated account manager & 24/7 support via WhatsApp, call & email",
  },
  {
    icon: Users,
    title: "Pan-India Network",
    description:
      "Serving Maharashtra, Gujarat, Delhi, Karnataka & all major states across India",
  },
  {
    icon: Shield,
    title: "Government Backed",
    description:
      "Expert assistance with DPIIT, MSME, NAIFF, PMEGP & other govt. schemes",
  },
];

const STATS = [
  { value: "20000+", label: "Businesses Served" },
  { value: "6+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
  { value: "100cr ", label: "Funding Secured" },
  { value: "10000+", label: "Business Registered" },
  { value: "50+", label: "Industry serveed" },
];

/* ─── Animated Counter ─── */
function Counter({ value }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const suffix = value.replace(/\d/g, "");
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

/* ─── Floating Orb ─── */
function Orb({ className, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute rounded-full pointer-events-none blur-sm ${className}`}
    />
  );
}

/* ─── Service Card ─── */
function ServiceCard({ service, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(service)}
      className="relative rounded-[20px] p-7 cursor-pointer overflow-hidden transition-all duration-300 bg-linear-to-br from-[#161616] to-[#101010] border border-white/[0.07] hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* Glow sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 0%, ${service.color}28, transparent 65%)`,
        }}
      />

      {/* Tag */}
      <div
        className="inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-4 border"
        style={{
          background: `${service.color}22`,
          color: service.color,
          borderColor: `${service.color}44`,
        }}
      >
        {service.tag}
      </div>

      {/* Icon */}
      <motion.div
        animate={
          hovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className="inline-flex p-3 rounded-xl mb-4"
        style={{ background: `${service.color}18` }}
      >
        <Icon size={26} color={service.color} strokeWidth={1.8} />
      </motion.div>

      {/* Title */}
      <motion.h3
        animate={{ color: hovered ? service.color : "#e5e5e5" }}
        transition={{ duration: 0.2 }}
        className="text-base font-bold mb-2"
      >
        {service.title}
      </motion.h3>

      {/* Description */}
      <p className="text-[#777] text-[13px] leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Divider */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="h-px mb-4 origin-left"
        style={{ background: `${service.color}44` }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-1.5">
        {service.features.map((f, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.07 + i * 0.05 + 0.2 }}
            className="flex items-start gap-2 text-[12.5px] text-[#aaa]"
          >
            <CheckCircle2
              size={13}
              color={service.color}
              className="flex-shrink-0 mt-0.5"
            />
            {f}
          </motion.li>
        ))}
      </ul>

      {/* View Details */}
      <motion.div
        animate={{ gap: hovered ? 10 : 5 }}
        className="flex items-center mt-5"
        style={{ gap: 5 }}
      >
        <span
          className="text-[12.5px] font-bold"
          style={{ color: service.color }}
        >
          View Details
        </span>
        <motion.div
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ChevronRight size={14} color={service.color} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Why Card ─── */
function WhyCard({ item, index }) {
  const Icon = item.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "backOut" }}
      className="group bg-[#131313] border border-white/[0.07] rounded-2xl p-6 transition-all duration-300 hover:border-[lab(78_12.63_63.5)]/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(250,204,21,0.1)]"
    >
      <h3 className="text-[#e5e5e5] text-[15px] font-bold mb-1.5">
        {item.title}
      </h3>
      <p className="text-[#666] text-[13px] leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

/* ─── Detail Page ─── */
function DetailPage({ service, onClose }) {
  const { detail, color, tag } = service;
  const Icon = service.icon;
  const isThreeCol = detail.tableHead.length === 3;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-[#0B0B0B] z-[200] overflow-y-auto font-sans"
    >
      {/* Grid bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[920px] mx-auto px-5 pt-8 pb-20 relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onClose}
          className="inline-flex items-center gap-2 text-[#888] text-[13px] cursor-pointer mb-8 px-4 py-2 border border-white/10 rounded-full bg-transparent transition-all duration-200 hover:text-[lab(78_12.63_63.5)] hover:border-[lab(78_12.63_63.5)]/40"
        >
          <ArrowRight size={13} className="rotate-180" />
          Back to Services
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-start gap-6 mb-10 flex-wrap"
        >
          <div
            className="inline-flex p-[18px] rounded-[20px] flex-shrink-0"
            style={{ background: `${color}18` }}
          >
            <Icon size={36} color={color} strokeWidth={1.7} />
          </div>
          <div>
            <div
              className="inline-block text-[11px] font-bold tracking-[0.07em] px-3 py-1 rounded-full uppercase mb-3.5 border"
              style={{
                background: `${color}18`,
                color: color,
                borderColor: `${color}35`,
              }}
            >
              {tag}
            </div>
            <h1 className="text-white text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold mb-2.5 leading-tight">
              {service.title}
            </h1>
            <p className="text-[#888] text-[14.5px] leading-relaxed max-w-[580px]">
              {detail.subheadline}
            </p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-[13px] font-bold text-[#e5e5e5] mb-4 pb-2.5 border-b border-white/[0.07] tracking-wide">
            Service Overview
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {detail.tableHead.map((h, i) => (
                    <th
                      key={i}
                      className="text-left px-4 py-3 text-[11.5px] font-bold tracking-widest uppercase text-[#555] border-b border-white/[0.08]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detail.tableRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="transition-colors duration-150 hover:bg-white/[0.025]"
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3.5 text-[13.5px] border-b border-white/[0.05] align-top leading-relaxed
                          ${
                            ci === 0
                              ? "text-[#e0e0e0] font-semibold whitespace-nowrap"
                              : isThreeCol && ci === 1
                                ? "font-bold"
                                : "text-[#888]"
                          }`}
                        style={isThreeCol && ci === 1 ? { color: color } : {}}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Additional Services */}
        {detail.extras && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10"
          >
            <p className="text-[13px] font-bold text-[#e5e5e5] mb-4 pb-2.5 border-b border-white/[0.07]">
              Additional Services
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
              {detail.extras.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.04 }}
                  className="bg-[#131313] border border-white/[0.07] rounded-xl px-4 py-3.5 flex items-start gap-2.5"
                >
                  <div
                    className="w-[7px] h-[7px] rounded-full flex-shrink-0 mt-[5px]"
                    style={{ background: color }}
                  />
                  <span className="text-[13px] text-[#aaa] leading-relaxed">
                    {e}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-[20px] p-8 text-center border"
          style={{
            background: `linear-gradient(135deg, ${color}10, transparent)`,
            borderColor: `${color}25`,
          }}
        >
          <h3 className="text-white text-[20px] font-extrabold mb-2">
            Ready to Get Started?
          </h3>
          <p className="text-[#888] text-[13.5px] mb-6 leading-relaxed">
            Our experts will guide you through every step. Book a free
            consultation today.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[13.5px] border-none cursor-pointer text-[#0B0B0B]"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                boxShadow: `0 4px 20px ${color}28`,
              }}
            >
              {detail.ctaLabel}
              <ArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                window.open("https://wa.me/+919898408689", "_blank")
              }
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent text-[#bbb] rounded-full font-semibold text-[13.5px] border border-white/[0.14] cursor-pointer transition-all duration-200 hover:border-[lab(78_12.63_63.5)]/50 hover:text-[lab(78_12.63_63.5)]"
            >
              <Phone size={14} />
              WhatsApp: +91 98984 08689
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Services() {
  const [activeService, setActiveService] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0B0B0B] text-white pt-24 pb-20 font-sans relative overflow-hidden"
    >
      {/* Background orbs */}
      <Orb
        className="left-[5%] top-[8%] w-80 h-80 bg-[lab(78_12.63_63.5)]/[0.07]"
        delay={0}
      />
      <Orb
        className="left-[75%] top-[15%] w-64 h-64 bg-blue-400/[0.06]"
        delay={1.5}
      />
      <Orb
        className="left-[50%] top-[55%] w-96 h-96 bg-purple-400/[0.05]"
        delay={2.5}
      />
      <Orb
        className="left-[10%] top-[75%] w-56 h-56 bg-emerald-400/[0.06]"
        delay={1}
      />
      <Orb
        className="left-[80%] top-[80%] w-72 h-72 bg-pink-400/[0.06]"
        delay={3}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* ─── HERO ─── */}
        <motion.div style={{ y: heroY }} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="inline-flex items-center gap-1.5 bg-[lab(78_12.63_63.5)]/10 border border-[lab(78_12.63_63.5)]/30 rounded-full px-4 py-1.5 mb-6 text-[12px] font-semibold tracking-widest text-[lab(78_12.63_63.5)] uppercase"
          >
            <Sparkles size={13} color={YELLOW} />
            India's Leading Startup & Business Consultant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.1] mb-5"
          >
            Our{" "}
            <span className="text-[lab(78_12.63_63.5)] [text-shadow:0_0_40px_lab(78_12.63_63.5)]">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#888] text-base max-w-140 mx-auto mb-10 leading-relaxed"
          >
            Comprehensive business solutions for startups, MSMEs &
            entrepreneurs. From company registration to digital growth — we've
            got you covered.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, borderColor: "rgba(250,204,21,0.45)" }}
                className="bg-[#161616] border border-white/10 rounded-xl px-5 py-2.5 text-center transition-colors duration-200"
              >
                <div className="text-xl font-extrabold text-[lab(78_12.63_63.5)]">
                  <Counter value={s.value} />
                </div>
                <div className="text-[11.5px] text-[#666] mt-0.5">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── SERVICES GRID ─── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold mb-2">
              What We <span className="text-[lab(78_12.63_63.5)]">Offer</span>
            </h2>
            <p className="text-[#666] text-[14px]">
              5 comprehensive service categories — click any card to explore
              full details
            </p>
          </motion.div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                onOpen={setActiveService}
              />
            ))}
          </div>
        </div>

        {/* ─── WHY LEOSTARTS ─── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold mb-2">
              Why Choose{" "}
              <span className="text-[lab(78_12.63_63.5)]">LeoStarts</span>?
            </h2>
            <p className="text-[#666] text-[14px]">
              Your trusted partner for startup success across India
            </p>
          </motion.div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
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
          className="relative overflow-hidden bg-gradient-to-br from-[lab(78_12.63_63.5)]/10 via-[lab(78_12.63_63.5)]/[0.03] to-transparent border border-[lab(78_12.63_63.5)]/[0.22] rounded-[28px] p-[clamp(2rem,5vw,4rem)] text-center"
        >
          {/* Rotating rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full border border-[lab(78_12.63_63.5)]/10 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[30px] -right-[30px] w-[120px] h-[120px] rounded-full border border-[lab(78_12.63_63.5)]/[0.08] pointer-events-none"
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[lab(78_12.63_63.5)]/[0.12] border border-[lab(78_12.63_63.5)]/30 text-[lab(78_12.63_63.5)] text-[12px] font-bold tracking-widest uppercase mb-5"
          >
            <Star size={12} color={YELLOW} fill={YELLOW} />
            Free Consultation Available
          </motion.div>

          <h2 className="text-[clamp(1.5rem,4vw,2.75rem)] font-extrabold mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="text-[#999] text-[15px] max-w-[480px] mx-auto mb-8 leading-relaxed">
            Book a free consultation with our experts and discover how LeoStarts
            can help you achieve your business goals faster.
          </p>

          <div className="flex gap-3 justify-center flex-wrap mb-8">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 40px rgba(250,204,21,0.45)",
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-r from-[lab(78_12.63_63.5)] to-amber-400 text-[#0B0B0B] rounded-full font-bold text-[14px] border-none cursor-pointer shadow-[0_4px_20px_rgba(250,204,21,0.25)] transition-shadow duration-300"
            >
              Book Free Consultation
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                window.open("https://wa.me/+919898408689", "_blank")
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[#bbb] rounded-full font-semibold text-[14px] border border-white/15 cursor-pointer transition-all duration-200 hover:border-[lab(78_12.63_63.5)]/50 hover:text-[lab(78_12.63_63.5)]"
            >
              <Phone size={15} />
              Talk to an Expert
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-6 flex-wrap"
          >
            {[
              "DPIIT Recognized",
              "Pan-India Network",
              "100% Online Process",
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-[12px] text-[#666]"
              >
                <BadgeCheck size={14} color={YELLOW} />
                {b}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ─── DETAIL PAGE OVERLAY ─── */}
      <AnimatePresence>
        {activeService && (
          <DetailPage
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
