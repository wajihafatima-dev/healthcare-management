export const SIGNUP = {
  title: "Create an Account",
  description: "Join us and manage your appointments easily.",
  fields: [
    { label: "Full Name", type: "text", placeholder: "Enter your name", key: "name" },
    { label: "Email", type: "email", placeholder: "Enter your email", key: "email" },
    { label: "Password", type: "password", placeholder: "Enter your password", key: "password" },
  ],
  checkboxText: "I agree to the terms & conditions",
  buttonText: "Sign Up",
  haveAnAccountText: "Already have an account?",
  loginText: { text: "Login", link: "/auth/login" },
};
