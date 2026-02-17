'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  articles: Article[];
  trendingArticles?: Article[];
}

export default function HeroSection({ articles, trendingArticles = [] }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<'latest' | 'trending'>('latest');
  const [mounted, setMounted] = useState(false);
  const displayArticles = activeTab === 'latest' ? articles : trendingArticles;
  const mainArticle = displayArticles[0];
  const sideArticles = displayArticles.slice(1, 4);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();

  // Parallax transforms - only active after mount
  const imageY = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '25%']);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!mainArticle) return null;

  return (
    <section className="bg-white py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('latest')}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 rounded-t ${
                activeTab === 'latest'
                  ? 'bg-[#dc2626] text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Latest
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 rounded-t ${
                activeTab === 'trending'
                  ? 'bg-[#dc2626] text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Trending
            </motion.button>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Link href="/news" className="text-[#dc2626] text-sm font-medium hover:underline flex items-center gap-1">
              View All
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article with Parallax */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mainArticle.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              <article className="group relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Parallax Image Container */}
                {mounted ? (
                  <motion.div
                    style={{ y: imageY, scale: imageScale }}
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={mainArticle.featuredImage}
                      alt={mainArticle.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0">
                    <Image
                      src={mainArticle.featuredImage}
                      alt={mainArticle.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

                {/* Static Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Animated overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#dc2626]/30 via-transparent to-transparent"
                />

                {/* Content with parallax */}
                <motion.div
                  style={mounted ? { y: contentY } : undefined}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#dc2626] text-white text-xs font-bold px-4 py-1.5 uppercase rounded-full shadow-lg"
                    >
                      {mainArticle.category}
                    </motion.span>
                    {mainArticle.isTrending && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-4 py-1.5 uppercase rounded-full flex items-center gap-1 shadow-lg"
                      >
                        <motion.svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </motion.svg>
                        Hot
                      </motion.span>
                    )}
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
                  >
                    <Link
                      href={`/article/${mainArticle.slug}`}
                      className="hover:text-gray-200 transition-colors duration-300"
                    >
                      {mainArticle.title}
                    </Link>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-gray-200 text-sm sm:text-base mb-4 line-clamp-2 hidden sm:block"
                  >
                    {mainArticle.excerpt}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center gap-4 text-sm text-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dc2626] to-[#ef4444] flex items-center justify-center text-white font-bold text-xs">
                        {mainArticle.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-white">{mainArticle.author.name}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{formatDate(mainArticle.publishedAt)}</span>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="hidden sm:flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {mainArticle.views.toLocaleString()}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </motion.div>
                </div>
              </article>
            </motion.div>
          </AnimatePresence>

          {/* Side Articles */}
          <div className="space-y-4">
            <AnimatePresence>
              {sideArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#dc2626]/20 transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  <Link href={`/article/${article.slug}`} className="flex gap-4 p-4">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-28 h-24 sm:w-32 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1, type: 'spring' }}
                        className="absolute top-2 left-2 w-7 h-7 bg-[#dc2626] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                      >
                        {index + 2}
                      </motion.div>
                    </motion.div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <motion.span
                        className="text-[#dc2626] text-xs font-bold uppercase tracking-wider"
                        whileHover={{ x: 3 }}
                      >
                        {article.category}
                      </motion.span>
                      <h3 className="text-gray-900 font-bold text-sm sm:text-base line-clamp-2 mt-1.5 group-hover:text-[#dc2626] transition-colors duration-300">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(article.publishedAt)}
                      </div>
                    </div>
                    <motion.div
                      className="self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 3 }}
                    >
                      <svg className="w-5 h-5 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>

            {/* Subscribe CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-xl p-5 text-white shadow-xl shadow-red-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </motion.div>
                <span className="font-bold text-sm">Newsletter</span>
              </div>
              <p className="text-white/90 text-xs mb-3">Get the latest news delivered to your inbox</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-white text-[#dc2626] font-bold text-sm rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
