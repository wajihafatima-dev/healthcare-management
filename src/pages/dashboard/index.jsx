"use client";
import React from "react";
import { Box } from "@mui/material";
import CardSliderLayout from "@/components/layout/CardSliderLayout";
import { CARD_SLIDER_DATA } from "@/constant/DashboardConstent";
import PatientAnalyticsChart from "@/components/PatientAnalyticsChart";

const patientData = [
  { month: "Jan", patients: 20, appointments: 15 },
  { month: "Feb", patients: 25, appointments: 18 },
  { month: "Mar", patients: 30, appointments: 22 },
  { month: "Apr", patients: 28, appointments: 20 },
  { month: "May", patients: 35, appointments: 25 },
  { month: "Jun", patients: 40, appointments: 30 },
];
const DashboardPage = () => {
  return (
    <Box
      sx={{
        mt: { xs: "0px", md: "20px" },
        ml: { xs: "0px", md: "20px" },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 5, sm: 3, lg: 3 },
      }}
    >
      <CardSliderLayout data={CARD_SLIDER_DATA} />
      <PatientAnalyticsChart />
    </Box>
  );
};

export default DashboardPage;
