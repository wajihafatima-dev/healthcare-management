"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsTable from "@/components/DetailsTable";
import {
  fetchAppointments,
  deleteAppointment,
  createAppointment,
  fetchAppointmentById,
  updateAppointment,
} from "@/redux/appointments/appointmentsSlice";
import { Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { list, loading, error } = useSelector((state) => state.appointments);
  // const [formData, setFormData] = useState({
  //   patientId: "",
  //   doctorName: "",
  //   department: "",
  //   date: "",
  //   time: "",
  //   status: "scheduled",
  //   notes: "",
  // });
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleAdd = (newAppointmentData) => {
    dispatch(createAppointment(newAppointmentData));
    router.push("/dashboard/appointments"); 
  };
  const handleDelete = (id) => {
    if (confirm("Delete this appointment?")) {
      dispatch(deleteAppointment(id));
    }
  };
  const handleView = (id) => {
    router.push(`/dashboard/appointments/${id}?mode=view`);
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/appointments/${id}?mode=edit`);
  };

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">
          {error.message || "Something went wrong"}{" "}
        </Alert>
      ) : (
        <DetailsTable
          title="Appointments"
          btnText="Add Appointment"
          data={list}
          totalAppointments={list?.length || 0}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default AppointmentsPage;
