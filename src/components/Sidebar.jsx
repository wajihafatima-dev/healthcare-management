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
import CloseIcon from "@mui/icons-material/Close";
import { usePathname, useRouter } from "next/navigation";
import { componentStyles } from "../style/componentStyles";
import { SIDEBAR } from "@/constant/SidebarConstent";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const isVisible = (item, userRole) => {
  if (!item.roles || item.roles.length === 0) {
    return true;
  }
  return item.roles.includes(userRole);
};

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, userRole }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openCollapse, setOpenCollapse] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavigate = (link) => {
    router.push(link);
    if (isMobile && onSidebarClose) onSidebarClose(false);
  };

  const toggleCollapse = (text) => {
    setOpenCollapse((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const filteredSidebar = SIDEBAR.map((section) => {
    const filteredItems = section.items
      .map((item) => {
        if (item.type === "link") {
          return isVisible(item, userRole) ? item : null;
        }

        if (item.type === "collapse" && item.children) {
          const filteredChildren = item.children.filter((child) =>
            isVisible(child, userRole)
          );
          if (filteredChildren.length > 0) {
            return {
              ...item,
              children: filteredChildren,
            };
          }
        }
        return null;
      })
      .filter(Boolean); 
    if (filteredItems.length > 0) {
      return {
        ...section,
        items: filteredItems,
      };
    }
    return null;
  }).filter(Boolean); 

  return (
    <>
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
          <Typography
            variant="subtitle2"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            HealthCare Management
          </Typography>
          {isMobile && (
            <IconButton onClick={() => onSidebarClose(false)} color="inherit">
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          )}
        </Toolbar>
        <Divider />
        <Box sx={{ px: 2 }}>
          <List>
            {filteredSidebar.map((section) => (
              <Box key={section.title}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#888", px: 2, py: 0.6, fontWeight: "bold" }}
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
                            pathname === item.link
                              ? "#616d798f"
                              : "transparent",
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
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;