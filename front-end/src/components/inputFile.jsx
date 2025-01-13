import React from "react";

const InputFile = ({label, value, onChange, placeholder, required, isSidebarOpen, name, id}) => {
    return (
        <div className="max-w-sm">
            <label htmlFor="file-input" className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input 
                type="file" 
                placeholder={placeholder}
                name={name}
                id={id} 
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                    file:bg-gray-50 file:border-0
                    file:me-4
                    file:py-3 file:px-4"
                // value={value}
                onChange={onChange} 
                    
            />
        </div>
    );
}

export default InputFile;
