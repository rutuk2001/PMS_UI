import React, { useEffect, startTransition } from "react";
import { styled } from "@mui/material/styles";
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Box, 
  Badge, 
  Avatar, 
  Menu, 
  MenuItem, 
  Typography,
  Divider
} from "@mui/material";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
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
  const [anchorNotificationsEl, setAnchorNotificationsEl] = React.useState(null);
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
      // Clear all localStorage items
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      
      // Dispatch logout action
      dispatch(removeToken());
      
      // Close user menu
      handleUserClose();
      
      // Navigate to login page
      navigate("/");
    });
  };

  const handleProfileClick = () => {
    handleUserClose();
    // Navigate to profile page if you have one
    // navigate("/profile");
  };

  const handleSettingsClick = () => {
    handleUserClose();
    // Navigate to settings page if you have one
    // navigate("/settings");
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: drawerOpen ? 170 : 60, // match drawer width
            transition: "width 0.3s ease",
          }}
        >
          {drawerOpen ? (
            <img src={Logo} alt="PMS" width="40" />
          ) : (
            <span style={{ color: "#007ab1", fontSize: 13 }}>PMS</span>
          )}
        </Box>

        <IconButton
          sx={{ flexShrink: 0 }}
          color="textPrimary"
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
              }}
            >
              <PersonOutlineOutlinedIcon />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>

      {/* User Menu Dropdown */}
      <Menu
        id="user-menu"
        anchorEl={anchorUserEl}
        open={openUser}
        onClose={handleUserClose}
        onClick={handleUserClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 200,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info Section */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#333' }}>
            {currentUserName || 'User'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            {currentUserRole || 'Role'}
          </Typography>
        </Box>

        {/* Menu Items */}
        <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
          <PersonOutlineOutlinedIcon sx={{ mr: 2, fontSize: 20 }} />
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
        
        <MenuItem onClick={handleSettingsClick} sx={{ py: 1.5 }}>
          <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
          <Typography variant="body2">Settings</Typography>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {/* Logout Item */}
        <MenuItem 
          onClick={handleLogout} 
          sx={{ 
            py: 1.5, 
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: '#ffebee',
            }
          }}
        >
          <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
});

export default Header;
