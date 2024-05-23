import React, { useState } from "react";
import Request from "../../helpers/Request";
// import Snackbar 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [customerNo, setCustomerNo] = React.useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let body = {
      email:email,
      customerNo:customerNo
    }
    const res = await Request("post","/api/customer/reset-password",body);
    if (res.status === 200) {
      
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-8 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="font-bold text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="px-4 py-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="customerNo" className="font-bold text-lg">
            Customer No
          </label>
          <input
            type="text"
            id="customerNo"
            placeholder="Enter your customer no"
            className="px-4 py-3 border rounded"
            value={customerNo}
            onChange={(e) => setCustomerNo(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-300 transition-colors w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>
              </div>
            ) : (
              "Send Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
