// ScrollToTop.js
import React, { useState, useEffect } from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Zoom in={isVisible}>
      <Tooltip title="Scroll to Top" arrow>
      <Fab
        color="primary"
        size="large"
        onClick={scrollToTop}
        aria-label="scroll back to top"
        style={{ position: "fixed", bottom: "3rem", right: "2rem" }}
      >
        <KeyboardArrowUpIcon style={{ fontSize: 30 }}/>
      </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollToTop;
