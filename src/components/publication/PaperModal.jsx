import TagLink from "./TagLink";

const PaperModal = ({ closeModal, selectedPaper }) => {
  return (
    <div
      id="modal-backdrop-paper"
      className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-70 dark:bg-opacity-80 flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div
        id="modal-content-paper"
        className="bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 md:max-w-screen-md m-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white dark:bg-gray-900 px-6 py-8 sm:p-8">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                id="paper-title"
                className="text-xl sm:text-2xl md:text-3xl leading-8 font-serif font-semibold mb-4"
              >
                {selectedPaper?.fields?.title}
              </h3>
              <div className="mt-2">
                <p
                  id="paper-authors"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-serif mb-2"
                >
                  {selectedPaper?.fields?.author.join(", ")}
                </p>
                <p
                  id="paper-abstract"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 leading-6 sm:leading-7"
                >
                  {selectedPaper?.fields?.abstract}
                </p>
                <p
                  id="paper-publisher"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 font-serif"
                >
                  Accepted by {selectedPaper?.fields?.publisher}{" "}
                  {selectedPaper?.fields?.date
                    ? `${selectedPaper?.fields?.date.split("-")[0]}`
                    : ""}
                </p>
              </div>
              <div className="mt-6 space-x-2 sm:space-x-4 space-y-2">
                {selectedPaper?.fields?.pdf?.fields?.file && (
                  <TagLink
                    href={selectedPaper.fields.pdf.fields.file.url}
                    type="pdf"
                  />
                )}
                {selectedPaper?.fields?.supplementaryMaterial?.fields?.file && (
                  <TagLink
                    href={selectedPaper.fields.supplementaryMaterial.fields.file.url}
                    type="supplementary"
                  />
                )}
                {selectedPaper?.fields?.projectPage && (
                  <TagLink
                    href={selectedPaper.fields.projectPage}
                    type="project"
                  />
                )}
                {selectedPaper?.fields?.videoLink && (
                  <TagLink href={selectedPaper.fields.videoLink} type="video" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperModal;
