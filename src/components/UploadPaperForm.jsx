import React, { useState } from "react";
import { uploadQuestionPaper } from "../services/authService";
import { toast } from "react-toastify";

export default function UploadPaperForm({ onClose }) {
  const [formData, setFormData] = useState({
    paperName: "",
    paperCode: "",
    department: "",
    programme: "",
    month: "",
    year: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("paperName", formData.paperName);
      data.append("paperCode", formData.paperCode);
      data.append("department", formData.department);
      data.append("programme", formData.programme);
      data.append("month", formData.month);
      data.append("year", formData.year);
      data.append("questionPaper", file);

      const token = localStorage.getItem("accessToken");

      const response = await uploadQuestionPaper(data, token);

      if (response.status === 200) {
        toast.success(response.data.message);
        setFormData({
          paperName: "",
          paperCode: "",
          department: "",
          programme: "",
          month: "",
          year: "",
        });
        setFile(null);

        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Upload failed. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-lg p-4 max-w-md mx-auto space-y-3"
    >
      <h2 className="text-center text-lg font-medium text-gray-700">
        Upload Question Paper
      </h2>

      <div className="space-y-2">
        <input
          name="paperName"
          value={formData.paperName}
          onChange={handleChange}
          placeholder="Paper Name"
          required
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="paperCode"
          value={formData.paperCode}
          onChange={handleChange}
          placeholder="Paper Code"
          required
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="programme"
          value={formData.programme}
          onChange={handleChange}
          placeholder="Programme"
          required
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex space-x-2">
          <input
            name="month"
            value={formData.month}
            onChange={handleChange}
            placeholder="Month"
            required
            className="w-1/2 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="year"
            type="number"
            min="1900"
            max="2100"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            required
            className="w-1/2 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
            className="w-full py-2 border border-gray-300 rounded-md cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Uploading..." : "Upload Paper"}
        </button>
      </div>
    </form>
  );
}
