import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridLayout from "../components/GridLayout";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  // State hooks
  const [showMailingList, setShowMailingList] = useState(false);
  const [email, setEmail] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Image carousel
  const images = [
    "/WEBSITE TSHIRTS-01.png",
    "/WEBSITE TSHIRTS-02.png",
    "/WEBSITE TSHIRTS-03.png",
    "/WEBSITE TSHIRTS-04.png"
  ];

  // Rotate images automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle mailing list popup 
  useEffect(() => {
    setShowMailingList(true);
  }, []);

  // Handlers
  const handleCloseMailingList = () => setShowMailingList(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert("Thanks for subscribing! You’re now on the list.");
        setEmail("");
      } else {
        alert("Subscription failed. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again later.");
    }

    setShowMailingList(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Header Component */}
      <Header />

      <main>
        {/* Grid Layout */}
        <GridLayout
          /* Mobile Content */
          mobileBox={
            <>
              <img
                src="/Logo-Tall-Transparent.png"
                alt="Logo"
                className="logo-image logo-box1"
              />

              {showMailingList ? (
                <motion.div
                  className="mailing-list-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >

                  <button
                    className="close-btn"
                    onClick={handleCloseMailingList}
                    aria-label="Close mailing list"
                  >
                    ✕
                  </button>

                  <div className="mailing-list-content">
                    <h2>Join Our Mailing List</h2>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <button type="submit">Sign Up</button>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <div className="info-placeholder">
                  <h2>Want to learn more about us?</h2>
                  <p>Click below for more info.</p>
                  <button
                    className="gold-btn"
                    onClick={() => navigate("/about")}
                  >
                    Learn More
                  </button>
                </div>
              )}
            </>
          }
          /* Box1 with Logo */
          box1={
            <img
              src="/Logo-Tall-Transparent.png"
              alt="Logo"
              className="logo-image logo-box1"
            />
          }

          /* Box2 with Carousel */
          box2={
            <div className="carousel">
              <img
                src={images[currentIndex]}
                alt={`Work ${currentIndex + 1}`}
                className="carousel-image"
                onClick={() => setIsLightboxOpen(true)}
              />
            </div>
          }

          /* Box3 with Coin */
          box3={
            <div className="purse">
              <div className="coin">
                <div className="front"></div>
                <div className="back"></div>
                <div className="side">
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                </div>
              </div>
            </div>
          }

          /* Box4 with Services Button */
          box4={
            <button onClick={() => navigate("/services")}>
              Services
            </button>
          }

          /* Box5 with Contact Button */
          box5={
            <button onClick={() => navigate("/contact")}>
              Contact
            </button>
          }

          /* Box6 with Mailing List and Contact Information */
          box6={
            showMailingList ? (
              <motion.div
                className="mailing-list-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className="close-btn"
                  onClick={handleCloseMailingList}
                  aria-label="Close mailing list"
                >
                  ✕
                </button>

                <div className="mailing-list-content">
                  <h2>Join Our Mailing List</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    <button type="submit">Sign Up</button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <div className="info-placeholder">
                <h2>Want to learn more about us?</h2>
                <p>Click below for more info.</p>
                <button
                  className="gold-btn"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </button>
              </div>
            )
          }
        />

        {isLightboxOpen && (
          <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
            <img
              src={images[currentIndex]}
              alt={`Work ${currentIndex + 1}`}
              className="lightbox-image"
            />
          </div>
        )}
      </main>

      {/* Footer Component */}
      <Footer />
    </motion.div>
  );
}