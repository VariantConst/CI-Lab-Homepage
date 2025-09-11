// Resolve PDF URL: prefer a short text field `pdfLink` (if present and a valid URL),
// otherwise fall back to the Contentful asset `fields.pdf.fields.file.url`.
function resolvePdfUrl(fields) {
  if (!fields) return undefined;
  const maybe = fields.pdfLink;
  if (typeof maybe === "string" && maybe.trim()) {
    const raw = maybe.trim();
    try {
      const safe = raw.startsWith("//") ? `https:${raw}` : raw;
      const u = new URL(safe);
      return u.href;
    } catch (e) {
      // invalid -> fallback
    }
  }
  return fields.pdf?.fields?.file?.url;
}

const ListView = ({ groupedEntries, formatAuthors }) => {
  const linkClasses = "hover:text-gray-600 transition duration-200";
  const linkClassesWithUnderline = linkClasses + " underline";
  // const pdfUrl = resolvePdfUrl(item.fields);
  return (
    <div className="px-4 lg:px-8 flex flex-col items-center" id="paper-list">
      {Object.entries(groupedEntries)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([year, items]) => (
          <div key={year} className="my-4 mx-auto flex justify-center w-full">
            <div className="max-w-screen-xl w-full">
              <div className="px-4 md:px-8 lg:px-12 border-b border-gray-200 dark:border-gray-700">
                <h2
                  id={`year-${year}`}
                  className="text-4xl font-light text-left mb-4"
                >
                  {year}
                </h2>
              </div>

              {items.map((item, index) => (
                <div 
                  key={item.sys.id}
                  className="flex flex-col lg:flex-row justify-center items-center py-4 text-sm lg:text-base"
                  data-index={index}
                  data-tags={JSON.stringify([
                    ...item.metadata.tags.map((tag) => tag.sys.id),
                    item.fields.date.split("-")[0],
                    item.fields.publisher,
                  ])}
                  data-fields={JSON.stringify(item.fields)}
                >
                  <div className="w-full lg:w-5/12 lg:pr-8 max-w-screen-md">
                    <div className="bg-white shadow-md h-48 lg:h-36 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={`${item.fields.thumbnail.fields.file.url}?w=1800&h=400&fit=pad&bg=rgb:ffffff`}
                        alt="Paper thumbnail"
                        className="w-full h-full absolute object-cover object-center transition-all duration-500 ease-in-out transform hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-2/3 mt-4 lg:mt-0 max-w-screen-md flex items-center">
                    <div>
                      <h2 className="font-light mb-2 text-lg lg:text-xl">
                        [
                        <a
                            href={resolvePdfUrl(item.fields) || "#"}
                            target={resolvePdfUrl(item.fields) ? "_blank" : undefined}
                            rel={resolvePdfUrl(item.fields) ? "noopener noreferrer" : undefined}
                            className={linkClasses}
                          >
                            {item.fields.publisher + item.fields.identifier}
                          </a>
                        ] {item.fields.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {formatAuthors(item.fields.author)}
                      </p>
                      <div className="flex-shrink-0 space-x-4">
                        {resolvePdfUrl(item.fields) && (
                          <a
                            href={resolvePdfUrl(item.fields)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassesWithUnderline}
                          >
                            {"PDF"}
                          </a>
                        )}
                        {item.fields.supplementaryMaterial?.fields?.file && (
                          <a
                            href={item.fields.supplementaryMaterial.fields.file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassesWithUnderline}
                          >
                            {"Supplementary"}
                          </a>
                        )}
                        {item.fields.projectPage && (
                          <a
                            href={item.fields.projectPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassesWithUnderline}
                          >
                            {"Website"}
                          </a>
                        )}
                        {item.fields.videoLink && (
                          <a
                            href={item.fields.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassesWithUnderline}
                          >
                            {"Video"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListView;
