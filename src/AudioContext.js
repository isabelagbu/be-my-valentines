import { createContext, useState, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [youtubeLink, setYouTubeLink] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (youtubeLink) {
            setIsPlaying(true);
        }
    }, [youtubeLink]);

    return (
        <AudioContext.Provider value={{ youtubeLink, setYouTubeLink, isPlaying }}>
            {children}
            {/* Keep the YouTube iframe globally mounted */}
            {youtubeLink && <iframe
                width="1"
                height="1"
                src={`https://www.youtube.com/embed/${new URL(youtubeLink).searchParams.get("v")}?autoplay=1&loop=1&playlist=${new URL(youtubeLink).searchParams.get("v")}`}
                frameBorder="0"
                allow="autoplay"
                style={{ position: "absolute", visibility: "hidden" }} 
            />}
        </AudioContext.Provider>
    );
};

export default AudioContext;