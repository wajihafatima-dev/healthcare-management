"use client";
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Collapse,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // <-- added
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname, useRouter } from "next/navigation";
import { componentStyles } from "../style/componentStyles";
import { SIDEBAR } from "@/constant/SidebarConstent";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openCollapse, setOpenCollapse] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // true if mobile

  const handleNavigate = (link) => {
    router.push(link);
    if (isMobile && onSidebarClose) onSidebarClose(false); // close drawer on mobile
  };

  const toggleCollapse = (text) => {
    setOpenCollapse((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  return (
    <>
      {isMobile && (
        <Box sx={{ p: 1 }}>
          <IconButton onClick={() => onSidebarClose(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? isMobileSidebarOpen : true}
        onClose={() => onSidebarClose(false)}
        sx={componentStyles.SidebarStyle.drawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar sx={componentStyles.SidebarStyle.toolbar}>
          <Typography variant="body1" sx={{ color: "#fff" }}>
            My Dashboard
          </Typography>
          {isMobile && (
            <IconButton onClick={() => onSidebarClose(false)} color="inherit">
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          )}
        </Toolbar>
        <Divider />
        <List>
          {SIDEBAR.map((section) => (
            <Box key={section.title}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#888", px: 2, fontWeight: "bold" }}
              >
                {section.title}
              </Typography>

              {section.items.map((item) => (
                <React.Fragment key={item.text}>
                  {item.type === "link" && (
                    <ListItem
                      button
                      onClick={() => handleNavigate(item.link)}
                      sx={{
                        ...componentStyles.SidebarStyle.navItem,
                        backgroundColor:
                          pathname === item.link ? "#616d798f" : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <ListItemIcon sx={{ color: "#fff" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  )}

                  {item.type === "collapse" && (
                    <>
                      <ListItem
                        button
                        onClick={() => toggleCollapse(item.text)}
                        sx={componentStyles.SidebarStyle.navItem}
                      >
                        <ListItemIcon sx={{ color: "#fff" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        {openCollapse[item.text] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItem>

                      <Collapse
                        in={openCollapse[item.text]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.children.map((child) => (
                            <ListItem
                              key={child.text}
                              button
                              onClick={() => handleNavigate(child.link)}
                              sx={{
                                pl: 4,
                                backgroundColor:
                                  pathname === child.link
                                    ? "#616d798f"
                                    : "transparent",
                                cursor: "pointer",
                              }}
                            >
                              <ListItemText primary={child.text} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  )}
                </React.Fragment>
              ))}
            </Box>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
