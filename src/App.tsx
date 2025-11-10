import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing"; 
import Home from "./Home";
import Work from "./Work";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
}