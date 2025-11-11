import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridLayout from "../components/GridLayout";
import "./Work.css";

export default function Work() {
  return (
    <motion.div
      className="work-page"
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
        />
      </main>

      {/* Footer Component */}
      <Footer />
    </motion.div>
  );
}