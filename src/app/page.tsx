'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Article } from '@/types';

// GSAP-like smooth easing curves - properly typed for framer-motion
const smoothEasing: [number, number, number, number] = [0.16, 1, 0.3, 1]; // expo.out
const backOutEasing: [number, number, number, number] = [0.34, 1.56, 0.64, 1]; // back.out(2)
const smoothQuart: [number, number, number, number] = [0.25, 1, 0.5, 1]; // quart.out

// Ultra smooth spring configurations - mimics GSAP
const smoothSpring = {
  type: "spring" as const,
  stiffness: 80,
  damping: 20,
  mass: 0.8
};

const gentleSpring = {
  type: "spring" as const,
  stiffness: 60,
  damping: 25,
  mass: 1
};

const snappySpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.5
};


// Smart Preloader - Ultra Smooth with GSAP-like animations
function Preloader({ dataLoaded, imageLoaded }: { dataLoaded: boolean; imageLoaded: boolean }) {
  const [progress, setProgress] = useState(0);
  const progressSpring = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    let targetProgress = 0;
    if (dataLoaded) targetProgress += 50;
    if (imageLoaded) targetProgress += 50;
    progressSpring.set(targetProgress);

    const unsubscribe = progressSpring.on("change", (v) => setProgress(v));
    return () => unsubscribe();
  }, [dataLoaded, imageLoaded, progressSpring]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: smoothEasing }}
      className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: backOutEasing }}
        className="mb-10"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#dc2626] to-[#991b1b] flex items-center justify-center shadow-2xl shadow-[#dc2626]/30"
            >
              <span className="text-white font-light text-2xl">BP</span>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.15, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: smoothEasing }}
              className="absolute inset-0 rounded-xl bg-[#dc2626] blur-xl"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEasing }}
          >
            <h1 className="text-3xl font-light text-white">
              Broadcast<span className="text-[#dc2626]">Pro</span>
            </h1>
            <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">Middle East & Africa</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-56 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
        <motion.div
          style={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#dc2626] rounded-full"
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: smoothEasing }}
        className="mt-4 text-gray-500 text-xs tracking-wider"
      >
        Loading experience...
      </motion.p>
    </motion.div>
  );
}

// Breaking News Ticker - Smooth animation
function BreakingNewsTicker({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: backOutEasing, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#dc2626] text-white py-2.5 overflow-hidden shadow-lg shadow-black/20"
    >
      <div className="flex items-center">
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: backOutEasing }}
          className="flex-shrink-0 px-4 py-1 bg-white text-[#dc2626] font-bold text-xs uppercase tracking-wide flex items-center gap-2 rounded-r-full shadow-lg"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: smoothEasing }}
            className="w-2 h-2 bg-[#dc2626] rounded-full"
          />
          Breaking
        </motion.div>
        <div className="overflow-hidden flex-1">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap will-change-transform"
          >
            {[...articles, ...articles].map((article, i) => (
              <span key={i} className="mx-8 text-sm font-light">
                {article.title}
                <span className="mx-6 opacity-30">|</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Hero Carousel with GSAP-like smooth animations
function HeroCarousel({ articles, onImageLoad, isReady }: { articles: Article[]; onImageLoad?: () => void; isReady?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const heroArticles = articles.slice(0, 5);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth parallax on scroll - use window scroll (no target ref needed)
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const imageParallax = useTransform(smoothScrollY, [0, 500], [0, 80]);
  const contentParallax = useTransform(smoothScrollY, [0, 500], [0, 40]);
  const opacityFade = useTransform(smoothScrollY, [0, 300], [1, 0.85]);

  // Notify parent when first image is loaded
  const handleImageLoad = useCallback(() => {
    if (!imageReady) {
      setImageReady(true);
      onImageLoad?.();
    }
  }, [imageReady, onImageLoad]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
  }, [heroArticles.length]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + heroArticles.length) % heroArticles.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentArticle = heroArticles[currentIndex];

  // GSAP-like slide variants with smooth easing
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '80%' : '-80%',
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: smoothEasing,
        opacity: { duration: 0.5 },
        filter: { duration: 0.6 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '40%' : '-40%',
      opacity: 0,
      scale: 0.98,
      filter: 'blur(5px)',
      transition: {
        duration: 0.6,
        ease: smoothQuart
      }
    })
  };

  if (!currentArticle) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={isMounted ? { opacity: opacityFade } : undefined}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="relative bg-[#0a0a0a] pt-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop: Split Layout - Content Left (First), Image Right (Second) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-0 h-[70vh]">
          {/* Text Content - Left Side - Animates FIRST with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            style={isMounted ? { y: contentParallax } : undefined}
            transition={{ duration: 0.9, delay: 0.1, ease: backOutEasing }}
            className="flex flex-col justify-center px-8 xl:px-12 py-12"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: isReady ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: smoothEasing }}
              >
                {/* Category & Date - Smooth slide in */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="px-3 py-1.5 bg-[#dc2626] text-white text-[10px] font-semibold uppercase tracking-[0.15em]">
                    {currentArticle.category}
                  </span>
                  <span className="text-gray-500 text-xs font-light">
                    {new Date(currentArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </motion.div>

                {/* Title - Smooth slide from left */}
                <motion.h1
                  initial={{ opacity: 0, x: -60 }}
                  animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-3xl xl:text-4xl 2xl:text-5xl text-white mb-5 leading-[1.2] font-light tracking-tight line-clamp-3"
                >
                  {currentArticle.title}
                </motion.h1>

                {/* Excerpt - Smooth slide from left */}
                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-base text-gray-400 mb-8 leading-relaxed font-light line-clamp-3"
                >
                  {currentArticle.excerpt}
                </motion.p>

                {/* Author & Button - Staggered animation */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#262626]">
                      <span className="text-white text-sm font-medium">{currentArticle.author.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{currentArticle.author.name}</p>
                      <p className="text-gray-500 text-xs font-light">Staff Reporter</p>
                    </div>
                  </div>

                  <Link
                    href={`/article/${currentArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#dc2626] text-white text-sm font-medium rounded-full hover:bg-[#b91c1c] transition-colors shadow-lg shadow-[#dc2626]/20"
                  >
                    Read Story
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Progress Dots */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-3 mt-10"
                >
                  {heroArticles.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentIndex ? 'bg-[#dc2626] w-8' : 'bg-[#262626] w-2 hover:bg-[#404040]'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-500 text-xs font-light">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(heroArticles.length).padStart(2, '0')}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image - Right Side - Animates with Content & Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={isReady ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 40 }}
            style={isMounted && isReady ? { y: imageParallax } : undefined}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden"
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ scale: 0.96, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: backOutEasing }}
                  whileHover={{ scale: 1.02 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                >
                  <Image
                    src={currentArticle.featuredImage}
                    alt={currentArticle.title}
                    fill
                    className="object-contain transition-transform duration-700"
                    priority
                    sizes="50vw"
                    quality={95}
                    onLoad={handleImageLoad}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Smooth hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: smoothEasing }}
              className="absolute bottom-6 right-6 flex gap-2 z-10"
            >
              <motion.button
                whileHover={{ scale: 1.15, backgroundColor: 'rgba(0,0,0,0.7)' }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.2, ease: backOutEasing }}
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, backgroundColor: 'rgba(0,0,0,0.7)' }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.2, ease: backOutEasing }}
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile & Tablet: Content First, Then Image */}
        <div className="lg:hidden">
          {/* Mobile Text Content - FIRST (Top) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isReady ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 pt-6 pb-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: isReady ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="px-2.5 py-1 bg-[#dc2626] text-white text-[9px] font-semibold uppercase tracking-wider">
                    {currentArticle.category}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(currentArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </motion.div>

                {/* Title - slide from left */}
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-xl sm:text-2xl text-white mb-3 leading-tight font-light line-clamp-2"
                >
                  {currentArticle.title}
                </motion.h1>

                {/* Excerpt - slide from left */}
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-sm text-gray-400 mb-4 line-clamp-2 font-light"
                >
                  {currentArticle.excerpt}
                </motion.p>

                {/* Author & Read Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xs font-medium">
                      {currentArticle.author.name.charAt(0)}
                    </div>
                    <span className="text-gray-400 text-xs">{currentArticle.author.name}</span>
                  </div>

                  <Link
                    href={`/article/${currentArticle.slug}`}
                    className="px-4 py-2 bg-[#dc2626] text-white text-sm font-medium rounded-full flex items-center gap-1"
                  >
                    Read Story
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image Container - Animates with Content */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-[16/10] mx-4 rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentArticle.featuredImage}
                    alt={currentArticle.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="100vw"
                    quality={90}
                    onLoad={handleImageLoad}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation on Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-3 right-3 flex gap-2 z-10"
            >
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </motion.div>
          </motion.div>

          {/* Mobile Progress Dots - Below Image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex items-center justify-center gap-2 py-5"
          >
            {heroArticles.map((_, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: 0.55 + index * 0.03 }}
                onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#dc2626] w-6' : 'bg-[#262626] w-1.5'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Article Card - GSAP-like smooth animations on scroll
function ArticleCard({ article, index, variant = 'default' }: { article: Article; index: number; variant?: 'default' | 'small' | 'horizontal' | 'featured' | 'video' }) {
  const cardRef = useRef<HTMLElement>(null);

  // GSAP-like smooth fade in with stagger
  const fadeInUp = {
    initial: { opacity: 0, y: 50, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 0.7,
      delay: index * 0.08,
      ease: backOutEasing
    }
  };

  if (variant === 'video') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-2xl shadow-black/40 border border-[#1a1a1a] hover:border-[#dc2626]/50 hover:shadow-[#dc2626]/20"
      >
        {/* Image with hover zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        {/* Video duration badge */}
        <div className="absolute top-4 right-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-white text-xs font-semibold flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          3:45
        </div>

        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
          Video
        </span>

        {/* Play button - centered with hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#dc2626] flex items-center justify-center shadow-2xl shadow-[#dc2626]/50 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-semibold text-lg line-clamp-2 mb-3">
            {article.title}
          </h3>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {(article.views || 1200).toLocaleString()}
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.article
        {...fadeInUp}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.5, ease: backOutEasing }}
        className="group relative h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.9, ease: smoothEasing }}
        >
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: smoothEasing }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block px-3 py-1 bg-[#dc2626] text-white text-xs font-semibold uppercase rounded-full shadow-lg"
          >
            {article.category}
          </motion.span>
          <h3 className="text-xl font-light text-white mt-3 line-clamp-2 group-hover:text-[#dc2626] transition-colors duration-500">
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-gray-400 text-sm mt-2">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>
      </motion.article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        {...fadeInUp}
        whileHover={{ x: 6, scale: 1.01 }}
        transition={{ duration: 0.4, ease: smoothEasing }}
        className="group flex gap-4 p-4 rounded-xl bg-[#111] border border-[#1a1a1a] hover:border-[#dc2626]/40 hover:bg-[#151515] shadow-lg"
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: smoothEasing }}
          className="relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0"
        >
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: smoothEasing }}
            className="text-[#dc2626] text-xs font-semibold uppercase tracking-wide inline-block"
          >
            {article.category}
          </motion.span>
          <h3 className="text-white font-light text-sm line-clamp-2 mt-1 group-hover:text-[#dc2626] transition-colors duration-500">
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-gray-500 text-xs mt-1">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>
      </motion.article>
    );
  }

  if (variant === 'small') {
    return (
      <motion.article
        {...fadeInUp}
        whileHover={{ x: 4, backgroundColor: 'rgba(26, 26, 26, 0.6)' }}
        transition={{ duration: 0.3, ease: smoothEasing }}
        className="group flex gap-3 py-3 border-b border-[#1a1a1a] last:border-0 px-2 rounded-lg"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: smoothEasing }}
          className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0"
        >
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-light line-clamp-2 group-hover:text-[#dc2626] transition-colors duration-500">
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-gray-500 text-xs mt-1">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>
      </motion.article>
    );
  }

  // Default card - GSAP-like smooth animations
  return (
    <motion.article
      ref={cardRef}
      {...fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: backOutEasing }}
      className="group bg-[#111] rounded-2xl overflow-hidden border border-[#1a1a1a] hover:border-[#dc2626]/40 shadow-xl shadow-black/20"
    >
      <div className="relative h-44 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: smoothEasing }}
        >
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: backOutEasing }}
          whileHover={{ scale: 1.08 }}
          className="absolute top-3 left-3 px-2.5 py-1 bg-[#dc2626] text-white text-xs font-semibold uppercase rounded-full shadow-lg"
        >
          {article.category}
        </motion.span>
      </div>
      <div className="p-4">
        <h3 className="text-white font-light text-sm mb-2 line-clamp-2 group-hover:text-[#dc2626] transition-colors duration-500">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">
          {article.excerpt}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: smoothEasing }}
          className="flex items-center justify-between text-xs text-gray-500"
        >
          <span>{article.author.name}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </motion.div>
      </div>
    </motion.article>
  );
}

// Section Title - GSAP-like smooth word reveal
function SectionTitle({ title, link }: { title: string; link?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: backOutEasing }}
      className="flex items-center justify-between mb-8"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: backOutEasing }}
          className="w-1 h-7 bg-gradient-to-b from-[#dc2626] to-[#991b1b] rounded-full origin-bottom"
        />
        <h2 className="text-2xl font-light text-white overflow-hidden">
          {title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: backOutEasing }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </div>
      {link && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: smoothEasing }}
        >
          <Link href={link} className="text-[#dc2626] text-sm font-medium hover:underline flex items-center gap-2 group">
            <motion.span whileHover={{ x: 3 }} transition={{ duration: 0.3, ease: smoothEasing }}>
              View All
            </motion.span>
            <motion.svg
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: smoothEasing }}
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

// Counter - Smooth spring-based counting animation
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const springValue = useSpring(0, { stiffness: 50, damping: 20, duration: 2500 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplayValue(Math.floor(v));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: backOutEasing }}
    >
      {displayValue.toLocaleString()}{suffix}
    </motion.div>
  );
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Fetch articles fast
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles?limit=30');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch {
        setArticles([]);
      } finally {
        setDataLoaded(true);
      }
    }
    fetchArticles();
  }, []);

  // Minimum time to show preloader (so user can see the animation)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => setMinTimeElapsed(true), 1500); // Show preloader for at least 1.5s
    return () => clearTimeout(minTimer);
  }, []);

  // Hide preloader when data + image ready AND minimum time has passed
  useEffect(() => {
    if (dataLoaded && heroImageLoaded && minTimeElapsed) {
      // Small delay for smooth transition
      setTimeout(() => setShowPreloader(false), 200);
    }
  }, [dataLoaded, heroImageLoaded, minTimeElapsed]);

  // Fallback: hide preloader after 4 seconds max
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 4000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleHeroImageLoad = useCallback(() => {
    setHeroImageLoaded(true);
  }, []);

  // Distribute articles across sections (optimized for 30 articles)
  const videoArticles = articles.slice(0, 4);
  const latestArticles = articles.slice(4, 10);
  const recommendedArticles = articles.slice(10, 16);
  const featuredArticles = articles.slice(16, 19);
  const trendingArticles = articles.slice(0, 6);
  const caseStudies = articles.slice(4, 7);
  const interviews = articles.slice(7, 10);
  const techFeatures = articles.slice(10, 13);
  const moreArticles = articles.slice(19, 27);

  return (
    <>
      {/* Preloader overlay - shows until image is ready */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200]"
          >
            <Preloader dataLoaded={dataLoaded} imageLoaded={heroImageLoaded} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content - renders behind preloader to load images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreloader ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-[#0a0a0a] pt-10"
      >
        <BreakingNewsTicker articles={articles.slice(0, 5)} />
        <HeroCarousel articles={articles} onImageLoad={handleHeroImageLoad} isReady={!showPreloader} />

        {/* Stats Section - Smooth stagger animation */}
        <section className="py-16 border-y border-[#1a1a1a] relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: smoothEasing }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#dc2626]/5 to-transparent"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: 2500, suffix: '+', label: 'Articles Published' },
                { value: 50, suffix: 'K+', label: 'Monthly Readers' },
                { value: 150, suffix: '+', label: 'Industry Partners' },
                { value: 25, suffix: '+', label: 'Years Experience' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: backOutEasing }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-[#1a1a1a] hover:border-[#dc2626]/30 shadow-xl cursor-default"
                >
                  <div className="text-3xl font-light text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: smoothEasing }}
                    className="text-gray-500 text-xs uppercase tracking-wider"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Videos Section - Clean UI with slide from left cards */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#dc2626]/3 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#dc2626]/3 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Section Header - Clean and Simple */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: backOutEasing }}
              className="flex items-center justify-between mb-12"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-12 bg-gradient-to-b from-[#dc2626] via-[#ef4444] to-[#991b1b] rounded-full" />
                <div>
                  <span className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.2em] block mb-1">
                    Watch Now
                  </span>
                  <h2 className="text-3xl font-light text-white">Latest Videos</h2>
                </div>
              </div>
              {/* Static Button - No animation */}
              <Link
                href="/videos"
                className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#dc2626] text-white text-sm font-medium rounded-full transition-colors duration-300 border border-[#262626] hover:border-[#dc2626]"
              >
                <span>View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Video Grid - renders after data loaded */}
            {dataLoaded && videoArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} variant="video" />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Main Grid: Latest + Sidebar */}
        <section className="py-16 bg-gradient-to-b from-[#080808] to-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <SectionTitle title="Latest News" link="/news" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {latestArticles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                {/* Newsletter */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="bg-gradient-to-br from-[#dc2626] via-[#b91c1c] to-[#991b1b] rounded-2xl p-6 shadow-2xl shadow-[#dc2626]/20 hover:scale-[1.02] transition-transform duration-300"
                >
                  <h3 className="text-xl font-light text-white mb-3">Newsletter</h3>
                  <p className="text-white/80 text-sm mb-4 font-light">Get weekly updates delivered to your inbox</p>
                  <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm mb-3 focus:outline-none focus:border-white/50 transition-colors" />
                  <button className="w-full py-3 bg-white text-[#dc2626] font-semibold rounded-xl text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                    Subscribe Now
                  </button>
                </motion.div>
                {/* Trending */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                  className="bg-[#111] rounded-2xl p-5 border border-[#1a1a1a] shadow-xl"
                >
                  <h3 className="text-lg font-light text-white mb-4 flex items-center gap-3">
                    <span className="w-1 h-5 bg-gradient-to-b from-[#dc2626] to-[#991b1b] rounded-full" />
                    Trending Now
                  </h3>
                  {trendingArticles.slice(0, 5).map((article, i) => <ArticleCard key={article.id} article={article} index={i} variant="small" />)}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Stories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Recommended For You" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recommendedArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} variant="horizontal" />
              ))}
            </div>
          </div>
        </section>

        {/* Category Grid: Case Studies, Interviews, Tech Features */}
        <section className="py-16 bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <SectionTitle title="Case Studies" />
                <div className="space-y-4">
                  {caseStudies.map((article, i) => <ArticleCard key={article.id} article={article} index={i} variant="horizontal" />)}
                </div>
              </div>
              <div>
                <SectionTitle title="Interviews" />
                <div className="space-y-4">
                  {interviews.map((article, i) => <ArticleCard key={article.id} article={article} index={i} variant="horizontal" />)}
                </div>
              </div>
              <div>
                <SectionTitle title="Tech Features" />
                <div className="space-y-4">
                  {techFeatures.map((article, i) => <ArticleCard key={article.id} article={article} index={i} variant="horizontal" />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Featured Stories" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* More Stories - Enhanced with slide from left */}
        {moreArticles.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808] relative overflow-hidden">
            {/* Background decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#dc2626]/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              {/* Enhanced Section Header */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: backOutEasing }}
                className="flex items-center justify-between mb-12"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: backOutEasing }}
                    className="w-1.5 h-12 bg-gradient-to-b from-[#dc2626] via-[#ef4444] to-[#991b1b] rounded-full origin-top"
                  />
                  <div>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: smoothEasing }}
                      className="text-[#dc2626] text-xs font-semibold uppercase tracking-[0.2em] block mb-1"
                    >
                      Keep Reading
                    </motion.span>
                    <h2 className="text-3xl font-light text-white">
                      {'More Stories'.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: backOutEasing }}
                          className="inline-block mr-2"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </h2>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: smoothEasing }}
                  className="hidden sm:flex items-center gap-3"
                >
                  <span className="text-gray-500 text-sm">{moreArticles.length} articles</span>
                  <Link
                    href="/news"
                    className="group flex items-center gap-2 px-5 py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-medium rounded-full transition-all duration-300 shadow-lg shadow-[#dc2626]/20"
                  >
                    <span>View All News</span>
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: smoothEasing }}
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stories Grid - Slide from left with stagger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {moreArticles.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -60, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: backOutEasing }}
                  >
                    <ArticleCard article={article} index={i} />
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: smoothEasing }}
                className="flex justify-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] hover:bg-[#262626] text-white font-medium rounded-full transition-all duration-300 border border-[#262626] hover:border-[#dc2626]/50"
                >
                  <span>Load More Stories</span>
                  <motion.svg
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: smoothEasing }}
                    className="w-5 h-5 text-[#dc2626]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </motion.svg>
                </motion.button>
              </motion.div>

              {/* Mobile View All Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="sm:hidden flex justify-center mt-8"
              >
                <Link
                  href="/news"
                  className="px-6 py-3 bg-[#dc2626] text-white font-medium rounded-full text-sm"
                >
                  View All News
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Categories - Smooth staggered animation */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Explore Categories" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'AI & Tech', color: 'from-violet-600 to-purple-800', icon: '🤖' },
                { name: 'Streaming', color: 'from-blue-600 to-cyan-800', icon: '📺' },
                { name: 'Production', color: 'from-emerald-600 to-teal-800', icon: '🎬' },
                { name: 'Broadcasting', color: 'from-orange-600 to-red-800', icon: '📡' },
                { name: 'Cloud', color: 'from-sky-600 to-blue-800', icon: '☁️' },
                { name: 'Events', color: 'from-pink-600 to-rose-800', icon: '🎪' },
              ].map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ y: 50, opacity: 0, scale: 0.9, rotateX: -15 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: backOutEasing }}
                  whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-br ${cat.color} rounded-2xl p-5 text-center cursor-pointer shadow-xl`}
                  style={{ perspective: '1000px' }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: backOutEasing }}
                    className="text-2xl mb-2 block"
                  >
                    {cat.icon}
                  </motion.span>
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Smooth reveal animation */}
        <section className="py-20 border-t border-[#1a1a1a] relative overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, ease: smoothEasing }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#dc2626] rounded-full blur-[150px]"
          />
          <div className="max-w-3xl mx-auto px-4 text-center relative">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: backOutEasing }}
              className="text-3xl font-light text-white mb-4 overflow-hidden"
            >
              {'Stay Ahead of the Industry'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: backOutEasing }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEasing }}
              className="text-gray-400 mb-8 text-base font-light"
            >
              Join thousands of professionals who trust BroadcastPro ME for the latest industry insights and analysis.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: smoothEasing }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: backOutEasing }}
              >
                <Link href="/news" className="px-8 py-3.5 bg-[#dc2626] text-white font-semibold rounded-full hover:bg-[#b91c1c] transition-colors shadow-xl shadow-[#dc2626]/30 inline-block">
                  Browse All News
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: backOutEasing }}
              >
                <Link href="/about" className="px-8 py-3.5 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-colors border border-white/20 inline-block backdrop-blur">
                  Learn About Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
