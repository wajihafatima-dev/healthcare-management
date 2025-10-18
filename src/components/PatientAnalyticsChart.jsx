"use client";
import React from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Example data
const patientData = [
  { month: "Jan", patients: 20, appointments: 15, admissions: 5 },
  { month: "Feb", patients: 25, appointments: 18, admissions: 8 },
  { month: "Mar", patients: 30, appointments: 22, admissions: 10 },
  { month: "Apr", patients: 28, appointments: 20, admissions: 12 },
  { month: "May", patients: 35, appointments: 25, admissions: 15 },
  { month: "Jun", patients: 40, appointments: 30, admissions: 18 },
];

const PatientAnalyticsChart = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm")); // true for sm and xs screens

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: "auto" },
        mt: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold",}}
      >
        Patient Analytics
      </Typography>
      <Paper
        sx={{
          p: {xs:0,sm:2,md:3},
          height: isSm ? 250 : 350, 
          backgroundColor: "#1F2937",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={patientData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#374151" strokeDasharray="5 5" />
            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              tick={{ fontSize: isSm ? 10 : 12, fontWeight: 500 }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fontSize: isSm ? 10 : 12, fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#293550",
                borderRadius: 5,
                border: "1px solid #374151",
                color: "#F9FAFB",
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ color: "#E5E7EB", fontSize: isSm ? 12 : 14 }}
            />
            <Line
              type="monotone"
              dataKey="patients"
              name="New Patients"
              stroke="#22C55E"
              strokeWidth={2}
              dot={{ r: isSm ? 2 : 4, fill: "#22C55E" }}
            />
            <Line
              type="monotone"
              dataKey="appointments"
              name="Appointments"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: isSm ? 2 : 4, fill: "#3B82F6" }}
            />
            <Line
              type="monotone"
              dataKey="admissions"
              name="Admissions"
              stroke="#FBBF24"
              strokeWidth={2}
              dot={{ r: isSm ? 2 : 4, fill: "#FBBF24" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default PatientAnalyticsChart;
