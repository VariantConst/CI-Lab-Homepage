import React, { useState } from "react";

const NewsTimeline = ({ newsItems }) => {
  const [expanded, setExpanded] = useState(false);

  const handleShowMore = () => {
    setExpanded(true);
  };

  const handleShowLess = () => {
    setExpanded(false);
  };

  return (
    <div className="p-6 md:p-10 md:min-w-96 flex flex-col items-center rounded-lg shadow-lg dark:bg-gray-800">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-6 text-center text-gray-600 dark:text-gray-400">
        Recent{" "}
        <span className="font-light text-gray-800 dark:text-white">News</span>
      </h1>

      <div className={`overflow-y-auto ${expanded ? "max-h-96" : ""}`}>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {newsItems
            .slice(0, expanded ? newsItems.length : 2)
            .map((item, index) => (
              <li key={index} className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-base md:text-lg lg:text-xl font-normal leading-none text-gray-400 dark:text-gray-500">
                  {item.date}
                </time>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mb-4 text-lg md:text-xl lg:text-2xl font-normal text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                )}

                {item.url && (
                  <a
                    href={item.url}
                    className="inline-flex items-center px-4 py-2 text-base md:text-lg lg:text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    Learn more{" "}
                    <svg
                      className="w-3 h-3 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      ></path>
                    </svg>
                  </a>
                )}
              </li>
            ))}
        </ol>
      </div>

      {newsItems.length > 2 && (
        <div className="mt-6 flex justify-center">
          {expanded ? (
            <button
              onClick={handleShowLess}
              className="px-4 py-2 text-base md:text-lg lg:text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Show Less
            </button>
          ) : (
            <button
              onClick={handleShowMore}
              className="px-4 py-2 text-base md:text-lg lg:text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsTimeline;
