import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy"

export const CARD_SLIDER_DATA = {
  cardData : [
  { title: "Patients", value: 124, icon: <PeopleIcon fontSize="large" />,  },
  { title: "Doctors", value: 32, icon: <LocalHospitalIcon fontSize="large" />, },
  { title: "Appointments", value: 48, icon: <EventAvailableIcon fontSize="large" />,},
  { title: "Pharmacy Orders", value: 22, icon: <LocalPharmacyIcon fontSize="large" />, },
],
  styles: {
    mainBox: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection:"column"
    },
    mainCard: {
      width: "100%",
      borderRadius: 4,
      boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
    cardStyle: {
      mx: "auto",
      px: 2,
      py: 3,
      height: "8vh",
      borderRadius: 2,
      cursor: "pointer",
    },
    cardTitleStyle: { fontSize: "16px", fontWeight: 600, color: "#000" },
    title: {
      pl: 3,
      py: 2,
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
      },
    },
  },
};