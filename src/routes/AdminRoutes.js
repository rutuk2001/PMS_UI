import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

// Loading component for route transitions
const RouteLoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="400px"
  >
    <CircularProgress size={40} />
  </Box>
);

//layout
const DashboardLayout = lazy(() => import(`../Components/DashboardLayout`));

//components
const Users = lazy(() => import(`../Pages/Users/Index`));
const AddPatient = lazy(() => import(`../Pages/Patients/addPatient`));
const Dashboard = lazy(() => import(`../Pages/Dashboard/Dashboard`));
const Allpatients = lazy(() => import(`../Pages/Patients/allPatients`));
const PrescriptionForm = lazy(() =>
  import(`../Pages/PatientPrescription/prescription`)
);
const ViewPatientForm = lazy(() => import(`../Pages/Patients/viewPatient`));
const EditPatientForm = lazy(() => import(`../Pages/Patients/addPatient`));

// Wrapper component to handle Suspense for each route
const LazyComponent = ({ component: Component }) => (
  <Suspense fallback={<RouteLoadingFallback />}>
    <Component />
  </Suspense>
);

const AdminRoutes = [
  {
    path: "/",
    element: <LazyComponent component={DashboardLayout} />,
    children: [
      {
        path: `/`,
        exact: true,
        element: <LazyComponent component={Dashboard} />,
      },
      {
        path: `/dashboard`,
        exact: true,
        element: <LazyComponent component={Dashboard} />,
      },
      {
        path: `/add_patient`,
        exact: true,
        element: <LazyComponent component={AddPatient} />,
      },
      {
        path: `/all_patients`,
        exact: true,
        element: <LazyComponent component={Allpatients} />,
      },
      {
        path: `/prescription/:id`,
        exact: true,
        element: <LazyComponent component={PrescriptionForm} />,
      },
      {
        path: `/view/patientinfo/:id`,
        exact: true,
        element: <LazyComponent component={ViewPatientForm} />,
      },
      {
        path: `/edit_patient/:id`,
        exact: true,
        element: <LazyComponent component={EditPatientForm} />,
      },
      {
        path: `*`,
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default AdminRoutes;
