import React from "react";
import Navbar from "../components/Navbar";

const Pricing = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-white text-black py-12 px-6 mt-20 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">URL Shortnr Pricing Plans</h2>
        <p className="text-gray-600 mb-8">Choose the best plan that suits your needs.</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {/* Basic Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Free</h3>
          <p className="text-gray-600 mb-4">For individuals starting out.</p>
          <p className="text-2xl font-bold text-gray-800">$0<span className="text-sm text-gray-500">/mo</span></p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>- 50 Links</li>
            <li>- Basic Analytics</li>
            <li>- 14-day Link History</li>
          </ul>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
            Get Started
          </button>
        </div>
        
        {/* Pro Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 border-2 border-blue-600">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Pro</h3>
          <p className="text-gray-600 mb-4">For professionals and creators.</p>
          <p className="text-2xl font-bold text-gray-800">$12<span className="text-sm text-gray-500">/mo</span></p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>- 5,000 Links</li>
            <li>- Advanced Analytics</li>
            <li>- Custom Link Aliases</li>
            <li>- QR Code Generation</li>
          </ul>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
            Choose Plan
          </button>
        </div>
        
        {/* Business Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Business</h3>
          <p className="text-gray-600 mb-4">For teams and businesses.</p>
          <p className="text-2xl font-bold text-gray-800">$29<span className="text-sm text-gray-500">/mo</span></p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>- Unlimited Links</li>
            <li>- Team Collaboration</li>
            <li>- Branded Domains</li>
            <li>- API Access</li>
            <li>- Priority Support</li>
          </ul>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Pricing;