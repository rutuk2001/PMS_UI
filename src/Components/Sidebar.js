import React, { useState, useEffect, startTransition } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const drawerWidth = 262;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar({ isOpen }) {
  const theme = useTheme();
  const [openItems, setOpenItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      setOpenItems([1]); // Dashboard is open
    } else if (
      location.pathname === "/add_patient" ||
      location.pathname === "/all_patients"
    ) {
      setOpenItems([2]); // Patient section is open
    } else {
      setOpenItems([]);
    }
  }, [location.pathname]);

  const handleClick = (index) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((item) => item !== index)
        : [...prevOpenItems, index]
    );
  };

  const isActive = (href) =>
    location.pathname === href || location.pathname.startsWith(href);

  const isMainItemActive = (href) => {
    return location.pathname === href;
  };

  const handleNavigation = (to) => {
    startTransition(() => {
      // Use navigate instead of window.location.href to prevent page reload
      navigate(to); // React Router's navigate method for client-side routing
    });
  };

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      className="sidebar"
      sx={{
        "& .MuiDrawer-paper": {
          bgcolor: "#F7F7F9",
          borderRight: "none",
          boxSizing: "border-box",
        },
      }}
    >
      <Paper elevation={0} sx={{ bgcolor: "#F7F7F9" }}>
        <List
          sx={{
            bgcolor: "#F7F7F9",
            px: isOpen ? 3 : 2,
            py: 0,
            transition: theme.transitions.create("padding", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            "& .MuiListItemButton-root": {
              borderRadius: "8px",
              paddingTop: "6px",
              paddingBottom: "6px",
              paddingLeft: isOpen ? "16px" : "7px",
              paddingRight: isOpen ? "16px" : "5px",
              marginBottom: "8px",
              color: "#66697A",
              transition: theme.transitions.create("padding", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              [theme.breakpoints.up("sm")]: {
                paddingLeft: isOpen ? "16px" : "12px",
                paddingRight: isOpen ? "16px" : "12px",
              },
              "&:hover": {
                backgroundColor: "#007ab1",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
              "& .MuiListItemIcon-root": {
                minWidth: "34px",
              },
            },
            "& .active": {
              backgroundColor: "#007ab1",
              color: "#fff",
              "& .MuiListItemIcon-root": {
                color: "#fff",
              },
            },
          }}
          component="nav"
        >
          {/* Dashboard Item */}
          <ListItemButton
            className={isMainItemActive("/dashboard") ? "active" : ""}
            onClick={() => handleNavigation("/dashboard")} // Use navigate for navigation
          >
            <ListItemIcon>
              <span className="material-symbols-outlined nav-icon">
                dashboard
              </span>
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{ opacity: isOpen ? 1 : 0 }}
            />
          </ListItemButton>

          {/* Patient Section (Dropdown) */}
          <ListItemButton
            onClick={() => handleClick(2)}
            className={openItems.includes(2) ? "" : ""}
            sx={{
              "&:hover": {
                backgroundColor: "#007ab1", // Hover effect for the main "Patient"
              },
            }}
          >
            <ListItemIcon>
              <span className="material-symbols-outlined nav-icon">
                person_add_alt
              </span>
            </ListItemIcon>
            <ListItemText primary="Patient" sx={{ opacity: isOpen ? 1 : 0 }} />
            {openItems.includes(2) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>

          <Collapse in={openItems.includes(2)} timeout="auto" unmountOnExit>
            <List sx={{ paddingLeft: isOpen ? 3 : 2 }}>
              {/* Add Patient Item */}
              <ListItemButton
                className={isActive("/add_patient") ? "active" : ""}
                onClick={() => handleNavigation("/add_patient")} // Use navigate for navigation
              >
                <ListItemIcon>
                  <span className="material-symbols-outlined nav-icon">
                    add_circle
                  </span>
                </ListItemIcon>
                <ListItemText
                  primary="Add Patient"
                  sx={{ opacity: isOpen ? 1 : 0 }}
                />
              </ListItemButton>

              {/* All Patients Item */}
              <ListItemButton
                className={isActive("/all_patients") ? "active" : ""}
                onClick={() => handleNavigation("/all_patients")} // Use navigate for navigation
              >
                <ListItemIcon>
                  <span className="material-symbols-outlined nav-icon">
                    list_alt
                  </span>
                </ListItemIcon>
                <ListItemText
                  primary="All Patients"
                  sx={{ opacity: isOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Paper>
    </Drawer>
  );
}

export default Sidebar;
