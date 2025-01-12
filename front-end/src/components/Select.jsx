import React from "react";

const Select = ({ label, options, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium  mb-2">{label}</label>
      <select
         className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-premier focus:ring-blue-premier disabled:opacity-50 disabled:pointer-events-none"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Pilih {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
