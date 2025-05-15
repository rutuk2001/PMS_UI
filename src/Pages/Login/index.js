import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import Logo from "./../../assets/images/Carbon6(greenLogo).svg";
import {
  loginApi,
  clearErrorMessage,
  clearSuccessMessage,
} from "../../store/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success, isAuth } = useSelector((state) => state.authDetails);
  console.log(success, "========");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  console.log(isAuth, "====");
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearSuccessMessage());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorMessage());
    }
  }, [error, dispatch]);

  // New useEffect to clear email error on valid input
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailError("");
    }
  }, [email]);

  const validateInputs = () => {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Incorrect Email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length <= 0) {
      setPasswordError("Incorrect Password");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setRememberMe(false);
    setEmailError("");
    setPasswordError("");
  };
  const handleLogin = () => {
    if (!validateInputs()) {
      return;
    }

    const loginData = {
      username: email,
      password,
    };

    dispatch(loginApi(loginData));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />

      <Card sx={{ width: 466, maxWidth: "100%", borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 4, md: 6 } }}>
          <Typography sx={{ mb: { xs: 3, md: 4 } }}>
            <img src={Logo} alt="PMS" style={{ width: 376, height: 80 }} />
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ mb: 1 }}>
            Log In
          </Typography>
          <Typography sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography variant="caption">Time to get started!</Typography>
          </Typography>

          <TextField
            label="Email ID"
            variant="outlined"
            fullWidth
            sx={{ mb: { xs: 4, md: 6 } }}
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            sx={{ mb: { xs: 2 } }}
            size="small"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mb: { xs: 2, md: 4 } }}
          >
            <Grid item xs>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember Me"
              />
            </Grid>
            <Grid item xs="auto">
              <Typography variant="body1">
                <Link href="/forgot-password">Forgot password?</Link>
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={6}
            sx={{ mb: { xs: 2, md: 4 } }}
          >
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className="button"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>

          {/* <Typography
            variant="body2"
            sx={{ mb: { md: 1 }, textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Link href="/register" color="primary">
              REGISTER NOW
            </Link>
          </Typography> */}
        </CardContent>
      </Card>
    </>
  );
}

export default Login;
