import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing"; 
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}