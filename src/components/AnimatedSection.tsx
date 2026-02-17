'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// GSAP-like smooth easing curves
const smoothEasing: [number, number, number, number] = [0.16, 1, 0.3, 1]; // expo.out
const backOutEasing: [number, number, number, number] = [0.34, 1.56, 0.64, 1]; // back.out(2)

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate' | 'blur' | 'slideUp' | 'pop';
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  easing?: 'smooth' | 'back' | 'default';
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  },
  slideUp: {
    hidden: { opacity: 0, y: 80, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 }
  },
  pop: {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }
};

export default function AnimatedSection({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.2,
  easing = 'back'
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const getEasing = () => {
    switch (easing) {
      case 'smooth': return smoothEasing;
      case 'back': return backOutEasing;
      default: return [0.25, 0.4, 0.25, 1] as [number, number, number, number];
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: getEasing()
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children component
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax component - GSAP-like smooth
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: -40 * speed }}
      transition={{ duration: 1, ease: smoothEasing }}
      viewport={{ once: false, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counter animation component
interface CounterProps {
  value: string;
  className?: string;
}

export function Counter({ value, className = '' }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Extract number from string like "2,500+" or "50K+"
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9,]/g, '');
  const hasComma = value.includes(',');

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {hasComma
            ? numericValue.toLocaleString()
            : numericValue}
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

// Magnetic hover effect - Ultra smooth
interface MagneticProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Magnetic({ children, className = '', intensity = 1 }: MagneticProps) {
  return (
    <motion.div
      whileHover={{ scale: 1 + (0.05 * intensity), y: -3 * intensity }}
      whileTap={{ scale: 1 - (0.03 * intensity) }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.8
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation - GSAP-like word-by-word with back.out easing
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({ text, className = '', delay = 0, staggerDelay = 0.05 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(' ');

  return (
    <motion.span ref={ref} className={`${className} overflow-hidden inline-block`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -15 }}
          transition={{
            duration: 0.6,
            delay: delay + i * staggerDelay,
            ease: backOutEasing
          }}
          style={{ display: 'inline-block', marginRight: '0.25em', perspective: '1000px' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Letter by letter reveal - like CPI Trade Media
interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function LetterReveal({ text, className = '', delay = 0 }: LetterRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const letters = text.split('');

  return (
    <motion.span ref={ref} className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            delay: delay + i * 0.02,
            ease: smoothEasing
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Image reveal animation - Smooth clip-path with scale
interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  withScale?: boolean;
}

export function ImageReveal({ children, className = '', direction = 'left', withScale = true }: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const clipPaths = {
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)'
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0%)'
    },
    up: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)'
    },
    down: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)'
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        clipPath: clipPaths[direction].hidden,
        scale: withScale ? 1.1 : 1,
        opacity: 0
      }}
      animate={isInView ? {
        clipPath: clipPaths[direction].visible,
        scale: 1,
        opacity: 1
      } : {
        clipPath: clipPaths[direction].hidden,
        scale: withScale ? 1.1 : 1,
        opacity: 0
      }}
      transition={{
        clipPath: { duration: 0.9, ease: smoothEasing },
        scale: { duration: 1.1, ease: smoothEasing },
        opacity: { duration: 0.6, ease: smoothEasing }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Smooth Hover Scale
interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function HoverScale({ children, className = '', scale = 1.05 }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale - 0.05 }}
      transition={{ duration: 0.4, ease: backOutEasing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
