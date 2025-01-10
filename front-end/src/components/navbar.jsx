import React from 'react';

const User = [
    { nama: 'Budi', role: 'user' },
];

const Navbar = () => {
    const currentUser = User[0]?.nama || "Guest";

    return (
        <div className="navbar">
            <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-blue-premier text-sm py-3 shadow position fixed">
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between">
                        <a
                            className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
                            href ="/home"
                            aria-label="Brand"
                        >
                            <span className="inline-flex items-center gap-x-2 text-xl font-semibold text-white">
                                <svg
                                    className="w-10 h-auto"
                                    width="100"
                                    height="100"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                ></svg>
                               
                                <img src="src/assets/image.png" alt="" className="w-10 h-8 ml-3 mr-1" />
                                <div class="grid grid-rows-2 grid-flow-col gap-0 ">
                                    <div className="text-xl italic font-bold">BADAN PUSAT STATISTIK</div>
                                    <div className="text-base italic font-bold">PROVINSI SUMATERA BARAT</div>
                                    </div>
                                
                             
                            </span>
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
