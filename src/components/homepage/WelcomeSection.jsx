import React, { useState, useEffect, useRef } from "react";
import AnimatedLink from "../utils/AnimatedLink.jsx";
import { UserPlus, Book, MessageCircle } from "lucide-react";

const WelcomeSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => setShowPopup(!showPopup);

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-8">
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">
            Camera Intelligence
          </span>{" "}
          Lab
        </h2>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p className="leading-relaxed">
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
          <p className="leading-relaxed">
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
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="/contact"
            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-300"
          >
            <UserPlus className="w-5 h-5 mr-2 text-white" />
            <span>Contact</span>
          </a>
          <a
            href="/book"
            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition duration-300"
          >
            <Book className="w-5 h-5 mr-2 text-blue-700" />
            <span>Textbook</span>
          </a>
          <button
            onClick={togglePopup}
            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2 text-blue-700" />
            <span>WeChat</span>
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={popupRef}
              className="bg-white rounded-lg p-8 max-w-sm w-full"
            >
              <img
                src="https://images.ctfassets.net/yreyglvi5sud/3YoxwD1JbN3YH4CmYJzVDy/ae2700c411be1df118139fcf625fc91a/qrcode.jpg"
                alt="WeChat QR Code"
                className="w-full h-auto mb-4"
                loading="eager"
              />
              <button
                onClick={togglePopup}
                className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WelcomeSection;
