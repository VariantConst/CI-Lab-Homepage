import React from "react";

const LoadMoreButton = ({ papers, filteredTotal, loadMore }) => {
  return papers.length < filteredTotal ? (
    <div className="flex items-center justify-center space-x-4 m-6">
      <button
        onClick={loadMore}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 focus:outline-none transition duration-300"
      >
        <span className="text-lg font-semibold tracking-wide uppercase">
          Load More
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  ) : null;
};

export default LoadMoreButton;
