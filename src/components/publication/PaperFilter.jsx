const filterStyle =
  "bg-white dark:bg-gray-800 mild font-serif text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-300 ease-in-out truncate";

const PaperFilter = ({
  tag_id_to_str,
  years_appeared,
  selectedTag,
  selectedYear,
  selectedConference,
  filterPapers,
  clearSelection,
  viewMode,
  switchView,
  top_conferences,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="my-8 md:px-8 flex flex-col justify-center items-center md:flex-row md:justify-between gap-4 w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row gap-4 w-2/3 md:w-auto">
          <select
            id="year-select"
            className={filterStyle}
            onChange={(e) =>
              filterPapers(selectedTag, e.target.value, selectedConference)
            }
            value={selectedYear}
          >
            <option className="mild" value="">
              Select Year
            </option>
            {years_appeared.map((year) => {
              if (year <= 2017) {
                return null;
              }
              return (
                <option key={year} value={year.toString()} className="mild">
                  {year}
                </option>
              );
            })}
            <option value="other" className="mild">
              Before 2017
            </option>
          </select>

          <select
            id="conference-select"
            className={filterStyle}
            onChange={(e) =>
              filterPapers(selectedTag, selectedYear, e.target.value)
            }
            value={selectedConference}
          >
            <option className="mild" value="">
              Select Venue
            </option>
            {[...top_conferences].map((conference) => (
              <option
                key={conference}
                value={conference}
                className="mild"
                title={conference}
              >
                {conference}
              </option>
            ))}
            <option value="other" className="mild">
              Other
            </option>
          </select>

          <select
            id="research-direction-select"
            className={filterStyle}
            onChange={(e) =>
              filterPapers(e.target.value, selectedYear, selectedConference)
            }
            value={selectedTag}
          >
            <option className="mild" value="">
              Select Topic
            </option>
            {Object.entries(tag_id_to_str).map(([tagId, tagName]) => (
              <option
                key={tagId}
                value={tagId}
                className="mild"
                title={tagName}
              >
                {tagName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <button
            id="cancel-selection"
            className="bg-transparent mild hover:text-gray-800 dark:hover:text-white font-serif text-lg rounded-lg p-3 inline-flex items-center justify-center transition duration-300 ease-in-out"
            onClick={clearSelection}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear
          </button>

          <div
            id="toggleView"
            className="cursor-pointer mild hover:text-gray-800 dark:hover:text-white transition duration-300 ease-in-out flex items-center"
            onClick={() => switchView(viewMode === "card" ? "list" : "card")}
          >
            {viewMode === "card" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                List View
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Card View
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperFilter;
