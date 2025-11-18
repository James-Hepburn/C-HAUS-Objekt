import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 40) header?.classList.add("scrolled");
      else header?.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${menuOpen ? "menu-open" : ""}`}>
      <div className="header-left" onClick={() => navigate("/home")}>
        <img src="/Logo-Wide.png" alt="Logo" className="header-logo" />
      </div>

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <div className="bar top" />
        <div className="bar middle" />
        <div className="bar bottom" />
      </button>

      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        {/* <button onClick={() => navigate("/work")}>Work</button> */}
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/shop")}>Shop</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
      </nav>
    </header>
  );
}