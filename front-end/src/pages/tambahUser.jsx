import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate
import InputLight from "../components/inputLight";
import Sidebar from "../components/SideBar";
import Dropdown from "../components/dropdown";
import Navbar from "../components/navbar";
import ButtonGreen from "../components/btnGreen";
import admin_controller from "../services/admin.service"; // Impor admin_controller

function TambahUser() {
    const navigate = useNavigate(); // Inisialisasi navigate

    // State untuk form data
    const [formData, setFormData] = useState({
        nama: '',
        nip: '',
        username: '',
        password: '',
        role: ''
    });

    // Menangani perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nama || !formData.nip || !formData.username || !formData.password || !formData.role) {
            alert("Please fill in all fields");
            return; // Stop the function if any field is empty
        }
        try {
            // Panggil addUser dari admin_controller
            await admin_controller.addUser(formData);
            navigate("/user"); // Navigasi ke halaman /user setelah berhasil menambah user
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container bg-white">
                <div className="bg-white mt-15 max-w-2xl mx-auto mt-2 mb-1 rounded-lg shadow">
                    <div className="ml-3 text-xl font-semibold text-gray-500 ">Tambah User</div>
                    <div className="ml-5 mt-5">
                        <form onSubmit={handleSubmit} id="form-user" name="form-user"> 
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
                            <InputLight 
                                label="Role" 
                                placeholder="Pilih Role" 
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange} 
                                required={true}
                            />
                            <div className="mt-8 pb-8">
                                <ButtonGreen 
                                    label="Simpan" 
                                    type="submit" 
                                    name="submit_user"
                                    id="submit_user"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TambahUser;
