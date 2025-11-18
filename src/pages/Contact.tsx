import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridLayout from "../components/GridLayout";
import "./Contact.css";

export default function Contact() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [error, setError] = useState(false);

    interface ContactFormData {
        name: string;
        email: string;
        phone: string;
        message: string;
    }

    interface ContactFormEvent extends React.FormEvent<HTMLFormElement> {
        target: HTMLFormElement & {
            name: { value: string };
            email: { value: string };
            phone: { value: string };
            message: { value: string };
        };
    }

    const handleSubmit = async (e: ContactFormEvent): Promise<void> => {
        e.preventDefault();
        setError(false);
        const formData: ContactFormData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value,
        };
        const res: Response = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            setShowOverlay(true);
            e.target.reset();
        } else {
            setError(true);
        }
    };

  return (
    <motion.div
      className="contact-page"
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
            <div className="mobileBox-content">
                <form onSubmit={handleSubmit}>
                    <h3>Contact Form</h3>
                    <input type="text" id="name" name="name" placeholder="Full Name" required />
                    <input type="email" id="email" name="email" placeholder="Email" required />
                    <input type="tel" id="phone" name="phone" placeholder="Phone" />
                    <textarea id="message" name="message" rows={4} placeholder="Your message here..." required></textarea>
                    <button type="submit">Submit</button>
                </form>
                {showOverlay && (
                    <div className="overlay">
                        <div className="overlay-box">
                            <p>Message sent successfully!</p>
                            <button onClick={() => setShowOverlay(false)}>Close</button>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="overlay">
                        <div className="overlay-box">
                            <p>Failed to send message. Please try again later.</p>
                            <button onClick={() => setError(false)}>Close</button>
                        </div>
                    </div>
                )}

                <div className="button-container">
                <p>Connect with us directly:</p>
                <a href="mailto:info@chausobjekt.com">
                    <img src="/email.png" alt="Email" />
                </a>

                <a href="tel:+1234567890">
                    <img src="/phone.png" alt="Phone" />
                </a>
            </div>
            </div>
        }
        /* Box1 with Form */
        box1={
            <div className="box1-content">
                <form onSubmit={handleSubmit}>
                    <h3>Contact Form</h3>
                    <input type="text" id="name" name="name" placeholder="Full Name" required />
                    <input type="email" id="email" name="email" placeholder="Email" required />
                    <input type="tel" id="phone" name="phone" placeholder="Phone" />
                    <textarea id="message" name="message" rows={4} placeholder="Your message here..." required></textarea>
                    <button type="submit">Submit</button>
                </form>
                {showOverlay && (
                    <div className="overlay">
                        <div className="overlay-box">
                            <p>Message sent successfully!</p>
                            <button onClick={() => setShowOverlay(false)}>Close</button>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="overlay">
                        <div className="overlay-box">
                            <p>Failed to send message. Please try again later.</p>
                            <button onClick={() => setError(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        }

        /* Box2 with Logo */
        box2={
        <img
            src="/Logo-Wide-Transparent.png"
            alt="Logo"
            className="logo-image"
        />
        }

        /* Box3 with Text */
        box3={
            <h3>Follow us for more surprises!</h3>
        }

        /* Box4 with Email Button */
        box4={
            <a href="mailto:info@chausobjekt.com">
                <img src="/email.png" alt="Email" />
            </a>
        }

        /* Box5 with Phone Button */
        box5={
            <a href="tel:+1234567890">
                <img src="/phone.png" alt="Phone" />
            </a>
        }

        /* Box6 with Text */
        box6={
            <div className="box6-content">
                <h3>Connect With Us</h3>
                <p>info@chausobjekt.com</p>
                <p>Instagram Account</p>
                <p>Twitter Account</p>
                <p>Facebook Account</p>
            </div>
        }
        />
      </main>

      {/* Footer Component */}
      <Footer />
    </motion.div>
  );
}