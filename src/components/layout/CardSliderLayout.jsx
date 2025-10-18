"use client";
import React from "react";
import { Typography, Box } from "@mui/material";
import CardSlider from "../CardSlider";
const CardSliderLayout = ({ data = {}, children }) => {
  const { title, cardData = [], styles = {} } = data;

  return (
    <Box sx={styles.mainBox}>
      <Box sx={styles.mainCard}>
        {title && (
          <Typography variant="h6" fontWeight="bold" sx={styles.title}>
            {title}
          </Typography>
        )}
        {cardData.length > 0 ? (
          <CardSlider styles={styles} cardData={cardData} />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};

export default CardSliderLayout;
