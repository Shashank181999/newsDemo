'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (variant === 'featured') {
    return (
      <article className="group relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-[#dc2626] text-white text-xs font-bold px-3 py-1 uppercase">
              {article.category}
            </span>
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
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4 py-4 border-b border-gray-200 last:border-0">
        <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[#dc2626] text-xs font-bold uppercase">
            {article.category}
          </span>
          <h3 className="font-semibold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 text-sm mt-1">
            <Link href={`/article/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-gray-500 text-xs mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group flex gap-6 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-1/3 min-h-[200px]">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {article.isTrending && (
            <span className="absolute top-3 left-3 bg-[#ef4444] text-white text-xs font-bold px-2 py-1">
              Trending
            </span>
          )}
        </div>
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
      </article>
    );
  }

  // Default card
  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {article.isTrending && (
          <span className="absolute top-3 right-3 bg-[#ef4444] text-white text-xs font-bold px-2 py-1 rounded">
            Trending
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#dc2626] text-white text-xs font-bold px-2 py-1 uppercase">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 text-lg mb-2">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dc2626] to-[#ef4444] flex items-center justify-center text-white font-bold text-xs">
              {article.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-gray-700 font-medium">{article.author.name}</span>
          </div>
          <span className="text-gray-500 text-xs">{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}
