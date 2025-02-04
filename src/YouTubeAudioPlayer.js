const YouTubeAudioPlayer = ({ videoUrl }) => {
    // Extract video ID from YouTube URL
    const videoId = new URL(videoUrl).searchParams.get("v");
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
  
    return (
      <iframe
        width="1"
        height="1"  // Hide video, only play audio
        src={embedUrl}
        frameBorder="0"
        allow="autoplay"
        style={{ position: "absolute", visibility: "hidden" }} // Hide iframe
      />
    );
  };
  
  export default YouTubeAudioPlayer;