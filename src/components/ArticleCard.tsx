'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  index?: number;
}

export default function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative h-[400px] rounded-lg overflow-hidden"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="bg-[#dc2626] text-white text-xs font-bold px-3 py-1 uppercase"
            >
              {article.category}
            </motion.span>
            {article.isTrending && (
              <span className="bg-[#ef4444] text-white text-xs font-bold px-2 py-1 uppercase">
                Trending
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#dc2626] transition-colors line-clamp-3">
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h2>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span>{article.author.name}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </motion.div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4 py-4 border-b border-gray-200 last:border-0 hover:bg-red-50/50 transition-all duration-300 ease-out hover:pl-2">
        <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[#dc2626] text-xs font-bold uppercase">
            {article.category}
          </span>
          <h3 className="font-semibold text-gray-900 group-hover:text-[#dc2626] transition-colors duration-300 line-clamp-2 text-sm mt-1">
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-gray-500 text-xs mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
        className="group flex gap-6 bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="relative w-1/3 min-h-[200px] overflow-hidden"
        >
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
          />
          {article.isTrending && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="absolute top-3 left-3 bg-[#ef4444] text-white text-xs font-bold px-2 py-1"
            >
              Trending
            </motion.span>
          )}
        </motion.div>
        <div className="flex-1 p-6 flex flex-col justify-center">
          <span className="text-[#dc2626] text-xs font-bold uppercase">
            {article.category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 mt-2">
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-2">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-4">
            <span className="font-medium">{article.author.name}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default card with beautiful animations
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[#dc2626]/40 to-transparent"
        />
        {article.isTrending && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-3 right-3 bg-[#ef4444] text-white text-xs font-bold px-2 py-1 rounded"
          >
            Trending
          </motion.span>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute bottom-3 left-3"
        >
          <span className="bg-[#dc2626] text-white text-xs font-bold px-2 py-1 uppercase rounded">
            {article.category}
          </span>
        </motion.div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 text-lg mb-2">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-sm">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dc2626] to-[#ef4444] flex items-center justify-center text-white font-bold text-xs">
              {article.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-gray-700 font-medium">{article.author.name}</span>
          </motion.div>
          <span className="text-gray-500 text-xs">{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </motion.article>
  );
}
