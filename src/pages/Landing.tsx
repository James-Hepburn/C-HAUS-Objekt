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
            size: Math.random() * 8 + 4,
            delay: Math.random() * 0.3,
            color: Math.random() > 0.5 ? "#000" : "#fff",
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

        await new Promise((resolve) => setTimeout(resolve, 1500));

        navigate("/home");
      }, 3200);
    };

    window.addEventListener("scroll", trigger);
    window.addEventListener("click", trigger);

    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("click", trigger);
    };
  }, [navigate, lid, base, name, motto, bg, msg]);

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
              bottom: window.innerWidth <= 900 ? "140px" : "280px",
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
            className="landing-motto"
            initial={{ opacity: 0 }}
            animate={motto}
          >
            <p>Timeless culture</p>
            <p>Objects to gift</p>
            <p>Designs to keep</p>
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