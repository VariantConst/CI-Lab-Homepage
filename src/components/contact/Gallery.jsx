import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const images = [


    {
    id: 1,
    src: "https://images.ctfassets.net/yreyglvi5sud/qZDvCC0F99vyjBZ8ccPEl/1fae438ae5825d3af8fd1651e9ee2544/2026_winter_team_building.jpg",
    date: "2026-01-10",
    },

    {
    id: 2,
    src: "https://images.ctfassets.net/yreyglvi5sud/2J94MBXYZemp5Vde4HV2TI/94f50343406afecef1fc2b3375abcd44/20251023ICCV%C3%A5__%C3%A5__%C3%A5__1.jpg",
    date: "2025-10-23",
  },

  
    {
    id: 3,
    src: "https://images.ctfassets.net/yreyglvi5sud/4qanw8ARR9r8VBUPYMIpgl/02c6d487a295a3c4dd09bcc29f2c63cd/20250703%C3%A6__%C3%A7__%C3%A5__%C3%A6__%C3%A4__3.JPG",
    date: "2025-07-03",
  },
  {
    id: 4,
    src: "https://images.ctfassets.net/yreyglvi5sud/NKrwRCT1QVBHfHqYUjRJx/c6ee5e979b7091a4437faade69f03373/20250114%E5%AE%9E%E9%AA%8C%E5%AE%A4%E5%9B%A2%E5%BB%BA.jpg",
    date: "2025-01-14",
  },
 
  {
    id: 5,
    src: "https://images.ctfassets.net/yreyglvi5sud/3o5donN86NeCtF8Dpd4bqu/5d5774e2042b883f1098d384a068379c/WechatIMG802.jpg",
    date: "2024-09-10",
  },
  {
    id: 6,
    src: "https://images.ctfassets.net/yreyglvi5sud/uIYiJua3ITEiK1kgwJrxz/daed4b396c5afb3685dec0d5c5fd7968/20240506VALSE.jpg",
    date: "2024-05-06",
  },
  {
    id: 7,
    src: "https://images.ctfassets.net/yreyglvi5sud/X7a2cVY59HpmoHYUR0ggd/72044013592b61dc8cc397b4f394e06e/20240122_____.jpg",
    date: "2024-01-22",
  },
  // {
  //   id: 7,
  //   src: "https://images.ctfassets.net/yreyglvi5sud/6mRZOkMupPMW7ewJHvSCgg/0331f72699402fbd190bbc9bc79a954d/20230402_____.jpg",
  //   date: "2023-04-02",
  // },
  // {
  //   id: 7,
  //   src: "https://images.ctfassets.net/yreyglvi5sud/359ORWc36SqxPQle3BECpi/50f0f93822c8d04acb40c8aab736d06e/20230611VALSE.jpg",
  //   date: "2023-06-11",
  // },

];

const ImageGallery = () => {
  const [selectedImageId, setSelectedImageId] = useState(4);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setSelectedImageId((prevId) =>
        prevId === images.length ? 1 : prevId + 1
      ),
    onSwipedRight: () =>
      setSelectedImageId((prevId) =>
        prevId === 1 ? images.length : prevId - 1
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const selectedImage = images.find((image) => image.id === selectedImageId);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setSelectedImageId((prevId) =>
        prevId === 1 ? images.length : prevId - 1
      );
    } else if (event.key === "ArrowRight") {
      setSelectedImageId((prevId) =>
        prevId === images.length ? 1 : prevId + 1
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1536);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center space-y-8 w-full h-full border-none"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      {isLargeScreen ? (
        <div className="flex space-x-4 items-center justify-center">
          {images.map((image) => (
            <div
              key={image.id}
              className={`relative transition-all duration-500 ${
                image.id === selectedImageId
                  ? "w-6/12 h-[450px]"
                  : "h-[450px] w-1/12 hover:scale-105 cursor-pointer"
              }`}
              onClick={() => setSelectedImageId(image.id)}
            >
              <div className="relative w-full h-full">
                <img
                  src={image.src + "?w=960&fit=fill"}
                  alt={`Image ${image.id}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  onClick={() => {
                    setSelectedImageId(image.id);
                  }}
                />
                {image.id === selectedImageId && (
                  <img
                    src="https://images.ctfassets.net/yreyglvi5sud/2s4QIgEB7FKPXhA1jLtBjq/8e23b62f785835447335aaa1824535b0/transparent_gallery-background.png"
                    alt="Overlay"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[52%] w-11/12 h-11/12 object-cover rounded-t-lg 2xl:block hidden pointer-events-none"
                  />
                )}
              </div>
              {image.id === selectedImageId && (
                <p className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                  {selectedImage.date}
                </p>
              )}
              {image.id !== selectedImageId && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg transition-opacity duration-500 hover:opacity-0"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex justify-center items-center mx-auto w-full md:w-4/5 overflow-hidden"
          {...handlers}
        >
          <div
            className="relative w-full rounded-lg shadow-lg overflow-hidden"
            style={{
              aspectRatio: "5 / 3",
            }}
          >
            <div
              className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(selectedImageId - 1) * 100}%)`,
              }}
            >
              {images.map((image) => (
                <div key={image.id} className="w-full flex-shrink-0">
                  <img
                    src={image.src + "?w=960&fit=fill"}
                    alt={`Image ${image.id}`}
                    className="w-full object-cover transition duration-700 ease-in-out transform"
                    onClick={() => {
                      setSelectedImageId(image.id);
                    }}
                    style={{
                      aspectRatio: "5 / 3",
                    }}
                  />
                </div>
              ))}
            </div>
            <img
              src="https://images.ctfassets.net/yreyglvi5sud/2s4QIgEB7FKPXhA1jLtBjq/8e23b62f785835447335aaa1824535b0/transparent_gallery-background.png"
              alt="Overlay"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[52%] w-11/12 h-11/12 object-cover rounded-t-lg 2xl:block pointer-events-none opacity-90"
            />
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 select-none">
              <p className="text-white text-xs sm:text-base font-semibold bg-black bg-opacity-70 px-4 sm:px-6 py-1 sm:py-2 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                {selectedImage.date}
              </p>
            </div>
            <button
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() =>
                setSelectedImageId((prevId) =>
                  prevId === 1 ? images.length : prevId - 1
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 sm:h-6 w-4 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() =>
                setSelectedImageId((prevId) =>
                  prevId === images.length ? 1 : prevId + 1
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 sm:h-6 w-4 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="absolute bottom-1 sm:bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 sm:space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    selectedImageId === index + 1 ? "bg-white" : "bg-gray-300"
                  } transition duration-300 ease-in-out transform`}
                  onClick={() => setSelectedImageId(index + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="text-center">
        <p
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "Helvetica Neue, Futura, sans-serif" }}
        >
          {selectedImage.title}
        </p>
        <p className="text-lg text-gray-500">{selectedImage.description}</p>
        <p className="text-base text-gray-400 mt-2">{selectedImage.author}</p>
      </div>
    </div>
  );
};

export default ImageGallery;
