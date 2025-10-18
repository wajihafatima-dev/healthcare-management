import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slices/dataSlice";
import { Typography, CircularProgress, Paper, Box } from "@mui/material";

export default function Appointments() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData("appointments"));
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        items.map((item) => (
          <Paper key={item._id} sx={{ p: 2, mb: 2 }}>
            <Typography>Patient: {item.patientName}</Typography>
            <Typography>Doctor: {item.doctorName}</Typography>
            <Typography>Date: {item.appointmentDate}</Typography>
            <Typography>Status: {item.status}</Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}
