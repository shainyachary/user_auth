import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const registerUser = async (formData) =>
  axios.post(`${API_URL}/register`, formData);
export const loginUser = async (credentials) =>
  axios.post(`${API_URL}/login`, credentials);
export const forgotPassword = async (email) =>
  axios.post(`${API_URL}/forgot-password`, email);
export const resetPassword = async (token, password) =>
  axios.post(`${API_URL}/reset-password/${token}`, password);
export const getDashboard = async (token) =>
  axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
