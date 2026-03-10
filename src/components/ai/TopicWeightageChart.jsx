import React from "react";

export default function TopicWeightageChart({ topics }) {

    const sortedTopics = [...topics].sort(
        (a, b) => parseFloat(b.weightage) - parseFloat(a.weightage)
    );

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5">

            <h2 className="text-lg font-semibold mb-5">
                Topic Weightage Overview
            </h2>

            <div className="space-y-4">

                {sortedTopics.map((topic, index) => {

                    const percentage = parseFloat(topic.weightage);

                    return (
                        <div key={index}>

                            {/* Topic name + percentage */}
                            <div className="flex justify-between text-sm mb-1">

                                <span className="text-gray-800 font-medium">
                                    {topic.topicName}
                                </span>

                                <span className="text-indigo-600 font-semibold">
                                    {topic.weightage}
                                </span>

                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-100 rounded-full h-2">

                                <div
                                    className="bg-indigo-600 h-2 rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                ></div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}