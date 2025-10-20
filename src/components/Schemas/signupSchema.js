import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .lowercase()
    .required("Email is required"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/,
      "Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces"
    ),
});