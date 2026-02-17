'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// Smooth easing curves
const smoothEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const backOutEasing: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const navItems = [
  {
    label: 'News',
    href: '/news',
    dropdown: [
      { label: 'AI & Technology', href: '/news/ai-technology' },
      { label: 'Streaming & OTT', href: '/news/streaming-ott' },
      { label: 'Production', href: '/news/production' },
      { label: 'Broadcasting', href: '/news/broadcasting' },
      { label: 'Industry Updates', href: '/news/industry-updates' },
    ]
  },
  {
    label: 'Tech Features',
    href: '/tech-features',
    dropdown: [
      { label: 'Case Studies', href: '/tech-features/case-studies' },
      { label: 'Reviews', href: '/tech-features/reviews' },
      { label: 'Virtual Production', href: '/tech-features/virtual-production' },
    ]
  },
  { label: 'Photos', href: '/photos' },
  { label: 'Videos', href: '/videos' },
  { label: 'Opinion', href: '/opinion' },
  { label: 'Interviews', href: '/interviews' },
  { label: 'Products', href: '/products' },
  { label: 'Events', href: '/events' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll-based header background
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const smoothOpacity = useSpring(headerOpacity, { stiffness: 100, damping: 30 });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: backOutEasing }}
      className={`sticky top-10 z-50 transition-shadow duration-500 ${scrolled ? 'shadow-lg shadow-black/50' : ''}`}
    >
      {/* Top Bar - Dark with smooth animations */}
      <motion.div
        style={{ opacity: smoothOpacity }}
        className="bg-[#1a1a1a] text-white py-2"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {[
              { href: "https://facebook.com", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { href: "https://twitter.com", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
              { href: "https://linkedin.com", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { href: "https://youtube.com", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
            ].map((social, i) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: smoothEasing }}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hover:text-[#dc2626] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon}/></svg>
              </motion.a>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: smoothEasing }}
            className="text-xs text-gray-400"
          >
            Your Trusted Source for Broadcast & Media Technology
          </motion.div>
        </div>
      </motion.div>

      {/* Logo Section */}
      <div className="bg-[#0a0a0a] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo - Smooth hover animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: backOutEasing }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: backOutEasing }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-[#dc2626] to-[#ef4444] text-white font-black text-2xl sm:text-3xl px-4 py-2 rounded-lg shadow-lg shadow-[#dc2626]/20">
                    BP
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: smoothEasing }}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ef4444] rounded-full"
                  />
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Broadcast<span className="text-[#dc2626]">Pro</span>
                  </h1>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-widest uppercase">
                    Middle East & Africa
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Search and Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: backOutEasing }}
              className="flex items-center gap-3"
            >
              {/* Search */}
              <div className="relative">
                <motion.button
                  onClick={() => setSearchOpen(!searchOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: backOutEasing }}
                  className="p-2 hover:bg-[#262626] rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -15, scale: 0.95, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(5px)' }}
                      transition={{ duration: 0.3, ease: backOutEasing }}
                      className="absolute right-0 top-12 w-72 bg-[#141414] shadow-xl rounded-lg p-3 border border-[#262626]"
                    >
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#dc2626] transition-colors duration-300"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: backOutEasing }}
                className="lg:hidden p-2 hover:bg-[#262626] rounded-lg transition-colors"
              >
                <motion.svg
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: backOutEasing }}
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </motion.svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Desktop with smooth animations */}
      <nav className="hidden lg:block bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center">
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: smoothEasing }}
            >
              <Link
                href="/"
                className="block px-4 py-3 text-white font-medium hover:bg-[#dc2626] transition-colors duration-300"
              >
                Home
              </Link>
            </motion.li>
            {navItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * (i + 1), ease: smoothEasing }}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-3 text-white font-medium hover:bg-[#dc2626] transition-colors duration-300"
                >
                  {item.label}
                  {item.dropdown && (
                    <motion.svg
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: smoothEasing }}
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  )}
                </Link>
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: backOutEasing }}
                      className="absolute left-0 top-full bg-[#141414] shadow-xl rounded-b-lg py-2 min-w-[200px] z-50 border border-[#262626] border-t-0"
                    >
                      {item.dropdown.map((subItem, j) => (
                        <motion.div
                          key={subItem.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: j * 0.05, ease: smoothEasing }}
                        >
                          <Link
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-300 hover:bg-[#dc2626] hover:text-white transition-all duration-300 hover:pl-5"
                          >
                            {subItem.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation - Smooth slide animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEasing }}
            className="lg:hidden bg-[#0a0a0a] border-t border-[#262626] overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: backOutEasing }}
              >
                <Link href="/" className="block px-4 py-3 text-[#dc2626] font-semibold border-l-4 border-[#dc2626] bg-[#dc2626]/10">
                  Home
                </Link>
              </motion.div>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + (i + 1) * 0.05, ease: backOutEasing }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-300 font-medium hover:text-[#dc2626] hover:bg-[#141414] hover:pl-6 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
