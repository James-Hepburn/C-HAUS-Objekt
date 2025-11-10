import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GridLayout from "./components/GridLayout";
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
  const handleNext = () => setCurrentIndex((i) => (i + 1) % images.length);
  const handlePrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
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
        <GridLayout>
          
        </GridLayout>
      </main>

      {/* Footer Component */}
      <Footer />
    </motion.div>
  );
}