import axios from "axios";

const API_URL = "http://localhost:4000/dashboard";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    withCredentials: true
});

const admin_controller = {
    listUsers: async (page = 1, limit = 10) => {
        try {
            const response = await axiosInstance.get(`/list-user?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error listing users:', error.response || error);
            throw error;
        }
    },
    addUser: async (data) => {
        try {
            const response = await axiosInstance.post('/add-user', data);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error.response?.data || error.message);
            throw error;
        }
    },
    gantiPassword: async (data) => {
        try {
            const response = await axiosInstance.put('/change-password/:userId', data);
            return response.data;
        } catch (error) {
            console.error("Error editing user:", error.response?.data || error.message)
        }
    }
};

export default admin_controller;
