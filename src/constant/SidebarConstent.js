// constants/sidebar.js
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import ScienceIcon from "@mui/icons-material/Science";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const SIDEBAR = [
  {
    title: "MAIN",
    items: [
      {
        type: "link",
        text: "Dashboard",
        link: "/dashboard",
        icon: <DashboardIcon />,
        roles: ["admin", "staff"],
      },
    ],
  },
  {
    title: "HEALTHCARE",
    items: [
      {
        type: "link",
        text: "Patients",
        link: "/dashboard/patients",
        icon: <PeopleIcon />,
        roles: ["admin", "staff"],
      },
      {
        type: "link",
        text: "Doctors",
        link: "/dashboard/doctors",
        icon: <LocalHospitalIcon />,
        roles: ["admin"],
      },
      {
        type: "link",
        text: "Appointments",
        link: "/dashboard/appointments",
        icon: <EventIcon />,
        roles: ["admin", "staff"],
      },
      {
        type: "collapse",
        text: "Laboratory",
        icon: <ScienceIcon />,
        roles: ["admin"],
        children: [
          { text: "Tests", link: "/laboratory/tests", roles: ["admin"] },
          { text: "Reports", link: "/laboratory/reports", roles: ["admin"] },
        ],
      },
      {
        type: "link",
        text: "Pharmacy",
        link: "/dashboard/pharmacy",
        icon: <LocalPharmacyIcon />,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "MANAGE",
    items: [
      {
        type: "link",
        text: "Staffs",
        link: "/dashboard/staffs",
        icon: <GroupIcon />,
        roles: ["admin"],
      },
      {
        type: "link",
        text: "Notifications",
        link: "/dashboard/notifications",
        icon: <NotificationsIcon />,
        roles: ["admin", "staff"],
      },
    ],
  },
];
