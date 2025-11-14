import axios from "axios";

// ================================
// 🔥 BASE API INSTANCE
// ================================
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// ================================
// 🔥 JWT AUTO-ATTACH INTERCEPTOR
// ================================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================================
// 🔥 AUTH APIs
// ================================

// Register user
export const registerUser = (data) => api.post("/users/register", data);

// Login user
export const loginUser = (data) => api.post("/auth/login", data);

// Get current logged-in user (if needed)
export const getMe = () => api.get("/auth/me");

// ================================
// 🔥 PROFILE APIs
// ================================
export const updateProfile = (userId, data) =>
  api.put(`/users/${userId}`, data);

export const getUserProfile = (userId) =>
  api.get(`/users/${userId}`);


// ================================
// 🔥 ROADMAP APIs
// ================================
export const getAllRoadmaps = () => api.get("/roadmaps/");
export const getSingleRoadmap = (id) => api.get(`/roadmaps/${id}/`);


// Export default instance
export default api;
