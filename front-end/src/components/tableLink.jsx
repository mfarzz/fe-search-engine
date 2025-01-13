import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import useDeleteAlert from "./DeletedAlert";
import ButtonGreen from "./Button";
import SearchBox from "./SearchBox";
import InputLight from "./inputLight";
import InputFile from "./InputFile";
import Swal from "sweetalert2";

const TableLink = () => {
  const { deleteAlert } = useDeleteAlert();
  const [websites, setWebsites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    judul: "",
    url: "",
    file: null,
    deskripsi: "",
    gambar: "",
  });

  const fetchLinks = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/dashboard/list-link?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response.data;
      setWebsites(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error!", "Gagal mengambil data.", "error");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsEditing(false);
    setFormData({
      id: "",
      judul: "",
      url: "",
      file: null,
      deskripsi: "",
      gambar: "",
    });
  };

  const handleDelete = (id) => {
    deleteAlert(id);

    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus link ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(
            `http://localhost:4000/dashboard/delete-link/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setWebsites((prevWebsites) =>
            prevWebsites.filter((item) => item.id !== id)
          );
          Swal.fire("Terhapus!", "Link berhasil dihapus.", "success");
        } catch (error) {
          console.error("Error deleting link:", error);
          Swal.fire("Error!", "Gagal menghapus data.", "error");
        }
      }
    });
  };

  const handleEdit = (website) => {
    setFormData({
      ...website,
      file: null,
    });
    setIsOpen(true);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.judul || !formData.url) {
        Swal.fire("Error!", "Judul dan URL harus diisi.", "error");
        return;
      }

      const form = new FormData();
      form.append("judul", formData.judul);
      form.append("url", formData.url);
      form.append("deskripsi", formData.deskripsi || "");

      // Handle file upload
      if (formData.file instanceof File) {
        form.append("gambar", formData.file); // Ensure the file is appended
      }

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:4000/dashboard/edit-link/${formData.id}`,
          form,
          config
        );
        Swal.fire("Berhasil!", "Data berhasil diperbarui.", "success");
      } else {
        response = await axios.post(
          "http://localhost:4000/dashboard/add-link",
          form,
          config
        );
        Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
      }

      await fetchLinks();
      togglePopup();
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire(
        "Gagal!",
        error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan data.",
        "error"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire(
          "Error!",
          "File harus berupa gambar (JPG, PNG, atau GIF).",
          "error"
        );
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        Swal.fire("Error!", "Ukuran file tidak boleh lebih dari 5MB.", "error");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        file: file,
        gambar: URL.createObjectURL(file), // Update gambar preview
      }));
    }
  };

  const truncateWords = (str, numWords) => {
    if (!str) return "";
    const words = str.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return str;
  };

  return (
    <>
      <div className="flex shadow rounded-lg w-full max-w-screen-xl mx-auto">
        <div className="overflow-x-auto w-full">
          <div className="p-4">
            <div className="mb-8 flex justify-between gap-6">
              <div className="text-xl font-semibold text-gray-700">
                List Link
              </div>
              <div className="w-72">
                <SearchBox />
              </div>
              <ButtonGreen onClick={togglePopup}>
                <Plus className="font-medium" size={15} />
              </ButtonGreen>
            </div>
            <table className="w-full max-w-none table-auto divide-y divide-gray-200">
              <thead>
                <tr className="bg-blue-premier">
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    Judul
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    URL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    File
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {websites.map((website, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-center text-gray-800">
                      {website.judul}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-800">
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {website.url.length > 50
                          ? `${website.url.slice(0, 47)}...`
                          : website.url}
                      </a>
                    </td>

                    <td className="px-6 py-4 text-center text-gray-800 break-words whitespace-normal">
                      {(website.deskripsi)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {website.gambar ? (
                        <img
                          src={website.gambar}
                          alt={website.judul}
                          className="w-16 h-16 object-cover rounded mx-auto"
                        />
                      ) : (
                        <span className="text-gray-500">Tidak ada gambar</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                          onClick={() => handleDelete(website.id)}
                        >
                          <Trash2
                            size={20}
                            color="red"
                            className="rounded transition-transform duration-300 transform hover:-translate-y-1"
                          />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                          onClick={() => handleEdit(website)}
                        >
                          <Pencil
                            size={20}
                            color="orange"
                            className="rounded transition-transform duration-300 transform hover:-translate-y-1"
                          />
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
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
            onClick={togglePopup}
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {isEditing ? "Edit Link" : "Tambah Link"}
                </h2>
                <button
                  onClick={togglePopup}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X />
                </button>
              </div>
              <div className="pl-4 pt-4 pb-4 pr-4 ml-4 mr-4">
                <InputLight
                  label="Judul"
                  name="judul"
                  value={formData.judul}
                  placeholder="Masukkan Nama"
                  onChange={handleChange}
                  required
                />
                <InputLight
                  label="URL"
                  name="url"
                  value={formData.url}
                  placeholder="Masukkan URL"
                  onChange={handleChange}
                  required
                />
                <InputLight
                  label="Deskripsi"
                  name="deskripsi"
                  value={formData.deskripsi}
                  placeholder="Masukkan Deskripsi"
                  onChange={handleChange}
                />
                <InputFile
                  label="Gambar"
                  name="gambar"
                  value={formData.gambar}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {formData.gambar && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">
                      Preview Gambar:
                    </p>
                    <img
                      src={formData.gambar}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
                <div className="mt-6 flex justify-center">
                  <ButtonGreen onClick={handleSave}>
                    {isEditing ? "Update" : "Simpan"}
                  </ButtonGreen>
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

//DAH BISA SAMPAI SEACRH SAMA FITUR MANAGEMENT LINK SUDAH COMPLETE TINGGAL USER
