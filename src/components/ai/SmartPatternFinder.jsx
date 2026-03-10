import React, { useState } from "react";
import PatternResultCard from "./PatternResultCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getRepeatedQuestions } from "../../api/aiService";
import { getToken } from "../../utils/auth";

export default function SmartPatternFinder() {

    const [paperCode, setPaperCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const analyzePaper = async () => {

        if (!paperCode.trim()) {
            setError("Please enter a paper code.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setData(null);

            const token = getToken();
            const result = await getRepeatedQuestions(paperCode, token);
            setData(result);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to analyze paper. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    const downloadPDF = () => {

        if (!data) return;

        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Smart Pattern Finder Report", 14, 20);

        doc.setFontSize(11);
        doc.text(`Paper: ${data.paperName}`, 14, 30);
        doc.text(`Code: ${data.paperCode}`, 14, 36);
        doc.text(`Papers Analyzed: ${data.totalPapersAnalyzed}`, 14, 42);
        doc.text(`Repeated Questions: ${data.repeatedQuestions.length}`, 14, 48);

        const rows = data.repeatedQuestions.map((q, index) => [
            index + 1,
            q.question,
            q.frequency,
            q.appearedIn.map(a => `${a.year} ${a.month}`).join(", ")
        ]);

        autoTable(doc, {
            startY: 55,
            head: [["#", "Question", "Frequency", "Appeared In"]],
            body: rows,
            styles: {
                fontSize: 9,
                cellPadding: 3
            },
            headStyles: {
                fillColor: [79, 70, 229]
            }
        });

        doc.save(`${data.paperCode}-analysis.pdf`);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-bold">
                        Smart Pattern Finder ⚡
                    </h1>

                    <p className="text-gray-600">
                        Discover the most repeated questions from past exam papers.
                    </p>
                </div>

                <div className="flex gap-3">

                    <input
                        type="text"
                        placeholder="Enter Paper Code"
                        value={paperCode}
                        onChange={(e) => setPaperCode(e.target.value)}
                        className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                    <button
                        onClick={analyzePaper}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
                    >
                        ⚡ Analyze with AI
                    </button>

                    <button
                        onClick={downloadPDF}
                        disabled={!data}
                        className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                            />
                        </svg>

                        Download Report
                    </button>

                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="text-red-500 text-sm font-medium">
                    {error}
                </div>
            )}

            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center py-16">

                    <div className="flex flex-col items-center gap-3 text-gray-600">

                        <svg
                            className="animate-spin h-10 w-10 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />

                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            />

                        </svg>

                        <span className="text-sm font-medium">
                            Analyzing exam patterns...
                        </span>

                    </div>

                </div>
            )}

            {/* Results */}
            {data && (
                <div className="space-y-6">

                    {/* Summary Stats */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 flex flex-wrap items-center justify-between gap-3">

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">

                            <div>
                                <span className="text-gray-500">Paper:</span>{" "}
                                <span className="font-medium">{data.paperName}</span>
                            </div>

                            <div>
                                <span className="text-gray-500">Code:</span>{" "}
                                <span className="font-medium">{data.paperCode}</span>
                            </div>

                            <div>
                                <span className="text-gray-500">Papers Analyzed:</span>{" "}
                                <span className="font-medium">{data.totalPapersAnalyzed}</span>
                            </div>

                            <div>
                                <span className="text-gray-500">Repeated Questions:</span>{" "}
                                <span className="font-medium">{data.repeatedQuestions.length}</span>
                            </div>

                        </div>

                    </div>

                    {/* Question List */}
                    <div className="space-y-4">

                        {data.repeatedQuestions
                            .sort((a, b) => b.frequency - a.frequency)
                            .map((q, index) => (
                                <PatternResultCard
                                    key={index}
                                    index={index}
                                    questionData={q}
                                />
                            ))}

                    </div>

                </div>
            )}

        </div>
    );
}