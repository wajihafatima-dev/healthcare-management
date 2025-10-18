"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar({ openMobileSidebar }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: "#0e1424ff", // elegant dark color
        color: "#fff",
        width: { md: `calc(100% - 240px)` }, // leave space for sidebar on desktop
        ml: { md: "240px" },
      }}
    >
      <Toolbar>
        {/* Hamburger menu for mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => openMobileSidebar(true)}
          sx={{ display: { md: "none" }, mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page title / brand */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
         Health Care Management
        </Typography>

        <IconButton color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Box>
          <IconButton onClick={handleProfileMenu} sx={{ p: 0 }}>
            <Avatar alt="User" src="/images/avatar.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
