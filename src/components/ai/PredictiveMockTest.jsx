import React, { useState } from "react";
import MockTestSectionCard from "./MockTestSectionCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generateMockTest } from "../../api/aiService";
import { Download } from "lucide-react";

export default function PredictiveMockTest() {

    const [paperCode, setPaperCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const generateTest = async () => {

        if (!paperCode.trim()) {
            setError("Please enter a paper code.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setData(null);

            const result = await generateMockTest(paperCode);

            setData(result);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to generate mock test."
            );

        } finally {

            setLoading(false);

        }
    };

    const downloadPDF = () => {

        if (!data) return;

        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Predictive AI Mock Test", 14, 20);

        doc.setFontSize(11);
        doc.text(`Paper: ${data.paperName}`, 14, 30);
        doc.text(`Code: ${data.paperCode}`, 14, 36);
        doc.text(`Total Marks: ${data.totalMarks}`, 14, 42);

        let startY = 50;

        data.testStructure.forEach((section) => {

            doc.setFontSize(13);
            doc.text(section.sectionName, 14, startY);
            startY += 6;

            doc.setFontSize(10);
            doc.text(section.sectionDescription, 14, startY);
            startY += 6;

            const rows = section.questions.map((q) => [
                q.questionNumber,
                q.questionText,
                q.marks,
                q.topic
            ]);

            autoTable(doc, {
                startY,
                head: [["#", "Question", "Marks", "Topic"]],
                body: rows,
                styles: {
                    fontSize: 9
                },
                headStyles: {
                    fillColor: [79, 70, 229]
                }
            });

            startY = doc.lastAutoTable.finalY + 10;

        });

        doc.save(`${data.paperCode}-mock-test.pdf`);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-bold">
                        Predictive AI Mock Test 🧠
                    </h1>

                    <p className="text-gray-600">
                        Generate a full AI predicted mock exam.
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
                        onClick={generateTest}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
                    >
                        Generate
                    </button>

                    <button
                        onClick={downloadPDF}
                        disabled={!data}
                        className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
                    >
                        <Download size={16} />
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
                            Generating AI mock test...
                        </span>

                    </div>

                </div>
            )}

            {/* Results */}
            {data && (

                <div className="space-y-6">

                    {/* Summary */}
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
                                <span className="text-gray-500">Total Marks:</span>{" "}
                                <span className="font-medium">{data.totalMarks}</span>
                            </div>

                        </div>

                    </div>

                    {/* Sections */}
                    <div className="space-y-4">

                        {data.testStructure.map((section, index) => (
                            <MockTestSectionCard
                                key={index}
                                section={section}
                            />
                        ))}

                    </div>

                </div>

            )}

        </div>
    );
}