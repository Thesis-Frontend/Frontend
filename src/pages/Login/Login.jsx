import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Request from "../../helpers/Request";
import { MdClose } from "react-icons/md";
import Snackbar from "../../components/Snackbar";
import SessionHelper from "../../helpers/SessionHelper";

const Login = ({ isOpen, onClose, isUserLogin }) => {
  if (!isOpen) return null;

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [customerNo, setCustomerNo] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      email: email,
      password: password,
      "customer-no": customerNo,
    };
    const path = isUserLogin
      ? "/api/auth/user/signin"
      : "/api/auth/customer/signin";

    const res = await Request("post", path, null, user);
    if (res?.status === 200) {
      SessionHelper.setUser(res?.data.data);
      setSnackbarMessage(res.data.message);
      setShowSnackbar(true);
      setSeverity("success");
      navigate("/dashboard");
    } else {
      setSnackbarMessage(`An error occurred during signup. Please try again.`);
      setShowSnackbar(true);
      setSeverity("error");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-16 rounded-lg relative w-1/4">
        <button
          className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <MdClose className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-8 text-center">Welcome!</h2>
        <form className="flex flex-col gap-8">
          <section className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg font-medium">
              {!isUserLogin ? "Yönetici " : "Kullanıcı "}name or E-mail
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username or email"
              className="px-4 py-3 border rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </section>
          <section className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="px-4 py-3 border rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </section>
          <section className="flex flex-col gap-2">
            <label htmlFor="customerNo" className="font-medium text-lg">
              Customer No
            </label>
            <input
              type="text"
              id="customerNo"
              placeholder="Enter your customer no"
              className="px-4 py-3 border rounded w-full"
              value={customerNo}
              onChange={(e) => setCustomerNo(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <p className="text-blue-500 text-sm text-right hover:underline">
              <Link to="/forgot-password">Forgot your password?</Link>
            </p>
          </section>
          <button
            type="submit"
            className="bg-green-500 flex justify-center text-center  text-white px-4 py-2 rounded hover:bg-green-300 transition-colors w-full"
            onClick={handleLogin}
          >
            {loading ? <div className="loader"></div> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
