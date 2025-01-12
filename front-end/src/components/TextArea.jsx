import React from "react";

const TextArea = ({ label, placeholder  }) => {
  return (
    <div className="max-w-sm">
      <label
        htmlFor="textarea-label" className="block text-sm font-medium mb-2"
      >
        {label}
      </label>
      <textarea
        id="textarea-label" className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-green focus:ring-green disabled:opacity-50 disabled:pointer-events-none" rows="3" placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
