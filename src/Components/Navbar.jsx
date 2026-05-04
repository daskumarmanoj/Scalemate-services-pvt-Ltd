"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const marqueeTop = scrolled ? "75px" : "85px";

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
        transition-all duration-300 ${scrolled ? "top-0" : "top-2"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/finalLogo.png"
                width={55}
                height={55}
                alt="logo"
                priority
              />
              <div className="hidden lg:flex flex-col text-[12px] text-gray-400 border-l border-gray-700 pl-4 leading-tight">
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {NavItems.map((item, index) => (
              <Link key={index} href={item.path}>
                <span
                  className={`text-sm font-medium transition relative cursor-pointer ${pathname === item.path
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                    }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-500"
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2 rounded-full text-sm font-semibold 
              bg-yellow-500 text-black shadow-lg tracking-wider cursor-pointer 
              hover:shadow-yellow-500/40 transition"
              onClick={() => setIsOpen(true)}
            >
              Book Consultation
            </motion.button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-yellow-400"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 🔁 Marquee */}
      <div
        className="fixed left-0 w-full z-40 pointer-events-none"
        style={{ top: marqueeTop }}
      >
        <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-yellow-500/10 backdrop-blur-sm py-2 border-y border-yellow-500/30">
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee text-yellow-300 text-sm font-medium tracking-wide">
              <span className="mx-8">
                🚀 Idea se scale tak | <b className="text-white">Scalemate</b> har step par aapke saath.
              </span>
              <span className="mx-8">✦</span>
              <span className="mx-8">
                💡 Idea se scale tak | <b className="text-white">Scalemate</b> har step par aapke saath.
              </span>
              <span className="mx-8">✦</span>
              <span className="mx-8">
                💡 Idea se scale tak | <b className="text-white">Scalemate</b> har step par aapke saath.
              </span>
              <span className="mx-8">✦</span>
              <span className="mx-8">
                💡 Idea se scale tak | <b className="text-white">Scalemate</b> har step par aapke saath.
              </span>              <span className="mx-8">✦</span>
              <span className="mx-8">
                💡 Idea se scale tak | <b className="text-white">Scalemate</b> har step par aapke saath.
              </span>              <span className="mx-8">✦</span>
              <span className="mx-8">
                💡 Idea se scale tak | <b className="text-white">Scalemate</b> har step par aapke saath.
              </span>              <span className="mx-8">✦</span>
              <span className="mx-8">
                💡 Idea se scale tak | <b className="text-white">Scalemate</b> har step par aapke saath.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[80px] left-0 w-full bg-[#0B0B0B] z-50 md:hidden border-t border-yellow-500/20"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              {NavItems.map((item, index) => (
                <Link key={index} href={item.path}>
                  <span
                    className={`text-lg font-medium ${pathname === item.path
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsOpen(true);
                  setOpen(false);
                }}
                className="px-6 py-2 rounded-full text-sm font-semibold bg-yellow-500 text-black"
              >
                Book Consultation
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