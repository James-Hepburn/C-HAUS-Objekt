import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <p>Questions?</p>
      <button onClick={() => navigate("/contact")} className="footer-btn">
        Contact Us
      </button>
      <p>info@chausobjekt.com</p>

      {/* <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://x.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-facebook"></i>
        </a>
      </div> */}
    </footer>
  );
}