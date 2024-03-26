import React, { useState } from "react";
import PaperSelect from "./ResearchHighlights";
import PaperFilter from "./PaperFilter";
import CardView from "./CardView";
import ListView from "./ListView";
import PaperModal from "./PaperModal";
import LoadMoreButton from "./LoadMoreButton";

const formatAuthors = (authors) => {
  return authors.length > 1
    ? `${authors.slice(0, -1).join(", ")}, and ${authors[authors.length - 1]}`
    : authors[0];
};

const tag_id_to_str = {
  photometric3d: "Photometric & 3D",
  artifactsRemoval: "Artifacts Removal",
  neuromorphicCamera: "Neuromorphic Camera",
  multiModalEditing: "Multi-modal Editing",
  other: "Other",
};

// 设置首屏默认加载的论文数量（以及后续每次多加载的论文数量）
const initialDisplayCount = 8;

const top_conferences = [
  "TPAMI",
  "IJCV",
  "TIP",
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

const PapersDisplay = ({ entries }) => {
  const years_set = new Set(
    entries.items.map((item) => item.fields.date.split("-")[0])
  );
  const years_appeared = Array.from(years_set).sort((a, b) => +b - +a);

  const [papers, setPapers] = useState(
    entries.items.slice(0, initialDisplayCount)
  );

  const [viewMode, setViewMode] = useState("list");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedConference, setSelectedConference] = useState("");
  const [filteredTotal, setFilteredTotal] = useState(entries.items.length);

  const filterPapers = (tag, year, conference) => {
    setSelectedTag(tag);
    setSelectedYear(year);
    setSelectedConference(conference);

    const filteredPapers = entries.items.filter(
      (paper) =>
        (tag === "" || paper.metadata.tags.some((t) => t.sys.id === tag)) &&
        (year === "" ||
          (year === "other"
            ? paper.fields.date.split("-")[0] <= "2017"
            : paper.fields.date.split("-")[0] === year)) &&
        (conference === "" ||
          (conference === "other"
            ? !top_conferences.includes(paper.fields.publisher)
            : paper.fields.publisher === conference))
    );

    setFilteredTotal(filteredPapers.length);
    setPapers(filteredPapers.slice(0, initialDisplayCount));
  };

  const loadMore = () => {
    const nextPapers = entries.items.filter(
      (paper) =>
        (selectedTag === "" ||
          paper.metadata.tags.some((tag) => tag.sys.id === selectedTag)) &&
        (selectedYear === "" ||
          (selectedYear === "other"
            ? paper.fields.date.split("-")[0] <= "2017"
            : paper.fields.date.split("-")[0] === selectedYear)) &&
        (selectedConference === "" ||
          (selectedConference === "other"
            ? !top_conferences.includes(paper.fields.publisher)
            : paper.fields.publisher === selectedConference))
    );
    setFilteredTotal(nextPapers.length);
    if (papers.length < nextPapers.length) {
      setPapers(nextPapers.slice(0, papers.length + initialDisplayCount));
    }
  };

  const switchView = (mode) => {
    setViewMode(mode);
  };

  const clearSelection = () => {
    setSelectedTag("");
    setSelectedYear("");
    setSelectedConference("");
    setFilteredTotal(entries.items.length);
    setPapers(entries.items.slice(0, initialDisplayCount));
  };

  const groupedEntries = papers.reduce((acc, paper) => {
    const year = paper.fields.date.split("-")[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(paper);
    return acc;
  }, {});

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const openModal = (paper) => {
    setSelectedPaper(paper);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPaper(null);
    setIsOpen(false);
  };

  return (
    <div>
      <PaperSelect entries={entries} />
      <PaperFilter
        tag_id_to_str={tag_id_to_str}
        years_appeared={years_appeared}
        selectedTag={selectedTag}
        selectedYear={selectedYear}
        selectedConference={selectedConference}
        filterPapers={filterPapers}
        clearSelection={clearSelection}
        viewMode={viewMode}
        switchView={switchView}
        top_conferences={top_conferences}
      />

      {viewMode === "card" ? (
        <CardView
          papers={papers}
          openModal={openModal}
          formatAuthors={formatAuthors}
          tag_id_to_str={tag_id_to_str}
        />
      ) : (
        <ListView
          groupedEntries={groupedEntries}
          formatAuthors={formatAuthors}
        />
      )}
      <LoadMoreButton
        papers={papers}
        filteredTotal={filteredTotal}
        loadMore={loadMore}
      />
      {isOpen && (
        <PaperModal
          paper={selectedPaper}
          closeModal={closeModal}
          selectedPaper={selectedPaper}
        />
      )}
    </div>
  );
};

export default PapersDisplay;
