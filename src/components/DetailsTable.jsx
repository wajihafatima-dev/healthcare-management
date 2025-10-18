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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem as SelectMenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

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

  const [formData, setFormData] = useState({
    doctorName: "",
    department: "",
    date: "",
    time: "",
    status: "scheduled",
    notes: "",
  });

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      doctorName: "",
      department: "",
      date: "",
      time: "",
      status: "scheduled",
      notes: "",
    });
  };

    const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (
      !formData.doctorName ||
      !formData.department ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill all required fields.");
      return;
    }
    onAdd?.(formData);
    handleDialogClose();
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
          onClick={handleDialogOpen}
        >
          {btnText}
        </Button>
      </Box>

      {/* Table */}
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
                      <Avatar
                        src={row.patient?.image || ""}
                        alt={row.patient?.name || "Patient"}
                      />
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
          onClick={() => {
            onEdit?.(selectedId);
            handleMenuClose();
          }}
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

      {/* Add Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Appointment</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label="Doctor Name"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleFormChange}
            fullWidth
            required
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleFormChange}
            fullWidth
            required
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleFormChange}
            fullWidth
          >
            <SelectMenuItem value="scheduled">Scheduled</SelectMenuItem>
            <SelectMenuItem value="completed">Completed</SelectMenuItem>
            <SelectMenuItem value="cancelled">Cancelled</SelectMenuItem>
            <SelectMenuItem value="upcoming">Upcoming</SelectMenuItem>
          </TextField>
          <TextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleFormChange}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#203055ff",
              "&:hover": { backgroundColor: "#16213bff" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailsTable;
