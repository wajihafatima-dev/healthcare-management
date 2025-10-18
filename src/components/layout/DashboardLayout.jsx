"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { componentStyles } from "@/style/componentStyles";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import bgLogo from "../../../public/file.svg";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { DashboardLayoutStyle } = componentStyles || {};
  const { mainWrapper, pageWrapper, childrenStyle } =
    DashboardLayoutStyle || {};
  const MotionBox = motion(Box);

  return (
    <Box sx={mainWrapper}>
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <Box sx={pageWrapper}>
        <Navbar openMobileSidebar={setMobileSidebarOpen} />
        <MotionBox
          sx={childrenStyle(pathname, bgLogo)}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </MotionBox>
      </Box>
    </Box>
  );
}
