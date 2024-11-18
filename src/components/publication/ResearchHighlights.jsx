import AnimatedLink from "../utils/AnimatedLink.jsx";

const contactCardStyle =
  "flex flex-col justify-start items-center md:w-[calc(50%-1rem)] border-2 border-gray-300 dark:border-gray-500 rounded-lg p-8 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-400";

const top_conferences = [
  "TPAMI",
  "IJCV",
  "TIP",
  "TCSVT",
  "TOG",
  "CVPR",
  "ICCV",
  "ECCV",
  "ICCP",
  "NeurIPS",
  "ICML",
  "MM",
  "AAAI",
];

const ResearchHighlights = ({ entries }) => {
  const conferenceCounts = {};

  // 遍历 entries.items 来统计每个会议的论文数量
  entries.items.forEach((item) => {
    const publisher = item.fields.publisher;
    if (conferenceCounts[publisher]) {
      conferenceCounts[publisher]++;
    } else {
      conferenceCounts[publisher] = 1;
    }
  });

  // 动态生成会议和数量的字符串

  const conferenceString = top_conferences
    .map((conference) => `${conference} × ${conferenceCounts[conference] || 0}`)
    .join(", ");

  const cardData = [
    {
      title: "In top venues",
      content: <span className="text-center">{conferenceString}</span>,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      title: "Complete list",
      content: (
        <p className="text-center">
          Refer to{" "}
          <AnimatedLink
            href="https://scholar.google.com/citations?user=K1LjZxcAAAAJ&hl=en"
            className="text-blue-600 dark:text-blue-300 transition duration-300 hover:text-blue-500 dark:hover:text-blue-500"
          >
            Google Scholar
          </AnimatedLink>{" "}
          and{" "}
          <AnimatedLink
            href="http://dblp.uni-trier.de/pers/hd/s/Shi:Boxin"
            className="text-blue-600 dark:text-blue-300 transition duration-300 hover:text-blue-500 dark:hover:text-blue-500"
          >
            DBLP
          </AnimatedLink>{" "}
          for more updated information.
        </p>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-gray-600 dark:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mx-auto lg:max-w-screen-xl">
      <div className="py-12 px-4 md:px-8">
        <h2 className="text-4xl font-light tracking-tight sm:text-5xl mb-8">
          Research Highlights
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-stretch w-full space-y-4 md:space-y-0 md:space-x-4">
          {cardData.map(({ title, content, icon }, index) => (
            <div key={title} className={contactCardStyle}>
              <div className="flex items-center mb-4">
                {icon}
                <h3 className="text-2xl font-light dark:text-gray-200">
                  {title}
                </h3>
              </div>
              <div
                className={`text-lg mild leading-relaxed text-left ${
                  index === 1 ? "md:px-8 xl:px-16" : ""
                }`}
              >
                {content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700"></div>
    </div>
  );
};

export default ResearchHighlights;
