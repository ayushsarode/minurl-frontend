import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/protectedRoute";
import Links from "./pages/Links";
import Sidebar from "./components/sidebar";
import Nav from "./components/Dashboard/Nav";

function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          


          <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <div className=" bg-slate-100">
                <Sidebar />
                
                <div className="w-full">
                  <Dashboard />
                </div>
              </div>
            }
          />
          <Route
            path="/links"
            element={
              <div className="flex">
                <Sidebar />
                <div className="ml-64 p-4 w-full">
                  <Links />
                </div>
              </div>
            }
          />
        </Route>
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
