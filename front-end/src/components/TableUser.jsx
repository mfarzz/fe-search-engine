import React, { useState, useEffect } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import useDeleteAlert from "./DeletedAlert";
import ButtonGreen from "./Button";
import SearchBox from "./SearchBox";
import InputLight from "./InputLight";
import Select from "./Select";
import admin_controller from "../services/admin.service";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const unitKerjaOptions = ["IT", "Umum"];
const roleOptions = ["user", "admin"];

const TableLink = () => {
  const { deleteAlert } = useDeleteAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    jabatan: "",
    unit_kerja: "",
    username: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const loadUsers = async (page=1) => {
    setLoading(true);
    try {
      const data = await admin_controller.listUsers(page);
      setUsers(data.data);
      setPagination({
        page,
        totalPages: data.pagination.totalPages
      });
    } catch (error) {
      console.error("Failed to load users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = (page) => {
    loadUsers(page);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (isOpen) setEditData(null);
  };

  const handleEdit = (users) => {
    setEditData(users);
    setIsOpen(true);
  };

  const handleDelete = (nama) => {
    deleteAlert(nama);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.nip || !formData.username || !formData.password || !formData.role || !formData.unit_kerja || !formData.jabatan) {
        alert("Please fill in all fields");
        return; // Stop the function if any field is empty
    }
    try {
        // Panggil addUser dari admin_controller
        await admin_controller.addUser(formData);
        togglePopup();
        loadUsers(1)
        navigate("/user"); // Navigasi ke halaman /user setelah berhasil menambah user
    } catch (error) {
        console.error('Failed to add user:', error);
    }
};


  useEffect(() => {
    loadUsers(pagination.page);
    }, [pagination.page]);
    
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Role</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">Loading...</td>
                  </tr>
                ) : (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.nip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.jabatan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.unit_kerja}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.role}</td>
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
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination Component */}
      <div className="flex justify-end mt-4">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
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
              <form onSubmit={handleSubmit} id="form-user" name="form-user">
              <div className="p-4">
                <InputLight
                  label="Nama"
                  placeholder="Masukkan Nama"
                  name="nama"
                  id="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required={true}
                />
                <InputLight
                  label="NIP"
                  placeholder="Masukkan NIP"
                  name="nip"
                  id="nip"
                  value={formData.nip}
                  onChange={handleChange}
                  required={true}
                />
                <InputLight
                  label="Jabatan"
                  placeholder="Masukkan Jabatan"
                  name="jabatan"
                  id="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  required={true}
                />
                <div className="mt-2">
                  <Select
                    label="Unit Kerja"
                    options={unitKerjaOptions}
                    value={formData.unit_kerja}
                    onChange={handleChange}
                    name="unit_kerja"
                    required={true}
                  />
                </div>
                <InputLight
                  label="Username"
                  placeholder="Masukkan Username"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required={true}
                />
                <InputLight
                  label="Password"
                  placeholder="Masukkan Password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={true}
                />
                <div className="mt-2">
                  <Select
                    label="Role"
                    options={roleOptions}
                    value={formData.role}
                    onChange={handleChange}
                    name="role"
                    required={true}
                  />
                </div>
                
                <div className="mt-6 flex justify-center">
                  <ButtonGreen 
                    type="submit"
                    name="submit_user"
                    id="submit_user"
                  >Simpan</ButtonGreen>
                </div>
              </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TableLink;
