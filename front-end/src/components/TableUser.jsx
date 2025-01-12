import React, { useState } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import useDeleteAlert from "./DeletedAlert";
import ButtonGreen from "./Button";
import SearchBox from "./SearchBox";
import InputLight from "./inputLight";
import Select from "./Select";

const users = [
  { nama: "Budi", email: "budi@gmail.com", hp: "083183879726", nip: "1234567", jabatan: "Manager", unit: "TI" },
  { nama: "Ani", email: "ani@gmail.com", hp: "083183879727", nip: "7654321", jabatan: "Staff", unit: "HR" },
];

const unitKerjaOptions = ["TI", "Umum"];

const TableLink = () => {
  const { deleteAlert } = useDeleteAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (isOpen) setEditData(null);
  };

  const handleEdit = (user) => {
    setEditData(user);
    setIsOpen(true);
  };

  const handleDelete = (nama) => {
    deleteAlert(nama);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex shadow rounded-lg w-full max-w-screen-xl mx-auto">
        <div className="overflow-x-auto w-full">
          <div className="p-4">
            <div className="mb-8 flex justify-between gap-6">
              <div className="text-xl font-semibold text-gray-700">List Pengguna</div>
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase font-bold">Nama</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">NIP</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Jabatan</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Unit</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.nip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.jabatan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                          onClick={() => handleDelete(user.nama)}
                        >
                          <Trash2 size={20} color="red" className=" rounded transition-transform duration-300 transform hover:-translate-y-1" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
                          onClick={() => handleEdit(user)}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40" onClick={togglePopup} aria-hidden="true" />
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editData ? "Edit Pengguna" : "Tambah Pengguna"}
                </h2>
                <button onClick={togglePopup} className="text-gray-500 hover:text-gray-800">
                  <X />
                </button>
              </div>
              <div className="p-4">
                <InputLight
                  label="Nama"
                  placeholder="Masukkan Nama"
                  value={editData?.nama || ""}
                  onChange={(e) => handleChange("nama", e.target.value)}
                />
                <InputLight
                  label="Email"
                  placeholder="Masukkan Email"
                  value={editData?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <InputLight
                  label="No HP"
                  placeholder="Masukkan Nomor HP"
                  value={editData?.hp || ""}
                  onChange={(e) => handleChange("hp", e.target.value)}
                />
                <InputLight
                  label="NIP"
                  placeholder="Masukkan NIP"
                  value={editData?.nip || ""}
                  onChange={(e) => handleChange("nip", e.target.value)}
                />
                <InputLight
                  label="Jabatan"
                  placeholder="Masukkan Jabatan"
                  value={editData?.jabatan || ""}
                  onChange={(e) => handleChange("jabatan", e.target.value)}
                />
                <div className="mt-2">
                  <Select
                    label="Unit Kerja"
                    options={unitKerjaOptions}
                    value={editData?.unit || ""}
                    onChange={(value) => handleChange("unit", value)}
                    
                  />
                </div>
                
                <div className="mt-6 flex justify-center">
                  <ButtonGreen onClick={togglePopup}>Simpan</ButtonGreen>
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
