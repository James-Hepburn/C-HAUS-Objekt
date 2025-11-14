import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridLayout from "../components/GridLayout";
import "./About.css";

export default function About() {
    const navigate = useNavigate();

  return (
    <motion.div
      className="about-page"
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
                <h3>Our Story</h3>
                <p>
                    At C.HAUS Objekt, we believe that the most meaningful gifts 
                    tell a story. Rooted in culture and crafted with intention, 
                    our pieces are designed to celebrate tradition, artistry, and 
                    connection. Each object is more than a product, it's a reflection 
                    of heritage, design, and heart.
                </p>
                <p>
                    We specialize in creating one-of-a-kind gifts that fuse cultural 
                    inspiration with thoughtful craftsmanship. From the materials we 
                    use to the stories behind each design, every detail is considered 
                    to ensure you're giving something truly unique and personal.
                </p>
                <p>
                    In addition to our curated collection, we collaborate with 
                    organizations and companies to design custom cultural and 
                    brand-centered products that reflect their values, foster 
                    community, and strengthen company culture through meaningful design.
                </p>
                <p>
                    C.HAUS Objekt is where culture meets creativity, bringing you 
                    objects of meaning for every occasion, from personal milestones 
                    to collective celebrations.
                </p>
            </div>
        }

        /* Box2 with Text */
        box2={
            <div className="box2-content">
                <h3>Mission Story</h3>
                <p>
                    At C.HAUS Objekt, our mission is to craft meaningful gifts 
                    that tell a story. We celebrate culture, artistry, and 
                    connection through thoughtfully designed objects that honour 
                    heritage and inspire belonging. By blending traditional 
                    craftsmanship with modern design, we create unique pieces and 
                    collaborate with organizations to foster community, express 
                    identity, and make every gift a lasting reflection of heart 
                    and purpose.
                </p>
            </div>
        }

        /* Box3 with Text */
        box3={
            <h3>Based in Toronto, Canada</h3>
        }

        /* Box4 with Contact Button */
        box4={
            <button onClick={() => navigate("/contact")}>
                Contact
            </button>
        }

        /* Box5 with Shop Button */
        box5={
            <button onClick={() => navigate("/shop")}>
                Shop
            </button>
        }

        /* Box6 with Text */
        box6={
            <div className="box6-content">
                <h3>Our Services</h3>
                <ul>
                  <li>Custom Gift Design</li>
                  <li>Brand & Organization Design</li>
                  <li>Merchandise & Apparel</li>
                  <li>Print & Stationery Design</li>
                </ul>
            </div>
        }

        /* Merged Top Box with Text */
        mergedTop={
            <div className="box2-content">
                <h3>Mission Story</h3>
                <p>
                    At C.HAUS Objekt, our mission is to craft meaningful gifts 
                    that tell a story. We celebrate culture, artistry, and 
                    connection through thoughtfully designed objects that honour 
                    heritage and inspire belonging. By blending traditional 
                    craftsmanship with modern design, we create unique pieces and 
                    collaborate with organizations to foster community, express 
                    identity, and make every gift a lasting reflection of heart 
                    and purpose.
                </p>
            </div>
        }

        /* Merged Bottom Box with Text */
        mergedBottom={
            <div className="box6-content">
                <h3>Our Services</h3>
                <ul>
                  <li>Custom Gift Design</li>
                  <li>Brand & Organization Design</li>
                  <li>Merchandise & Apparel</li>
                  <li>Print & Stationery Design</li>
                </ul>
            </div>
        }
        />
      </main>

      {/* Footer Component */}
      <Footer />
    </motion.div>
  );
}