// src/redux/appointments/appointmentsApi.js
import axios from "axios";

const BASE_URL = "https://healthcare-backend-six.vercel.app/api/appointments";

// 🔹 Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// 🔹 Add interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 API functions
export const getAllAppointments = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getAppointmentById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createAppointmentApi = async (payload) => {
  const response = await api.post("/", payload);
  return response.data;
};

export const updateAppointmentApi = async ({ id, payload }) => {
  const response = await api.put(`/${id}`, payload);
  return response.data;
};

export const deleteAppointmentApi = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
