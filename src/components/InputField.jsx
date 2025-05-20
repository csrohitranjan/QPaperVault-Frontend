// src/components/InputField.jsx
import React from "react";

export default function InputField({ label, type, value, onChange, name }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
