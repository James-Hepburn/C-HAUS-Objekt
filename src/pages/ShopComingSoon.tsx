import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ShopComingSoon.css";

interface ConfettiPiece {
  id: string;
  left: string;
  size: number;
  delay: number;
  color: string;
  x: number;
  y: number;
  rotate: number;
  bottom: string;
}

export default function ShopComingSoon() {
  type AnimControls = ReturnType<typeof useAnimation>;

  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const [winnerBox, setWinnerBox] = useState<number | null>(null);
  const [reward, setReward] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const lids: AnimControls[] = [useAnimation(), useAnimation(), useAnimation()];

  useEffect(() => {
    const savedWinner = localStorage.getItem("winnerBoxIndex");
    const savedOpened = localStorage.getItem("openedBoxIndex");

    if (savedWinner !== null) {
      setWinnerBox(Number(savedWinner));
      setShowMessage(true);
    }
    if (savedOpened !== null) {
      setActiveBox(Number(savedOpened));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r") {
        localStorage.removeItem("winnerBoxIndex");
        localStorage.removeItem("openedBoxIndex");
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const createConfetti = (color: string, index: number) => {
    const pieces: ConfettiPiece[] = Array.from({ length: 40 }).map((_, i) => ({
      id: `${index}-${i}`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.3,
      color:
        Math.random() < 0.33
          ? "#000"
          : Math.random() < 0.66
          ? "#fff"
          : color,
      x: (Math.random() - 0.5) * 200,
      y: -Math.random() * 200 - 150,
      rotate: Math.random() * 720 - 360,
      bottom: window.innerWidth <= 900 ? "130px" : "85px",
    }));
    setConfetti(pieces);
  };

  const openBox = (index: number, color: string) => {
    if (activeBox !== null || localStorage.getItem("openedBoxIndex") !== null) return;

    const roll = Math.random();
    let rewardValue;

    if (roll <= 0.15) {
      rewardValue = 15; 
    } else if (roll <= 0.40) {
      rewardValue = 10; 
    } else {
      rewardValue = 5;  
    }

    setReward(rewardValue);
    setWinnerBox(index); 

    localStorage.setItem("openedBoxIndex", index.toString());
    setActiveBox(index);

    const clickedBox = document.querySelector(`.gift-box-${index + 1}`);
    if (clickedBox) clickedBox.classList.add("animating");

    lids[index]
      .start({
        x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      })
      .then(() => {
        lids[index].start({
          y: [0, -40, -80, -160],
          rotateX: [0, -25, -35],
          scale: [1, 1.05, 1],
          transition: { duration: 1.4, ease: [0.45, 0, 0.55, 1] },
        });
        createConfetti(color, index);
        if (clickedBox) setTimeout(() => clickedBox.classList.remove("animating"), 1400);
      });

    setTimeout(() => {
      setWinnerBox(index);
      setShowMessage(true);
    }, 2000);
  };

  const boxColors = ["#E9468D", "#00B1D2", "#F47A42"];

  const messageText =
    reward !== null
      ? `You won ${reward}% off! Use code ZEBRA${reward} at checkout!`
      : "";

  return (
    <motion.div
      className="shop-coming-soon-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Header />
      <main>
        <h1 className="coming-soon-title">Shop Coming Soon!</h1>
        <h4 className="coming-soon-description">
          Click a gift below to reveal a surprise discount code you can use on future orders once our shop opens!
        </h4>

        {showMessage && (
          <motion.div
            className="reward-ticket-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="reward-ticket"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="ticket-inner">
                <p className="ticket-text">{messageText}</p>
                <button className="ticket-close-btn" onClick={() => setShowMessage(false)}>
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="gift-box-row">
          {boxColors.map((color, index) => (
            <div
              key={index}
              className={`gift-box gift-box-${index + 1} ${
                activeBox === index ? "opened" : ""
              } ${winnerBox === index ? "glow" : ""}`}
              onClick={() => openBox(index, color)}
              style={{ color }}
            >
              {confetti
                .filter((c) => c.id.startsWith(`${index}-`))
                .map((piece) => (
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
                      bottom: piece.bottom,
                      left: piece.left,
                      width: piece.size,
                      height: piece.size * 0.6,
                      backgroundColor: piece.color,
                      borderRadius: 2,
                      zIndex: 50,
                    }}
                  />
                ))}
              <motion.div
                className={`gift-lid ${activeBox === index ? "lid-open" : ""}`}
                animate={lids[index]}
                style={{
                  transformOrigin: "center bottom",
                  backgroundColor: color,
                }}
              />
              <div className="gift-base" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}