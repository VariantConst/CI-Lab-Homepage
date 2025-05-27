const ListView = ({ groupedEntries, formatAuthors }) => {
  const linkClasses = "hover:text-gray-600 transition duration-200";
  const linkClassesWithUnderline = linkClasses + " underline";

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
                          href={item.fields.pdf?.fields?.file?.url}
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
                        {item.fields.pdf?.fields?.file && (
                          <a
                            href={item.fields.pdf.fields.file.url}
                            className={linkClassesWithUnderline}
                          >
                            {"PDF"}
                          </a>
                        )}
                        {item.fields.supplementaryMaterial?.fields?.file && (
                          <a
                            href={item.fields.supplementaryMaterial.fields.file.url}
                            className={linkClassesWithUnderline}
                          >
                            {"Supplementary Material"}
                          </a>
                        )}
                        {item.fields.projectPage && (
                          <a
                            href={item.fields.projectPage}
                            className={linkClassesWithUnderline}
                          >
                            {"Website"}
                          </a>
                        )}
                        {item.fields.videoLink && (
                          <a
                            href={item.fields.videoLink}
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
