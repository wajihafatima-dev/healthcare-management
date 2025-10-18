import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/appointments";

// ✅ Get all appointments
export const getAllAppointments = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

// ✅ Get single appointment by ID
export const getAppointmentById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ✅ Create new appointment
export const createAppointmentApi = async (payload) => {
  const res = await axios.post(API_BASE_URL, payload);
  return res.data;
};

// ✅ Update appointment
export const updateAppointmentApi = async ({ id, payload }) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, payload);
  return res.data;
};

// ✅ Delete appointment
export const deleteAppointmentApi = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};
