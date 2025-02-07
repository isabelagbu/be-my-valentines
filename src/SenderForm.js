import { useState } from "react";

const SenderForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [theirName, setTheirName] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [message, setMessage] = useState("");
    const [longLink, setLongLink] = useState("");
    const [shortenedLink, setShortenedLink] = useState("");

    const handleGenerateLink = async (e) => {
        e.preventDefault();

        // Create JSON object
        const formData = { name, email, theirName, youtubeLink, message };

        // Encode JSON to Base64 safely
        const encodedData = btoa(encodeURIComponent(JSON.stringify(formData)));

        // Create full long link
        const longUrl = `${window.location.origin}/valentine/closed-envelope/${encodedData}`;
        setLongLink(longUrl); // Store original long link first

        console.log("Generated Link:", longUrl);

        const requestBody = {
            url: longUrl,
            alias: `Val-${Date.now().toString().slice(-6)}` // Ensure alias is max 30 chars
        };

        try {
            console.log("TINY URL API KEY: " + process.env.REACT_APP_TINYURL_API_KEY);
            const response = await fetch(`https://api.tinyurl.com/create?api_token=${process.env.REACT_APP_TINYURL_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const result = await response.json();
            if (result?.data?.tiny_url) {
                setShortenedLink(result.data.tiny_url);
                console.log("Shortened Link:", result.data.tiny_url);

                // Copy to clipboard
                navigator.clipboard.writeText(result.data.tiny_url).then(() => {
                    alert("Shortened link copied! Share it anywhere.");
                });
            } else {
                console.error("Failed to shorten link:", result);
                setShortenedLink(longUrl); // Fallback to long link
            }
        } catch (error) {
            console.error("Error shortening link:", error);
            setShortenedLink(longUrl); // Fallback to long link
        }
    };

    return (
        <div className="card-background">
            <form className="valentine-form" onSubmit={handleGenerateLink}>
                <h1 className="form-title">Virtual Valentine’s Card</h1>
                <div className="form-group">
                    <label>Your Name:</label>
                    <input placeholder="Please enter the sender name you want displayed inside the card." type="text" required className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Your Email:</label>
                    <input placeholder="Please enter your email to receive their response." type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Their Name:</label>
                    <input placeholder="Please enter your Special Persons name" type="text" required className="input-field" value={theirName} onChange={(e) => setTheirName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Youtube Song Link:</label>
                    <input placeholder="Please enter the YouTube Song Link to play when the card is opened. (optional)" type="url" className="input-field" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                </div>
                <div className="form-group" id="val-msg-div">
                    <label id="msg-box-label">Custom Message:</label>
                    <textarea placeholder="Please enter a short message to your Special Person (optional but highly recommend)" className="sender-form-message-box" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <div className="button-container">
                    <button type="submit" className="generate-button">Generate Unique Link</button>
                </div>
                {longLink && (
                    <div className="form-group unique-link-container">
                        <label id="unique-link-label">Your Unique Link: </label>
                        <a className="unique-link" href={shortenedLink || longLink} target="_blank" rel="noopener noreferrer">
                            {shortenedLink || longLink}
                        </a>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SenderForm;