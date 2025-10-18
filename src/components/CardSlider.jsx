"use client";
import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";

const backgroundColors = [
  "#c6c9e7ec",
  "#b4d4bbff",
  "#d8c1a4ff",
  "#d4c4dbff",
  "#c6c9e7ec",
  "#b4d4bbff",
  "#d8c1a4ff",
  "#d4c4dbff",
];

const defaultBreakpoints = {
  600: { slidesPerView: 2 },
  768: { slidesPerView: 2 },
  900: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 4 },
};

const CardSlider = ({
  cardData = [],
  breakpoints = defaultBreakpoints,
  styles = {},
}) => {
  return (
    <Box sx={{ py: 2, px: 3 }}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={breakpoints}
      >
        {cardData.map((item, index) => (
          <SwiperSlide key={index}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              href={item?.link || "#"}
            >
              <Box
                sx={{
                  backgroundColor:
                    backgroundColors[index % backgroundColors.length],
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s ease-in-out",
                  ...styles.cardStyle,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#ffffff1a",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#203055ff", fontWeight: 500 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "#fff" }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CardSlider;
