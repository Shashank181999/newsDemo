import { Article, Author, Category, Video, PhotoGallery, Event } from '@/types';

// Mock Authors
export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    bio: 'Senior Editor covering broadcast technology and media trends.',
    social: { twitter: '@sarahjohnson', linkedin: 'sarahjohnson' }
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    bio: 'Technology correspondent specializing in streaming and OTT platforms.',
    social: { twitter: '@michaelchen', linkedin: 'michaelchen' }
  },
  {
    id: '3',
    name: 'Emma Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    bio: 'Film and production industry analyst.',
    social: { twitter: '@emmawilliams', linkedin: 'emmawilliams' }
  },
  {
    id: '4',
    name: 'David Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    bio: 'AI and emerging technology reporter.',
    social: { twitter: '@davidpark', linkedin: 'davidpark' }
  }
];

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'News',
    slug: 'news',
    description: 'Latest news from the broadcast and media industry',
    subcategories: [
      { id: '1-1', name: 'AI & Technology', slug: 'ai-technology' },
      { id: '1-2', name: 'Streaming & OTT', slug: 'streaming-ott' },
      { id: '1-3', name: 'Production', slug: 'production' },
      { id: '1-4', name: 'Satellite & Broadcasting', slug: 'satellite-broadcasting' },
      { id: '1-5', name: 'Industry Updates', slug: 'industry-updates' },
      { id: '1-6', name: 'Mergers & Acquisitions', slug: 'mergers-acquisitions' }
    ]
  },
  {
    id: '2',
    name: 'Tech Features',
    slug: 'tech-features',
    description: 'In-depth technical features and case studies',
    subcategories: [
      { id: '2-1', name: 'Case Studies', slug: 'case-studies' },
      { id: '2-2', name: 'Reviews', slug: 'reviews' },
      { id: '2-3', name: 'Virtual Production', slug: 'virtual-production' },
      { id: '2-4', name: 'New Media', slug: 'new-media' }
    ]
  },
  {
    id: '3',
    name: 'Videos',
    slug: 'videos',
    description: 'Video content and interviews'
  },
  {
    id: '4',
    name: 'Photos',
    slug: 'photos',
    description: 'Photo galleries from events and productions'
  },
  {
    id: '5',
    name: 'Opinion',
    slug: 'opinion',
    description: 'Expert opinions and analysis'
  },
  {
    id: '6',
    name: 'Interviews',
    slug: 'interviews',
    description: 'Exclusive interviews with industry leaders'
  },
  {
    id: '7',
    name: 'Products',
    slug: 'products',
    description: 'Latest product announcements and reviews'
  },
  {
    id: '8',
    name: 'Events',
    slug: 'events',
    description: 'Industry events and conferences'
  }
];

// Mock Articles
export const articles: Article[] = [
  {
    id: '1',
    title: 'AI Revolution Transforms Live Broadcasting: New Era of Automated Production',
    slug: 'ai-revolution-transforms-live-broadcasting',
    excerpt: 'Artificial intelligence is reshaping how live broadcasts are produced, with automated camera systems and real-time graphics generation becoming industry standard.',
    content: `<p>The broadcasting industry is witnessing a paradigm shift as artificial intelligence technologies become deeply integrated into live production workflows. From automated camera tracking to real-time graphics generation, AI is revolutionizing every aspect of broadcast production.</p>
    <p>Major broadcasters are now deploying AI-powered systems that can automatically track action, switch between camera angles, and generate graphics in real-time without human intervention.</p>
    <h2>Key Developments</h2>
    <p>Several leading technology providers have announced new AI-driven solutions that promise to reduce production costs while improving output quality.</p>
    <p>Industry analysts predict that by 2026, over 60% of live sports broadcasts will utilize some form of AI assistance in their production pipeline.</p>`,
    category: 'news',
    subcategory: 'ai-technology',
    author: authors[3],
    publishedAt: '2025-02-15T10:30:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80',
    tags: ['AI', 'Broadcasting', 'Live Production', 'Technology'],
    views: 15420,
    isFeatured: true,
    isTrending: true
  },
  {
    id: '2',
    title: 'Global Streaming Platforms Report Record Subscriber Growth in Q4',
    slug: 'global-streaming-platforms-record-subscriber-growth',
    excerpt: 'Major streaming services announce unprecedented subscriber numbers as cord-cutting accelerates worldwide.',
    content: `<p>The streaming industry continues its explosive growth trajectory, with major platforms reporting record-breaking subscriber additions in the fourth quarter.</p>
    <p>The shift from traditional cable to streaming services has accelerated, driven by improved content offerings and competitive pricing strategies.</p>
    <h2>Market Analysis</h2>
    <p>Analysts note that the streaming market is becoming increasingly fragmented, with viewers subscribing to multiple services to access desired content.</p>`,
    category: 'news',
    subcategory: 'streaming-ott',
    author: authors[1],
    publishedAt: '2025-02-14T14:00:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80',
    tags: ['Streaming', 'OTT', 'Subscribers', 'Industry Growth'],
    views: 12350,
    isFeatured: true,
    isTrending: true
  },
  {
    id: '3',
    title: 'Virtual Production Studios See 200% Investment Increase',
    slug: 'virtual-production-studios-investment-increase',
    excerpt: 'Film and TV production facilities are rapidly adopting LED volume technology as virtual production becomes mainstream.',
    content: `<p>Investment in virtual production facilities has surged by 200% over the past year, as studios worldwide embrace LED volume technology for film and television production.</p>
    <p>The technology, which allows real-time rendering of backgrounds and environments, is transforming how content is created.</p>`,
    category: 'tech-features',
    subcategory: 'virtual-production',
    author: authors[2],
    publishedAt: '2025-02-13T09:15:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    tags: ['Virtual Production', 'LED Volume', 'Film Production', 'Investment'],
    views: 8920,
    isFeatured: false,
    isTrending: true
  },
  {
    id: '4',
    title: 'Major Broadcaster Announces $2B Technology Upgrade Initiative',
    slug: 'major-broadcaster-technology-upgrade-initiative',
    excerpt: 'Leading broadcast network commits to comprehensive infrastructure modernization program.',
    content: `<p>One of the world's largest broadcast networks has announced a $2 billion investment in technology infrastructure upgrades over the next three years.</p>
    <p>The initiative will focus on cloud migration, AI integration, and next-generation broadcast capabilities.</p>`,
    category: 'news',
    subcategory: 'industry-updates',
    author: authors[0],
    publishedAt: '2025-02-12T16:45:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    tags: ['Broadcasting', 'Investment', 'Infrastructure', 'Cloud'],
    views: 7650,
    isFeatured: true,
    isTrending: false
  },
  {
    id: '5',
    title: '5G Networks Enable Revolutionary Remote Production Workflows',
    slug: '5g-networks-remote-production-workflows',
    excerpt: 'Broadcasters leverage 5G connectivity for seamless remote production capabilities across global events.',
    content: `<p>The rollout of 5G networks is enabling broadcasters to implement remote production workflows that were previously impossible.</p>
    <p>Production teams can now operate from centralized facilities while covering events thousands of miles away.</p>`,
    category: 'tech-features',
    subcategory: 'case-studies',
    author: authors[1],
    publishedAt: '2025-02-11T11:20:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    tags: ['5G', 'Remote Production', 'Connectivity', 'Broadcast'],
    views: 6430,
    isFeatured: false,
    isTrending: false
  },
  {
    id: '6',
    title: 'Industry Leaders Discuss Future of Content Distribution at Global Summit',
    slug: 'industry-leaders-future-content-distribution',
    excerpt: 'Top executives share insights on evolving content distribution strategies at annual technology conference.',
    content: `<p>Leaders from major media companies gathered at the annual Global Media Summit to discuss the future of content distribution.</p>
    <p>Key topics included the role of AI in content recommendation, the evolution of advertising models, and emerging markets growth.</p>`,
    category: 'interviews',
    author: authors[0],
    publishedAt: '2025-02-10T08:00:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    tags: ['Summit', 'Content Distribution', 'Industry Leaders', 'Conference'],
    views: 5890,
    isFeatured: false,
    isTrending: false
  },
  {
    id: '7',
    title: 'Cloud-Based Broadcasting: The Complete Transition Guide',
    slug: 'cloud-based-broadcasting-transition-guide',
    excerpt: 'A comprehensive look at how broadcasters are successfully migrating to cloud infrastructure.',
    content: `<p>Cloud-based broadcasting has moved from experimental to essential, with major networks completing their digital transformation journeys.</p>
    <p>This guide examines the key considerations, challenges, and benefits of cloud migration for broadcast operations.</p>`,
    category: 'tech-features',
    subcategory: 'case-studies',
    author: authors[3],
    publishedAt: '2025-02-09T13:30:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['Cloud', 'Broadcasting', 'Digital Transformation', 'Infrastructure'],
    views: 4560,
    isFeatured: false,
    isTrending: false
  },
  {
    id: '8',
    title: 'The Rise of FAST Channels: Free Ad-Supported Streaming Takes Center Stage',
    slug: 'rise-of-fast-channels-streaming',
    excerpt: 'Free ad-supported streaming television emerges as the fastest-growing segment in digital video.',
    content: `<p>FAST (Free Ad-Supported Streaming Television) channels have emerged as the fastest-growing segment in the streaming industry.</p>
    <p>Platforms offering free, ad-supported content are attracting millions of viewers seeking alternatives to paid subscriptions.</p>`,
    category: 'news',
    subcategory: 'streaming-ott',
    author: authors[1],
    publishedAt: '2025-02-08T10:00:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
    tags: ['FAST', 'Streaming', 'Advertising', 'OTT'],
    views: 8970,
    isFeatured: false,
    isTrending: true
  },
  {
    id: '9',
    title: 'Next-Generation Cameras Transform Sports Broadcasting',
    slug: 'next-gen-cameras-sports-broadcasting',
    excerpt: 'Ultra-high-definition cameras with AI-powered features are changing how sports are captured and broadcast.',
    content: `<p>Sports broadcasting is being transformed by next-generation camera systems that combine ultra-high-definition capture with AI-powered automation.</p>
    <p>These systems can automatically track players, generate replays, and provide real-time analytics overlays.</p>`,
    category: 'products',
    author: authors[2],
    publishedAt: '2025-02-07T15:45:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    tags: ['Cameras', 'Sports', 'Broadcasting', 'Technology'],
    views: 6780,
    isFeatured: false,
    isTrending: false
  },
  {
    id: '10',
    title: 'Opinion: Why Traditional Broadcasters Must Embrace Digital-First Strategy',
    slug: 'opinion-broadcasters-digital-first-strategy',
    excerpt: 'An analysis of why legacy broadcasters need to prioritize digital transformation to remain competitive.',
    content: `<p>The media landscape has fundamentally shifted, and traditional broadcasters that fail to embrace a digital-first strategy risk becoming obsolete.</p>
    <p>This opinion piece examines the strategic imperatives for legacy media companies in the streaming age.</p>`,
    category: 'opinion',
    author: authors[0],
    publishedAt: '2025-02-06T09:30:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    tags: ['Opinion', 'Digital Strategy', 'Broadcasting', 'Transformation'],
    views: 4320,
    isFeatured: false,
    isTrending: false
  }
];

// Mock Videos
export const videos: Video[] = [
  {
    id: '1',
    title: 'Inside the World\'s Most Advanced Virtual Production Studio',
    slug: 'inside-advanced-virtual-production-studio',
    description: 'Take an exclusive tour of a state-of-the-art virtual production facility featuring the latest LED volume technology.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    videoUrl: 'https://example.com/videos/virtual-studio-tour.mp4',
    duration: '12:45',
    category: 'tech-features',
    publishedAt: '2025-02-14T10:00:00Z',
    views: 45600
  },
  {
    id: '2',
    title: 'Interview: CEO Discusses Future of Streaming',
    slug: 'ceo-interview-future-streaming',
    description: 'Exclusive interview with a leading streaming platform CEO on industry trends and future strategies.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    videoUrl: 'https://example.com/videos/ceo-interview.mp4',
    duration: '18:30',
    category: 'interviews',
    publishedAt: '2025-02-12T14:00:00Z',
    views: 32100
  },
  {
    id: '3',
    title: 'AI in Broadcasting: A Technical Deep Dive',
    slug: 'ai-broadcasting-technical-deep-dive',
    description: 'Technical exploration of how AI is being integrated into broadcast production workflows.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    videoUrl: 'https://example.com/videos/ai-broadcasting.mp4',
    duration: '24:15',
    category: 'tech-features',
    publishedAt: '2025-02-10T09:00:00Z',
    views: 28900
  },
  {
    id: '4',
    title: 'Global Media Summit 2025 Highlights',
    slug: 'global-media-summit-2025-highlights',
    description: 'Key moments and announcements from the annual Global Media Summit.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    videoUrl: 'https://example.com/videos/summit-highlights.mp4',
    duration: '8:20',
    category: 'events',
    publishedAt: '2025-02-08T16:00:00Z',
    views: 19500
  }
];

// Mock Photo Galleries
export const photoGalleries: PhotoGallery[] = [
  {
    id: '1',
    title: 'Global Media Summit 2025',
    slug: 'global-media-summit-2025',
    description: 'Photo coverage from the annual Global Media Summit featuring industry leaders and cutting-edge technology displays.',
    coverImage: 'https://picsum.photos/seed/gallery-summit/800/600',
    photos: [
      { id: '1-1', title: 'Opening Ceremony', imageUrl: 'https://picsum.photos/seed/opening/800/600', caption: 'The grand opening ceremony', category: 'events', publishedAt: '2025-02-08T10:00:00Z' },
      { id: '1-2', title: 'Keynote Address', imageUrl: 'https://picsum.photos/seed/keynote/800/600', caption: 'Industry leader delivering keynote', category: 'events', publishedAt: '2025-02-08T11:00:00Z' },
      { id: '1-3', title: 'Technology Exhibition', imageUrl: 'https://picsum.photos/seed/tech-exhibit/800/600', caption: 'Latest broadcast technology on display', category: 'events', publishedAt: '2025-02-08T14:00:00Z' }
    ],
    publishedAt: '2025-02-08T10:00:00Z'
  },
  {
    id: '2',
    title: 'Virtual Production Technology Showcase',
    slug: 'virtual-production-technology-showcase',
    description: 'Behind the scenes look at cutting-edge virtual production setups.',
    coverImage: 'https://picsum.photos/seed/vp-showcase/800/600',
    photos: [
      { id: '2-1', title: 'LED Volume Setup', imageUrl: 'https://picsum.photos/seed/led-volume/800/600', caption: 'State-of-the-art LED volume', category: 'tech-features', publishedAt: '2025-02-05T10:00:00Z' },
      { id: '2-2', title: 'Control Room', imageUrl: 'https://picsum.photos/seed/control-room/800/600', caption: 'Production control room', category: 'tech-features', publishedAt: '2025-02-05T11:00:00Z' }
    ],
    publishedAt: '2025-02-05T10:00:00Z'
  }
];

// Mock Events
export const events: Event[] = [
  {
    id: '1',
    title: 'MediaTech Summit 2025',
    slug: 'mediatech-summit-2025',
    description: 'The premier conference for broadcast and media technology professionals. Join industry leaders for three days of insights, networking, and innovation.',
    location: 'Las Vegas Convention Center, USA',
    startDate: '2025-04-15',
    endDate: '2025-04-17',
    imageUrl: 'https://picsum.photos/seed/event-summit/800/600',
    registrationUrl: 'https://example.com/register/mediatech-summit'
  },
  {
    id: '2',
    title: 'Streaming Innovation Forum',
    slug: 'streaming-innovation-forum',
    description: 'A focused conference on the latest developments in streaming technology, content delivery, and viewer engagement strategies.',
    location: 'London ExCeL, UK',
    startDate: '2025-05-20',
    endDate: '2025-05-21',
    imageUrl: 'https://picsum.photos/seed/event-forum/800/600',
    registrationUrl: 'https://example.com/register/streaming-forum'
  },
  {
    id: '3',
    title: 'Virtual Production Workshop',
    slug: 'virtual-production-workshop',
    description: 'Hands-on workshop exploring the latest virtual production techniques and LED volume technology.',
    location: 'Los Angeles, USA',
    startDate: '2025-06-10',
    endDate: '2025-06-12',
    imageUrl: 'https://picsum.photos/seed/event-workshop/800/600',
    registrationUrl: 'https://example.com/register/vp-workshop'
  }
];

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string, limit?: number): Article[] {
  const filtered = articles.filter(a => a.category === category);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getFeaturedArticles(limit: number = 4): Article[] {
  return articles.filter(a => a.isFeatured).slice(0, limit);
}

export function getTrendingArticles(limit: number = 5): Article[] {
  return articles.filter(a => a.isTrending).slice(0, limit);
}

export function getLatestArticles(limit: number = 10): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articles.filter(a =>
    a.title.toLowerCase().includes(lowerQuery) ||
    a.excerpt.toLowerCase().includes(lowerQuery) ||
    a.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}
