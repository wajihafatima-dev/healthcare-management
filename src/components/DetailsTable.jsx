"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Avatar,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import AppointmentDialog from "./AppointmentDialog";
import { APPOINTMENT_FORM_FIELDS, APPOINTMENT_INITIAL_STATE, DYNAMIC_PATIENT_LIST } from "@/constant/AppointmentConstent";
// 1. New Component Import

const statusColors = {
  scheduled: { bg: "#E0E7FF", color: "#4338CA" },
  completed: { bg: "#DCFCE7", color: "#15803D" },
  cancelled: { bg: "#FEE2E2", color: "#B91C1C" },
  upcoming: { bg: "#DBEAFE", color: "#1D4ED8" },
};

const DetailsTable = ({
  title,
  btnText,
  data = [],
  totalAppointments = 0,
  onView,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDialogOpen = () => {
    setEditData(null); // Ensure data is clear for ADD mode
    setOpenDialog(true);
  };
  
  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditData(null); // Clear edit data on close
  };

  // Logic to handle edit action from menu
  const handleEditAction = (id) => {
      const itemToEdit = data.find(item => item._id === id);
      setEditData(itemToEdit);
      setOpenDialog(true); // Open the dialog with pre-filled data
      handleMenuClose();
  }

  // Handle data submission from the dialog (for both ADD and EDIT)
  const handleDialogSubmit = (formData, isEdit) => {
      if (isEdit) {
          onEdit?.(formData); // Assume onEdit handles the update logic
      } else {
          onAdd?.(formData); // Assume onAdd handles the creation logic
      }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
          <Chip
            label={totalAppointments}
            sx={{
              ml: 1,
              backgroundColor: "#203055ff",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#203055ff",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 2,
            px: 2.5,
            py: 1,
            "&:hover": { backgroundColor: "#16213bff" },
          }}
          onClick={handleDialogOpen} // Open in ADD mode
        >
          {btnText}
        </Button>
      </Box>

      {/* Table (The rest of the table logic remains the same) */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              {[
                "Appointment ID",
                "Patient Name",
                "Doctor Name",
                "Department",
                "Date & Time",
                "Status",
                "Actions",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <motion.tr
                  key={row._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell>{row._id || "N/A"}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Avatar src={row.patient?.image || ""} alt={row.patient?.name || "Patient"} />
                      <Typography fontWeight={500}>
                        {row.patient?.name || "N/A"}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: "#2563EB",
                        fontWeight: 500,
                        cursor: "pointer",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      component="a"
                      href={row.doctorProfile || "#"}
                    >
                      {row.doctorName || "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.department || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(row.date).toLocaleDateString()} {row.time || ""}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status || "Unknown"}
                      sx={{
                        backgroundColor:
                          statusColors[row.status?.toLowerCase()]?.bg ||
                          "#E5E7EB",
                        color:
                          statusColors[row.status?.toLowerCase()]?.color ||
                          "#111827",
                        fontWeight: 500,
                        px: 1,
                        borderRadius: "8px",
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuOpen(e, row._id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No appointments found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            onView?.(selectedId);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View Details" />
        </MenuItem>

        <MenuItem
          onClick={() => handleEditAction(selectedId)} // Call the new edit handler
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete?.(selectedId);
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* 2. Separated Dialog Component */}
<AppointmentDialog
    open={openDialog}
    onClose={handleDialogClose}
    onSubmit={handleDialogSubmit}
    initialData={editData} 
    initialFormState={APPOINTMENT_INITIAL_STATE}
    patientList={DYNAMIC_PATIENT_LIST}
    formFields={APPOINTMENT_FORM_FIELDS} // <-- The new dynamic fields constant
/>
    </Box>
  );
};

export default DetailsTable;