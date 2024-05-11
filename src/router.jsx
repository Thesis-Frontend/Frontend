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
// const Login = lazy(() => import("./pages/Login/Login"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Signup = lazy(() => import("./pages/SignUp/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("./components/NotFound"));
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const ForgetPwd = lazy(() => import("./pages/ForgetPwd/ForgetPwd"));
const UpdatePwd = lazy(() => import("./pages/ForgetPwd/UpdatePwd"));
const Companies =  lazy(() => import("./pages/Companies/Companies"));

const publicRoutes = [
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
    path: "/sign-up",
    element: <Signup />,
  },
];

const privateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/companies",
    element: <Companies />,
  },
];

const PrivateRoute = ({ element }) => {
  console.log(element);
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  console.log(isLoggedIn);

  return !isLoggedIn ? (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">{element}</main>
    </div>
  ) : (
    <Navigate to="/welcome" replace />
  );
};

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/welcome" />} />
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<PrivateRoute element={route.element} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
