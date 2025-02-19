import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/protectedRoute";
import URLList from "./pages/Links";
import Sidebar from "./components/sidebar";
import Nav from "./components/Dashboard/Nav";
import CreateLink from "./pages/Dashboard/CreateLink";
import RedirectPage from "./pages/Dashboard/RedirectPage";

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
            path="/create-link"
            element={
              <div className="flex">
                <Sidebar />
                <div className="w-full">
                  <CreateLink />
                </div>
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div className=" bg-slate-50">
                <Sidebar />
                <Nav/>
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
                <div className=" w-full">
                  <URLList />
                </div>
              </div>
            }
          />
        </Route>
   
        <Route path="/:short" element={<RedirectPage />} />
  
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
