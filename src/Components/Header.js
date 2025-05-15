import React, { useEffect, startTransition } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Badge,
  Avatar,
  Menu,
  Divider,
  ListItemButton,
  ListItemText,
  Button,
  colors,
} from "@mui/material";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Logo from "./../assets/images/pms_logo.png";
import { removeToken } from "../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { currentUserRole } from "../utils/permissions";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.2)",
      opacity: 0,
    },
  },
}));
const Header = React.memo(({ onDrawerOpen, drawerOpen }) => {
  const currentUserRole = localStorage.getItem("role");
  const [anchorUserEl, setAnchorUserEl] = React.useState(null);
  const openUser = Boolean(anchorUserEl);
  const handleUserClick = (event) => {
    setAnchorUserEl(event.currentTarget);
  };
  const handleUserClose = () => {
    setAnchorUserEl(null);
  };
  const currentUserName = localStorage.getItem("name");
  const [anchorNotificationsEl, setAnchorNotificationsEl] =
    React.useState(null);
  const openNotifications = Boolean(anchorNotificationsEl);
  const handleNotificationsClick = (event) => {
    setAnchorNotificationsEl(event.currentTarget);
  };
  const handleNotificationsClose = () => {
    setAnchorNotificationsEl(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    startTransition(() => {
      dispatch(removeToken());
      navigate("/");
    });
  };

  return (
    <AppBar
      position="fixed"
      className="header"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#F7F7F9",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          className="MuiLogo"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {drawerOpen ? (
            <>
              <img src={Logo} alt="PMS" width="40" />
            </>
          ) : (
            <span style={{ color: "#007ab1", fontSize: 13 }}>PMS</span>
          )}
        </Typography>
        <IconButton
          sx={{ flexGrow: 0 }}
          color="textPrimary"
          className="MuiToggler"
          aria-label="open drawer"
          onClick={onDrawerOpen}
        >
          <MenuOpenOutlinedIcon />
        </IconButton>
        <Box sx={{ ml: "auto" }}>
          <IconButton
            onClick={handleUserClick}
            size="small"
            sx={{ mr: 1, p: 0 }}
            aria-controls={openUser ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openUser ? "true" : undefined}
          >
            <Avatar
              sx={{
                bgcolor: "#007ab1",
                border: "1px solid #007ab1",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                boxSizing: "border-box",
              }}
            >
              <PersonOutlineOutlinedIcon />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorUserEl}
          id="user-menu"
          open={openUser}
          onClose={handleUserClose}
          onClick={handleUserClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(6px 6px 10px rgba(0, 0, 0, 0.1))",
              mt: 1,
              px: 3,
              pt: 2,
              pb: 1,
              borderRadius: "12px",
              "& .MuiAvatar-root": {
                width: 64,
                height: 64,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Typography component="div" sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                mb: 2,
                mx: "auto",
                bgcolor: "#007ab1",
                border: "1px solid #007ab1",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                boxSizing: "border-box",
              }}
            >
              <PersonOutlineOutlinedIcon />
            </Avatar>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 0.5, fontWeight: "500" }}
            >
              {currentUserName}
            </Typography>
            <Typography sx={{ mb: 3 }}>
              <Typography variant="caption">{currentUserRole}</Typography>
            </Typography>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
        </Menu>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
