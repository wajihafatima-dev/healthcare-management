"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointmentById,
  updateAppointment,
} from "@/redux/appointments/appointmentsSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Grid,
} from "@mui/material";

const AppointmentDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [id, setId] = useState(null);
  const mode = searchParams.get("mode"); // 'view' or 'edit'

  const { current, loading, error } = useSelector(
    (state) => state.appointments
  );

  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    date: "",
    time: "",
    status: "",
    notes: "",
  });

  // ✅ Extract ID from URL (Next.js Pages Router safe)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParts = window.location.pathname.split("/");
      const appointmentId = urlParts[urlParts.length - 1];
      setId(appointmentId);
    }
  }, []);

  // ✅ Fetch appointment data
  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentById(id));
    }
  }, [dispatch, id]);

  // ✅ Populate form once data loads
  useEffect(() => {
    if (current) {
      setFormData({
        doctorName: current.doctorName || "",
        department: current.department || "",
        date: current.date?.slice(0, 10) || "",
        time: current.time || "",
        status: current.status || "",
        notes: current.notes || "",
      });
    }
  }, [current]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Update API call
  const handleUpdate = async () => {
    await dispatch(updateAppointment({ id, payload: formData }));
    router.push("/dashboard/appointments");
  };

  if (loading)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        {typeof error === "string" ? error : error.message}
      </Alert>
    );

  if (!current) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        {mode === "edit" ? "Edit Appointment" : "Appointment Details"}
      </Typography>

      {mode === "view" ? (
        // ✅ View Mode Card
        <Paper sx={{ p: 3, maxWidth: 600, borderRadius: 3, boxShadow: 3 }}>
          <Grid container spacing={2}>
            {[
              { label: "Doctor Name", value: current.doctorName },
              { label: "Department", value: current.department },
              {
                label: "Date",
                value: new Date(current.date).toLocaleDateString(),
              },
              { label: "Time", value: current.time },
              { label: "Status", value: current.status },
              { label: "Notes", value: current.notes },
            ].map((item) => (
              <Grid item xs={12} sm={6} key={item.label}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {item.label}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {item.value || "—"}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => router.push(`/dashboard/appointments/${id}?mode=edit`)}
          >
            Edit Appointment
          </Button>

          <Button
            variant="outlined"
            sx={{ mt: 3, ml: 2 }}
            onClick={() => router.push("/dashboard/appointments")}
          >
            Back to Appointments
          </Button>
        </Paper>
      ) : (
        // ✅ Edit Mode Form
        <Paper sx={{ p: 3, maxWidth: 600, borderRadius: 3, boxShadow: 3 }}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {["doctorName", "department", "date", "time", "status", "notes"].map(
              (field) => (
                <TextField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === "date" ? "date" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                />
              )
            )}
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleUpdate}>
                Save Changes
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => router.push(`/dashboard/appointments/${id}?mode=view`)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default AppointmentDetailPage;
