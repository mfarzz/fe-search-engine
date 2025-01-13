import React from "react";
import SearchComponent from "../components/SearchLink";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import Card from "../components/Card";
import Feedback from "../components/Feedback";
import Pagination from "../components/pagination";
import SearchLink from "../components/SearchLink";
import ScrollButton from "../components/Scroll";

import bps1 from "../assets/bps1.jpg";

const data = [
  {
    nama: "Test",
    deskripsi: "Ini adalah deskripsi untuk card pertama.",
    link: "https://example.com",
    judul: "Judul Card Pertama",
    gambar: bps1, 
  },
  {
    nama: "Test",
    deskripsi: "Ini adalah deskripsi untuk card pertama.",
    link: "https://example.com",
    judul: "Judul Card Pertama",
    gambar: bps1, 
  },
  {
    nama: "Test",
    deskripsi: "Ini adalah deskripsi untuk card pertama.",
    link: "https://example.com",
    judul: "Judul Card Pertama",
    gambar: bps1, 
  },
  
];

function Result() {
  const user = "admin";

  return (
    <>
      <div className="h-full">
        <div className="flex">
        <Navbar />
        </div>
       
        <Sidebar role={user} />
        <div className="mt-20">
          <SearchLink />
        </div>
        <div className="grid  grid-cols-1 gap-4 mt-5 mb-5 p-10 ml-60 h-full  justify-content">
          {data.map((item, index) => (
            
    
            <Card
              key={index}
              nama={item.nama}
              deskripsi={item.deskripsi}
              link={item.link}
              judul={item.judul}
              gambar={item.gambar} 
            />
            
          ))}
           <Pagination/>
        </div>
             <Feedback/>
             <ScrollButton/>

       
        
      </div>
      
      
    </>
  );
}

export default Result;
