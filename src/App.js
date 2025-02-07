import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./AudioContext";
import ClosedEnvelope from "./ClosedEnvelope";
import OpenedCard from "./OpenedCard";
import SenderForm from "./SenderForm";
import LeaveAMessage from "./LeaveAMessage";
import Confirmation from "./Confirmation";

const App = () => {

  return (  
    <div className="App">
  <AudioProvider>
   <Router>
      <Routes>
        <Route path="/" element={<SenderForm />} />
        <Route path="/valentine/closed-envelope/:encodedData" element={<ClosedEnvelope />} />
        <Route path="/OpenedCard" element={<OpenedCard />} />
        <Route path="/LeaveAMessage" element={<LeaveAMessage />} />
        <Route path="/SenderForm" element={<SenderForm />} />
        <Route path="/Confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
    </AudioProvider>
  </div>
  );
}
 
export default App;
