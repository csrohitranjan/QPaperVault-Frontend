import React, { useState } from "react";
import { getTopicWeightage } from "../../api/aiService";
import { getToken } from "../../utils/auth";
import TopicWeightageChart from "./TopicWeightageChart";
import TopicInsightCard from "./TopicInsightCard";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExamBlueprintDNA() {

  const [paperCode, setPaperCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const analyzeBlueprint = async () => {

    if (!paperCode.trim()) {
      setError("Please enter a paper code.");
      return;
    }

    try {

      setLoading(true);
      setError("");
      setData(null);

      const token = getToken();
      const result = await getTopicWeightage(paperCode, token);
      setData(result);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to analyze blueprint."
      );

    } finally {

      setLoading(false);

    }
  };

  /* ---------- DOWNLOAD REPORT ---------- */

  const downloadReport = () => {

    if (!data) return;

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("Exam Blueprint DNA Report", 14, y);

    y += 12;

    doc.setFontSize(12);
    doc.text(`Paper Name: ${data.paperName}`, 14, y);
    y += 7;

    doc.text(`Paper Code: ${data.paperCode}`, 14, y);
    y += 7;

    doc.text(`Papers Analyzed: ${data.totalPapersAnalyzed}`, 14, y);
    y += 7;

    doc.text(`Topics Found: ${data.topics.length}`, 14, y);

    y += 12;

    /* ---------- TOPIC TABLE ---------- */

    const sortedTopics = [...data.topics].sort(
      (a, b) => parseFloat(b.weightage) - parseFloat(a.weightage)
    );

    const tableData = sortedTopics.map((topic, index) => [
      index + 1,
      topic.topicName,
      topic.weightage,
      topic.trend,
      topic.priority,
      topic.difficulty
    ]);

    autoTable(doc, {
      startY: y,
      head: [["No", "Topic", "Weightage", "Trend", "Priority", "Difficulty"]],
      body: tableData
    });

    y = doc.lastAutoTable.finalY + 15;

    /* ---------- KEY CONCEPTS + SAMPLE QUESTIONS ---------- */

    sortedTopics.forEach((topic, index) => {

      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(`${index + 1}. ${topic.topicName}`, 14, y);

      y += 8;

      /* KEY CONCEPTS */

      doc.setFontSize(12);
      doc.text("Key Concepts:", 14, y);

      y += 6;

      doc.setFontSize(10);

      if (topic.keyConcepts && topic.keyConcepts.length) {

        topic.keyConcepts.forEach(concept => {

          if (y > 280) {
            doc.addPage();
            y = 20;
          }

          doc.text(`• ${concept}`, 18, y);
          y += 5;

        });

      } else {

        doc.text("No key concepts available.", 18, y);
        y += 5;

      }

      y += 4;

      /* SAMPLE QUESTIONS */

      doc.setFontSize(12);
      doc.text("Sample Questions:", 14, y);

      y += 6;

      doc.setFontSize(10);

      if (topic.sampleQuestions && topic.sampleQuestions.length) {

        topic.sampleQuestions.forEach((q, i) => {

          if (y > 280) {
            doc.addPage();
            y = 20;
          }

          const splitQuestion = doc.splitTextToSize(
            `${i + 1}. ${q}`,
            180
          );

          doc.text(splitQuestion, 18, y);
          y += splitQuestion.length * 5;

        });

      } else {

        doc.text("No sample questions available.", 18, y);
        y += 5;

      }

      y += 10;

    });

    doc.save(`ExamBlueprint_${data.paperCode}.pdf`);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            Exam Blueprint DNA 🧬
          </h1>

          <p className="text-gray-600">
            Understand topic weightage, trends and exam priorities.
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
            onClick={analyzeBlueprint}
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
          >
            Analyze Blueprint
          </button>

          <button
            onClick={downloadReport}
            disabled={!data}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 transition"
          >

            {/* Download Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
              />
            </svg>

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
              Analyzing topic weightage...
            </span>

          </div>

        </div>
      )}

      {data && (

        <div className="space-y-6">

          {/* Summary */}
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
              <span className="text-gray-500">Topics Found:</span>{" "}
              <span className="font-medium">{data.topics.length}</span>
            </div>

          </div>

          {/* AI Insights */}
          <AIInsights topics={data.topics} />

          {/* Study Order */}
          <StudyOrder topics={data.topics} />

          {/* Priority Topics */}
          <PriorityTopics topics={data.topics} />

          {/* Difficulty Distribution */}
          <DifficultyDistribution topics={data.topics} />

          {/* Weightage Chart */}
          <TopicWeightageChart topics={data.topics} />

          {/* Topic Insight Cards */}
          <div className="space-y-4">

            {data.topics
              .sort((a, b) => parseFloat(b.weightage) - parseFloat(a.weightage))
              .map((topic, index) => (
                <TopicInsightCard
                  key={index}
                  topic={topic}
                  index={index}
                />
              ))}

          </div>

        </div>

      )}

    </div>
  );
}

/* ---------- AI Insights ---------- */

function AIInsights({ topics }) {

  const mostImportant = [...topics].sort(
    (a, b) => parseFloat(b.weightage) - parseFloat(a.weightage)
  )[0]

  const rising = topics.find(t => t.trend === "Rising")
  const hard = topics.find(t => t.difficulty === "Hard")

  return (

    <div className="grid md:grid-cols-3 gap-4">

      <InsightCard
        title="Most Important Topic"
        value={mostImportant?.topicName}
        color="indigo"
      />

      <InsightCard
        title="Rising Topic"
        value={rising?.topicName}
        color="green"
      />

      <InsightCard
        title="Most Difficult Topic"
        value={hard?.topicName}
        color="red"
      />

    </div>

  )
}

function InsightCard({ title, value, color }) {

  const styles = {
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700"
  }

  return (
    <div className={`border rounded-lg p-4 ${styles[color]}`}>
      <div className="text-xs opacity-70">{title}</div>
      <div className="font-semibold">{value || "N/A"}</div>
    </div>
  )
}

/* ---------- Study Order ---------- */

function StudyOrder({ topics }) {

  const sorted = [...topics].sort((a, b) => {

    const priorityScore = a.priority - b.priority
    const trendScore =
      (b.trend === "Rising" ? 1 : 0) - (a.trend === "Rising" ? 1 : 0)
    const weightScore = parseFloat(b.weightage) - parseFloat(a.weightage)

    return priorityScore || trendScore || weightScore
  })

  return (

    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">

      <h3 className="font-semibold text-indigo-800 mb-3">
        AI Recommended Study Order
      </h3>

      <ol className="space-y-1 text-sm text-gray-800">

        {sorted.map((topic, i) => (
          <li key={i}>
            {i + 1}. {topic.topicName}
          </li>
        ))}

      </ol>

    </div>

  )
}

/* ---------- Priority Topics ---------- */

function PriorityTopics({ topics }) {

  const mustStudy = topics.filter(t => t.priority === 1)

  if (!mustStudy.length) return null

  return (

    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

      <h3 className="font-semibold text-yellow-800 mb-2">
        High Priority Topics
      </h3>

      <div className="flex flex-wrap gap-2">

        {mustStudy.map((t, i) => (
          <span
            key={i}
            className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded"
          >
            {t.topicName}
          </span>
        ))}

      </div>

    </div>

  )
}

/* ---------- Difficulty Distribution ---------- */

function DifficultyDistribution({ topics }) {

  const easy = topics.filter(t => t.difficulty === "Easy").length
  const moderate = topics.filter(t => t.difficulty === "Moderate").length
  const hard = topics.filter(t => t.difficulty === "Hard").length

  return (

    <div className="bg-white border border-gray-200 rounded-lg p-4">

      <h3 className="font-semibold mb-3">
        Difficulty Distribution
      </h3>

      <div className="flex gap-6 text-sm">

        <span className="text-green-600">
          Easy: {easy}
        </span>

        <span className="text-orange-600">
          Moderate: {moderate}
        </span>

        <span className="text-red-600">
          Hard: {hard}
        </span>

      </div>

    </div>

  )
}