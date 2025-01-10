import React, { useState, useEffect } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";
import useDeleteAlert from "./deletedAlert";
import ButtonGreen from "./btnGreen";
import SearchBox from "./searchCom";
import { useNavigate } from "react-router-dom";
import admin_controller from "../services/admin.service";
import Pagination from "./pagination"; // Import Pagination component

const Table = () => {
  const { deleteAlert } = useDeleteAlert();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [error, setError] = useState("");

  const loadUsers = async (page = 1) => {
    setLoading(true);
    try {
      const data = await admin_controller.listUsers(page);
      setUsers(data.data);
      setPagination({
        page,
        totalPages: data.pagination.totalPages, // Assuming your API returns totalPages
      });
    } catch (error) {
      console.error("Failed to load users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (nama) => {
    deleteAlert(nama);
  };

  const handleNavigate = () => {
    navigate("/Tambahuser");
  };

  const handlePageChange = (page) => {
    loadUsers(page);
  };

  useEffect(() => {
    loadUsers(pagination.page);
  }, [pagination.page]);

  return (
    <>
      <div className="flex flex-col shadow rounded-lg">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <div className="mb-8 flex justify-between mt-3 mr-3 gap-6">
                <div className=" text-xl font-semibold text-gray-500 ml-5">
                  List User
                </div>
                <div className="w-[300px]">
                  <SearchBox />
                </div>

                <ButtonGreen onClick={handleNavigate}>
                  <div>
                    <Plus className="font-medium" size={15} />
                  </div>
                </ButtonGreen>
              </div>

              <table className="w-full divide-y divide-gray-200 ">
                <thead>
                  <tr className="bg-blue-premier">
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase font-bold">Nama</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">NIP</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Role</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">Loading...</td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.nama}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.nip}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-800">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
    type="button"
    className="inline-flex items-center gap-x-4 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
>
    {/* Trash icon for delete action */}
    <Trash2 
        size={20} 
        color="red" 
        className="hover:bg-gray-200 rounded"
        onClick={() => handleDelete(user.nama)} // Handle delete action
    />
    
    {/* Pencil icon for edit action */}
    <Pencil 
        size={20} 
        color="orange" 
        className="hover:bg-gray-200 rounded"
        onClick={() => handleEdit(user.nama)} // Handle edit action
    />
</button>

                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
    </>
  );
};

export default Table;
