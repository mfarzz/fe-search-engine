import React from 'react';

const ButtonGreen = ({ label, onClick, children, name, id }) => (
    <div className="button">
        <button 
            className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-bold rounded-lg border border-transparent bg-green text-white focus:outline-none bg-green disabled:opacity-50 disabled:pointer-events-none shadow hover:bg-opacity-90 shadow-gray-500/50"
            onClick={onClick}
            name={name}
            id={id}
        >
            {children || label}
        </button>
    </div>
);

export default ButtonGreen;
