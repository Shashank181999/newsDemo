// Type definitions for MediaTech Pro

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  featuredImage: string;
  tags: string[];
  views: number;
  isFeatured: boolean;
  isTrending: boolean;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: string;
  publishedAt: string;
  views: number;
}

export interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
  category: string;
  publishedAt: string;
}

export interface PhotoGallery {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  publishedAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  registrationUrl?: string;
}

export interface Newsletter {
  email: string;
  subscribedAt: string;
}

export interface SearchResult {
  articles: Article[];
  videos: Video[];
  totalResults: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
