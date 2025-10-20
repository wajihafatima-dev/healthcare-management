"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem as SelectMenuItem,
  Box,
} from "@mui/material";

/**
 * Reusable dialog component for adding or editing any form.
 *
 * @param {boolean} open - Controls the dialog visibility.
 * @param {function} onClose - Function to close the dialog.
 * @param {function} onSubmit - Function to handle form submission (receives formData and isEdit flag).
 * @param {object} initialData - Data to pre-fill the form (for edit mode).
 * @param {object} initialFormState - The initial structure of the form state.
 * @param {Array<object>} patientList - Array of patient objects (for the patient select field).
 * @param {Array<object>} formFields - Array of field definitions to render the form dynamically.
 */
const AppointmentDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
  initialFormState,
  patientList = [],
  formFields = [], // <-- New prop for dynamic fields
}) => {
  const [formData, setFormData] = useState(initialFormState);
  const isEdit = Boolean(initialData && initialData._id);

  // --- useEffect to sync state for ADD/EDIT mode ---
  useEffect(() => {
    if (open) {
      if (initialData && initialData._id) {
        // EDIT mode: Initialize with initialData, mapping complex fields
        const mappedData = formFields.reduce((acc, field) => {
          let value = initialData[field.name] || initialFormState[field.name];

          // Special mapping for 'patient' object to extract ID
          if (field.name === "patient" && typeof value === 'object' && value !== null) {
              value = value._id || "";
          }
          // Special handling for date formatting
          if (field.type === "date" && value) {
            value = new Date(value).toISOString().substring(0, 10);
          }
          
          acc[field.name] = value;
          return acc;
        }, {});

        setFormData(mappedData);
      } else {
        // ADD mode: Reset to the clean initial state
        setFormData(initialFormState);
      }
    }
  }, [open, initialData, initialFormState, formFields]);

  // --- Handlers ---
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    // Dynamic validation: Check if all required fields are present and not empty
    const requiredFields = formFields.filter(f => f.required).map(f => f.name);
    
    const missingFields = requiredFields.filter(name => !formData[name]);
    
    if (missingFields.length > 0) {
      // You can make this error message more sophisticated if needed
      alert("Please fill all required fields.");
      return;
    }

    onSubmit(formData, isEdit);
    onClose();
  };

  const dialogTitle = isEdit ? "Edit Appointment" : "Add New Appointment";
  const submitButtonText = isEdit ? "Save Changes" : "Save";

  const renderField = (field) => {
    const value = formData[field.name] || "";

    // Special case for the PATIENT dropdown
    if (field.name === "patient" && field.type === "select") {
      return (
        <TextField
          key={field.name}
          select
          label={field.label}
          name={field.name}
          value={value}
          onChange={handleFormChange}
          fullWidth
          required={field.required}
        >
          <SelectMenuItem value="">
            <em>{field.placeholder || `Select ${field.label}`}</em>
          </SelectMenuItem>
          {patientList.map((patient) => (
            <SelectMenuItem key={patient.id} value={patient.id}>
              {patient.name}
            </SelectMenuItem>
          ))}
        </TextField>
      );
    }
    
    // Special case for general SELECT dropdowns (like Status)
    if (field.type === "select") {
        return (
            <TextField
                key={field.name}
                select
                label={field.label}
                name={field.name}
                value={value}
                onChange={handleFormChange}
                fullWidth
                required={field.required}
            >
                {field.options.map((option) => (
                    <SelectMenuItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectMenuItem>
                ))}
            </TextField>
        );
    }

    // Default case for standard TextField (text, number, date, time, multiline/notes)
    return (
      <TextField
        key={field.name}
        label={field.label}
        name={field.name}
        type={field.type || "text"}
        value={value}
        onChange={handleFormChange}
        fullWidth
        required={field.required}
        multiline={field.multiline}
        rows={field.rows}
        InputLabelProps={field.type === "date" || field.type === "time" ? { shrink: true } : {}}
      />
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        {/* Dynamic rendering of all fields */}
        {formFields.map(renderField)}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#203055ff",
            "&:hover": { backgroundColor: "#16213bff" },
          }}
        >
          {submitButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDialog;