// src/services/auth.service.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/auth';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const auth = {
  login: async (username, password) => {
    try {
      if (!username || !password) {
        throw { error: "Username and password are required" };
      }
      
      const response = await axiosInstance.post('/login', {
        username,
        password
      });
      
      const { accessToken } = response.data;
      
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      } else {
        throw { error: "No access token received" };
      }
      
      return response.data;
      
    } catch (error) {
      console.error('Login error details:', error.response || error);
      
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data.message || error.response.data.error || "Login failed";
        throw { error: errorMessage };
      } else if (error.request) {
        // No response received
        throw { error: "Server tidak merespons. Periksa koneksi Anda." };
      } else if (error.error) {
        // Custom error
        throw error;
      } else {
        // Other errors
        throw { error: "Terjadi kesalahan saat login" };
      }
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        await axiosInstance.post('/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      // Clear all auth related data
      localStorage.removeItem('token');
      
      return { message: "Logout berhasil" };
    } catch (error) {
      console.error('Logout error details:', error.response || error);
      
      throw error.response?.data?.message || error.message || "Terjadi kesalahan saat logout";
    }
  },

  // Helper method to check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default auth;