'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// Smooth easing curves
const smoothEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const backOutEasing: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand - Smooth reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: backOutEasing }}
          >
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.3, ease: backOutEasing }}
                className="bg-gradient-to-br from-[#dc2626] to-[#ef4444] text-white font-black text-xl px-3 py-2 rounded-lg"
              >
                BP
              </motion.div>
              <div>
                <span className="text-xl font-black">BroadcastPro</span>
                <p className="text-xs text-gray-400">Middle East & Africa</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Your trusted source for broadcast and media technology news, insights, and analysis from the Middle East and Africa.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://facebook.com", bg: "bg-[#1877f2]", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { href: "https://twitter.com", bg: "bg-black border border-gray-700", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { href: "https://linkedin.com", bg: "bg-[#0077b5]", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { href: "https://youtube.com", bg: "bg-[#ff0000]", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
              ].map((social, i) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: backOutEasing }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 ${social.bg} rounded-lg flex items-center justify-center transition-opacity`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon}/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Smooth reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: backOutEasing }}
          >
            <h3 className="font-bold text-lg mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'News', href: '/news' },
                { name: 'Tech Features', href: '/tech-features' },
                { name: 'Videos', href: '/videos' },
                { name: 'Photos', href: '/photos' },
                { name: 'Events', href: '/events' },
              ].map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: smoothEasing }}
                >
                  <Link href={item.href} className="text-gray-400 hover:text-[#dc2626] hover:pl-2 transition-all duration-300 text-sm inline-block">
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories - Smooth reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: backOutEasing }}
          >
            <h3 className="font-bold text-lg mb-5 text-white">Categories</h3>
            <ul className="space-y-3">
              {[
                { name: 'AI & Technology', href: '/category/ai-technology' },
                { name: 'Streaming & OTT', href: '/category/streaming-ott' },
                { name: 'Broadcasting', href: '/category/broadcasting' },
                { name: 'Virtual Production', href: '/category/virtual-production' },
                { name: 'Products', href: '/products' },
              ].map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: smoothEasing }}
                >
                  <Link href={item.href} className="text-gray-400 hover:text-[#dc2626] hover:pl-2 transition-all duration-300 text-sm inline-block">
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact - Smooth reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: backOutEasing }}
          >
            <h3 className="font-bold text-lg mb-5 text-white">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              {[
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "Dubai Media City, Dubai, UAE", isLink: false },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "info@broadcastpro.me", href: "mailto:info@broadcastpro.me", isLink: true },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "+971 4 XXX XXXX", isLink: false },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: smoothEasing }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-[#dc2626] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.isLink ? (
                    <a href={item.href} className="text-gray-400 hover:text-[#dc2626] transition-colors duration-300">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400">{item.text}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar - Smooth fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: smoothEasing }}
          className="border-t border-gray-800 mt-10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} BroadcastPro ME. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Use', href: '/terms' },
                { name: 'Advertise', href: '/advertise' },
              ].map((link, i) => (
                <motion.span
                  key={link.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.05, ease: smoothEasing }}
                >
                  <Link href={link.href} className="text-gray-500 hover:text-[#dc2626] transition-colors duration-300">
                    {link.name}
                  </Link>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
