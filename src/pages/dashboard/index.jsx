"use client";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import StaffDashboard from "@/components/dashboard/StaffDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" mb={2}>
            Welcome, {user?.name} 👋
          </Typography>
          {user?.role === "admin" && <AdminDashboard />}
          {user?.role === "staff" && <StaffDashboard />}
        </Box>
  );
}
