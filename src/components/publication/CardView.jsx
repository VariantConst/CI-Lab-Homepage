import { useState, useEffect } from "react";
import TagLink from "./TagLink";

const colorVariants = {
  red: "bg-red-200 text-red-800",
  orange: "bg-orange-200 text-orange-800",
  amber: "bg-amber-200 text-amber-800",
  yellow: "bg-yellow-200 text-yellow-800",
  lime: "bg-lime-200 text-lime-800",
  green: "bg-green-200 text-green-800",
  emerald: "bg-emerald-200 text-emerald-800",
  teal: "bg-teal-200 text-teal-800",
  cyan: "bg-cyan-200 text-cyan-800",
  sky: "bg-sky-200 text-sky-800",
  blue: "bg-blue-200 text-blue-800",
  indigo: "bg-indigo-200 text-indigo-800",
  violet: "bg-violet-200 text-violet-800",
  purple: "bg-purple-200 text-purple-800",
  fuchsia: "bg-fuchsia-200 text-fuchsia-800",
  pink: "bg-pink-200 text-pink-800",
  rose: "bg-rose-200 text-rose-800",
};

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function tagIDtoColor(tagID) {
  const hash = hashString(tagID + tagID);
  const colorIndex = hash % Object.keys(colorVariants).length;
  const colorKey = Object.keys(colorVariants)[colorIndex];
  return colorVariants[colorKey];
}

const CardView = ({ papers, openModal, formatAuthors, tag_id_to_str }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isSingleColumn, setIsSingleColumn] = useState(false);

  const toggleAbstract = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSingleColumn(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setExpandedIndex(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 lg:max-w-screen-xl"
        id="paper-list"
      >
        {papers.map((item, index) => (
          <div
            key={item.sys.id}
            className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg text-base md:text-lg flex flex-col"
            id={`card-${index}`}
            data-index={index}
            data-tags={JSON.stringify([
              ...item.metadata.tags.map((tag) => tag.sys.id),
              item.fields.date.split("-")[0],
              item.fields.publisher,
            ])}
            data-fields={JSON.stringify(item.fields)}
          >
            <div className="p-8 pb-0 flex-1">
              <div className="mb-6 h-64 w-full flex items-center justify-center relative overflow-hidden rounded-2xl">
                <img
                  id={`thumbnail-${index}`}
                  src={`${item.fields.thumbnail.fields.file.url}?w=1200&h=600&fit=pad&bg=rgb:ffffff`}
                  alt="Paper thumbnail"
                  className={
                    "w-full h-full absolute object-cover object-center hover:cursor-pointer transition-transform duration-500 hover:scale-110"
                  }
                  loading="lazy"
                  onClick={() =>
                    isSingleColumn ? toggleAbstract(index) : openModal(item)
                  }
                />
              </div>
              <h2 className="font-serif font-semibold mb-3 text-xl md:text-2xl">
                <a
                  href={item.fields.pdf?.fields?.file?.url}
                  className="text-blue-600 hover:text-blue-500 transition-colors duration-300"
                >
                  [{item.fields.publisher + item.fields.identifier}]
                </a>
                &nbsp;{item.fields.title}
              </h2>
              <p className="mild font-serif">
                {formatAuthors(item.fields.author)}
              </p>
              {isSingleColumn && (
                <div
                  className={`my-2 overflow-hidden transition-max-height duration-700 ease-in-out ${
                    expandedIndex === index ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <p className="mild">{item.fields.abstract}</p>
                </div>
              )}
            </div>
            <div className="px-8 pt-4 pb-6">
              <div className="flex flex-wrap justify-between items-center gap-y-2">
                <div className="flex gap-x-2">
                  {item.fields.pdf?.fields?.file && (
                    <TagLink
                      href={item.fields.pdf.fields.file.url}
                      type="pdf"
                    />
                  )}
                  {item.fields.projectPage && (
                    <TagLink href={item.fields.projectPage} type="project" />
                  )}
                  {item.fields.videoLink && (
                    <TagLink href={item.fields.videoLink} type="video" />
                  )}
                </div>
                {item.metadata.tags.map((tag) => (
                  <span
                    key={tag.sys.id}
                    className={`select-none inline-flex items-center px-3 py-1 rounded-md font-medium text-xs uppercase tracking-wider transition-colors duration-300 ${tagIDtoColor(
                      tag.sys.id
                    )} opacity-80 hover:opacity-100`}
                  >
                    {" "}
                    {tag_id_to_str[tag.sys.id]}{" "}
                  </span>
                ))}
              </div>
              {isSingleColumn && (
                <div className="flex justify-center items-center mt-2">
                  <svg
                    className="w-8 h-8 text-gray-500 dark:text-gray-400 cursor-pointer hover:animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => toggleAbstract(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        expandedIndex === index
                          ? "M5 15l7-7 7 7"
                          : "M19 9l-7 7-7-7"
                      }
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardView;
