import { lazy } from "react";

const LoginLayout = lazy(() => import(`../Components/LoginLayout`));
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
