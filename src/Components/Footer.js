import * as React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="xl">
        <Typography
          sx={{ py: 2, borderTop: "2px solid #EAEAED", textAlign: "right" }}
        >
          <Typography variant="caption" color="text.primary">
            ©2024 All Rights Reserved by Atharv Clinic
          </Typography>
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
