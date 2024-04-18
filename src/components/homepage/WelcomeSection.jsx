import React, { useState, useEffect, useRef } from "react";
import AnimatedLink from "../utils/AnimatedLink.jsx";

const WelcomeSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full justify-center items-center">
      <div className="mx-4 4xl:mx-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin mb-8 mild">
          Welcome to{" "}
          <span className="font-light text-gray-800 dark:text-white">
            Camera Intelligence
          </span>{" "}
          Lab
        </h2>
        <p className="text-md md:text-lg lg:text-xl mild mb-8 leading-relaxed">
          Our lab conducts research on computational photography and computer
          vision at the Institute for Visual Technology / National Engineering
          Research Center of Visual Technology{" "}
          <AnimatedLink
            href="https://idm.pku.edu.cn/"
            className="text-blue-600 dark:text-blue-500"
          >
            (IDM)
          </AnimatedLink>
          , School of Computer Science{" "}
          <AnimatedLink
            href="https://cs.pku.edu.cn/"
            className="text-blue-600 dark:text-blue-500"
          >
            (CS)
          </AnimatedLink>
          , Peking University{" "}
          <AnimatedLink
            href="https://www.pku.edu.cn/"
            className="text-blue-600 dark:text-blue-500"
          >
            (PKU)
          </AnimatedLink>
          .
        </p>
        <p className="text-md md:text-lg lg:text-xl mild mb-10 leading-relaxed">
          We study and build Cameras powered with artificial Intelligence
          algorithms to benefit the next generation of AI through super-human
          visual sensing and computing. Please refer to our{" "}
          <AnimatedLink
            href="/publication"
            className="text-blue-600 dark:text-blue-500"
          >
            publication page
          </AnimatedLink>{" "}
          for details.
        </p>
        <div className="relative inline-block">
          <div className="flex items-center">
            <a
              href="/contact"
              className="inline-block relative overflow-hidden bg-transparent text-gray-800 dark:text-gray-200 text-lg md:text-xl lg:text-2xl px-8 py-3 border-2 border-gray-400 dark:border-gray-600 rounded-md hover:text-white dark:hover:text-white group transition duration-500"
            >
              <span className="absolute w-0 h-full top-0 left-0 bg-gray-800 dark:bg-gray-700 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative z-10 group-hover:text-white dark:group-hover:text-white transition duration-300">
                Join our lab
              </span>
            </a>
            <div className="relative ml-4">
              <svg
                className="w-12 h-12 mild cursor-pointer hover:text-gray-700 dark:hover:text-gray-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={togglePopup}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              {showPopup && (
                <div
                  ref={popupRef}
                  className="absolute -top-56 -left-36 sm:left-12 sm:-top-36 w-48 md:w-64 bg-white rounded-lg shadow-xl z-20"
                >
                  <div className="p-4">
                    <img
                      src="https://images.ctfassets.net/yreyglvi5sud/3YoxwD1JbN3YH4CmYJzVDy/ae2700c411be1df118139fcf625fc91a/qrcode.jpg"
                      alt="Placeholder"
                      className="w-full h-auto"
                      loading="eager"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
