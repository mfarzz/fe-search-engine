import React from 'react';

const ButtonGreen = ({ label = "Button", onClick, children, name, id }) => (
    <div className="button">
        <button 
            // type="button" 
            className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-bold rounded-lg border border-transparent bg-green text-white hover:bg-teal-600 focus:outline-none bg-green disabled:opacity-50 disabled:pointer-events-none shadow-lg"
            onClick={onClick}
            name={name}
            id={id}
        >
            {children || label}
        </button>
    </div>
);

export default ButtonGreen;
