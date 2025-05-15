import { lazy } from "react";
import { Navigate } from "react-router-dom";

//layout
const LoginLayout = lazy(() => import(`../Components/LoginLayout`));

//components
const Login = lazy(() => import(`../Pages/Login/index`));
const ForgotPassword = lazy(() => import(`../Pages/ForgotPassword`));

const AuthRoutes = [
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: `/`,
        exact: true,
        element: <Login />,
      },
      {
        path: `/login`,
        exact: true,
        element: <Login />,
      },
      {
        path: `/forgot-password`,
        exact: true,
        element: <ForgotPassword />,
      },
    ],
  },
];

export default AuthRoutes;
