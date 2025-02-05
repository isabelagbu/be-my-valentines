import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SenderForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [theirName, setTheirName] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [message, setMessage] = useState("");
    const [uniqueLink, setUniqueLink] = useState("");

    //const navigate = useNavigate();

    const handleGenerateLink = (e) => {
        e.preventDefault();

        // Create JSON object
        const formData = { name, email, theirName, youtubeLink, message };

        // Convert JSON to Base64
        const encodedData = btoa(JSON.stringify(formData));

        // Create shareable link
        const link = `/valentine/closed-envelope/${encodedData}`;
        setUniqueLink(`${window.location.origin}${link}`);

        console.log(link)

        // Copy to clipboard
        navigator.clipboard.writeText(`${window.location.origin}${link}`).then(() => {
            alert("Link copied! Share it anywhere.");
        });

        console.log(encodedData);

        // Navigate to the generated link
        // navigate(link);
    };

    return (
        <div className="card-background">
            <h1 className="form-title">Virtual Valentine’s Card</h1>
            <form className="valentine-form" onSubmit={handleGenerateLink}>
                <div className="form-group">
                    <label>Your Name:</label>
                    <input type="text" required className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Your Email:</label>
                    <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Their Name:</label>
                    <input type="text" required className="input-field" value={theirName} onChange={(e) => setTheirName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Youtube Song Link:</label>
                    <input type="url" className="input-field" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                </div>
                <div className="form-group" id="val-msg-div">
                    <label id="msg-box-label">Custom Message:</label>
                    <textarea className="message-box-2" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <div className="button-container">
                    <button type="submit" className="generate-button">Generate Unique Link</button>
                </div>
                {uniqueLink && (
                    <div className="form-group unique-link-container">
                        <label id="unique-link-label">Your Unique Link: </label>
                        <a id="unique-link" href={uniqueLink} target="_blank" rel="noopener noreferrer">{uniqueLink}</a>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SenderForm;