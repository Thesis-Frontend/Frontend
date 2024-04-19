import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SessionHelper from "../src/helpers/SessionHelper";
import Loading from "./components/Loading/Loading";

// Lazy loading components for better performance
const Login = lazy(() => import("./pages/Login/Login"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Signup = lazy(() => import("./pages/SignUp/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("./components/NotFound"));
const Navbar = lazy(() => import("./components/Navbar"));
const ForgetPwd = lazy(() => import("./pages/ForgetPwd/ForgetPwd"));
const UpdatePwd = lazy(() => import("./pages/ForgetPwd/UpdatePwd"));

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/welcome",
    element: <Landing />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPwd />,
  },

  {
    path: "/reset-password/:token",
    element: <UpdatePwd />,
    exact: true,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
];

const privateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

const PrivateRoute = ({ element }) => {
  const isLoggedIn = SessionHelper.getIsLoggedIn();

  return isLoggedIn ? (
    <>
      <Navbar />
      {element}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          {publicRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} />
          ))}
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
