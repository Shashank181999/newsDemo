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
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const displayArticles = activeTab === 'latest' ? latestArticles : trendingArticles;

  const popularTags = [
    'AI', 'Streaming', '5G', 'Broadcasting', 'OTT', 'Cloud',
    'Virtual Production', 'Media Tech', 'Video', 'Live Production'
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <aside className="space-y-8">
      {/* Newsletter Widget */}
      <div className="relative bg-gradient-to-br from-[#dc2626] via-[#b91c1c] to-[#991b1b] rounded-2xl p-6 text-white overflow-hidden shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>

          <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
          <p className="text-white/80 text-sm mb-4">
            Subscribe to our newsletter and never miss the latest news.
          </p>

          {isSubscribed ? (
            <div className="flex items-center gap-2 text-white bg-white/20 rounded-lg p-4 animate-fadeIn">
              <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-white text-[#dc2626] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Subscribe Now
              </button>
            </form>
          )}

          <p className="text-white/60 text-xs mt-3 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Tabbed Articles Widget */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex-1 px-4 py-3 font-bold text-sm uppercase transition-all duration-300 ${
              activeTab === 'latest'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 px-4 py-3 font-bold text-sm uppercase transition-all duration-300 ${
              activeTab === 'trending'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Trending
          </button>
        </div>
        <div className="p-4">
          {displayArticles.slice(0, 4).map((article, index) => (
            <div
              key={article.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ArticleCard article={article} variant="compact" index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full transition-all duration-300 hover:bg-[#dc2626] hover:text-white hover:scale-105"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Social Follow */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#dc2626] rounded-full" />
          Follow Us
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Facebook', color: 'bg-[#1877f2]', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
            { name: 'Twitter', color: 'bg-black', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
            { name: 'LinkedIn', color: 'bg-[#0077b5]', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
            { name: 'YouTube', color: 'bg-[#ff0000]', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
          ].map((social) => (
            <a
              key={social.name}
              href={`https://${social.name.toLowerCase()}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-3 ${social.color} text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
              <span className="text-sm font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Ad Space */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white text-center overflow-hidden relative transition-transform duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMiAyLTQgMi00cy0yLTItNC0yLTQgMC00IDIgMCAyIDIgNCAyIDRzLTIgMi00IDItNCAwLTQgMiAyIDQgMiA0cy0yIDItNCAyLTQgMi00IDQgMiA0IDIgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative z-10">
          <div className="text-4xl mb-3">📢</div>
          <h4 className="font-bold text-lg mb-2">Advertise With Us</h4>
          <p className="text-gray-400 text-sm mb-4">Reach 50K+ monthly readers</p>
          <button className="px-6 py-2 bg-[#dc2626] text-white font-bold text-sm rounded-lg hover:bg-[#b91c1c] transition-all duration-300 hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </aside>
  );
}
