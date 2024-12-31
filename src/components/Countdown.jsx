import { useState, useEffect } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const yearEnd = new Date("January 1, 2025 00:00:00");
    const now = new Date();
    const difference = yearEnd - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isNewYear, setIsNewYear] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the user is on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Set breakpoint for mobile
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
      if (Object.keys(time).length === 0) {
        setIsNewYear(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative h-screen ${
        isNewYear ? "bg-yellow-400" : "bg-gradient-to-br from-purple-700 via-pink-500 to-yellow-300"
      } overflow-hidden`}
    >
      {/* Decorative Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-white opacity-20 rounded-full"></div>

      {/* Countdown Timer */}
      <div
        className={`flex flex-col ${
          isMobile ? "items-start pl-6 pt-12" : "items-center"
        } justify-center h-full text-white`}
      >
        {!isNewYear ? (
          <>
            <h1
              className={`${
                isMobile ? "text-3xl mb-4" : "text-5xl mb-6"
              } font-bold`}
            >
              Countdown to 2025
            </h1>
            <div className={`text-3xl space-x-8 flex ${isMobile ? "flex-col space-y-4 space-x-0" : ""}`}>
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <span className="font-bold">{value}</span>
                  <span className="capitalize">{unit}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h1
              className={`${
                isMobile ? "text-4xl mb-2" : "text-6xl mb-4"
              } font-extrabold`}
            >
              🎉 Happy New Year 2025! 🎉
            </h1>
            <p className="text-2xl">Wishing you joy, success, and happiness!</p>
          </div>
        )}
      </div>

      {/* Celebration Animation */}
      {isNewYear && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-fade-in">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-yellow-300 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
