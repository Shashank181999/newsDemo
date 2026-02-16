'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { useState } from 'react';

interface HeroSectionProps {
  articles: Article[];
  trendingArticles?: Article[];
}

export default function HeroSection({ articles, trendingArticles = [] }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<'latest' | 'trending'>('latest');
  const displayArticles = activeTab === 'latest' ? articles : trendingArticles;
  const mainArticle = displayArticles[0];
  const sideArticles = displayArticles.slice(1, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!mainArticle) return null;

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('latest')}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-wider transition-all rounded-t ${
                activeTab === 'latest'
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-wider transition-all rounded-t ${
                activeTab === 'trending'
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Trending
            </button>
          </div>
          <Link href="/news" className="text-[#dc2626] text-sm font-medium hover:underline">
            View All →
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article className="group relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={mainArticle.featuredImage}
                alt={mainArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#dc2626] text-white text-xs font-bold px-3 py-1 uppercase rounded">
                    {mainArticle.category}
                  </span>
                  {mainArticle.isTrending && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 uppercase rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      Hot
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors line-clamp-3">
                  <Link href={`/article/${mainArticle.slug}`}>
                    {mainArticle.title}
                  </Link>
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-2 hidden sm:block">
                  {mainArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="font-medium text-white">{mainArticle.author.name}</span>
                  <span>•</span>
                  <span>{formatDate(mainArticle.publishedAt)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {mainArticle.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* Side Articles */}
          <div className="space-y-4">
            {sideArticles.map((article, index) => (
              <article
                key={article.id}
                className="group bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <Link href={`/article/${article.slug}`} className="flex gap-4 p-4">
                  <div className="relative w-28 h-20 sm:w-32 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1 left-1 bg-[#dc2626] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {index + 2}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[#dc2626] text-xs font-bold uppercase">
                      {article.category}
                    </span>
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base line-clamp-2 mt-1 group-hover:text-[#dc2626] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2">
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
