import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridLayout from "../components/GridLayout";
import "./Services.css";

export default function Services() {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isCardLightboxOpen, setIsCardLightboxOpen] = useState(false);

    var images = [
        "/WEBSITE TSHIRTS-01.png",
        "/WEBSITE TSHIRTS-02.png",
        "/WEBSITE TSHIRTS-03.png",
        "/WEBSITE TSHIRTS-04.png"
    ];

    const mobile_images = [
        "/WEBSITE TSHIRTS-01-Tall.png",
        "/WEBSITE TSHIRTS-02-Tall.png",
        "/WEBSITE TSHIRTS-03-Tall.png",
        "/WEBSITE TSHIRTS-04-Tall.png"
    ];

    images = window.innerWidth <= 900 ? mobile_images : images;

    // Rotate images automatically
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((i) => (i + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [images.length]);

  return (
    <motion.div
      className="services-page"
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
        /* Box1 with Text */
        box1={
            <div className="box1-content">
                <h3>Services</h3>
                <p>
                    At C.HAUS Objekt, we offer design and product services 
                    that blend culture, creativity, and craftsmanship. Our 
                    work extends beyond traditional gifting; we create meaningful, 
                    story-driven designs that celebrate identity and connection.
                </p>
                <p>
                    We specialize in:
                </p>
                <ul>
                  <li>Custom Gift Design</li>
                  <li>Brand & Organization Design</li>
                  <li>Merchandise & Apparel</li>
                  <li>Print & Stationery Design</li>
                </ul>
            </div>
        }

        /* Box2 with Carousel */
        box2={
            <div className="carousel">
                <div className="box2-content">
                    <h3>T-Shirt Designs</h3>
                    <img
                        src={images[currentIndex]}
                        alt={`Work ${currentIndex + 1}`}
                        className="carousel-image"
                        onClick={() => setIsLightboxOpen(true)}
                    />
                </div>
            </div>
        }

        /* Box4 with Contact Button */
        box4={
        <button onClick={() => navigate("/contact")}>
            Contact
        </button>
        }

        /* Box5 with Work Button */
        box5={
        // <button onClick={() => navigate("/work")}>
        //     Work
        // </button>
        <button onClick={() => navigate("/about")}>
            About
        </button>
        }

        /* Box6 with Business Card Example */
        box6={
            <div className="box6-content">
                <h3>Business Card Design</h3>
                <img 
                    src="/Business-Card.png" 
                    alt="Business Card" 
                    onClick={() => setIsCardLightboxOpen(true)} 
                />
            </div>
        }

        /* Merged Top Box with Carousel */
        mergedTop={
            <div className="carousel">
                <div className="box2-content">
                    <h3>T-Shirt Designs</h3>
                    <img
                        src={images[currentIndex]}
                        alt={`Work ${currentIndex + 1}`}
                        className="carousel-image"
                        onClick={() => setIsLightboxOpen(true)}
                    />
                </div>
            </div>
        }

        /* Merged Bottom Box with Image */
        mergedBottom={
            <div className="box6-content">
                <h3>Business Card Design</h3>
                <img 
                    src="/Business-Card.png" 
                    alt="Business Card" 
                    onClick={() => setIsCardLightboxOpen(true)} 
                />
            </div>
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

        {isCardLightboxOpen && (
            <div className="lightbox-overlay" onClick={() => setIsCardLightboxOpen(false)}>
                <img
                    src="/Business-Card.png"
                    alt="Business Card"
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