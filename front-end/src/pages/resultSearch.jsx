import React from "react";
import SearchComponent from "../components/Search";
import Navbar from "../components/navbar";
import SearchWthLogo from "../components/searchWthLogo";
import Sidebar from "../components/SideBar";

function Result (){
    const user="admin"
    return(
        <>
        <div className=" h-full ">
            <Navbar/>
            <Sidebar role={user}/>
            <SearchWthLogo/>
        </div>
        </>    
    );

}

export default Result;