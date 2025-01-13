import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import user_controller from "../services/user.service";

const SearchLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      try {
        const response = await user_controller.getKueri(value);
        setSuggestions(response.data?.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (term) => {
    if (term.trim()) {
      try {
        const kueriResponse = await user_controller.getKueri(term);
        const kueriId = kueriResponse.data?.id;

        if (kueriId) {
          const linkResponse = await user_controller.cariLink(kueriId);
          const results = linkResponse.data || [];

          // Arahkan ke halaman Result dengan data hasil pencarian
          navigate("/resultSearch", { state: { results } });
        }
      } catch (error) {
        console.error("Error fetching links:", error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-4" ref={searchRef}>
      <div className="bg-white rounded-3xl mt-10 text-white border-2 border-blue-200 shadow-lg hover:shadow-md transition-shadow duration-200 relative">
        <div className="flex items-center px-4 py-3 border-blue">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            className="flex-1 px-4 outline-none text-gray-700 bg-transparent"
            placeholder="Search or type a URL"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchLink;