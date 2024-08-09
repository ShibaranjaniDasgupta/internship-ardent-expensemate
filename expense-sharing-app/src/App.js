import React, { useState } from "react";
import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage";
import "./pages/HomePage.css";
import Notifications from "./pages/Notifications";
import MainContent from "./pages/MainContent";
import CreateNewGroup from "./pages/CreateNewGroup";
import GroupManagement from "./pages/GroupManagement";
import Login from "./pages/Login";
import Register1 from "./pages/Register1";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import AdminPanel from "./pages/AdminPanel";
import Preloader from "./pages/Preloader";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GoogleOAuthProvider clientId="194348839374-nqf4r2gqu6lh21d5sv0hu3gn85pj5trp.apps.googleusercontent.com">
      <div className="app">
        {loading && <Preloader />}
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/add-expense"
              element={<AddExpense addExpense={addExpense} />}
            />
            <Route
              path="/expense-list"
              element={<ExpenseList expenses={expenses} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/main-content" element={<MainContent />} />
            <Route path="/create-group" element={<CreateNewGroup />} />
            <Route path="/group-management" element={<GroupManagement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register1 />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
