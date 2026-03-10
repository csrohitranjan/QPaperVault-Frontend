import React from "react";

export default function MockTestSectionCard({ section }) {

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-indigo-700 mb-1">
                {section.sectionName}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
                {section.sectionDescription}
            </p>

            <div className="space-y-4">

                {section.questions.map((q) => (

                    <div
                        key={q.questionNumber}
                        className="border-b pb-3"
                    >

                        <p className="font-medium text-gray-800">
                            Q{q.questionNumber}. {q.questionText}
                            <span className="text-sm text-gray-500 ml-2">
                                ({q.marks} marks)
                            </span>
                        </p>

                        <div className="text-sm text-gray-500 mt-1 flex gap-4">

                            <span>Topic: {q.topic}</span>

                            {q.isRepeated && (
                                <span className="text-orange-600 font-medium">
                                    🔁 Repeated
                                </span>
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}