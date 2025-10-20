"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { componentStyles } from "@/style/componentStyles";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import bgLogo from "../../../public/file.svg";
import { usePathname } from "next/navigation";
import ProtectedRoute from "../ProtectedRoute";

const USER_STORAGE_KEY = 'user'; 

export default function DashboardLayout({ children }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  
  const pathname = usePathname();
  const { DashboardLayoutStyle } = componentStyles || {};
  const { mainWrapper, pageWrapper, childrenStyle } =
    DashboardLayoutStyle || {};
  const MotionBox = motion(Box);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      
      if (storedUser) {
        try {
          const userObject = JSON.parse(storedUser);
          if (userObject && userObject.role) {
            setUserRole(userObject.role);
          } else {
            console.error("User object in localStorage is missing the 'role' property.");
          }
        } catch (e) {
          console.error("Could not parse user JSON from localStorage:", e);
        }
      }
    }
  }, []); 
  if (userRole === null) {
    return <Box>Loading...</Box>; 
  }
  const allowedRoles = ["admin", "staff"];
  return (
    <ProtectedRoute allowedRoles={allowedRoles} userRole={userRole}>
      <Box sx={mainWrapper}>
        <Sidebar
          userRole={userRole} 
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
    </ProtectedRoute>
  );
}