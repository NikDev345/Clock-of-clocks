import { useEffect, useState } from "react";
import Clock from "./Clock";
import { digits } from "./digits";
import "./index.css";

/* =========================
   TIME DIGITS
========================= */
const getTimeDigits = () => {
  const now = new Date();
  return [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  ].flatMap(v =>
    String(v).padStart(2, "0").split("").map(Number)
  );
};

/* =========================
   APP COMPONENT
========================= */
export default function App() {
  const [time, setTime] = useState(Array(6).fill(0));
  const [initial, setInitial] = useState(true);
  const [theme, setTheme] = useState("light");
  const [transitioning, setTransitioning] = useState(false);

  /* ===== CLOCK TICK ===== */
  useEffect(() => {
    let timer;

    const tick = () => {
      setTime(getTimeDigits());
      timer = setTimeout(tick, 1000 - Date.now() % 1000);
    };

    const start = setTimeout(() => {
      setInitial(false);
      tick();
    }, 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(start);
    };
  }, []);

  /* ===== THEME TOGGLE ===== */
  const toggleTheme = () => {
    setTransitioning(true);

    setTimeout(() => {
      setTheme(prev => (prev === "light" ? "dark" : "light"));
      setTransitioning(false);
    }, 600);
  };

  /* ===== RENDER ===== */
  return (
    <div className={`app ${theme}`}>
      {/* Full screen wipe animation */}
      {transitioning && <div className="theme-overlay" />}

      {/* Theme toggle button */}
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀ Light"}
      </button>

      {/* Clock digits */}
      {time.map((digit, i) => (
        <div key={i}>
          {digits[digit].map((cfg, j) => (
            <Clock
              key={j}
              h={cfg.h}
              m={cfg.m}
              initial={initial}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
