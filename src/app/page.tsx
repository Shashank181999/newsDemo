import ArticleCard from '@/components/ArticleCard';
import HeroSection from '@/components/HeroSection';
import Sidebar from '@/components/Sidebar';
import { getLatestPosts } from '@/lib/api';
import { videos } from '@/data/mock';
import Link from 'next/link';
import Image from 'next/image';

// ISR: Page is cached and revalidates every 10 minutes in background
export const revalidate = 600;

export default async function HomePage() {
  // Single fast API call with 3s timeout + 10min cache
  const allArticles = await getLatestPosts(15);

  // Derive all data from single API call
  const latestArticles = allArticles.slice(0, 10);
  const trendingArticles = allArticles.filter(a => a.isTrending).slice(0, 5);
  const techFeaturesDisplay = allArticles.slice(0, 4);
  const newsArticles = allArticles.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        articles={latestArticles.slice(0, 4)}
        trendingArticles={trendingArticles}
      />

      {/* Breaking News Ticker Tags */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#dc2626] text-white text-xs font-bold px-3 py-1 rounded animate-pulse">HOT</span>
            {['AI Technology', 'Streaming', 'Virtual Production', '5G Broadcasting', 'Cloud Media', 'Live Events'].map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-1.5 bg-gray-100 hover:bg-[#dc2626] hover:text-white text-gray-700 text-sm rounded-full transition-all duration-300 hover:scale-105"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { number: '2,500+', label: 'Articles Published', icon: '📰' },
              { number: '50K+', label: 'Monthly Readers', icon: '👥' },
              { number: '150+', label: 'Industry Partners', icon: '🤝' },
              { number: '25+', label: 'Years Experience', icon: '🏆' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-gray-400 text-[10px] md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-[#dc2626] rounded-full"></span>
                  Latest News
                </h2>
                <Link href="/news" className="text-[#dc2626] text-sm font-semibold hover:underline flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {newsArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Featured Video Section */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-[#dc2626] rounded-full"></span>
                  Featured Videos
                </h2>
                <Link href="/videos" className="text-[#dc2626] text-sm font-semibold hover:underline flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videos.slice(0, 4).map((video) => (
                  <div key={video.id} className="group relative rounded-xl overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-[#dc2626] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-[#dc2626] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">{video.views.toLocaleString()} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Features */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-[#dc2626] rounded-full"></span>
                  Tech Features
                </h2>
                <Link href="/tech-features" className="text-[#dc2626] text-sm font-semibold hover:underline flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Featured Tech Article */}
                <div className="md:row-span-2">
                  {techFeaturesDisplay[0] && (
                    <Link href={`/article/${techFeaturesDisplay[0].slug}`} className="group block h-full">
                      <div className="relative h-full min-h-[350px] rounded-xl overflow-hidden">
                        <Image
                          src={techFeaturesDisplay[0].featuredImage}
                          alt={techFeaturesDisplay[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        {techFeaturesDisplay[0].isTrending && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                              </svg>
                              Trending
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <span className="text-[#dc2626] text-xs font-bold uppercase bg-white px-2 py-1 rounded">
                            {techFeaturesDisplay[0].category}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-3 group-hover:text-gray-200 transition-colors line-clamp-2">
                            {techFeaturesDisplay[0].title}
                          </h3>
                          <p className="text-gray-300 text-sm mt-2 line-clamp-2">{techFeaturesDisplay[0].excerpt}</p>
                          <div className="flex items-center gap-3 mt-3 text-sm text-gray-400">
                            <span className="text-white font-medium">{techFeaturesDisplay[0].author.name}</span>
                            <span>•</span>
                            <span>{new Date(techFeaturesDisplay[0].publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                {/* Side Tech Articles */}
                <div className="space-y-4">
                  {techFeaturesDisplay.slice(1, 4).map((article) => (
                    <Link key={article.id} href={`/article/${article.slug}`} className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-[#dc2626] text-xs font-bold uppercase">{article.category}</span>
                        <h4 className="font-semibold text-gray-900 text-sm mt-1 line-clamp-2 group-hover:text-[#dc2626] transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar
              trendingArticles={trendingArticles}
              latestArticles={latestArticles.slice(0, 5)}
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Explore Categories</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">Discover the latest news and insights across all areas of broadcast and media technology</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { name: 'AI & Technology', icon: '🤖', count: 156, color: 'from-violet-600 to-purple-700', hover: 'hover:from-violet-500 hover:to-purple-600' },
              { name: 'Streaming & OTT', icon: '📺', count: 89, color: 'from-blue-600 to-cyan-700', hover: 'hover:from-blue-500 hover:to-cyan-600' },
              { name: 'Virtual Production', icon: '🎬', count: 67, color: 'from-emerald-600 to-teal-700', hover: 'hover:from-emerald-500 hover:to-teal-600' },
              { name: 'Broadcasting', icon: '📡', count: 124, color: 'from-orange-600 to-red-700', hover: 'hover:from-orange-500 hover:to-red-600' },
              { name: 'Cloud & Infrastructure', icon: '☁️', count: 78, color: 'from-sky-600 to-blue-700', hover: 'hover:from-sky-500 hover:to-blue-600' },
              { name: 'Live Events', icon: '🎤', count: 95, color: 'from-pink-600 to-rose-700', hover: 'hover:from-pink-500 hover:to-rose-600' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className={`group relative bg-gradient-to-br ${category.color} ${category.hover} rounded-xl md:rounded-2xl p-4 md:p-5 text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
              >
                <div className="absolute -top-4 -right-4 text-5xl md:text-6xl opacity-20 group-hover:opacity-30 transition-opacity transform group-hover:rotate-12">
                  {category.icon}
                </div>
                <div className="relative z-10">
                  <span className="text-2xl md:text-3xl mb-2 block">{category.icon}</span>
                  <h3 className="font-bold text-xs md:text-sm mb-1 leading-tight">{category.name}</h3>
                  <p className="text-white/70 text-[10px] md:text-xs">{category.count} articles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-12 md:py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Trusted by Industry Leaders</h2>
            <p className="text-gray-500 text-xs md:text-sm">Partnering with the world&apos;s leading broadcast technology companies</p>
          </div>
          {/* Logo Grid - 2 cols mobile, 3 cols tablet, 6 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 items-center">
            {[
              { name: 'Sony' },
              { name: 'Panasonic' },
              { name: 'Canon' },
              { name: 'Blackmagic' },
              { name: 'AWS' },
              { name: 'Adobe' },
            ].map((partner) => (
              <div key={partner.name} className="group flex flex-col items-center justify-center p-3 md:p-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer">
                <div className="h-10 md:h-12 flex items-center justify-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-black text-gray-800 tracking-tight">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Scrolling Marquee */}
          <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-100 overflow-hidden">
            <div className="relative">
              <div className="flex animate-marquee">
                {['RED Digital Cinema', 'Avid Technology', 'Grass Valley', 'Ross Video', 'Vizrt', 'EVS Broadcast', 'Evertz', 'Harmonic', 'Telestream', 'AJA Video'].map((name, i) => (
                  <div key={`a-${i}`} className="flex items-center shrink-0">
                    <span className="text-gray-500 font-semibold text-sm whitespace-nowrap px-6">{name}</span>
                    <span className="text-gray-300">•</span>
                  </div>
                ))}
                {['RED Digital Cinema', 'Avid Technology', 'Grass Valley', 'Ross Video', 'Vizrt', 'EVS Broadcast', 'Evertz', 'Harmonic', 'Telestream', 'AJA Video'].map((name, i) => (
                  <div key={`b-${i}`} className="flex items-center shrink-0">
                    <span className="text-gray-500 font-semibold text-sm whitespace-nowrap px-6">{name}</span>
                    <span className="text-gray-300">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2 md:gap-3">
                <span className="w-1 md:w-1.5 h-6 md:h-8 bg-[#dc2626] rounded-full"></span>
                Upcoming Events
              </h2>
              <p className="text-gray-600 text-sm mt-1">Don&apos;t miss the biggest industry events</p>
            </div>
            <Link href="/events" className="text-[#dc2626] text-sm font-semibold hover:underline flex items-center gap-1">
              View All Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'CABSAT 2025', date: 'May 20-22, 2025', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80', badge: 'Featured' },
              { name: 'NAB Show', date: 'April 5-8, 2025', location: 'Las Vegas, USA', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80', badge: 'Popular' },
              { name: 'IBC Amsterdam', date: 'Sept 12-16, 2025', location: 'Amsterdam, NL', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80', badge: 'New' },
            ].map((event) => (
              <div key={event.name} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  <Image src={event.image} alt={event.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#dc2626] text-white text-xs font-bold px-2 py-1 rounded">{event.badge}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl">{event.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-gray-600 text-sm mb-3">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <button className="w-full mt-4 py-2.5 border-2 border-[#dc2626] text-[#dc2626] font-semibold rounded-lg hover:bg-[#dc2626] hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Stay Ahead of the Curve</h2>
              <p className="text-white/80 text-sm md:text-base max-w-md">
                Subscribe to our newsletter and get the latest broadcast technology news delivered to your inbox every week.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 md:px-5 py-3 md:py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 w-full sm:min-w-[250px] md:min-w-[300px] shadow-lg text-sm md:text-base"
              />
              <button
                type="submit"
                className="px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg whitespace-nowrap text-sm md:text-base"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Ready to Stay Informed?</h2>
          <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust BroadcastPro ME for their daily dose of broadcast and media technology news.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/news" className="px-6 md:px-8 py-3 md:py-4 bg-[#dc2626] text-white font-bold rounded-xl hover:bg-[#b91c1c] transition-colors shadow-lg text-sm md:text-base">
              Browse All News
            </Link>
            <Link href="/about" className="px-6 md:px-8 py-3 md:py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm md:text-base">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
