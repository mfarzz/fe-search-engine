import React from 'react';

const Input = ({ label = "Input", value, onChange, placeholder, required, name }) => {
    return (
        <div className="max-w-sm">
            <label htmlFor="input-label" className="block text-sm font-bold mb-2 text-white">
                {label}
            </label>
            <input 
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default Input;
