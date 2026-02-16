'use client';

const headlines = [
  "Breaking: AI-Powered Broadcasting Systems See 300% Growth in Adoption",
  "Live: Global Media Summit 2025 Kicks Off in Las Vegas",
  "Update: Major Streaming Platform Announces 4K HDR Expansion",
  "Trending: Virtual Production Technology Reshaping Film Industry",
  "Alert: New 5G Broadcasting Standards Approved Worldwide",
  "Flash: Leading Broadcaster Unveils Next-Gen Cloud Platform",
];

export default function NewsTicker() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Live Badge */}
        <div className="flex-shrink-0 bg-white text-red-600 font-black text-xs sm:text-sm px-3 sm:px-4 py-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          LIVE
        </div>

        {/* Scrolling Text */}
        <div className="flex-1 overflow-hidden py-2 sm:py-2.5">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...headlines, ...headlines].map((headline, index) => (
              <span key={index} className="mx-8 text-xs sm:text-sm font-medium">
                {headline}
                <span className="mx-8 text-red-300">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
