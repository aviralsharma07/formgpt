import { useState, useEffect } from "react";

const Loader = () => {
  const texts = ["Setting up your form...", "Customizing your fields...", "Organizing the perfect layout...", "Finalizing your questions...", "Preparing your form for preview..."];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState("enter");

  useEffect(() => {
    const startExit = setTimeout(() => {
      setAnimation("exit");
    }, 2000);

    const changeText = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setAnimation("enter");
    }, 2500);

    return () => {
      clearTimeout(startExit);
      clearTimeout(changeText);
    };
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
      <div className="text-center p-8 relative max-w-md w-full">
        {/* Main content container with max width for larger screens */}
        <div className="relative flex flex-col items-center gap-7">
          {/* Enhanced loading animation with adjusted size */}
          <div className="relative w-20 h-20">
            {/* Outer ring with subtle glow */}
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full shadow-lg shadow-blue-500/10" />

            {/* Animated rings with refined spacing */}
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
            <div className="absolute inset-1.5 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDuration: "1.5s" }} />
            <div className="absolute inset-3 border-4 border-transparent border-t-blue-300 rounded-full animate-spin" style={{ animationDuration: "2s" }} />

            {/* Centered dot with glow */}
            <div className="absolute inset-[40%] bg-blue-400 rounded-full animate-pulse shadow-md shadow-blue-400/50" />
          </div>

          {/* Text container with improved height calculation */}
          <div className="relative h-20 flex items-center justify-center">
            <div
              className={`text-xl md:text-2xl w-[500px] font-light tracking-wider text-blue-400/90 absolute transition-all duration-500 px-4
                ${animation === "enter" ? "translate-y-0 opacity-100" : animation === "exit" ? "translate-y-6 opacity-0" : "-translate-y-6 opacity-0"}`}
            >
              {texts[currentIndex]}
            </div>
          </div>

          {/* Pulsing dots with refined spacing */}
          <div className="flex justify-center space-x-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
