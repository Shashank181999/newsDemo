'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => setShowConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setShowConsent(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#111] border border-[#262626] rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon & Text */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dc2626] to-[#991b1b] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-2">We value your privacy</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                        <button className="text-[#dc2626] hover:underline">Learn more</button>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                  <button
                    onClick={acceptEssential}
                    className="px-6 py-3 text-sm font-medium text-white bg-[#1a1a1a] hover:bg-[#262626] border border-[#333] rounded-xl transition-colors duration-200"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-3 text-sm font-medium text-white bg-[#dc2626] hover:bg-[#b91c1c] rounded-xl transition-colors duration-200 shadow-lg shadow-[#dc2626]/20"
                  >
                    Accept All
                  </button>
                </div>
              </div>

              {/* Cookie Types */}
              <div className="mt-6 pt-6 border-t border-[#262626]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-gray-400 text-xs">Essential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400 text-xs">Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-gray-400 text-xs">Marketing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-400 text-xs">Preferences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
