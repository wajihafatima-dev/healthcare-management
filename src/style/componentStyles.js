// /style/componentStyles.js
export const componentStyles = {
  // ---------------------------
  // AUTH LAYOUT STYLE
  // ---------------------------
  AuthLayoutStyle: {
    mainBoxStyle: (bgImage) => ({
      backgroundImage: `url(${bgImage.src || bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
    }),

    innerBoxStyle: {
      width: "100%",
      maxWidth: "480px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "16px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      backdropFilter: "blur(10px)",
    },
  },

  // ---------------------------
  // SIDEBAR STYLE
  // ---------------------------
  SidebarStyle: {
    drawer: {
      width: 240,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: 240,
        boxSizing: "border-box",
        backgroundColor: "#0F172A",
        color: "#fff",
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontWeight: "bold",
      fontSize: "1rem",
      backgroundColor: "#616d798f",
      letterSpacing: "0.5px",
    },
    navItem: {
      padding: "0.4rem 0.5rem",
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      borderRadius: "8px",
      transition: "background 0.3s ease",
      "&:hover": {
        backgroundColor: "#616d798f",
      },
    },
  },

  // ---------------------------
  // DASHBOARD LAYOUT STYLE
  // ---------------------------
  DashboardLayoutStyle: {
    mainWrapper: {
      display: "flex",
      // minHeight: "100vh",
      width: "100%",
      // overflow: "hidden",
    },
    pageWrapper: {
      display: "flex",
      flexGrow: 1,
      zIndex: 1,
      overflow: "hidden",
      backgroundColor: "#F5F6FA",
      paddingTop: "70px",
    },
    childrenStyle: (pathname, bgLogo) => ({
      p: 2,
      flexGrow: 1,
      overflowY: "auto",
      backgroundSize: "80%",
      height: "calc(100vh - 70px)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      ...(pathname !== "/dashboard" && { backgroundImage: `url(${bgLogo})` }),
    }),
  },

  // ---------------------------
  // DASHBOARD SCREEN COMPONENT STYLE
  // ---------------------------
  DashboardScreenStyle: {
    mainBoxStyle: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imageStyle: {
      mx: "auto",
      maxWidth: "298px",
      width: { xs: "50%", lg: "100%" },
    },
    textStyle: {
      fontWeight: 400,
      fontSize: "clamp(22px, 6.5vw, 44px)",
      color: "#000000",
    },
    logoImageStyle: {
      mx: "auto",
      maxWidth: "521px",
      width: { xs: "60%", md: "75%", lg: "100%" },
    },
  },
};
