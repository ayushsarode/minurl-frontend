
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Home, Link, Settings } from "lucide-react";

import Logo from "../assets/logo.gif"


const Sidebar = () => {
  const navigate = useNavigate(); 
  // const { user } = useAuthStore(); 

  const menuItems = [
    { name: "Dashboard", icon: <Home size={24} />, link: "/dashboard" },
    { name: "Links", icon: <Link size={24} />, link: "/links" },

    { name: "Settings", icon: <Settings size={24} />, link: "/settings" },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-300 w-80 fixed left-0 overflow-y-auto shadow-lg">
    <div className="my-4 px-2 flex items-center">
      <img src={Logo} alt="" width={70} />
      <h1 className="lg:text-4xl font-bold text-black md:text-3xl sm:text-2xl">minurl.</h1>
    </div>
    {/* User Profile Section */}
    {/* <div className="px-6 py-6">
      <p className="text-slate-500">Welcome back,</p>
      <div className="inline-flex space-x-2 items-center">
        <img
          className="rounded-full w-8 h-8"
          src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=128&q=80"
          alt="User"
        />
        <span className="text-base font-bold">
          {user ? user.name : "Guest"} {/* Display user name dynamically */}
        {/* </span>
      </div>
    </div> */} 
    {/* Navigation Links */}
    <nav className="px-6 mt-[3em]">
    <button className="w-full flex justify-center items-center py-3 mb-5 transition ease-linear duration-150 bg-blue-600 hover:bg-blue-00 rounded-md">
  <div className="flex items-center gap-2">
    <a href="/create-link" className="text-lg font-normal text-white">Create New Link</a>
  </div>
</button>

      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.link)}
          className={`w-full flex items-center space-x-3 py-1 transition ease-linear duration-150 
          ${
            window.location.pathname === item.link
              ? "bg-gray-200 text-black rounded-lg"
              : "bg-white text-black"
          }`}
        >
          <div className="flex items-center gap-4 px-4 py-2 font-light rounded-lg w-full">
            <span >{item.icon}</span>
            <span className="text-lmd ">{item.name}</span>
          </div>
        </button>
      ))}
    </nav>
  </div>
  );
};

export default Sidebar;
