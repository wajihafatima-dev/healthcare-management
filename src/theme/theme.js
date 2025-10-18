import { createTheme, responsiveFontSizes } from "@mui/material";
import { componentStyles } from "../style/componentStyles";

// Base color palette (healthcare + modern UI)
const colors = {
  primaryBlue: "#203055ff",
  lightBlueGradient: "linear-gradient(180deg, #16213bff 0%, #BBDEFB 100%)",
  lightBlue: "#8fc8daff",
  darkBlue: "#16213bff",
  successGreen: "#22C55E",
  warningYellow: "#FBBF24",
  coolBlue: "#3B82F6",
  neutralGray: "#ECEFF1",
  lightGray: "#757d81ff",
  hoverGray:"#616d798f",
  white: "#FFFFFF",
  backgroundLight: "#F9FAFB",
};

let theme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 768, md: 1024, lg: 1440, xl: 1920 },
  },

  palette: {
    primary: {
      main: colors.primaryBlue,
      light: colors.lightBlue,
      dark: colors.darkBlue,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.successGreen,
      contrastText: colors.white,
    },
    error: { main: colors.errorRed },
    warning: { main: colors.warningYellow },
    success: { main: colors.successGreen },
    background: {
      default: colors.backgroundLight,
      paper: colors.white,
    },
    text: {
      primary: colors.darkGray,
      secondary: "#546E7A",
    },
  },

  typography: {
    fontFamily: ["Poppins", "Nunito Sans", "Gilroy", "sans-serif"].join(", "),
    h1: { fontSize: "46px", fontWeight: 700, color: colors.darkBlue },
    h2: { fontSize: "32px", fontWeight: 600, color: colors.darkGray },
    h3: { fontSize: "24px", fontWeight: 600 },
    h4: { fontSize: "20px", fontWeight: 500 },
    h5: { fontSize: "18px", fontWeight: 500 },
    body1: { fontSize: "16px", fontWeight: 400 },
    body2: { fontSize: "14px", fontWeight: 400, color: "#607D8B" },
    gradientText: {
      background: colors.primaryGradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": { boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)" },
        },
      },
      variants: [
        {
          props: { variant: "primary" },
          style: {
            background: colors.primaryGradient,
            color: colors.white,
            height: 48,
            "&:hover": { opacity: 0.9 },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            background: colors.white,
            color: colors.primaryBlue,
            border: `1px solid ${colors.primaryBlue}`,
            height: 48,
            "&:hover": {
              background: colors.lightBlue,
            },
          },
        },
        {
          props: { variant: "delete" },
          style: {
            background: colors.errorRed,
            color: colors.white,
            height: 44,
            "&:hover": { background: "#C62828" },
          },
        },
      ],
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 3px 15px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.primaryGradient,
          color: colors.white,
          boxShadow: "none",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "1px solid #E0E0E0",
          borderRadius: 8,
          padding: "0 12px",
          background: colors.white,
        },
        input: {
          height: "44px",
          "&::placeholder": { color: "#90A4AE" },
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: { paddingTop: "20px", paddingBottom: "20px" },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 3,
          backgroundColor: "#E0E0E0",
        },
        bar: {
          borderRadius: 3,
          background: colors.primaryGradient,
        },
      },
    },

    customComponents: {
      ...componentStyles,
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme };
