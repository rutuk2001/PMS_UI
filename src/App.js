import { useRoutes } from "react-router-dom";
import { Suspense, startTransition, useState, useEffect } from "react";
import "./assets/css/Style.css";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box } from "@mui/material";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
  >
    <CircularProgress size={60} />
  </Box>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedin = localStorage.getItem("authToken");

  useEffect(() => {
    // Use startTransition to handle authentication state changes
    startTransition(() => {
      if (isLoggedin != undefined) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
  }, [isLoggedin]);

  // Use startTransition for route changes
  const handleRouteChange = () => {
    startTransition(() => {
      // Route change logic here if needed
    });
  };

  const authRouting = useRoutes(AuthRoutes);
  const adminRouting = useRoutes(AdminRoutes);

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<LoadingFallback />}>
        {isAuthenticated ? adminRouting : authRouting}
      </Suspense>
    </>
  );
}

export default App;
