import React from "react";

export default function PatternResultCard({ questionData, index }) {

    const getBadgeColor = (freq) => {
        if (freq >= 7) return "bg-red-50 text-red-700 border-red-200";
        if (freq >= 5) return "bg-orange-50 text-orange-700 border-orange-200";
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 hover:shadow-sm transition">

            {/* Header Row */}
            <div className="flex flex-wrap items-center gap-3 text-sm">

                {/* Number */}
                <span className="font-semibold text-gray-400">
                    {index + 1}.
                </span>

                {/* Frequency Badge */}
                <span
                    className={`px-3 py-1 rounded-md border text-xs font-medium ${getBadgeColor(
                        questionData.frequency
                    )}`}
                >
                    Repeated {questionData.frequency} times
                </span>

                {/* Appeared In */}
                <div className="flex flex-wrap gap-2">

                    {questionData.appearedIn?.map((item, i) => (
                        <span
                            key={i}
                            className="bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-xs text-gray-600"
                        >
                            {item.year} {item.month}
                        </span>
                    ))}

                </div>

            </div>

            {/* Question */}
            <p className="mt-2 text-gray-900 text-[15px] font-medium leading-relaxed">

                {questionData.question}

            </p>

        </div>
    );
}