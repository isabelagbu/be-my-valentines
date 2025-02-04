const LeaveAMessage = () => {
    return (
      <div className="card-background">
        <div className="card-components">
          <div className="message-wrapper">
          <div class="image-wrapper">
                <img src="red-rose.png" alt="Red Rose" class="red-rose" />
          </div>
          <h2 className="valentines-question">Would you like to leave a message?</h2>
      
           
            
            {/* Message Input */}
            <textarea name="leave-message" className="message-box" placeholder="Type your message here..."></textarea>
  
            {/* Button & No Thanks Link */}
            <div className="nothanks-send-button-container">
              <a href="#" className="no-thanks">No Thanks</a>
              <button className="send-button">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LeaveAMessage;