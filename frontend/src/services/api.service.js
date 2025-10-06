import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_PORT || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const resumeService = {
  async processJobDescription(description) {
    const response = await api.post('/api/process', { data: description });
    return response.data;
  },

  async generateResume(resumeText) {
    const response = await api.post('/api/generate-resume', { resumeText });
    return response.data;
  },

  async enhanceResume(resume) {
    const response = await api.post('/api/enhance-resume', { resume });
    return response.data;
  },

  async generateInterviewQuestions() {
    const response = await api.post('/api/generate-questions');
    return response.data;
  },

  async getAiResume() {
    const response = await api.get('/api/ai-resume');
    return response.data;
  },

  async getInterviewQuestions() {
    const response = await api.get('/api/interview-questions');
    return response.data;
  }
};

export default api;
