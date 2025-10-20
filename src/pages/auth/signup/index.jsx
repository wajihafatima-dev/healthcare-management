"use client";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSignup } from "@/hooks/useAuth";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const { mutate } = useSignup();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    mutate(form);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Sign Up
      </Typography>

      <Stack spacing={2}>
        <TextField name="name" label="Full Name" fullWidth onChange={handleChange} />
        <TextField name="email" label="Email" type="email" fullWidth onChange={handleChange} />
        <TextField name="password" label="Password" type="password" fullWidth onChange={handleChange} />

        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </Stack>
    </Box>
  );
}
