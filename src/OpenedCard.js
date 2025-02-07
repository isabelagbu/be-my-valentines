import { useState, useEffect, useContext  } from "react";
import FloatingHearts from "./FloatingHearts";
import { useNavigate, useLocation } from "react-router-dom";
import AudioContext from "./AudioContext";

const OpenedCard = () => {
    const { setYouTubeLink } = useContext(AudioContext); // ✅ Store the YouTube link globally
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Extract data properly
    const parsedData = location.state.parsedData; 
    console.log("Received Data in Opened Card:", parsedData); // Debugging line to check incoming data
  
    const senderName = parsedData.name; // Default if missing
    const note = parsedData.message; // Default if missing
    const senderEmail = parsedData.email;
    const youtubeLink = parsedData.youtubeLink; // Extract YouTube link


    const [fadeClass, setFadeClass] = useState("");
    const [noText, setNoText] = useState("No");
    const [yesText, setYesText] = useState("Yes");
    const [noBtnInteraction, setNoBtnInteraction] = useState(0);
    const [response, setResponse] = useState(""); // Store Yes/No response

    useEffect(() => {
        setFadeClass("fade-in-bright");

        if (youtubeLink) {
            setYouTubeLink(youtubeLink); // ✅ Store YouTube link in global context
        } else {
            const sound = new Audio("/background-music.mp3");
            sound.play().catch((err) => console.log("Audio play failed:", err));
        }
    }, [youtubeLink, setYouTubeLink]);

    const handleMouseOverNo = () => {
        setNoText("Please :(");
    };

    const handleMouseOverYes = () => {
        setYesText("Yes :)");
    };

    const handleMouseOutOfYes = () => {
        setYesText("Yes");
    };

    const handleMouseOutOfNo = () => {
        setNoText("No");
    };
  
    const navigateToLeaveAMessage = (answer) => {
        navigate("/LeaveAMessage", {
            state: {
                parsedData: {
                    ...parsedData,  // ✅ Keep existing data
                     answer,  // ✅ Append Yes/No response
                }
            },
        });
    };

    return ( 
        <div className={`card-background ${fadeClass}`}>
            <FloatingHearts />
            
            {/* ✅ Play YouTube audio if available */}
            {youtubeLink && <AudioContext videoUrl={youtubeLink} />}

            <div className="card-components">
                <div className="note">{ note }</div>
                <div className="text-image-container">
                    <h2 className="valentines-question">Will You Be My Valentine?</h2>
                    <div className="image-wrapper">
                        <img src="red-rose.png" alt="Red Rose" className="red-rose" />
                    </div>
                </div>
                <div className="button-container">
                    <button 
                    onClick={() => navigateToLeaveAMessage("Yes")}
                    onMouseEnter={handleMouseOverYes} 
                    onMouseLeave={handleMouseOutOfYes} 
                    id="yes-btn"
                    className="yes-no-btn"> { yesText }</button>
                    <button 
                        onClick={() => navigateToLeaveAMessage("No")}
                        onMouseEnter={handleMouseOverNo} 
                        onMouseLeave={handleMouseOutOfNo} 
                        id="no-btn" 
                        className={`yes-no-btn`} >
                        { noText }
                    </button>
                </div>
                <h3 className="sender-name">- From { senderName }</h3>
            </div>
        </div>
    );
};

export default OpenedCard;