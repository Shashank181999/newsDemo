import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition">
      <Link href={`/video/${video.slug}`}>
        <div className="relative h-48">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 rounded-full p-4 group-hover:bg-blue-600 transition">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <Link
          href={`/${video.category}`}
          className="text-blue-600 text-xs font-semibold uppercase hover:underline"
        >
          {video.category}
        </Link>
        <Link href={`/video/${video.slug}`}>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mt-1 mb-2">
            {video.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{video.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatViews(video.views)}</span>
          <span>{formatDate(video.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}
