import { lazy } from "react";
import { Navigate } from "react-router-dom";

//layout
const DashboardLayout = lazy(() => import(`../Components/DashboardLayout`));

//components

const Users = lazy(() => import(`../Pages/Users/Index`));
const AddPatient = lazy(() => import(`../Pages/Patients/addPatient`));
const Dashboard = lazy(() => import(`../Pages/Dashboard/Dashboard`));
const Allpatients = lazy(() => import(`../Pages/Patients/allPatients`));

const AdminRoutes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: `/`,
        exact: true,
        element: <Dashboard />,
      },
      {
        path: `/dashboard`,
        exact: true,
        element: <Dashboard />,
      },
      {
        path: `/add_patient`,
        exact: true,
        element: <AddPatient />,
      },

      {
        path: `/all_patients`,
        exact: true,
        element: <Allpatients />,
      },

      {
        path: `*`,
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default AdminRoutes;
