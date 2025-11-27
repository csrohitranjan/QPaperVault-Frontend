// src/components/InputField.jsx
export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  dark = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className={`block mb-1 text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"
          }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        className={`w-full rounded-md px-3 py-2 border ${dark
          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500"
          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          } focus:outline-none transition`}
      />
    </div>
  );
}
