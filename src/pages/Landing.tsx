import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  type AnimControls = ReturnType<typeof useAnimation>;
  const lid: AnimControls = useAnimation();
  const base: AnimControls = useAnimation();
  const name: AnimControls = useAnimation();
  const motto: AnimControls = useAnimation();
  const bg: AnimControls = useAnimation();
  const msg: AnimControls = useAnimation();
  const ballMsg: AnimControls = useAnimation();

  const confettiColors = ["#000", "#fff", "#ff2ea6", "#3cb8ff", "#ffbe4b"];

  const [confettiPieces, setConfettiPieces] = useState<
    {
      id: number;
      left: string;
      size: number;
      color: string;
      x: number;
      y: number;
      rotate: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    const trigger = () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("click", trigger);

      lid
        .start({
          x: [0, -6, 6, -3, 3, 0],
          transition: { duration: 0.5 },
        })
        .then(() => {
          const pieces = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 14 + 10,
            delay: Math.random() * 0.3,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            x: (Math.random() - 0.5) * 200,
            y: -Math.random() * 200 - 150,
            rotate: Math.random() * 720 - 360,
          }));
          setConfettiPieces(pieces);

          lid.start({
            y: "-120vh",
            transition: { duration: 1, ease: [0.45, 0, 0.55, 1] },
          });
        });

      msg.start({ opacity: 0, y: 20, transition: { duration: 0.4 } });

      name.start({
        opacity: 1,
        y: -100,
        transition: { delay: 0.75, duration: 0.8 },
      });

      motto.start({
        opacity: 1,
        transition: { delay: 1.5, duration: 0.8 },
      });

      bg.start({
        opacity: 1,
        transition: {
          delay: 2.2,
          duration: 2,
          ease: [0.16, 1, 0.3, 1],
        },
      });

      setTimeout(() => {
        name.start({
          opacity: 0,
          y: -150,
          transition: { duration: 0.8, ease: "easeInOut" },
        });
      }, 3000);

      setTimeout(async () => {
        await base.start({
          position: "fixed",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          width: 520,
          height: 280,
          borderRadius: 20,
          transition: { duration: 0 } 
        });

        await base.start({
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        });

        await motto.start({
          opacity: 0,
          transition: { duration: 0.6, ease: "easeInOut" },
        });

        await ballMsg.start({
          opacity: 1,
          transition: { duration: 0.8, ease: "easeInOut" },
        });

        await new Promise((resolve) => setTimeout(resolve, 5000));

        navigate("/home");
      }, 3200);
    };

    window.addEventListener("scroll", trigger);
    window.addEventListener("click", trigger);

    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("click", trigger);
    };
  }, [navigate, lid, base, name, motto, bg, msg, ballMsg]);

  return (
    <motion.div
      className="landing"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="landing-gradient"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: 2.2,
          duration: 2.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        className="landing-bg"
        initial={{ opacity: 0 }}
        animate={bg}
        transition={{
          delay: 2.2,
          duration: 2.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <div className="landing-gift">
        {confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
            animate={{
              opacity: [1, 0.9, 0],
              y: piece.y,
              x: piece.x,
              rotate: piece.rotate,
              transition: {
                duration: 2.2,
                ease: "easeOut",
                delay: piece.delay,
              },
            }}
            style={{
              position: "absolute",
              bottom: window.innerWidth <= 900 ? "180px" : "280px",
              left: piece.left,
              width: piece.size,
              height: piece.size * 0.6,
              backgroundColor: piece.color,
              borderRadius: 2,
              zIndex: 250,
            }}
          />
        ))}

        <motion.div className="landing-gift-lid" animate={lid}>
            <div className="landing-bow">
              <div className="landing-bow-left" />
              <div className="landing-bow-right" />
            </div>
        </motion.div>

        <motion.div
          className="landing-company-name"
          initial={{ opacity: 0, y: 0 }}
          animate={name}
        >
          C. HAUS <span className="mobile-break">Objekt</span>
        </motion.div>

        <motion.div className="landing-gift-base" animate={base}>
          <motion.div
            className="landing-motto stacked-motto"
            initial={{ opacity: 0 }}
            animate={motto}
          >
            {window.innerWidth <= 900 ? (
              <>
                <p className="motto-line">
                  <span className="word pink">timeless culture</span>
                </p>
                <p className="motto-line">
                  <span className="word blue">objects to gift</span>
                </p>
                <p className="motto-line">
                  <span className="word yellow">designs to keep</span>
                </p>
              </>
            ) : (
              <>
                <p className="motto-line">
                  <span className="word pink">timeless culture</span>
                  <span className="word">objects to gift</span>
                  <span className="word">designs to keep</span>
                </p>

                <p className="motto-line">
                  <span className="word">timeless culture</span>
                  <span className="word blue">objects to gift</span>
                  <span className="word">designs to keep</span>
                </p>

                <p className="motto-line">
                  <span className="word">timeless culture</span>
                  <span className="word">objects to gift</span>
                  <span className="word yellow">designs to keep</span>
                </p>
              </>
            )}
          </motion.div>

          <motion.div
            className="landing-message"
            initial={{ opacity: 0 }}
            animate={ballMsg}
          >
            <p>
              The Fortune Ball in support of Markham Stouffville Hospital
              Foundation will take place on Saturday, November 22, 2025 at the
              Hilton Toronto/Markham Suites &amp; Conference Centre.
            </p>
            <p style={{ marginTop: "1rem" }}>
              We are grateful to have contributed and wish all guests a delightful
              and memorable evening at the ball.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.p className="scroll-text" animate={msg}>
        Scroll or Click to Open
      </motion.p>
      <motion.div className="down-arrow" animate={msg}>
        ↓
      </motion.div>
    </motion.div>
  );
}