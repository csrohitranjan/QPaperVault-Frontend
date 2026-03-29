// src/components/InputField.jsx
export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  dark = false,
  placeholder = "",
}) {
  return (
    <div className="flex flex-col gap-1.5 group">
      <label
        htmlFor={name}
        className={`ui-label transition-colors ${
          dark ? "group-focus-within:text-primaryOrange" : "text-gray-700"
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
        placeholder={placeholder}
        required
        className={`${
          dark
            ? "ui-input-dark"
            : "ui-input-light"
        }`}
      />
    </div>
  );
}
