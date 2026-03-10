import React from "react";

export default function EmergencyTopicCard({ topic }) {

    const getUrgencyColor = (score) => {

        if (score >= 90) return "bg-red-100 text-red-700 border-red-200";
        if (score >= 80) return "bg-orange-100 text-orange-700 border-orange-200";
        if (score >= 60) return "bg-yellow-100 text-yellow-700 border-yellow-200";

        return "bg-green-100 text-green-700 border-green-200";
    };

    return (
        <div
            className={`border rounded-lg p-5 shadow-sm space-y-4 ${getUrgencyColor(
                topic.urgencyScore
            )}`}
        >

            {/* Header */}
            <div className="flex justify-between items-center">

                <h2 className="text-lg font-semibold">
                    {topic.topicName}
                </h2>

                <span className="text-sm font-semibold px-3 py-1 rounded bg-white border">

                    Urgency {topic.urgencyScore}

                </span>

            </div>

            {/* Strategy */}
            <div className="text-sm">

                <span className="font-medium">
                    Strategy:
                </span>{" "}
                {topic.strategy} •{" "}

                <span className="font-medium">
                    Study Time:
                </span>{" "}
                {topic.estimatedStudyTime}

            </div>

            {/* Fast Answers */}
            {topic.fastAnswers?.length > 0 && (

                <div>

                    <h3 className="font-semibold mb-2">
                        ⚡ Fast Answers
                    </h3>

                    <div className="space-y-2">

                        {topic.fastAnswers.map((fa, i) => (

                            <div key={i} className="text-sm">

                                <p className="font-medium">
                                    {fa.question}
                                </p>

                                <p className="opacity-80">
                                    {fa.answer}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            )}

            {/* Critical Concepts */}
            {topic.criticalConcepts?.length > 0 && (

                <div>

                    <h3 className="font-semibold">
                        🎯 Critical Concepts
                    </h3>

                    <ul className="list-disc list-inside text-sm">

                        {topic.criticalConcepts.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}

                    </ul>

                </div>

            )}

            {/* Critical Diagrams */}
            {topic.criticalDiagrams?.length > 0 && (

                <div>

                    <h3 className="font-semibold">
                        📊 Critical Diagrams
                    </h3>

                    <ul className="list-disc list-inside text-sm">

                        {topic.criticalDiagrams.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}

                    </ul>

                </div>

            )}

            {/* Skip Advice */}
            {topic.skipAdvice && (

                <div className="text-sm italic opacity-80">

                    <span className="font-medium">
                        Skip Advice:
                    </span>{" "}
                    {topic.skipAdvice}

                </div>

            )}

        </div>
    );
}