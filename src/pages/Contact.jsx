import React, { useState } from "react";
import { RiPhoneFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import pic1 from "../assets/Giriş1-removebg-preview.png";
import pic3 from "../assets/Giriş3-removebg-preview.png";
import Snackbar from "../components/Snackbar";

export default function Contact() {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const data = {
      ...formData,
      // access_key: `${process.env.REACT_APP_WEB3_FORMS_APP_KEY}`,
      access_key: `bfc66ecd-e2e6-4ae9-a0eb-34e26977cfb0`,
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setSnackbarMessage(`Your message is successfully sent!`);
      setShowSnackbar(true);
      setSeverity("success");
      setTimeout(() => setShowSnackbar(false), 5000); // Hide the snackbar after 3 seconds
    } else {
      setSnackbarMessage(`Your message has not been sent :(`);
      setShowSnackbar(true);
      setSeverity("error");
      setTimeout(() => setShowSnackbar(false), 5000); // Hide the snackbar after 3 seconds
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen antialiased flex w-full justify-center items-center">
      <Snackbar
        message={snackbarMessage}
        show={showSnackbar}
        severity={severity}
      />

      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-signupButtonStrokeColor w-full max-w-4xl p-8 rounded-xl shadow-lg text-white sm:p-12 overflow-hidden">
        <div className="flex flex-col space-y-10 justify-between">
          <div>
            <h1 className="font-bold text-4xl tracking-wide">Contact Us!</h1>
            <p className="pt-2 text-landingShapeColor text-sm whitespace-pre-wrap overflow-hidden">
              If you have a question or are experiencing a problem with our
              site, contact our expert support team!
            </p>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="inline-flex space-x-2 items-center">
              <RiPhoneFill className="text-teal-300 text-xl" />
              <span>+90 532 234 01 23</span>
            </div>
            <div className="inline-flex space-x-2 items-center">
              <FaLocationDot className="text-teal-300 text-xl" />
              <span>Gülbahçe Mah. Teknopark Izmir, Urla/İzmir</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img className="absolute w-60 h-60 -right-24 -top-20" src={pic1} />
          <img className="absolute w-60 h-60 -left-20 -bottom-20" src={pic3} />
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600">
            <form
              action=""
              onSubmit={onSubmit}
              className="flex flex-col space-y-4"
            >
              <div>
                <label className="text-sm">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm">Your Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue-300"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm">Your Message</label>
                <textarea
                  type="text"
                  name="message"
                  placeholder="Message..."
                  rows={4}
                  className="ring-1
                  ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none
                  focus:ring-2 focus:ring-blue-300"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              {loading ? (
                <svg
                  className="h-8 w-8 animate-spin self-end"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                </svg>
              ) : (
                <button
                  type="submit"
                  className="inline-block self-end bg-blue-600 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
                >
                  Send Message
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
