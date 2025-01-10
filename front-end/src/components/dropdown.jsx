import React from "react";

const Dropdown = ({ label = "Select an option", options = [], onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };




    return (
        <div className="relative inline-block w-full max-w-sm">
        <label className="block text-sm font-medium mb-2">{label}</label>
        <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full bg-white border-2 border-gray-300 text-left py-3 px-4 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
            {selected || "Choose an option"}
            <span className="float-right transform transition-transform duration-300">
                {isOpen ? "▲" : "▼"}
            </span>
        </button>

        {isOpen && (
            <ul className="absolute w-full bg-white border-2 border-gray-300 rounded-lg shadow-lg mt-1 z-50 max-h-48 overflow-y-auto">
                {options.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelect(option)}
                        className="py-2 px-4 hover:bg-blue-100 cursor-pointer text-sm"
                    >
                        {option}
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
}

export default Dropdown;