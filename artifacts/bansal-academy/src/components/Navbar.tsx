import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import logoPath from "@assets/BansalAcademyLogo_1775025162159.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className={`w-full max-w-4xl rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-white/90 backdrop-blur-2xl shadow-xl shadow-blue-100/60 border border-blue-100"
              : "bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-50/50 border border-white/90"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-2">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={logoPath}
                  alt="The Bansal Academy"
                  className="h-14 md:h-16 w-auto object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-blue-200"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/8"
                      }`}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md shadow-blue-200 hover:shadow-blue-300 hover:bg-blue-700 transition-all duration-200"
              >
                Book Free Demo
              </motion.button>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-foreground/70 hover:bg-primary/8 transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <line x1="3" y1="16" x2="21" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden overflow-hidden border-t border-blue-50"
              >
                <div className="px-4 py-4 flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = location === link.href;
                    return (
                      <Link key={link.href} href={link.href}>
                        <span
                          className={`block px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-foreground/70 hover:bg-primary/8 hover:text-primary"
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                  <Link href="/contact">
                    <span className="block mt-2 px-4 py-3 rounded-xl bg-primary text-white font-bold text-center text-sm cursor-pointer">
                      Book Free Demo
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
