import React, { useState } from "react";
import EmergencyTopicCard from "./EmergencyTopicCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";
import { getRevisionRanking } from "../../api/aiService";
import { getToken } from "../../utils/auth";

export default function EmergencyPassMaster() {

    const [paperCode, setPaperCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const generatePlan = async () => {

        if (!paperCode.trim()) {
            setError("Please enter a paper code.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setData(null);

            const token = getToken();
            const result = await getRevisionRanking(paperCode, token);

            setData(result);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to generate emergency revision strategy."
            );

        } finally {

            setLoading(false);

        }
    };

    const downloadPDF = () => {

        if (!data) return;

        const doc = new jsPDF();

        /* TITLE */

        doc.setFontSize(18);
        doc.text("Emergency Pass Master Revision Guide", 14, 20);

        doc.setFontSize(11);
        doc.text(`Paper: ${data.paperName}`, 14, 30);
        doc.text(`Code: ${data.paperCode}`, 14, 36);

        let startY = 45;

        /* =============================
           URGENCY RANKINGS
        ============================== */

        doc.setFontSize(14);
        doc.text("Priority Topics", 14, startY);
        startY += 6;

        data.urgencyRankings.forEach((topic) => {

            const rows = topic.fastAnswers.map((fa) => [
                topic.topicName,
                topic.strategy,
                fa.question,
                fa.answer
            ]);

            autoTable(doc, {
                startY,
                head: [[
                    "Topic",
                    "Strategy",
                    "Fast Question",
                    "Quick Answer"
                ]],
                body: rows,
                styles: { fontSize: 9 },
                headStyles: { fillColor: [79, 70, 229] }
            });

            startY = doc.lastAutoTable.finalY + 6;

            /* Critical Concepts */

            if (topic.criticalConcepts?.length) {

                const conceptRows = topic.criticalConcepts.map((c) => [c]);

                autoTable(doc, {
                    startY,
                    head: [["Critical Concepts"]],
                    body: conceptRows,
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [100, 100, 100] }
                });

                startY = doc.lastAutoTable.finalY + 4;

            }

            /* Critical Diagrams */

            if (topic.criticalDiagrams?.length) {

                const diagramRows = topic.criticalDiagrams.map((d) => [d]);

                autoTable(doc, {
                    startY,
                    head: [["Critical Diagrams"]],
                    body: diagramRows,
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [120, 120, 120] }
                });

                startY = doc.lastAutoTable.finalY + 4;

            }

            /* Skip Advice */

            if (topic.skipAdvice) {

                autoTable(doc, {
                    startY,
                    head: [["Skip Advice"]],
                    body: [[topic.skipAdvice]],
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [150, 150, 150] }
                });

                startY = doc.lastAutoTable.finalY + 6;

            }

        });

        /* =============================
           DEFINITIONS
        ============================== */

        const definitionRows = data.mandatoryDefinitions.map((d) => [d]);

        autoTable(doc, {
            startY,
            head: [["Mandatory Definitions"]],
            body: definitionRows,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [79, 70, 229] }
        });

        startY = doc.lastAutoTable.finalY + 6;

        /* =============================
           DIAGRAMS
        ============================== */

        const diagramRows = data.mandatoryDiagrams.map((d) => [d]);

        autoTable(doc, {
            startY,
            head: [["Mandatory Diagrams"]],
            body: diagramRows,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [79, 70, 229] }
        });

        startY = doc.lastAutoTable.finalY + 6;

        /* =============================
           PASS GUARANTEE QUESTIONS
        ============================== */

        const questionRows = data.passGuaranteeQuestions.map((q, i) => [
            `${i + 1}. ${q}`
        ]);

        autoTable(doc, {
            startY,
            head: [["Pass Guarantee Questions"]],
            body: questionRows,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [79, 70, 229] }
        });

        startY = doc.lastAutoTable.finalY + 6;

        /* =============================
           CHEAT SHEET
        ============================== */

        autoTable(doc, {
            startY,
            head: [["Cheat Sheet"]],
            body: [[data.cheatSheet]],
            styles: { fontSize: 9 },
            headStyles: { fillColor: [79, 70, 229] }
        });

        doc.save(`${data.paperCode}-Emergency-Pass-Master.pdf`);

    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                    <h1 className="text-2xl font-bold">
                        Emergency Pass Master 🚨
                    </h1>

                    <p className="text-gray-600">
                        AI-powered last-minute revision system to maximize your passing chances.
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
                        onClick={generatePlan}
                        disabled={loading}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
                    >
                        Generate Plan
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
                            Building emergency revision strategy...
                        </span>

                    </div>

                </div>
            )}

            {/* Results */}
            {data && !loading && (

                <div className="space-y-8">

                    {/* Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md px-6 py-4 flex justify-between text-sm">

                        <div>
                            <span className="text-gray-500">Paper:</span>{" "}
                            <span className="font-semibold">{data.paperName}</span>
                        </div>

                        <div>
                            <span className="text-gray-500">Code:</span>{" "}
                            <span className="font-semibold">{data.paperCode}</span>
                        </div>

                        <div>
                            <span className="text-gray-500">Topics Ranked:</span>{" "}
                            <span className="font-semibold">{data.urgencyRankings.length}</span>
                        </div>

                    </div>

                    {/* Urgency Rankings */}
                    <div className="space-y-4">

                        <h2 className="text-xl font-semibold">
                            🔥 Urgency Rankings
                        </h2>

                        {data.urgencyRankings.map((topic, index) => (
                            <EmergencyTopicCard key={index} topic={topic} />
                        ))}

                    </div>

                    {/* Mandatory Definitions */}
                    {data.mandatoryDefinitions && (

                        <div className="space-y-2">

                            <h2 className="text-xl font-semibold">
                                📘 Mandatory Definitions
                            </h2>

                            <ul className="list-disc list-inside text-gray-700 text-sm">

                                {data.mandatoryDefinitions.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}

                            </ul>

                        </div>

                    )}

                    {/* Mandatory Diagrams */}
                    {data.mandatoryDiagrams && (

                        <div className="space-y-2">

                            <h2 className="text-xl font-semibold">
                                📊 Mandatory Diagrams
                            </h2>

                            <ul className="list-disc list-inside text-gray-700 text-sm">

                                {data.mandatoryDiagrams.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}

                            </ul>

                        </div>

                    )}

                    {/* Pass Guarantee Questions */}
                    {data.passGuaranteeQuestions && (

                        <div className="space-y-2">

                            <h2 className="text-xl font-semibold">
                                🏆 Pass Guarantee Questions
                            </h2>

                            <ul className="list-decimal list-inside text-gray-700 text-sm">

                                {data.passGuaranteeQuestions.map((q, i) => (
                                    <li key={i}>{q}</li>
                                ))}

                            </ul>

                        </div>

                    )}

                    {/* Cheat Sheet */}
                    {data.cheatSheet && (

                        <div className="space-y-2">

                            <h2 className="text-xl font-semibold">
                                🧾 Cheat Sheet
                            </h2>

                            <p className="text-gray-700 text-sm">
                                {data.cheatSheet}
                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}