import React from "react";

export default function MasterclassTopicCard({ topic }) {

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        <h2 className="text-lg font-semibold text-indigo-700">
          {topic.topicName}
        </h2>

        <div className="flex flex-wrap gap-2 text-xs">

          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            Importance: {topic.importance}
          </span>

          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
            Weightage: {topic.weightage}
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
            Difficulty: {topic.difficulty}
          </span>

          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
            Priority: {topic.studyPriority}
          </span>

        </div>

      </div>

      {/* Key Concepts */}
      {topic.keyConcepts?.length > 0 && (

        <div>

          <h3 className="font-semibold mb-2">
            Key Concepts
          </h3>

          <div className="space-y-3">

            {topic.keyConcepts.map((concept, index) => (

              <div key={index} className="text-sm">

                <p className="font-medium">
                  {concept.concept}
                </p>

                <p className="text-gray-600">
                  {concept.explanation}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* Definitions */}
      {topic.definitions?.length > 0 && (

        <div>

          <h3 className="font-semibold mb-2">
            Definitions
          </h3>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">

            {topic.definitions.map((def, i) => (
              <li key={i}>{def}</li>
            ))}

          </ul>

        </div>

      )}

      {/* Model Answers */}
      {topic.modelAnswers?.length > 0 && (

        <div>

          <h3 className="font-semibold mb-2">
            Model Answers
          </h3>

          <div className="space-y-3">

            {topic.modelAnswers.map((m, i) => (

              <div key={i} className="text-sm">

                <p className="font-medium text-gray-800">
                  {m.question}
                </p>

                <p className="text-gray-600 mt-1">
                  {m.answer}
                </p>

                <span className="text-xs text-gray-500">
                  Frequency: {m.frequency}
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* Exam Tips */}
      {topic.examTips?.length > 0 && (

        <div>

          <h3 className="font-semibold mb-2">
            Exam Tips
          </h3>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">

            {topic.examTips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}

          </ul>

        </div>

      )}

      {/* Common Mistakes */}
      {topic.commonMistakes?.length > 0 && (

        <div>

          <h3 className="font-semibold mb-2 text-red-600">
            Common Mistakes
          </h3>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">

            {topic.commonMistakes.map((mistake, i) => (
              <li key={i}>{mistake}</li>
            ))}

          </ul>

        </div>

      )}

      {/* Related Topics */}
      {topic.relatedTopics?.length > 0 && (

        <div>

          <h3 className="font-semibold mb-2">
            Related Topics
          </h3>

          <div className="flex flex-wrap gap-2">

            {topic.relatedTopics.map((rt, i) => (

              <span
                key={i}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {rt}
              </span>

            ))}

          </div>

        </div>

      )}

    </div>
  );

}