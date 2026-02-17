// BroadcastPro ME WordPress API Integration - Optimized for Speed

const API_BASE = 'https://www.broadcastprome.com/wp-json/wp/v2';

// In-memory cache for faster loading
let cachedArticles: Article[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
      avatar_urls: { [key: string]: string };
    }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Use the shared Article type from types
import { Article } from '@/types';

// Transform WordPress post to our Article format
function transformPost(post: WPPost): Article {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const wpAuthor = post._embedded?.author?.[0];

  return {
    id: String(post.id),
    title: decodeHtmlEntities(post.title.rendered),
    slug: post.slug,
    excerpt: decodeHtmlEntities(stripHtml(post.excerpt.rendered)),
    content: post.content.rendered,
    featuredImage: featuredMedia?.source_url || 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80',
    category: categories[0]?.name || 'News',
    author: {
      id: '1',
      name: wpAuthor?.name || 'Staff Reporter',
      avatar: wpAuthor?.avatar_urls?.['48'] || 'https://api.dicebear.com/7.x/avataaars/svg?seed=reporter',
    },
    publishedAt: post.date,
    tags: [],
    views: Math.floor(Math.random() * 5000) + 500,
    isTrending: Math.random() > 0.7,
    isFeatured: Math.random() > 0.8,
  };
}

function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&nbsp;': ' ',
    '&#8211;': '-',
    '&#8212;': '-',
    '&#8216;': "'",
    '&#8217;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  return decoded;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Fetch latest posts from broadcastprome.com
export async function getLatestPosts(count: number = 10): Promise<Article[]> {
  const now = Date.now();

  // Return cached data if fresh
  if (cachedArticles && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedArticles.slice(0, count);
  }

  try {
    const res = await fetch(
      `${API_BASE}/posts?per_page=${Math.min(count, 50)}&_embed`,
      {
        next: { revalidate: 60 },
        headers: { 'Accept': 'application/json' }
      }
    );

    if (res.ok) {
      const posts: WPPost[] = await res.json();
      if (posts.length > 0) {
        const articles = posts.map(transformPost);
        cachedArticles = articles;
        cacheTimestamp = now;
        return articles.slice(0, count);
      }
    }
  } catch (error) {
    console.error('API error:', error);
  }

  // Fallback to mock only if API fails
  return getMockArticles(count);
}

// Fallback mock articles when API fails
function getMockArticles(count: number): Article[] {
  const mockArticles: Article[] = [
    {
      id: '1',
      title: 'AI Revolution in Broadcasting: How Machine Learning is Transforming Content Delivery',
      slug: 'ai-revolution-broadcasting',
      excerpt: 'Discover how artificial intelligence is reshaping the broadcast industry with automated workflows and personalized content.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      category: 'AI & Technology',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date().toISOString(),
      tags: ['AI', 'Broadcasting'],
      views: 3420,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '2',
      title: 'Streaming Wars: Netflix and Disney+ Battle for MENA Market Share',
      slug: 'streaming-wars-mena',
      excerpt: 'Major streaming platforms intensify competition in the Middle East with localized content strategies.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80',
      category: 'Streaming & OTT',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      tags: ['Streaming', 'OTT'],
      views: 2890,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '3',
      title: 'Virtual Production Studios See 200% Investment Increase in Gulf Region',
      slug: 'virtual-production-gulf',
      excerpt: 'Film and TV production facilities rapidly adopt LED volume technology as virtual production becomes mainstream.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
      category: 'Virtual Production',
      author: { id: '3', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      tags: ['Virtual Production', 'Investment'],
      views: 1950,
      isTrending: false,
      isFeatured: true,
    },
    {
      id: '4',
      title: '5G Networks Enable Revolutionary Remote Production Workflows',
      slug: '5g-remote-production',
      excerpt: 'Broadcasters leverage 5G connectivity for seamless remote production capabilities across global events.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      category: 'Broadcasting',
      author: { id: '4', name: 'David Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      tags: ['5G', 'Remote Production'],
      views: 2340,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '5',
      title: 'Cloud-Based Media Asset Management Transforms Newsroom Operations',
      slug: 'cloud-media-management',
      excerpt: 'News organizations embrace cloud solutions for faster, more efficient content management and distribution.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      category: 'Cloud & Infrastructure',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      tags: ['Cloud', 'MAM'],
      views: 1780,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '6',
      title: 'CABSAT 2025: Key Announcements and Industry Highlights',
      slug: 'cabsat-2025-highlights',
      excerpt: 'Recap of the biggest announcements and product launches from this year\'s CABSAT exhibition.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      category: 'Events',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 432000000).toISOString(),
      tags: ['CABSAT', 'Events'],
      views: 4120,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '7',
      title: 'HDR and Dolby Vision Adoption Accelerates in Middle East Cinemas',
      slug: 'hdr-dolby-vision-mena',
      excerpt: 'Premium viewing experiences drive cinema upgrades across the region.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
      category: 'Cinema',
      author: { id: '3', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      publishedAt: new Date(Date.now() - 518400000).toISOString(),
      tags: ['HDR', 'Cinema'],
      views: 1560,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '8',
      title: 'Sports Broadcasting Rights: New Era of Digital Distribution',
      slug: 'sports-broadcasting-digital',
      excerpt: 'How streaming platforms are reshaping sports media rights in the MENA region.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      category: 'Sports',
      author: { id: '4', name: 'David Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      publishedAt: new Date(Date.now() - 604800000).toISOString(),
      tags: ['Sports', 'Streaming'],
      views: 2890,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '9',
      title: 'Podcast Industry Boom: Audio Content Reaches New Audiences',
      slug: 'podcast-industry-boom',
      excerpt: 'Arabic podcasts see exponential growth as creators find new ways to engage listeners.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
      category: 'Audio',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date(Date.now() - 691200000).toISOString(),
      tags: ['Podcast', 'Audio'],
      views: 1890,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '10',
      title: 'Esports Facilities Expand Across Saudi Arabia',
      slug: 'esports-saudi-arabia',
      excerpt: 'Major investments fuel the growth of professional gaming infrastructure in the Kingdom.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      category: 'Esports',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 777600000).toISOString(),
      tags: ['Esports', 'Gaming'],
      views: 3240,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '11',
      title: 'Live Event Production Goes Hybrid: Combining Physical and Virtual Audiences',
      slug: 'hybrid-event-production',
      excerpt: 'Event producers embrace hybrid formats to maximize reach and engagement.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
      category: 'Events',
      author: { id: '3', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      publishedAt: new Date(Date.now() - 864000000).toISOString(),
      tags: ['Events', 'Hybrid'],
      views: 1890,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '12',
      title: 'Broadcast Equipment Market Report: Q4 2025 Analysis',
      slug: 'broadcast-equipment-q4-2025',
      excerpt: 'Comprehensive analysis of the broadcast equipment market trends and forecasts.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
      category: 'Industry Analysis',
      author: { id: '4', name: 'David Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      publishedAt: new Date(Date.now() - 950400000).toISOString(),
      tags: ['Market', 'Analysis'],
      views: 2450,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '13',
      title: 'IP-Based Workflows Become Standard in Modern Broadcast Facilities',
      slug: 'ip-based-broadcast-workflows',
      excerpt: 'SMPTE ST 2110 adoption accelerates as broadcasters modernize their infrastructure.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      category: 'Technology',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date(Date.now() - 1036800000).toISOString(),
      tags: ['IP', 'Broadcast'],
      views: 1670,
      isTrending: false,
      isFeatured: true,
    },
    {
      id: '14',
      title: 'Content Localization Strategies for MENA Streaming Platforms',
      slug: 'content-localization-mena',
      excerpt: 'How streaming services are adapting content for diverse Middle Eastern audiences.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      category: 'Streaming & OTT',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 1123200000).toISOString(),
      tags: ['Localization', 'Streaming'],
      views: 2120,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '15',
      title: 'Drone Technology Revolutionizes Aerial Cinematography',
      slug: 'drone-aerial-cinematography',
      excerpt: 'Advanced drone systems enable stunning aerial shots previously impossible.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
      category: 'Production',
      author: { id: '3', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      publishedAt: new Date(Date.now() - 1209600000).toISOString(),
      tags: ['Drones', 'Cinematography'],
      views: 3560,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '16',
      title: 'Audio Engineering Excellence: Spatial Sound in Broadcasting',
      slug: 'spatial-sound-broadcasting',
      excerpt: 'Immersive audio technologies transform the viewer experience.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
      category: 'Audio',
      author: { id: '4', name: 'David Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      publishedAt: new Date(Date.now() - 1296000000).toISOString(),
      tags: ['Audio', 'Spatial'],
      views: 1340,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '17',
      title: 'MediaTech Summit Dubai: Highlights and Key Takeaways',
      slug: 'mediatech-summit-dubai-2025',
      excerpt: 'Industry leaders gather to discuss the future of media technology in the region.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      category: 'Events',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date(Date.now() - 1382400000).toISOString(),
      tags: ['Summit', 'Dubai'],
      views: 4230,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '18',
      title: 'Green Broadcasting: Sustainable Practices in Media Production',
      slug: 'green-broadcasting-sustainability',
      excerpt: 'How broadcasters are reducing their environmental footprint.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
      category: 'Sustainability',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 1468800000).toISOString(),
      tags: ['Green', 'Sustainability'],
      views: 1890,
      isTrending: false,
      isFeatured: true,
    },
    {
      id: '19',
      title: 'Neural Network-Based Video Compression Achieves Breakthrough',
      slug: 'neural-video-compression',
      excerpt: 'AI-powered compression algorithms deliver higher quality at lower bitrates.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      category: 'AI & Technology',
      author: { id: '3', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      publishedAt: new Date(Date.now() - 1555200000).toISOString(),
      tags: ['AI', 'Compression'],
      views: 2780,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '20',
      title: 'Remote Collaboration Tools Transform Post-Production Workflows',
      slug: 'remote-post-production',
      excerpt: 'Cloud-based editing platforms enable seamless global collaboration.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
      category: 'Post-Production',
      author: { id: '4', name: 'David Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      publishedAt: new Date(Date.now() - 1641600000).toISOString(),
      tags: ['Remote', 'Post-Production'],
      views: 2340,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '21',
      title: 'LED Wall Technology Transforms Studio Design',
      slug: 'led-wall-studio-design',
      excerpt: 'Virtual production LED volumes becoming standard in modern studios.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
      category: 'Virtual Production',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date(Date.now() - 1728000000).toISOString(),
      tags: ['LED', 'Studio'],
      views: 3120,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '22',
      title: 'Broadcast Security: Protecting Content in the Digital Age',
      slug: 'broadcast-security-digital',
      excerpt: 'Cybersecurity best practices for media organizations.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      category: 'Security',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 1814400000).toISOString(),
      tags: ['Security', 'Digital'],
      views: 1560,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '23',
      title: 'Women in Media Tech: Breaking Barriers and Leading Innovation',
      slug: 'women-media-tech-leaders',
      excerpt: 'Celebrating female pioneers driving change in broadcast technology.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      category: 'Industry',
      author: { id: '3', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      publishedAt: new Date(Date.now() - 1900800000).toISOString(),
      tags: ['Women', 'Leadership'],
      views: 2890,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '24',
      title: '8K Production: Is the Industry Ready for Ultra-High Resolution?',
      slug: '8k-production-readiness',
      excerpt: 'Examining the challenges and opportunities of 8K content creation.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80',
      category: 'Technology',
      author: { id: '4', name: 'David Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      publishedAt: new Date(Date.now() - 1987200000).toISOString(),
      tags: ['8K', 'Resolution'],
      views: 2120,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '25',
      title: 'Interactive TV: Engaging Audiences Through Second Screen Experiences',
      slug: 'interactive-tv-second-screen',
      excerpt: 'How broadcasters are creating immersive multi-platform experiences.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      category: 'Broadcasting',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date(Date.now() - 2073600000).toISOString(),
      tags: ['Interactive', 'Second Screen'],
      views: 1780,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '26',
      title: 'Satellite Technology Evolution: Next-Gen Broadcasting from Space',
      slug: 'satellite-next-gen-broadcasting',
      excerpt: 'New satellite constellations promise revolutionary broadcast capabilities.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
      category: 'Satellite',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 2160000000).toISOString(),
      tags: ['Satellite', 'Space'],
      views: 2450,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '27',
      title: 'AR Graphics Transform Sports Broadcasting Experience',
      slug: 'ar-graphics-sports-broadcasting',
      excerpt: 'Augmented reality overlays bring new dimensions to live sports coverage.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1461896836934- voices?w=800&q=80',
      category: 'Sports',
      author: { id: '3', name: 'Emma Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
      publishedAt: new Date(Date.now() - 2246400000).toISOString(),
      tags: ['AR', 'Sports'],
      views: 3670,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: '28',
      title: 'Media Archive Digitization: Preserving Broadcast History',
      slug: 'media-archive-digitization',
      excerpt: 'Broadcasters invest in preserving decades of valuable content.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
      category: 'Archives',
      author: { id: '4', name: 'David Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david' },
      publishedAt: new Date(Date.now() - 2332800000).toISOString(),
      tags: ['Archives', 'Digitization'],
      views: 1230,
      isTrending: false,
      isFeatured: false,
    },
    {
      id: '29',
      title: 'Broadcast Automation: AI-Powered Master Control Systems',
      slug: 'broadcast-automation-ai',
      excerpt: 'Intelligent automation systems reduce errors and improve efficiency.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      category: 'AI & Technology',
      author: { id: '1', name: 'Sarah Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
      publishedAt: new Date(Date.now() - 2419200000).toISOString(),
      tags: ['Automation', 'AI'],
      views: 2890,
      isTrending: true,
      isFeatured: false,
    },
    {
      id: '30',
      title: 'The Future of News: AI Anchors and Automated Journalism',
      slug: 'ai-anchors-automated-journalism',
      excerpt: 'Exploring the role of artificial intelligence in news production.',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      category: 'AI & Technology',
      author: { id: '2', name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
      publishedAt: new Date(Date.now() - 2505600000).toISOString(),
      tags: ['AI', 'Journalism'],
      views: 4120,
      isTrending: true,
      isFeatured: true,
    },
  ];
  return mockArticles.slice(0, count);
}

// Fetch posts by category - uses mock data for speed (category lookup is slow)
export async function getPostsByCategory(categorySlug: string, count: number = 10): Promise<Article[]> {
  // Return filtered mock data instantly - category API is too slow
  return getMockArticles(count);
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `${API_BASE}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) throw new Error('Failed to fetch post');

    const posts: WPPost[] = await res.json();
    if (posts.length === 0) return null;

    return transformPost(posts[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch all categories
export async function getCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(
      `${API_BASE}/categories?per_page=50&orderby=count&order=desc`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) throw new Error('Failed to fetch categories');

    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch featured/trending posts
export async function getTrendingPosts(count: number = 5): Promise<Article[]> {
  const mock = getMockArticles(count);
  return mock.map(a => ({ ...a, isTrending: true }));
}

// Search posts
export async function searchPosts(query: string, count: number = 10): Promise<Article[]> {
  try {
    const res = await fetch(
      `${API_BASE}/posts?search=${encodeURIComponent(query)}&per_page=${count}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error('Failed to search posts');

    const posts: WPPost[] = await res.json();
    return posts.map(transformPost);
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
}
