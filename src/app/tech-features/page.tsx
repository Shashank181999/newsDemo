'use client';

import { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { getArticlesByCategory } from '@/data/mock';

const subcategories = [
  { name: 'All', slug: '' },
  { name: 'Case Studies', slug: 'case-studies' },
  { name: 'Reviews', slug: 'reviews' },
  { name: 'Virtual Production', slug: 'virtual-production' },
  { name: 'New Media', slug: 'new-media' },
];

export default function TechFeaturesPage() {
  const [activeSubcategory, setActiveSubcategory] = useState('');

  const allArticles = getArticlesByCategory('tech-features');
  const filteredArticles = activeSubcategory
    ? allArticles.filter(a => a.subcategory === activeSubcategory)
    : allArticles;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech Features</h1>
        <p className="text-gray-600">In-depth technical features, case studies, and reviews</p>
      </div>

      {/* Subcategory Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {subcategories.map((sub) => (
          <button
            key={sub.slug}
            onClick={() => setActiveSubcategory(sub.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeSubcategory === sub.slug
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No articles found in this category.
        </div>
      )}
    </div>
  );
}
