import React, { useEffect, useState } from "react";
import { getApprovedQuestionPapers } from "../services/authService";
import { FiSearch, FiDownload, FiEye, FiX } from "react-icons/fi";

export default function QuestionPaperList() {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("All");
  const [programFilter, setProgramFilter] = useState("All");
  const [codeFilter, setCodeFilter] = useState("All");
  const [previewUrl, setPreviewUrl] = useState(null);

  const getDownloadUrl = (url) => {
    const parts = url.split("/upload/");
    return parts.length === 2
      ? `${parts[0]}/upload/fl_attachment/${parts[1]}`
      : url;
  };

  useEffect(() => {
    async function fetchPapers() {
      try {
        const res = await getApprovedQuestionPapers();
        if (res.status === 200) {
          setPapers(res.data.approvedPapers);
          setFilteredPapers(res.data.approvedPapers);
        }
      } catch (error) {
        console.error("Error fetching papers:", error);
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
  }, [searchTerm, yearFilter, programFilter, codeFilter, papers]);

  const uniqueYears = [...new Set(papers.map((p) => p.year.toString()))];
  const uniquePrograms = [...new Set(papers.map((p) => p.programme))];
  const uniqueCodes = [...new Set(papers.map((p) => p.paperCode))];

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-7xl mx-auto pt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Previous Year Question Papers
      </h1>

      {/* Filters and Search */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <div className="relative w-full max-w-xs">
          <FiSearch
            className="absolute left-3 top-3 text-gray-400"
            size={20}
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search paper name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-900 placeholder-gray-400"
            aria-label="Search paper name"
          />
        </div>

        {[
          ["All Codes", codeFilter, setCodeFilter, uniqueCodes],
          ["All Programs", programFilter, setProgramFilter, uniquePrograms],
          ["All Years", yearFilter, setYearFilter, uniqueYears],
        ].map(([label, value, setter, options]) => (
          <select
            key={label}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="rounded-md border border-gray-300 py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            aria-label={`Filter by ${label.toLowerCase()}`}
          >
            <option value="All">{label}</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Papers Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPapers.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 text-lg font-medium">
            No papers found.
          </p>
        ) : (
          filteredPapers.map((paper) => (
            <article
              key={paper._id}
              className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 truncate">
                  {paper.paperName}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Code:</strong> {paper.paperCode}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Program:</strong> {paper.programme}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Exam:</strong> {paper.month} {paper.year}
                </p>
                <p className="text-sm text-gray-500 mt-2 italic">
                  Uploaded by: {paper?.uploadedBy?.fullName || "User deleted"}
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setPreviewUrl(paper.fileUrl)}
                  className="flex-1 flex items-center justify-center gap-1 bg-indigo-600 text-white py-2 rounded-md font-semibold text-sm hover:bg-indigo-700 transition"
                  aria-label={`Preview ${paper.paperName}`}
                >
                  <FiEye size={16} />
                  Preview
                </button>
                <a
                  href={getDownloadUrl(paper.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white py-2 rounded-md font-semibold text-sm hover:bg-gray-800 transition"
                  aria-label={`Download ${paper.paperName}`}
                >
                  <FiDownload size={16} />
                  Download
                </a>
              </div>
            </article>
          ))
        )}
      </div>

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6"
          onClick={() => setPreviewUrl(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewUrl(null)}
              aria-label="Close preview"
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded-full p-1"
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
