import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import Card from "../components/Card";
import Feedback from "../components/Feedback";
import Pagination from "../components/Pagination";
import ScrollButton from "../components/Scroll";
import SearchLink from "../components/SearchLink";
import { jwtDecode } from "jwt-decode";

function Result() {
  const location = useLocation();
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get results from location state
  const allResults = location.state?.results || [];
  
  // Memoize the paginated results
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allResults.slice(startIndex, endIndex);
  }, [allResults, currentPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex">
        <Navbar />
      </div>
      <Sidebar role={role} />
      <div className="mt-20">
        <SearchLink />
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5 mb-5 p-10 ml-60 min-h-[60vh]">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((item) => (
            <Card
              key={item.id || item.url} // Use a unique identifier
              nama={item.judul}
              deskripsi={item.deskripsi}
              link={item.url}
              gambar={`http://localhost:4000/${item.gambar}`}
            />
          ))
        ) : (
          <p className="text-center">No results found.</p>
        )}
        <Pagination 
          totalItems={allResults.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <Feedback />
      <ScrollButton />
    </div>
  );
}

export default Result;