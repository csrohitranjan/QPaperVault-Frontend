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
        className={`text-[10px] font-bold uppercase tracking-widest ml-1 transition-colors ${
          dark ? "text-textMuted group-focus-within:text-primaryOrange" : "text-gray-700"
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
        className={`w-full rounded-xl px-4 py-3 border transition-all outline-none font-medium text-sm ${
          dark
            ? "bg-themeBg text-white placeholder-white/10 border-white/5 focus:border-primaryOrange/30 focus:bg-[#1a1c26]"
            : "border-gray-200 text-gray-900 focus:border-primaryOrange bg-white"
        }`}
      />
    </div>
  );
}
