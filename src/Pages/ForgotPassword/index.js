import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Box, IconButton, InputAdornment } from '@mui/material';
import Logo from './../../assets/images/Carbon6(greenLogo).svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Incorrect Email');
      return;
    }

    setError('');
  };

  return (
    <Card sx={{ width: 466, maxWidth: '100%', borderRadius: 3}}>
      <CardContent sx={{ p: { xs: 4, md: 6} }}>
        <Typography sx={{ mb: { xs: 3, md: 4} }}><img src={Logo} alt="Sustainabilty"  style={{width:376,height:80}} /></Typography>
        <Typography variant="h4" color="text.secondary" sx={{ mb: 1}}>Forgot Password</Typography>
        <Typography sx={{ mb: { xs: 4, md: 6} }}>
          <Typography variant="caption">Enter your email and we'll send you a link to reset your password.</Typography>
        </Typography>

        <TextField
          label="Email ID"
          variant="outlined"
          fullWidth
          sx={{ mb: { xs: 4, md: 6} }}
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error && !email}
          helperText={error && !email ? error : ''}
        />

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={6}
          sx={{ mb: { xs: 2, md: 4} }}
        >
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              onClick={handleLogin}
            >
              Submit
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mb: {md: 1}, textAlign: 'center' }}>
          <Link href="/login" color="primary">
            Back to Login
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ForgotPassword;