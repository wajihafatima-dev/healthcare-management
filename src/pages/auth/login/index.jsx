"use client";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate } = useLogin();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return alert("Please enter all fields");
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
        Login
      </Typography>

      <Stack spacing={2}>
        <TextField
          name="email"
          label="Email"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Stack>
    </Box>
  );
}
