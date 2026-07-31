import axios from 'axios';

// The base URL is dynamically pulled from the Vite environment variables
// If it's not set, it defaults to the local backend port 3001
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  // Script Runner
  runScript: async (code) => {
    const response = await apiClient.post('/run-script', { code });
    return response.data;
  },

  // AI Chat
  sendChatMessage: async (message, chatHistory, code, errorLogs) => {
    const response = await apiClient.post('/chat', { message, chatHistory, code, errorLogs });
    return response.data;
  },

  // PheTK Pipeline
  uploadPheTKFiles: async (phenoFile, cohortFile) => {
    const formData = new FormData();
    formData.append('phenoFile', phenoFile);
    formData.append('cohortFile', cohortFile);
    
    // We use a separate axios instance or override headers for FormData
    const response = await axios.post(`${API_URL}/phetk/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  runPheTKStep: async (step, args) => {
    const response = await apiClient.post('/phetk/run', { step, args });
    return response.data;
  }
};

// Also export the base URL so components can build image URLs dynamically
export const getBaseUrl = () => {
    // If the API_URL ends with /api, remove it to get the server root
    return API_URL.replace('/api', '');
};
