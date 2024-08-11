import { useState } from "react";

const NewsTimeline = ({ newsItems }) => {
  const [expanded, setExpanded] = useState(false);

  const handleShowMore = () => setExpanded(true);
  const handleShowLess = () => setExpanded(false);

  return (
    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 md:p-8 max-w-md mx-auto h-[32rem] flex flex-col">
      <h1 className="text-3xl md:text-4xl font-light mb-6 text-center text-gray-800 dark:text-gray-200">
        Recent{" "}
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          News
        </span>
      </h1>

      <div className="flex-grow overflow-y-auto pr-4 scrollbar-hide">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {newsItems
            .slice(0, expanded ? newsItems.length : 2)
            .map((item, index) => (
              <li key={index} className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </span>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {item.date}
                </time>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                )}
                {item.url && (
                  <a
                    href={item.url}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300 ease-in-out dark:text-blue-400 dark:bg-blue-900 dark:hover:bg-blue-800"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </a>
                )}
              </li>
            ))}
        </ol>
      </div>

      {newsItems.length > 2 && (
        <div className="mt-6 text-center">
          <button
            onClick={expanded ? handleShowLess : handleShowMore}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsTimeline;
