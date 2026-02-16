'use client';

import { Article } from '@/types';
import ArticleCard from './ArticleCard';
import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  trendingArticles: Article[];
  latestArticles: Article[];
}

export default function Sidebar({ trendingArticles, latestArticles }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'latest' | 'trending'>('latest');
  const displayArticles = activeTab === 'latest' ? latestArticles : trendingArticles;

  const popularTags = [
    'AI', 'Streaming', '5G', 'Broadcasting', 'OTT', 'Cloud',
    'Virtual Production', 'Media Tech', 'Video', 'Live Production'
  ];

  return (
    <aside className="space-y-8">
      {/* Tabbed Articles Widget */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex-1 px-4 py-3 font-bold text-sm uppercase ${
              activeTab === 'latest'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 px-4 py-3 font-bold text-sm uppercase ${
              activeTab === 'trending'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Trending
          </button>
        </div>
        <div className="p-4">
          {displayArticles.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="font-bold text-lg text-gray-900 mb-2">Subscribe to Newsletter</h3>
        <p className="text-gray-600 text-sm mb-4">
          Get the latest news and updates delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#dc2626] text-white font-semibold rounded-lg hover:bg-[#b91c1c] transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#dc2626]"></span>
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="px-3 py-1.5 bg-gray-100 hover:bg-[#dc2626] hover:text-white text-gray-700 text-sm rounded transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Social Follow */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#dc2626]"></span>
          Follow Us
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-[#1877f2] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span className="text-sm font-medium">Facebook</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span className="text-sm font-medium">Twitter</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-[#0077b5] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-[#ff0000] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span className="text-sm font-medium">YouTube</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
