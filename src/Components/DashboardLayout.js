import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function DashboardLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={`wrapper ${isDrawerOpen ? "active" : ""}`}>
      {/* Pass both the drawer open state and the toggle handler to Header */}
      <Header onDrawerOpen={handleDrawerOpen} drawerOpen={isDrawerOpen} />
      {/* Pass the drawer state to Sidebar to adjust its visibility */}
      <Sidebar isOpen={isDrawerOpen} />
      <main className="main">
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
