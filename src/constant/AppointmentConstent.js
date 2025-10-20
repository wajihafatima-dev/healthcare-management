export const APPOINTMENT_INITIAL_STATE = {
  patient: "", // Mongoose reference ID
  doctorName: "",
  department: "",
  date: "",
  time: "",
  status: "scheduled",
  notes: "",
};

 export const APPOINTMENT_FORM_FIELDS = [
  // Patient Field (Requires special handling with patientList prop)
  {
    name: "patient",
    label: "Patient Name",
    type: "select", 
    required: true,
    placeholder: "Select Patient",
    // options are derived from patientList prop
  },
  
  // Standard Text Fields
  { name: "doctorName", label: "Doctor Name", type: "text", required: true },
  { name: "department", label: "Department", type: "text", required: true },
  
  // Date/Time Fields
  { name: "date", label: "Date", type: "date", required: true },
  { name: "time", label: "Time", type: "time", required: true },
  
  // Status Select Field (Generic select logic used)
  {
    name: "status",
    label: "Status",
    type: "select",
    required: false,
    options: [
      { value: "scheduled", label: "Scheduled" },
      { value: "completed", label: "Completed" },
      { value: "cancelled", label: "Cancelled" },
    ],
  },
  
  // Multiline Text Field
  { name: "notes", label: "Notes", type: "text", multiline: true, rows: 3, required: false },
];

export const DYNAMIC_PATIENT_LIST = [
    { id: "60c72b2f90d19e00155b4e7a", name: "Alice Johnson" },
    { id: "60c72b2f90d19e00155b4e7b", name: "Bob Smith" },
]