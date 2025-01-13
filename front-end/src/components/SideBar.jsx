// Sidebar.js
import React from "react";
import { Menu, X, Home, Settings, User, LogOut, ChartColumnBig, Link, TableOfContents } from "lucide-react";
import useSidebar from "../hooks/useSidebar"; 
import useLogout from "../hooks/useLogout"; 

const Sidebar = ({ role }) => {
  const { isOpen, toggleSidebar } = useSidebar(); 
  const handleLogout = useLogout(); 

  const adminMenuItems = [
    { title: "Home", icon: Home, route: "/home" },
    { title: "Dashboard", icon: ChartColumnBig, route: "/dashboard" },
    { title: "Manajemen Link", icon: Link, route: "/link" },
    { title: "Akun User", icon: User, route: "/user" },
  ];

  const userMenuItems = [
    { title: "Home", icon: Home, route: "/home" },
    { title: "Manajemen Link", icon: Link, route: "/link" },
    { title: "FAQ", icon: TableOfContents, route: "/faq" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-premier text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-72 flex flex-col`}
      >
        <div className="h-full overflow-y-auto p-4 ml-5 mt-5 flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-12">
            <div className="grid grid-cols-[auto,1fr] gap-2 items-center">
              <div className="w-12">
                <img
                  src="src/assets/logo.png"
                  alt="Logo BPS"
                  className="w-full h-auto"
                />
              </div>
              <div className="text-2xl text-blue-premier">BPS Sumbar</div>
            </div>
          </h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    {item.action ? (
                      <button
                        onClick={item.action}
                        className="flex items-center gap-4 w-full text-left p-3 text-gray-700 hover:bg-blue-premier hover:text-white rounded-lg transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={item.route}
                        className="flex items-center gap-4 p-3 text-gray-700 hover:bg-blue-premier hover:text-white rounded-lg transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Logout Button at the bottom */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full text-left p-3 ml-6 hover:text-blue-premier hover:font-bold text-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
