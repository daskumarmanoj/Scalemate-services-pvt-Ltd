"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, Phone, Clock } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Modal from "./Ui/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = [
  { name: "Home", path: "/" },
  { name: "Service", path: "/service" },
  { name: "Process", path: "/process" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
  { name: "About Us", path: "/about" },
  { name: "FAQs", path: "/faq" },

];

const SocialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/scalemateservices?igsh=MWcyMml0cHVxZ252ag==",
    icon: <FaInstagram size={14} />,
  },
  // {
  //   name: "Facebook",
  //   href: "https://facebook.com/yourpage",
  //   icon: <FaFacebookF size={14} />,
  // },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/yourpage",
    icon: <FaLinkedinIn size={14} />,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919777915737",
    icon: <FaWhatsapp size={14} />,
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Navbar total height: topbar (~40px) + mainbar (~64px) = ~104px
  // Marquee neeche aata hai navbar ke
  const navHeight = scrolled ? "100px" : "104px";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full z-50 bg-[#0B0B0B]/95 backdrop-blur-lg text-white shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-yellow-500/20 transition-all duration-300"
      >
        {/* ── TOP BAR ── */}

        {/* ── MAIN NAV BAR ── */}
        <div className="mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src="/finalLogo.png"
                width={50}
                height={50}
                alt="Scalemate logo"
                priority
              />
              <div className="hidden lg:flex flex-col text-[11px] text-gray-400 border-l border-gray-700 pl-3 leading-tight">
                <span>Idea se scale tak,</span>
                <span>
                  <span className="text-yellow-400 font-semibold mr-1">
                    Scalemate
                  </span>
                  har step par aapke saath.
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {NavItems.map((item, index) => (
              <Link key={index} href={item.path}>
                <span
                  className={`text-sm font-medium transition-colors duration-200 relative cursor-pointer pb-1 ${pathname === item.path
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                    }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-yellow-500 rounded-full"
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Book Consultation - Desktop only */}
            <button
              onClick={() => setIsOpen(true)}
              className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition-colors duration-200"
            >
              Book Consultation
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 rounded-full border border-yellow-500/30 flex items-center justify-center text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className="border-b border-yellow-500/10 bg-[#111111]">
          <div className="mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
            {/* Left: Phone + Office Timing */}
            <div className="flex items-center gap-6">
              {/* Phone */}
              <a
                href="tel:+919XXXXXXXXX"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200 group"
              >
                <span className="w-7 h-7 rounded-full border border-yellow-500/30 flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                  <Phone size={12} className="text-yellow-500" />
                </span>
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                    Call Us
                  </span>
                  <span className="text-[13px] font-medium text-gray-300 group-hover:text-yellow-400">
                    +91 97779 15737
                  </span>
                </div>
              </a>

              {/* Divider */}
              <div className="hidden sm:block w-px h-7 bg-yellow-500/20" />

              {/* Office Timing */}
              <div className="hidden sm:flex items-center gap-2 text-gray-400">
                <span className="w-7 h-7 rounded-full border border-yellow-500/30 flex items-center justify-center">
                  <Clock size={12} className="text-yellow-500" />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                    Working Hours
                  </span>
                  <span className="text-[13px] font-medium text-gray-300">
                    Mon – Sat: 10:00 – 19:00
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Social Icons */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-[11px] text-white mr-1 uppercase tracking-wider">
                Follow Us:
              </span>
              {SocialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-7 h-7 rounded-full border border-yellow-500/20 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>


      </motion.nav>

      {/* ── MARQUEE (below full navbar) ── */}
      <div
        className="fixed left-0 w-full z-40 pointer-events-none"
        style={{ top: navHeight }}
      >
        <div className="bg-yellow-500/5 backdrop-blur-sm py-1.5 border-b border-yellow-500/20">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee text-yellow-300/80 text-xs font-medium tracking-wide">
              {[...Array(6)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="mx-6">
                    🚀 Idea se scale tak |{" "}
                    <b className="text-yellow-400">Scalemate</b> har step par
                    aapke saath.
                  </span>
                  <span className="mx-4 text-yellow-500/40">✦</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed left-0 w-full bg-[#0E0E0E] z-50 md:hidden border-b border-yellow-500/20 overflow-hidden"
            style={{ top: "104px" }} // topbar(40) + mainbar(64)
          >
            {/* Nav Links */}
            <div className="flex flex-col py-4 px-6 gap-1">
              {NavItems.map((item, index) => (
                <Link key={index} href={item.path}>
                  <span
                    className={`flex items-center gap-3 py-3 px-3 rounded-lg text-base font-medium transition-colors duration-200 ${pathname === item.path
                      ? "text-yellow-400 bg-yellow-500/10"
                      : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/5"
                      }`}
                  >
                    {pathname === item.path && (
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    )}
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-yellow-500/10" />

            {/* Bottom section: contact info + social + CTA */}
            <div className="px-6 py-4 flex flex-col gap-3">
              {/* Phone & Hours row */}
              <div className="flex items-center gap-4">
                <a
                  href="tel:+919777915737"
                  className="flex items-center gap-2 text-gray-400"
                >
                  <Phone size={13} className="text-yellow-500" />
                  <span className="text-sm">+91 97779-15737</span>
                </a>
                <span className="text-gray-700">|</span>
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock size={13} className="text-yellow-500" />
                  Mon–Sat: 10–19
                </span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 mr-1">Follow:</span>
                {SocialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-full border border-yellow-500/20 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400 transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  setOpen(false);
                }}
                className="w-full py-3 rounded-full text-sm font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition-colors duration-200 mt-1"
              >
                Book Free Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;