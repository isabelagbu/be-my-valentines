import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Confirmation = () => {
    const location = useLocation();
    const parsedData = location.state.parsedData;  // ✅ Ensure parsedData is always defined
    const message =  location.state.userMessage || "No personal message included.";
    const emailSent = useRef(false); 

    console.log("Parsed Data in confirmation:", parsedData);
    console.log(parsedData);
    console.log(message);

    const recipient_email = parsedData.email;  // ✅ Prevent undefined email
    const to_name = parsedData.name;
    const from_name = parsedData.theirName;
    const response = parsedData.answer;

    console.log("email: "+recipient_email);
    console.log("to_name: "+to_name);
    console.log("from_name: "+from_name);
    console.log("response: "+response);

    useEffect(() => {
      if(!emailSent.current) {
         const sendEmail = async () => {
            try {
                const templateParams = {
                    recipient_email,   // ✅ Recipient Email
                    to_name,           // ✅ Recipient Name
                    from_name,         // ✅ Sender Name
                    response,          // ✅ Yes/No response
                    message,   // ✅ Custom message
                };

                const result = await emailjs.send(
                    process.env.REACT_APP_SERVICE_ID, 
                    process.env.REACT_APP_TEMPLATE_ID, 
                    templateParams, 
                    process.env.REACT_APP_PUBLIC_KEY
                );

                console.log("✅ Email sent successfully!", result.text);
            } catch (error) {
                console.error("❌ Error sending email:", error);
            }
        };

      sendEmail();
      emailSent.current = true;
      } 
    }, []); // ✅ Correct dependency array

    return ( 
        <div className="card-background">
            <div className="card-components">
                <div className="message-wrapper">
                    <div className="image-wrapper">
                        <img src="red-rose.png" alt="Red Rose" className="red-rose" />
                    </div>
                    <h2 className="valentines-question">
                        Your response has been sent to {to_name} 💌
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;