import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pic1 from "../../assets/Giriş1-removebg-preview.png";
import pic2 from "../../assets/Giriş2-removebg-preview.png";
import pic3 from "../../assets/Giriş3-removebg-preview.png";

export default function Payment() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const { token } = useParams();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/checkout/${token}`, { state: formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6"
      >
        <div className="w-full pt-1 pb-5">
          <div className="bg-indigo-500 text-white rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex items-center justify-center">
            <i className="mdi mdi-credit-card-outline text-3xl"></i>
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
        </div>
        <div className="mb-3 flex -mx-2">
          <div className="px-2">
            <label htmlFor="type1" className="flex items-center cursor-pointer">
              <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" defaultChecked />
              <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3" alt="Visa" />
            </label>
          </div>
          <div className="px-2">
            <label htmlFor="type2" className="flex items-center cursor-pointer">
              <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
              <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3" alt="PayPal" />
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1" htmlFor="cardName">Name on card</label>
          <input
            className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="John Smith"
            type="text"
            id="cardName"
            required
            value={formData.cardName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1" htmlFor="cardNumber">Card number</label>
          <input
            className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="0000 0000 0000 0000"
            type="text"
            id="cardNumber"
            required
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 -mx-2 flex items-end">
          <div className="px-2 w-1/2">
            <label className="font-bold text-sm mb-2 ml-1" htmlFor="expMonth">Expiration month</label>
            <select
              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              id="expMonth"
              required
              value={formData.expMonth}
              onChange={handleInputChange}
            >
              <option value="">Month</option>
              <option value="01">01 - January</option>
              <option value="02">02 - February</option>
              <option value="03">03 - March</option>
              <option value="04">04 - April</option>
              <option value="05">05 - May</option>
              <option value="06">06 - June</option>
              <option value="07">07 - July</option>
              <option value="08">08 - August</option>
              <option value="09">09 - September</option>
              <option value="10">10 - October</option>
              <option value="11">11 - November</option>
              <option value="12">12 - December</option>
            </select>
          </div>
          <div className="px-2 w-1/2">
            <label className="font-bold text-sm mb-2 ml-1" htmlFor="expYear">Expiration year</label>
            <select
              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              id="expYear"
              required
              value={formData.expYear}
              onChange={handleInputChange}
            >
              <option value="">Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
          </div>
        </div>
        <div className="mb-10">
          <label className="font-bold text-sm mb-2 ml-1" htmlFor="cvv">Security code</label>
          <input
            className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="000"
            type="text"
            id="cvv"
            required
            value={formData.cvv}
            onChange={handleInputChange}
          />
        </div>
        <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" type="submit">
          <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
        </button>
        <img src={pic1} alt="Left Image 1" className="absolute -bottom-16 -left-20" />
        <img src={pic2} alt="Right Image 1" className="absolute -bottom-16 -right-12" />
        <img src={pic3} alt="Right Image 1" className="absolute -top-32 -left-12" />
      </form>
    </div>
  );
}
