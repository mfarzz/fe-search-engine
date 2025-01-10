import React, { useState } from "react";

const Password = ({value, onChange, placeholder, required}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="max-w-sm">
      <label className="block text-sm mb-2 text-white font-bold">Password</label>
      <div className="relative">
        <input
          id="hs-toggle-password"
          type={isPasswordVisible ? "text" : "password"}
          className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
        >
          <svg
            className="shrink-0 size-3.5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Icon untuk password yang tersembunyi */}
            <path
              className={!isPasswordVisible ? "block" : "hidden"}
              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
            />
            <path
              className={!isPasswordVisible ? "block" : "hidden"}
              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
            />
            <path
              className={!isPasswordVisible ? "block" : "hidden"}
              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
            />
            <line
              className={!isPasswordVisible ? "block" : "hidden"}
              x1="2"
              x2="22"
              y1="2"
              y2="22"
            />
            {/* Icon untuk password yang terlihat */}
            <path
              className={isPasswordVisible ? "block" : "hidden"}
              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
            />
            <circle
              className={isPasswordVisible ? "block" : "hidden"}
              cx="12"
              cy="12"
              r="3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Password;
