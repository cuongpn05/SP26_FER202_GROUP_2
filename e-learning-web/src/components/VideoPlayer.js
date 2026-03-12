import React from 'react';

const VideoPlayer = ({ videoUrl, title }) => {
  // Function to convert various YouTube URL formats to embed format
  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    // If it's already an embed URL, return it
    if (url.includes('/embed/')) return url;
    
    let videoId = '';
    
    // Handle youtu.be/VIDEO_ID
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } 
    // Handle youtube.com/watch?v=VIDEO_ID
    else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    
    return url; // Fallback to original URL
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-200 transition-all duration-300 transform hover:scale-[1.002]">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full border-0"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-slate-50">
          <div className="mb-4 text-blue-600 animate-pulse">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Đang chuẩn bị video...</h3>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
