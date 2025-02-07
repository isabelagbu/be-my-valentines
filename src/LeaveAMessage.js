import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LeaveAMessage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parsedData = location.state;
  console.log("Data in leave a message:", parsedData)

  const [userMessage, setUserMessage] = useState("");

  const handleSendMessage = (userMessage) => {
    navigate("/Confirmation", {
      state: {
          ...parsedData,
        userMessage, // ✅ Append user's message
      },
    });
  };

  return (
    <div className="card-background">
      <div className="card-components">
        <div className="message-wrapper">
          <div className="image-wrapper">
            <img src="red-rose.png" alt="Red Rose" className="red-rose" />
          </div>
          <h2 className="valentines-question">
            Would you like to leave a message?
          </h2>

          {/* Message Input */}
          <textarea
            name="leave-message"
            className="message-box"
            placeholder="Type your message here..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          ></textarea>

          {/* Button & No Thanks Link */}
          <div className="nothanks-send-button-container">
            <button className="send-button" onClick={() => handleSendMessage(userMessage)}>
              Send
            </button>
            <a href="#" className="no-thanks" onClick={() => handleSendMessage(userMessage)}>
              No Thanks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveAMessage;