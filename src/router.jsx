import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SessionHelper from "../src/helpers/SessionHelper";
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer";

// Lazy loading components for better performance
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Signup = lazy(() => import("./pages/SignUp/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const AboutUs = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));
const Navbar = lazy(() => import("./components/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const ForgetPwd = lazy(() => import("./pages/ForgetPwd/ForgetPwd"));
const UpdatePwd = lazy(() => import("./pages/ForgetPwd/UpdatePwd"));
const Companies = lazy(() => import("./pages/Companies/Companies"));

const publicRoutes = [
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

const mainRoutes = [
  {
    path: "/welcome",
    element: <Landing />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <Contact />,
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

  return !isLoggedIn ? (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">{element}</main>
    </div>
  ) : (
    <Navigate to="/welcome" replace />
  );
};

const MainRoute = ({ element }) => {
  return (
    <div className="relative flex flex-col h-full">
      <Navbar />
      <main className="flex-1">{element}</main>
      <Footer />
    </div>
  );
};
const PublicRoute = ({ element }) => {
  return (
    <div className="relative flex flex-col h-full">
      <main className="flex-1">{element}</main>
    </div>
  );
};

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/welcome" />} />
          {mainRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<MainRoute element={route.element} />}
            />
          ))}
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<PublicRoute element={route.element} />}
            />
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
