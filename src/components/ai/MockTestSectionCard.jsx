import React from "react";

export default function MockTestSectionCard({ section }) {

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

            {/* Section Header */}
            <div className="bg-gray-100 border-b px-6 py-4">

                <h2 className="text-lg font-semibold text-indigo-700">
                    {section.sectionName}
                </h2>

                <p className="text-sm text-gray-600">
                    {section.sectionDescription}
                </p>

            </div>

            {/* Question List */}
            <div className="divide-y">

                {section.questions.map((q) => (

                    <div
                        key={q.questionNumber}
                        className="px-6 py-5"
                    >

                        {/* Question */}
                        <p className="text-gray-800 leading-relaxed">

                            <span className="font-semibold mr-2">
                                Q{q.questionNumber}.
                            </span>

                            {q.questionText}

                            <span className="text-gray-500 text-sm ml-2">
                                ({q.marks} marks)
                            </span>

                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 mt-2 text-sm">

                            <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                Topic: {q.topic}
                            </span>

                            {q.isRepeated && (
                                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded font-medium">
                                    🔁 Repeated Question
                                </span>
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}