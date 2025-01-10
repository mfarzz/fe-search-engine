import React, { useState } from "react";
import ButtonGreen from "../components/btnGreen";
import InputLight from "../components/inputLight";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import InputFile from "../components/inputFile";
import { Plus } from "react-feather";

function TambahLink() {
  const [isOpen, setIsOpen] = useState(false); // State untuk kontrol popup
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/link");
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-white">
        <div className="text-center mt-10">
          <ButtonGreen onClick={togglePopup}>
            <div className="flex items-center">
              <Plus className="font-medium mr-2" size={15} />
              Tambah
            </div>
          </ButtonGreen>
        </div>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Tambah Link</h2>
              <button
                onClick={togglePopup}
                className="text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>
            <div className="p-6">
              <InputLight label="Judul" placeholder="Masukkan Nama" />
              <InputLight label="URL" placeholder="Masukkan URL" />
              <InputLight label="Deskripsi" placeholder="Masukkan Deskripsi" />
              <div className="mt-5">
                <InputFile label="Upload" placeholder="Maksimal 2 MB" />
              </div>
              <div className="mt-8 flex justify-end">
                <ButtonGreen label="Simpan" onClick={handleNavigate}>
                  Simpan
                </ButtonGreen>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TambahLink;
