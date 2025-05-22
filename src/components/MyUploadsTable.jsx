import React, { useEffect, useState } from "react";

export default function MyUploadsTable() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUploads() {
      try {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 1000)); // Simulate API delay

        const data = [
          {
            id: 1,
            paperName: "Operating Systems",
            paperCode: "CS204",
            programme: "Computer Science",
            month: "May",
            year: 2023,
            fileUrl: "/papers/os2023.pdf",
          },
          {
            id: 2,
            paperName: "Networks",
            paperCode: "CS305",
            programme: "Information Technology",
            month: "December",
            year: 2022,
            fileUrl: "/papers/networks2022.pdf",
          },
        ];

        setUploads(data);
      } catch (err) {
        console.error("Failed to fetch uploads:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUploads();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading uploads...</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-indigo-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Paper Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Paper Code
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Programme
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Month</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Year</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">
              View
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {uploads.map((upload) => (
            <tr key={upload.id} className="hover:bg-indigo-50 transition">
              <td className="px-6 py-4">{upload.paperName}</td>
              <td className="px-6 py-4">{upload.paperCode}</td>
              <td className="px-6 py-4">{upload.programme}</td>
              <td className="px-6 py-4">{upload.month}</td>
              <td className="px-6 py-4">{upload.year}</td>
              <td className="px-6 py-4 text-center">
                <a
                  href={upload.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md text-sm font-medium"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
