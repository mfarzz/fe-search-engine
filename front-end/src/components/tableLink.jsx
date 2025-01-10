import React, { useState } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";
import useDeleteAlert from "./deletedAlert";
import ButtonGreen from "./btnGreen";
import SearchBox from "./searchCom";
import InputLight from "./inputLight";
import InputFile from "./inputFile";
import { useNavigate } from "react-router-dom";

const website = [
  { nama: "BPS Indonesia", url: "https://www.bps.go.id", file: "Laporan Tahunan BPS 2023" },
  { nama: "BPS Sumatera Barat", url: "https://sumbar.bps.go.id", file: "Laporan Ekonomi Sumbar 2023" },
  { nama: "BPS Jakarta", url: "https://jakarta.bps.go.id", file: "Laporan Pembangunan Jakarta 2023" },
  { nama: "BPS Jawa Barat", url: "https://jabar.bps.go.id", file: "Data Sosial Ekonomi Jawa Barat 2023" },
  { nama: "BPS Jakarta", url: "https://jakarta.bps.go.id", file: "Laporan Pembangunan Jakarta 2023" },
  { nama: "BPS Jawa Barat", url: "https://jabar.bps.go.id", file: "Data Sosial Ekonomi Jawa Barat 2023" },
];

const TableLink = () => {
  const { deleteAlert } = useDeleteAlert();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (nama) => {
    deleteAlert(nama);
  };

  return (
    <>
      <div className="flex shadow rounded-lg w-full max-w-screen-xl mx-auto">
        <div className="overflow-x-auto w-full">
          <div className="p-4">
            <div className="mb-8 flex justify-between gap-6">
              <div className="text-xl font-semibold text-gray-700">List Link</div>
              <div className="w-72">
                <SearchBox />
              </div>
              <ButtonGreen onClick={togglePopup}>
                <Plus className="font-medium" size={15} />
              </ButtonGreen>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-blue-premier">
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Nama URL</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">URL</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">File</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {website.map((websites, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-center text-gray-800">{websites.nama}</td>
                    <td className="px-6 py-4 text-center text-gray-800">{websites.url}</td>
                    <td className="px-6 py-4 text-center text-gray-800">{websites.file}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center gap-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
                        onClick={() => handleDelete(websites.nama)}
                      >
                        <Trash2 size={20} color="red" className="hover:bg-gray-200 rounded"/>
                        <Pencil size={20} color="orange" className="hover:bg-gray-200 rounded"  />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                <ButtonGreen onClick={togglePopup}>Simpan</ButtonGreen>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableLink;
