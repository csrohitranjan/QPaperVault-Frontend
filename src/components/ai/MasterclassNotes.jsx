import React, { useState } from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import MasterclassTopicCard from "./MasterclassTopicCard";
import { getStudyNotes } from "../../api/aiService";

export default function MasterclassNotes() {

    const [paperCode, setPaperCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [openTopic, setOpenTopic] = useState(null);

    const generateNotes = async () => {

        if (!paperCode.trim()) {
            setError("Please enter a paper code.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setData(null);

            const result = await getStudyNotes(paperCode);
            setData(result);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to generate masterclass notes."
            );

        } finally {

            setLoading(false);

        }

    };

    const downloadPDF = () => {

        if (!data) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("AI Masterclass Study Notes", 14, 20);

        doc.setFontSize(11);
        doc.text(`Paper: ${data.paperName}`, 14, 30);
        doc.text(`Code: ${data.paperCode}`, 14, 36);

        let startY = 46;

        data.studyNotes.forEach((topic) => {

            doc.setFontSize(14);
            doc.text(topic.topicName, 14, startY);
            startY += 6;

            /* KEY CONCEPTS */
            if (topic.keyConcepts?.length) {

                const rows = topic.keyConcepts.map(c => [
                    c.concept,
                    c.explanation
                ]);

                autoTable(doc, {
                    startY,
                    head: [["Concept", "Explanation"]],
                    body: rows,
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [79, 70, 229] }
                });

                startY = doc.lastAutoTable.finalY + 4;
            }

            /* DEFINITIONS */
            if (topic.definitions?.length) {

                const rows = topic.definitions.map(d => [d]);

                autoTable(doc, {
                    startY,
                    head: [["Definitions"]],
                    body: rows,
                    styles: { fontSize: 9 }
                });

                startY = doc.lastAutoTable.finalY + 4;
            }

            /* MODEL ANSWERS */
            if (topic.modelAnswers?.length) {

                const rows = topic.modelAnswers.map(m => [
                    m.question,
                    m.answer,
                    m.frequency
                ]);

                autoTable(doc, {
                    startY,
                    head: [["Question", "Answer", "Frequency"]],
                    body: rows,
                    styles: { fontSize: 9 }
                });

                startY = doc.lastAutoTable.finalY + 4;
            }

            /* EXAM TIPS */
            if (topic.examTips?.length) {

                const rows = topic.examTips.map(t => [t]);

                autoTable(doc, {
                    startY,
                    head: [["Exam Tips"]],
                    body: rows,
                    styles: { fontSize: 9 }
                });

                startY = doc.lastAutoTable.finalY + 4;
            }

            /* COMMON MISTAKES */
            if (topic.commonMistakes?.length) {

                const rows = topic.commonMistakes.map(m => [m]);

                autoTable(doc, {
                    startY,
                    head: [["Common Mistakes"]],
                    body: rows,
                    styles: { fontSize: 9 }
                });

                startY = doc.lastAutoTable.finalY + 6;
            }

        });

        /* PREDICTED QUESTIONS */
        if (data.predictedQuestions?.length) {

            const rows = data.predictedQuestions.map(q => [
                q.question,
                q.confidence,
                q.reasoning
            ]);

            autoTable(doc, {
                startY,
                head: [["Predicted Question", "Confidence", "Reason"]],
                body: rows,
                styles: { fontSize: 9 },
                headStyles: { fillColor: [79, 70, 229] }
            });

            startY = doc.lastAutoTable.finalY + 6;
        }

        /* QUICK REVISION SUMMARY */
        if (data.quickRevisionSummary) {

            autoTable(doc, {
                startY,
                head: [["Quick Revision Summary"]],
                body: [[data.quickRevisionSummary]],
                styles: { fontSize: 9 }
            });

        }

        doc.save(`${data.paperCode}-Masterclass-Notes.pdf`);

    };

    const toggleTopic = (index) => {
        setOpenTopic(openTopic === index ? null : index);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-bold">
                        AI Masterclass Notes 📚
                    </h1>

                    <p className="text-gray-600">
                        AI-generated masterclass notes for exam preparation.
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
                        onClick={generateNotes}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
                    >
                        Generate Notes
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
                            Generating AI masterclass notes...
                        </span>

                    </div>

                </div>

            )}

            {/* Results */}
            {data && !loading && (

                <div className="space-y-6">

                    {/* Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md px-6 py-4 flex flex-wrap gap-6 text-sm">

                        <div>
                            <span className="text-gray-500">Paper:</span>{" "}
                            <span className="font-semibold">{data.paperName}</span>
                        </div>

                        <div>
                            <span className="text-gray-500">Code:</span>{" "}
                            <span className="font-semibold">{data.paperCode}</span>
                        </div>

                        <div>
                            <span className="text-gray-500">Topics:</span>{" "}
                            <span className="font-semibold">{data.totalTopics}</span>
                        </div>

                        <div>
                            <span className="text-gray-500">Papers Analyzed:</span>{" "}
                            <span className="font-semibold">{data.totalPapersAnalyzed}</span>
                        </div>

                    </div>

                    {/* Topics Accordion */}
                    <div className="space-y-3">

                        {data.studyNotes.map((topic, index) => (

                            <div key={index} className="border rounded-lg overflow-hidden">

                                <button
                                    onClick={() => toggleTopic(index)}
                                    className="w-full flex justify-between items-center px-5 py-4 bg-gray-50 hover:bg-gray-100"
                                >

                                    <span className="font-semibold text-indigo-700">
                                        {topic.topicName}
                                    </span>

                                    <span className="text-lg">
                                        {openTopic === index ? "▲" : "▼"}
                                    </span>

                                </button>

                                {openTopic === index && (
                                    <div className="p-5 bg-white">
                                        <MasterclassTopicCard topic={topic} />
                                    </div>
                                )}

                            </div>

                        ))}

                    </div>

                    {/* Predicted Questions */}
                    {data.predictedQuestions && (

                        <div className="space-y-2">

                            <h2 className="text-xl font-semibold">
                                Predicted Questions
                            </h2>

                            <ul className="list-disc list-inside text-sm text-gray-700">

                                {data.predictedQuestions.map((q, i) => (
                                    <li key={i}>
                                        <span className="font-medium">{q.question}</span>
                                        <span className="text-gray-500 text-xs ml-2">
                                            ({q.confidence})
                                        </span>
                                    </li>
                                ))}

                            </ul>

                        </div>

                    )}

                    {/* Quick Revision Summary */}
                    {data.quickRevisionSummary && (

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">

                            <h2 className="font-semibold mb-2">
                                Quick Revision Summary
                            </h2>

                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {data.quickRevisionSummary}
                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}