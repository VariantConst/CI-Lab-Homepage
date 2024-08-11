import { useState } from "react";
import { motion } from "framer-motion";

const ImageReveal = () => {
  const [isHovered, setIsHovered] = useState(false);

  const highlightedText = (text, highlight) => (
    <span>
      {text.split("").map((char, charIndex) =>
        highlight.includes(char) ? (
          <span
            key={charIndex}
            className="text-emerald-600 dark:text-emerald-400 font-bold"
          >
            {char}
          </span>
        ) : (
          <span key={charIndex}>{char}</span>
        )
      )}
    </span>
  );

  const textItems = [
    ['"计"承经典理论', "计"],
    ['解"算"深度模型', "算"],
    ['"摄"取光影变化', "摄"],
    ['成"像"智能时代', "像"],
  ];

  const buttonStyle =
    "px-6 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600";

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 lg:hover:shadow-xl transition duration-300 rounded-xl dark:lg:hover:shadow-2xl dark:lg:hover:shadow-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-48 lg:w-72 lg:h-72 mb-4 lg:mb-0 lg:mr-12 flex items-center justify-center relative overflow-hidden">
        <img
          src="/logo/original_book.png"
          alt="Original Image"
          className="w-full h-full object-contain absolute top-0 left-0 lg:hidden"
        />
        <motion.img
          src="/logo/edge_book.png"
          alt="Edge Image"
          className="w-full h-full object-contain absolute top-0 left-0 hidden lg:block dark:lg:hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img
          src="/logo/edge_book_reversed.png"
          alt="Edge Image (Dark Mode)"
          className="w-full h-full object-contain absolute top-0 left-0 hidden dark:lg:block"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img
          src="/logo/original_book.png"
          alt="Original Image"
          className="w-full h-full object-contain absolute top-0 left-0 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-center lg:text-left flex flex-col items-center w-full lg:w-auto">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-6 lg:h-full lg:items-center">
          {textItems.map(([text, highlight], index) => (
            <motion.p
              key={index}
              className="text-base lg:text-3xl font-md text-gray-800 dark:text-gray-200"
              initial={{ y: 0 }}
              animate={{ y: isHovered && window.innerWidth >= 1024 ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              {highlightedText(text, highlight)}
            </motion.p>
          ))}
        </div>
        <a href="/book" className={`mt-10 lg:mt-6 ${buttonStyle} lg:hidden`}>
          查看详情
        </a>
        <motion.a
          href="/book"
          className={`mt-6 ${buttonStyle} hidden lg:block`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 30 }}
          transition={{ duration: 0.5 }}
        >
          查看详情
        </motion.a>
      </div>
    </div>
  );
};

export default ImageReveal;
