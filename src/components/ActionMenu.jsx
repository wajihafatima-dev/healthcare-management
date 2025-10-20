"use client";
import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const ActionMenu = ({
  anchorEl,
  handleClose,
  menuItems = [],
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            item.onClick?.();
            handleClose();
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ActionMenu;
