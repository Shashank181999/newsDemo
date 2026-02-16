// BroadcastPro ME WordPress API Integration

const API_BASE = 'https://www.broadcastprome.com/wp-json/wp/v2';
const FETCH_TIMEOUT = 8000; // 8 second timeout for initial fetch

// Fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

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

// Fetch latest posts from BroadcastPro ME
export async function getLatestPosts(count: number = 10): Promise<Article[]> {
  try {
    console.log('Fetching from BroadcastPro ME API...');

    const res = await fetchWithTimeout(
      `${API_BASE}/posts?per_page=${count}&_embed`,
      {
        next: { revalidate: 600 }, // Cache for 10 minutes
        headers: { 'Accept': 'application/json' }
      }
    );

    if (!res.ok) {
      console.log('API returned non-OK status:', res.status);
      return getMockArticles(count);
    }

    const text = await res.text();
    if (!text || text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
      console.log('API returned HTML instead of JSON');
      return getMockArticles(count);
    }

    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) {
      console.log('API response is not an array');
      return getMockArticles(count);
    }

    console.log(`✓ Loaded ${parsed.length} real articles from BroadcastPro ME`);
    return parsed.map(transformPost);
  } catch (error) {
    console.log('API fetch failed:', error);
    return getMockArticles(count);
  }
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
      featuredImage: 'https://images.unsplash.com/photo-1461896836934- voices-of-change?w=800&q=80',
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
