'use client';

import { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import LoadMoreButton from '@/components/LoadMoreButton';
import { getArticlesByCategory, getTrendingArticles, getLatestArticles } from '@/data/mock';

const subcategories = [
  { name: 'All', slug: '' },
  { name: 'AI & Technology', slug: 'ai-technology' },
  { name: 'Streaming & OTT', slug: 'streaming-ott' },
  { name: 'Production', slug: 'production' },
  { name: 'Satellite & Broadcasting', slug: 'satellite-broadcasting' },
  { name: 'Industry Updates', slug: 'industry-updates' },
];

export default function NewsPage() {
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const allArticles = getArticlesByCategory('news');
  const filteredArticles = activeSubcategory
    ? allArticles.filter(a => a.subcategory === activeSubcategory)
    : allArticles;
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const trendingArticles = getTrendingArticles(5);
  const latestArticles = getLatestArticles(5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">News</h1>
        <p className="text-gray-600">Latest news from the broadcast and media industry</p>
      </div>

      {/* Subcategory Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {subcategories.map((sub) => (
          <button
            key={sub.slug}
            onClick={() => {
              setActiveSubcategory(sub.slug);
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeSubcategory === sub.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles Grid */}
        <div className="lg:col-span-2">
          {visibleArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              <LoadMoreButton
                onClick={() => setVisibleCount(prev => prev + 6)}
                hasMore={hasMore}
              />
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No articles found in this category.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar
            trendingArticles={trendingArticles}
            latestArticles={latestArticles}
          />
        </div>
      </div>
    </div>
  );
}
