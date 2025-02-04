import { useState, useEffect } from "react";
import FloatingHearts from "./FloatingHearts";
import { useNavigate, useLocation } from "react-router-dom";
import YouTubeAudioPlayer from "./YouTubeAudioPlayer";

const OpenedCard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Extract data properly
    const parsedData = location.state || {}; 
    console.log("Received Data:", parsedData); // Debugging line to check incoming data
    
    const senderName = location.state.parsedData.name || "Annabelle"; // Default if missing
    const note = location.state.parsedData.message || "Sending you lots of love!"; // Default if missing
    const senderEmail = location.state.parsedData.email;
    const youtubeLink = location.state.parsedData.youtubeLink; // Extract YouTube link

    const [fadeClass, setFadeClass] = useState("");
    const [noBtnSmallFont, setNoBtnSmallFont] = useState("");
    const [message, setMessage] = useState("Will You Be My Valentine?");
    const [noText, setNoText] = useState("No");
    const [noBtnInteraction, setNoBtnInteraction] = useState(0);

    useEffect(() => {
        setFadeClass("fade-in-bright"); 

        if (!youtubeLink) {
            // ✅ Play background music only if YouTube link is missing
            const sound = new Audio("/background-music.mp3");
            sound.play().catch((err) => console.log("Audio play failed:", err));
        }
    }, [youtubeLink]); // Runs only when youtubeLink changes

    const handleMouseOverNo = () => {
        setNoBtnInteraction((prev) => prev + 1);
    };

    const handleMouseOutOfNo = () => {
        setNoBtnSmallFont("");
        setNoText("No");
    };

    useEffect(() => {
        if (noBtnInteraction === 1) {
            setNoBtnSmallFont("yes-no-btn-small-font");
            setNoText("Give it a second thought");
        } else if (noBtnInteraction > 1) {
            setNoText("Please");
        }
    }, [noBtnInteraction]);

    const navigateToLeaveAMessage = () => {
        navigate("/LeaveAMessage");
    };

    return ( 
        <div className={`card-background ${fadeClass}`}>
            <FloatingHearts />
            
            {/* ✅ Play YouTube audio if available */}
            {youtubeLink && <YouTubeAudioPlayer videoUrl={youtubeLink} />}

            <div className="card-components">
                <div className="note">{ note }</div>
                <div className="text-image-container">
                    <h2 className="valentines-question">{ message }</h2>
                    <div className="image-wrapper">
                        <img src="red-rose.png" alt="Red Rose" className="red-rose" />
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={navigateToLeaveAMessage} id="yes-btn" className="yes-no-btn">Yes</button>
                    <button 
                        onClick={navigateToLeaveAMessage}  
                        onMouseEnter={handleMouseOverNo} 
                        onMouseLeave={handleMouseOutOfNo} 
                        id="no-btn" 
                        className={`yes-no-btn ${noBtnSmallFont}`}
                    >
                        { noText }
                    </button>
                </div>
                <h3 className="sender-name">- From { senderName }</h3>
            </div>
        </div>
    );
};

export default OpenedCard;