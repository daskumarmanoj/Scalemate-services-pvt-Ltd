"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Modal from "./Ui/Modal";

const NavItems = [
  { name: "Home", id: "home" },
  { name: "Service", id: "service" },
  { name: "Process", id: "process" },
  { name: "Testimonials", id: "testimonials" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const [isOpen, setIsOpen] = useState(false);

  // Scroll navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy (Active section detection)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;

      NavItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActive(item.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // navbar height adjust
      const y =
        el.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full 
        bg-[#0B0B0B]/90 backdrop-blur-lg text-white 
        shadow-[0_15px_50px_rgba(0,0,0,0.7)] border border-yellow-500/20 
        transition-all duration-300 ${scrolled ? "top-0" : "top-4"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/finalLogo.png"
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {NavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition relative ${active === item.id
                  ? "text-[lab(78_12.63_63.5)]"
                  : "text-gray-300 hover:text-[lab(78_12.63_63.5)]"
                  }`}
              >
                {item.name}

                {/* Active underline */}
                {active === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-0.5 text-[lab(78_12.63_63.5)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2 rounded-full text-sm font-semibold 
              bg-[lab(78_12.63_63.5)] 
              text-black shadow-lg tracking-wider cursor-pointer hover:shadow-yellow-500/40 transition"
              onClick={() => setIsOpen(true)}
            >
              Book Consultation
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-yellow-400"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed left-1/2 -translate-x-1/2 w-[90%] bg-[#0B0B0B] 
          border border-yellow-500/20 rounded-2xl p-6 z-40 shadow-xl md:hidden 
          transition-all duration-300 ${scrolled ? "top-16" : "top-20"}`}
        >
          <div className="flex flex-col gap-4 text-center">
            {NavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className={`text-base font-medium ${active === item.id
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-yellow-400"
                  }`}
              >
                {item.name}
              </button>
            ))}

            {/* Mobile CTA */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 rounded-full font-semibold 
              bg-yellow-500 text-black shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              Book Consultation
            </motion.button>
          </div>
        </motion.div>
      )}
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />

    </>
  );
};

export default Navbar;
