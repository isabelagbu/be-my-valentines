import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ClosedEnvelope = () => {

  const { encodedData } = useParams();
  const [name, setName] = useState("Annabelle"); // Default name
  const [btnText, setBtnText] = useState("Break Seal");
  const [userClick, setUserClick] = useState(0);
  const [heartImg, setHeartImg] = useState("/env-lines-with-heart.png");
  const [parsedData,setParsedData] = useState({});
  const navigate = useNavigate();

  // Decode name from URL when component mounts
  useEffect(() => {
    if (encodedData) {
        try {
          console.log(encodedData);
            const decodedJson = decodeURIComponent(atob(encodedData)); // Decode Base64 safely
            const parsedData = JSON.parse(decodedJson);
            setParsedData(parsedData);
            setName(parsedData.theirName || "Annabelle");
        } catch (error) {
            console.error("Error decoding URL data:", error);
        }
    }
}, [encodedData]);

  const handleUserClick = () => {
    setUserClick((prev) => prev + 1);
  };

  useEffect(() => {
    if (userClick === 1) {
      setHeartImg("/env-lines-with-heart-broken.png");
      setBtnText("Open");

      // Play sound
      const sound = new Audio("/crumple.mp3");
      sound.play().catch((err) => console.log("Audio play failed:", err));
    } else if (userClick === 2) {
      // ✅ Pass data to OpenedCard using state
      navigate("/OpenedCard", { state: { parsedData } });
    }
  }, [userClick, navigate, name]);

  return (
    <div className="closed-envelope">
      <img className="envelope-lines" src={heartImg} alt="Envelope Lines" />
      <h2 className="person-name">For {name}</h2>
      <button className="open-button" onClick={handleUserClick}>
        {btnText}
      </button>
    </div>
  );
};

export default ClosedEnvelope;