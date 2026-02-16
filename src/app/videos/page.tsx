import VideoCard from '@/components/VideoCard';
import { videos } from '@/data/mock';

export default function VideosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Videos</h1>
        <p className="text-gray-600">Watch interviews, tutorials, and industry coverage</p>
      </div>

      {/* Featured Video */}
      {videos[0] && (
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video max-w-4xl mx-auto">
            <img
              src={videos[0].thumbnailUrl}
              alt={videos[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 transition rounded-full p-6">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                Featured
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{videos[0].title}</h2>
              <p className="text-gray-300 mt-1">{videos[0].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(1).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
