import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClosedEnvelope from "./ClosedEnvelope";
import OpenedCard from "./OpenedCard"; // Create this new component
import SenderForm from "./SenderForm";
import LeaveAMessage from "./LeaveAMessage";

const App = () => {

  return (  
    <div className="App">
   <Router>
      <Routes>
      <Route path="/" element={<SenderForm />} />
        <Route path="/valentine/closed-envelope/:encodedData" element={<ClosedEnvelope />} />
        <Route path="/OpenedCard" element={<OpenedCard />} />
        <Route path="/LeaveAMessage" element={<LeaveAMessage />} />
        <Route path="/SenderForm" element={<SenderForm />} />
      </Routes>
    </Router>
  </div>
  );
}
 
export default App;
