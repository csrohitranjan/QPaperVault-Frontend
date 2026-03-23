// src/components/QuestionPaperList.jsx
import React, { useEffect, useState } from "react";
import { getApprovedQuestionPapers, viewQuestionPaper, downloadQuestionPaper } from "../api/authService";
import { getToken } from "../utils/auth";
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiX,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function QuestionPaperList() {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("All");
  const [programFilter, setProgramFilter] = useState("All");
  const [codeFilter, setCodeFilter] = useState("All");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 12; // 3 columns x 4 rows


  useEffect(() => {
    async function fetchPapers() {
      try {
        setLoading(true);
        const token = getToken();
        if (!token) {
          console.error("No auth token found while fetching approved papers");
          setPapers([]);
          setFilteredPapers([]);
          return;
        }

        const res = await getApprovedQuestionPapers();
        if (res.status === 200) {
          setPapers(res.data.approvedPapers);
          setFilteredPapers(res.data.approvedPapers);
        }
      } catch (error) {
        console.error("Error fetching papers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, []);

  useEffect(() => {
    let filtered = [...papers];
    if (yearFilter !== "All")
      filtered = filtered.filter((p) => p.year.toString() === yearFilter);
    if (programFilter !== "All")
      filtered = filtered.filter(
        (p) => p.programme.toLowerCase() === programFilter.toLowerCase()
      );
    if (codeFilter !== "All")
      filtered = filtered.filter(
        (p) => p.paperCode.toLowerCase() === codeFilter.toLowerCase()
      );
    if (searchTerm.trim())
      filtered = filtered.filter((p) =>
        p.paperName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredPapers(filtered);
    setCurrentPage(1); // reset to first page on filter change
  }, [searchTerm, yearFilter, programFilter, codeFilter, papers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const uniqueYears = [...new Set(papers.map((p) => p.year.toString()))];
  const uniquePrograms = [...new Set(papers.map((p) => p.programme))];
  const uniqueCodes = [...new Set(papers.map((p) => p.paperCode))];

  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = filteredPapers.slice(
    indexOfFirstPaper,
    indexOfLastPaper
  );
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage);


  const handleViewPaper = (questionPaperId) => {
    const res = viewQuestionPaper(questionPaperId);
    // console.log(res)
    setPreviewUrl(res);
  };

  const handleDownloadPaper = (questionPaperId) => {
    const res = downloadQuestionPaper(questionPaperId);
    // console.log(res)
    window.open(res, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-themeBg text-white">
      {/* Reduced top padding to move content upward */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-20 sm:pt-20">
        {/* Filters - Balanced Layout */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="relative w-full max-w-xs">
            <FiSearch
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />
            <input
              type="search"
              placeholder="Search paper name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-cardBg text-white border border-white/5 pl-10 pr-4 py-2.5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryOrange transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Dropdown Filters */}
            {[
              ["All Codes", codeFilter, setCodeFilter, uniqueCodes],
              ["All Programs", programFilter, setProgramFilter, uniquePrograms],
              ["All Years", yearFilter, setYearFilter, uniqueYears],
            ].map(([label, value, setter, options]) => (
              <div className="relative w-full sm:w-40" key={label}>
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="appearance-none w-full bg-cardBg text-white border border-white/5 py-2.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryOrange transition"
                >
                  <option value="All">{label}</option>
                  {options.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-themeBg text-white"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">

          {loading ? (
            <p className="col-span-full text-center text-gray-400 text-lg font-medium">
              Fetching Question Papers...
            </p>
          ) : currentPapers.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 text-lg font-medium">
              No papers found.
            </p>
          ) : (
            currentPapers.map((paper) => (
              <article
                key={paper._id}
                className="bg-cardBg border border-white/5 rounded-xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:bg-white/5 transition w-full overflow-hidden"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white truncate">
                    {paper.paperName}
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    <strong>Code:</strong> {paper.paperCode}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Program:</strong> {paper.programme}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Exam:</strong> {paper.month} {paper.year}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 italic">
                    Uploaded by: {paper?.uploadedBy?.fullName || "User deleted"}
                  </p>
                </div>
                <div className="mt-6 flex gap-3 w-full">
                  <button
                    onClick={() => handleViewPaper(paper._id)}
                    className="flex-1 w-full flex items-center justify-center gap-2 bg-primaryOrange hover:bg-orange-600 active:bg-orange-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-[0_6px_20px_rgba(254,82,56,0.3)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primaryOrange/50"
                  >
                    <FiEye size={16} />
                    View
                  </button>

                  <a
                    onClick={() => handleDownloadPaper(paper._id)}
                    className="flex-1 w-full flex items-center justify-center gap-2 bg-themeBg hover:bg-black/20 active:bg-black/40 border border-white/5 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primaryOrange/50"
                  >
                    <FiDownload size={16} />
                    Download
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {filteredPapers.length > papersPerPage && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className={`p-2 rounded-full transition-transform duration-200 ${currentPage === 1
                ? "bg-cardBg text-gray-400 border border-white/5 cursor-not-allowed"
                : "bg-primaryOrange text-white hover:bg-orange-600 hover:scale-105 shadow-[0_4px_15px_rgba(254,82,56,0.3)]"
                }`}
            >
              <FiChevronLeft size={16} />
            </button>

            <span className="text-gray-300 text-sm">
              Page <strong className="text-white">{currentPage}</strong> of{" "}
              <strong className="text-white">{totalPages}</strong>
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className={`p-2 rounded-full transition-transform duration-200 ${currentPage === totalPages
                ? "bg-cardBg text-gray-400 border border-white/5 cursor-not-allowed"
                : "bg-primaryOrange text-white hover:bg-orange-600 hover:scale-105 shadow-[0_4px_15px_rgba(254,82,56,0.3)]"
                }`}
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative bg-cardBg border border-white/5 rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
            >
              <FiX size={24} />
            </button>
            <iframe
              src={previewUrl}
              title="PDF Preview"
              className="flex-grow rounded-b-xl"
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </div>
  );
}
