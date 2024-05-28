// src/components/Login/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import Snackbar from "../../components/Snackbar";
import Request from "../../helpers/Request";
import { useSession } from "../../helpers/SessionContext";
const Login = ({ isOpen, onClose, isUserLogin }) => {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { login } = useSession();
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
      login(res?.data.data);
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
    <>
      <Snackbar
        message={snackbarMessage}
        show={showSnackbar}
        setShow={setShowSnackbar}
        severity={severity}
      />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-16 rounded-lg relative w-1/4">
          <button
            className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <MdClose className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold mb-8 text-center">Welcome!</h2>
          <form className="flex flex-col gap-8" onSubmit={handleLogin}>
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
            <section className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="font-medium text-lg">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="px-4 py-3 border rounded w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <RiEyeOffLine size={24} />
                  ) : (
                    <RiEyeLine size={24} />
                  )}
                </button>
              </div>
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
              className="bg-green-500 flex justify-center text-center text-white px-4 py-2 rounded hover:bg-green-300 transition-colors w-full"
              disabled={loading}
            >
              {loading ? <div className="loader"></div> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
