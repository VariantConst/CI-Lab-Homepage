import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const images = [
  {
    id: 1,
    src: "https://images.ctfassets.net/yreyglvi5sud/X7a2cVY59HpmoHYUR0ggd/72044013592b61dc8cc397b4f394e06e/20240122_____.jpg",
    date: "2024-01-22",
  },
  {
    id: 2,
    src: "https://images.ctfassets.net/yreyglvi5sud/6mRZOkMupPMW7ewJHvSCgg/0331f72699402fbd190bbc9bc79a954d/20230402_____.jpg",
    date: "2023-04-02",
  },
  {
    id: 3,
    src: "https://images.ctfassets.net/yreyglvi5sud/359ORWc36SqxPQle3BECpi/50f0f93822c8d04acb40c8aab736d06e/20230611VALSE.jpg",
    date: "2023-06-11",
  },
  {
    id: 4,
    src: "https://images.ctfassets.net/yreyglvi5sud/6ESLcQagQLkrcrLPLDWvh5/95210ad29c887ced6a7292c28ff8879b/20220823VALSE.jpg",
    date: "2022-08-23",
  },
  {
    id: 5,
    src: "https://images.ctfassets.net/yreyglvi5sud/35hZ8RDgcJmbjzwbRIaf2e/9c36eb443a90413535e54175cd43c589/20220107_____.JPG",
    date: "2022-01-07",
  },
];

const ImageModal = ({ isOpen, onClose, image, onPrev, onNext }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-colors duration-500 ease-in-out dark:bg-gray-900 dark:bg-opacity-90"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-4xl mx-4 md:mx-8 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform"
        {...handlers}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
          <img
            src={image.src + "?w=1440&fit=fill"}
            alt={`Image ${image.id}`}
            className="w-full h-full object-contain transition-opacity duration-500 ease-in-out"
          />
        </div>
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-2xl font-bold bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 px-4 py-2 rounded-full transition-colors duration-300 ease-in-out"
          onClick={onClose}
        >
          &times;
        </button>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white px-4 py-2 rounded-full focus:outline-none transition-colors duration-300 ease-in-out"
          onClick={onPrev}
        >
          &lt;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white px-4 py-2 rounded-full focus:outline-none transition-colors duration-300 ease-in-out"
          onClick={onNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

const Carousel = ({ images, currentSlide, prevSlide, nextSlide }) => {
  return (
    <div className="relative w-full">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={`Slide ${image.id}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2">
              {image.date}
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full focus:outline-none"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full focus:outline-none"
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

const ImageGallery = () => {
  const [selectedImageId, setSelectedImageId] = useState(images[0].id);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSlide = images.findIndex(
    (image) => image.id === selectedImageId
  );

  const prevSlide = () => {
    setSelectedImageId((prevId) => {
      const currentIndex = images.findIndex((image) => image.id === prevId);
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      return images[prevIndex].id;
    });
  };

  const nextSlide = () => {
    setSelectedImageId((prevId) => {
      const currentIndex = images.findIndex((image) => image.id === prevId);
      const nextIndex = (currentIndex + 1) % images.length;
      return images[nextIndex].id;
    });
  };

  const selectedImage = images.find((image) => image.id === selectedImageId);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
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
      className="flex flex-col items-center space-y-8"
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={selectedImage}
        onPrev={() =>
          setSelectedImageId((prevId) =>
            prevId === 1 ? images.length : prevId - 1
          )
        }
        onNext={() =>
          setSelectedImageId((prevId) =>
            prevId === images.length ? 1 : prevId + 1
          )
        }
      />
      {isLargeScreen ? (
        <div className="flex space-x-4 items-center justify-center">
          {images.map((image) => (
            <div
              key={image.id}
              className={`relative cursor-pointer transition-all duration-500 ${
                image.id === selectedImageId
                  ? "w-6/12 h-[450px]"
                  : "h-[450px] w-1/12 hover:scale-105"
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
                    setIsModalOpen(true);
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
          className="flex flex-col items-center space-y-8"
          tabIndex="0"
          onKeyDown={handleKeyDown}
        >
          <ImageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            image={selectedImage}
            onPrev={prevSlide}
            onNext={nextSlide}
          />
          <div className="flex justify-center items-center mx-auto w-full overflow-hidden">
            <Carousel
              images={images}
              currentSlide={currentSlide}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
            />
          </div>
          <div className="text-center">
            <p
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "Helvetica Neue, Futura, sans-serif" }}
            >
              {selectedImage.title}
            </p>
            <p className="text-lg text-gray-500">{selectedImage.description}</p>
            <p className="text-base text-gray-400 mt-2">
              {selectedImage.author}
            </p>
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
