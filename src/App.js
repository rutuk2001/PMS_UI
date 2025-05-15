import { useRoutes } from "react-router-dom";
import "./assets/css/Style.css";
import AuthRoutes from "./routes/AuthRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const authRouting = useRoutes(AuthRoutes);
  const adminRouting = useRoutes(AdminRoutes);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoggedin = localStorage.getItem("authToken");

  useEffect(() => {
    if (isLoggedin != undefined) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isLoggedin]);

  return (
    <>
     <ToastContainer />
      {isAuthenticated ? adminRouting : authRouting}
    </>
  );
}

export default App;
