import React, { useState } from "react";

export default function TopicInsightCard({ topic, index }) {

    const [open, setOpen] = useState(false);

    const getTrendStyle = (trend) => {
        if (trend === "Rising") return "bg-green-50 text-green-700 border-green-200";
        if (trend === "Falling") return "bg-red-50 text-red-700 border-red-200";
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
    };

    const getDifficultyStyle = (difficulty) => {
        if (difficulty === "Hard") return "bg-red-50 text-red-700 border-red-200";
        if (difficulty === "Moderate") return "bg-orange-50 text-orange-700 border-orange-200";
        return "bg-green-50 text-green-700 border-green-200";
    };

    const getPriorityLabel = (priority) => {
        if (priority === 1) return "Must Study";
        if (priority === 2) return "Important";
        if (priority === 3) return "Medium";
        return "Rare";
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">

            {/* Header */}
            <div className="flex flex-wrap items-center gap-3">

                <span className="text-gray-400 font-semibold">
                    {index + 1}.
                </span>

                <span className="font-semibold text-gray-900">
                    {topic.topicName}
                </span>

                <span className="ml-auto font-semibold text-indigo-600">
                    {topic.weightage}
                </span>

            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2 text-xs">

                <span className={`px-2 py-1 border rounded ${getTrendStyle(topic.trend)}`}>
                    Trend: {topic.trend}
                </span>

                <span className={`px-2 py-1 border rounded ${getDifficultyStyle(topic.difficulty)}`}>
                    Difficulty: {topic.difficulty}
                </span>

                <span className="px-2 py-1 border rounded bg-gray-50 text-gray-700">
                    Priority: {getPriorityLabel(topic.priority)}
                </span>

                <span className="px-2 py-1 border rounded bg-gray-50 text-gray-700">
                    Occurrences: {topic.occurrenceCount}
                </span>

            </div>

            {/* Expand button */}
            <button
                onClick={() => setOpen(!open)}
                className="text-sm text-indigo-600 hover:underline"
            >
                {open ? "Hide Details" : "Show Details"}
            </button>

            {/* Expanded Content */}
            {open && (

                <div className="space-y-4">

                    {/* Key Concepts */}
                    <div>

                        <h4 className="text-sm font-semibold text-gray-800 mb-2">
                            Key Concepts
                        </h4>

                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">

                            {topic.keyConcepts?.map((concept, i) => (
                                <li key={i}>{concept}</li>
                            ))}

                        </ul>

                    </div>

                    {/* Sample Questions */}
                    <div>

                        <h4 className="text-sm font-semibold text-gray-800 mb-2">
                            Sample Questions
                        </h4>

                        <ul className="list-decimal list-inside text-sm text-gray-700 space-y-1">

                            {topic.sampleQuestions?.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}

                        </ul>

                    </div>

                </div>

            )}

        </div>
    );
}