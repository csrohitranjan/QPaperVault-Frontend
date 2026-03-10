import React, { useState } from "react";
import axios from "axios";
import PatternResultCard from "./PatternResultCard";

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

            const response = await axios.post(
                "http://127.0.0.1:8000/api/v1/repeated-questions",
                { paperCode }
            );

            setData(response.data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to analyze paper. Please try again."
            );

        } finally {

            setLoading(false);

        }
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
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium"
                    >
                        ⚡ Analyze with AI
                    </button>

                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm font-medium">
                    {error}
                </div>
            )}

            {loading && (
                <div className="text-indigo-600 font-medium">
                    Analyzing exam patterns...
                </div>
            )}

            {data && (
                <div className="space-y-6">

                    {/* Summary Stats */}
                    {/* Summary Stats */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-2">

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