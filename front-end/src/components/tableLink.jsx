import React, { useState, useEffect } from "react";
import { Trash2, Pencil, Plus, X } from "lucide-react";
import useDeleteAlert from "./DeletedAlert";
import ButtonGreen from "./Button";
import SearchBox from "./SearchBox";
import TextArea from "./TextArea";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import user_controller from "../services/user.service";

const TableLink = () => {
  const { deleteAlert } = useDeleteAlert();
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    url: "",
    deskripsi: "",
    gambar: null
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadLink = async (page = 1) => {
    setLoading(true);
    try {
      const data = await user_controller.listLinks(page);
      setLinks(data.data);
      setPagination({
        page,
        totalPages: data.pagination.totalPages
      });
    } catch (error) {
      console.error("Error loading links:", error);
      setError("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);
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

  const handlePageChange = (page) => {
    loadLink(page);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setIsEditing(false);
    setFormData({
      judul: "",
      url: "",
      deskripsi: "",
      gambar: null
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlert(id);
      loadLink(pagination.page);
    } catch (error) {
      console.error("Error deleting link:", error);
      setError("Terjadi kesalahan saat menghapus data.");
    }
  };

  const handleEdit = (link) => {
    setFormData({
      id: link.id,
      judul: link.judul,
      url: link.url,
      deskripsi: link.deskripsi,
      gambar: link.gambar
    });
    if (link.gambar) {
      setPreviewUrl(`http://localhost:4000/${link.gambar}`);
    }
    setIsOpen(true);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.judul || !formData.url) {
      setError("Judul dan URL harus diisi");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("judul", formData.judul);
      formDataToSend.append("url", formData.url);
      formDataToSend.append("deskripsi", formData.deskripsi || "");
      
      if (selectedFile) {
        formDataToSend.append("gambar", selectedFile);
      }

      if (isEditing) {
        formDataToSend.append("id", formData.id);
        await user_controller.updateLink(formDataToSend);
      } else {
        await user_controller.addLinks(formDataToSend);
      }

      togglePopup();
      loadLink(pagination.page);
      setError("");
    } catch (error) {
      console.error("Error saving link:", error);
      setError("Terjadi kesalahan saat menyimpan data.");
    }
  };

  useEffect(() => {
    loadLink(pagination.page);
  }, [pagination.page]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <div className="flex shadow rounded-lg w-full max-w-screen-xl mx-auto">
        <div className="overflow-x-auto w-full">
          <div className="p-4">
            <div className="mb-8 flex justify-between gap-6">
              <div className="text-xl font-semibold text-gray-700">List Link</div>
              <div className="w-72">
                <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <ButtonGreen onClick={togglePopup}>
                <Plus className="font-medium" size={15} />
              </ButtonGreen>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-blue-premier">
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    Nama URL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    URL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    Gambar
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : links.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  links.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-center text-gray-800">
                        {link.judul}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-700"
                        >
                          {link.url}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        {truncateWords(link.deskripsi, 3)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {link.gambar ? (
                          <img
                            src={`http://localhost:4000/${link.gambar}`}
                            alt={link.judul}
                            className="w-16 h-16 object-cover rounded mx-auto"
                          />
                        ) : (
                          <span className="text-gray-500 italic">
                            Tidak ada gambar
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleDelete(link.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} className="transition-transform duration-300 transform hover:-translate-y-1" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEdit(link)}
                            className="text-orange-600 hover:text-orange-800"
                          >
                            <Pencil size={20} className="transition-transform duration-300 transform hover:-translate-y-1" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
            onClick={togglePopup}
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
              <form onSubmit={handleSubmit} className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Judul
                    </label>
                    <input
                      type="text"
                      name="judul"
                      value={formData.judul}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Masukkan Judul"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Masukkan URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <TextArea
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleChange}
                      placeholder="Masukkan Deskripsi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gambar
                    </label>
                    {previewUrl && (
                      <div className="mb-2">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded mx-auto"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                  )}

                  <div className="flex justify-center pt-4">
                    <ButtonGreen type="submit">
                      {isEditing ? "Update" : "Simpan"}
                    </ButtonGreen>
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