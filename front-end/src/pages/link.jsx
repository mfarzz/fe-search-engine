import React, { useState, useEffect } from "react";
import Table from "../components/table";
import Sidebar from "../components/SideBar";
import SearchBox from "../components/searchCom";
import Navbar from "../components/navbar";
import TableLink from "../components/tableLink";
import Pagination from "../components/pagination";
import {jwtDecode} from "jwt-decode";

function Link () {
    const [role, setRole] = useState("");
        
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
              try {
                const decodedToken = jwtDecode(token); // Dekode token untuk mendapatkan role
                setRole(decodedToken.role); // Ambil role dari token dan set ke state
              } catch (error) {
                console.error("Token decoding error:", error);
              }
            }
        }, []);
    return (
       <>

        <Navbar/>
        <div className="container bg-white-100">
            <div className="grid grid-cols-1 gap-4 bg-white mt-1 max-w-4xl mx-auto p-4  mb-3 rounded-lg">
                <div className="p-5">
                    <TableLink />
                </div>
                
                 <div className="flex justify-end mt-2 mb-3 ">
                            <Pagination/>
                 </div>
               
            </div>
         <Sidebar role={role}/>
        </div>
       </>        
    );
}

export default Link;