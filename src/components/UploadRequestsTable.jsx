import React, { useEffect, useState } from "react";

export default function UploadRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 1000));

        const data = [
          {
            id: 1,
            paperName: "Advanced Data Structures",
            paperCode: "CS301",
            program: "Computer Science",
            year: 2023,
          },
          {
            id: 2,
            paperName: "Algorithm Design",
            paperCode: "CS302",
            program: "Information Technology",
            year: 2022,
          },
        ];

        setRequests(data);
      } catch (err) {
        setError("Failed to load upload requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  function approveRequest(id) {
    alert(`Approved request id ${id}`);
  }

  function rejectRequest(id) {
    alert(`Rejected request id ${id}`);
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading requests...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600 font-semibold" role="alert">
        {error}
      </p>
    );
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
              Program
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Year</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {requests.map(({ id, paperName, paperCode, program, year }) => (
            <tr key={id} className="hover:bg-indigo-50 transition">
              <td className="px-6 py-4">{paperName}</td>
              <td className="px-6 py-4">{paperCode}</td>
              <td className="px-6 py-4">{program}</td>
              <td className="px-6 py-4">{year}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => approveRequest(id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm font-medium mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectRequest(id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
