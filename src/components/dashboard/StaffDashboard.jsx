"use client"
import { Box,  } from "@mui/material";
import CardSliderLayout from "../layout/CardSliderLayout";
import PatientAnalyticsChart from "../PatientAnalyticsChart";
import { CARD_SLIDER_DATA } from "@/constant/DashboardConstent";

export default function StaffDashboard() {
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
}
