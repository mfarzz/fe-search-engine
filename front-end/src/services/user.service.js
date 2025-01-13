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

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const user_controller = {
    listLinks: async (page = 1, limit = 10) => {
        try {
            const response = await axiosInstance.get(`/list-link?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error listing links:', error.response || error);
            throw error;
        }
    },
    addLinks: async (formData) => {
        try {
            const response = await axiosInstance.post('/add-link', formData, {
                headers: {
                  // Remove Content-Type header - axios will set it automatically with boundary
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
              });
            return response.data;
        } catch (error) {
            console.error('Error adding link:', error.response?.data || error.message);
            throw error;
        }
    },
    getKueri: async (query) => {
        try {
          const response = await axiosInstance.post('/get-kueri', { query });
          return response.data;
        } catch (error) {
          console.error('Error in getKueri:', error.response?.data || error.message);
          throw error;
        }
      },
    
      cariLink: async (queryId) => {
        try {
          const response = await axiosInstance.get(`/search?q=${queryId}`);
          return response.data;
        } catch (error) {
          console.error('Error in cariLink:', error.response?.data || error.message);
          throw error;
        }
      },
    
      klikLink: async (linkId) => {
        try {
          const response = await axiosInstance.post('/click-link', { linkId });
          return response.data;
        } catch (error) {
          console.error('Error in klikLink:', error.response?.data || error.message);
          throw error;
        }
      }


}

export default user_controller;