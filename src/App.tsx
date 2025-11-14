import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"; 
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Shop from "./pages/ShopComingSoon";
import About from "./pages/About";
import Contact from "./pages/Contact";

import ServicesNew from "./pages/ServicesNew";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/services_new" element={<ServicesNew />} />
      </Routes>
    </Router>
  );
}