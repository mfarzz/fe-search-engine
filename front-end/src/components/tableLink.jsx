import React, { useState } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import useDeleteAlert from "./DeletedAlert";
import ButtonGreen from "./Button";
import SearchBox from "./SearchBox";``
import InputLight from "./inputLight";
import InputFile from "./InputFile";
import TextArea from "./textArea";

const initialWebsites = [
  { nama: "BPS Indonesia", url: "https://www.bps.go.id", file: "Laporan Tahunan BPS 2023" },
  { nama: "BPS Sumatera Barat", url: "https://sumbar.bps.go.id", file: "Laporan Ekonomi Sumbar 2023" },
  { nama: "BPS Jakarta", url: "https://jakarta.bps.go.id", file: "Laporan Pembangunan Jakarta 2023" },
  { nama: "BPS Jawa Barat", url: "https://jabar.bps.go.id", file: "Data Sosial Ekonomi Jawa Barat 2023" },
  { nama: "BPS Jakarta", url: "https://jakarta.bps.go.id", file: "Laporan Pembangunan Jakarta 2023" },
  { nama: "BPS Jawa Barat", url: "https://jabar.bps.go.id", file: "Data Sosial Ekonomi Jawa Barat 2023" },
];

const TableLink = () => {
  const { deleteAlert } = useDeleteAlert();
  const [websites, setWebsites] = useState(initialWebsites);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nama: "", url: "", file: "" });

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsEditing(false);
    setFormData({ nama: "", url: "", file: "" });
  };

  const handleDelete = (nama) => {
    deleteAlert(nama);
    setWebsites(websites.filter((item) => item.nama !== nama));
  };

  const handleEdit = (website) => {
    setFormData(website);
    setIsOpen(true);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (isEditing) {
      setWebsites(websites.map((item) => (item.nama === formData.nama ? formData : item)));
    } else {
      setWebsites([...websites, formData]);
    }
    togglePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
                {websites.map((website, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-center text-gray-800">{website.nama}</td>
                    <td className="px-6 py-4 text-center text-gray-800">{website.url}</td>
                    <td className="px-6 py-4 text-center text-gray-800">{website.file}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                          onClick={() => handleDelete(website.nama)}
                        >
                          <Trash2 size={20} color="red" className=" rounded transition-transform duration-300 transform hover:-translate-y-1" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                          onClick={() => handleEdit(website)}
                        >
                          <Pencil size={20} color="orange" className=" rounded transition-transform duration-300 transform hover:-translate-y-1" />
                        </button>
                      </div>
                  </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          {/* Overlay abu-abu */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
            onClick={togglePopup}
            aria-hidden="true"
          />
          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {isEditing ? "Edit Link" : "Tambah Link"}
                </h2>
                <button onClick={togglePopup} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="pl-4 pt-4 pb-4 pr-4 ml-4 mr-4">
                <InputLight
                  label="Nama"
                  name="nama"
                  value={formData.nama}
                  placeholder="Masukkan Nama"
                  onChange={handleChange}
                />
                <InputLight
                  label="URL"
                  name="url"
                  value={formData.url}
                  placeholder="Masukkan URL"
                  onChange={handleChange}
                />
                <div className="mt-2">
                <TextArea
                  label="Deskripsi"
                  name="url"
                  value={formData.url}
                  placeholder="Masukkan Deskripsi"
                  onChange={handleChange}
                  
                />

                </div>
                
                
                <div className="mt-2">
                  <InputFile
                    label="File"
                    name="file"
                    value={formData.file}
                    placeholder="Masukkan File"
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-6 flex justify-center">
                  <ButtonGreen onClick={handleSave}>{isEditing ? "Update" : "Simpan"}</ButtonGreen>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TableLink;
