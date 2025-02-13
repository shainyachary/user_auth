import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../api";

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await getDashboard(token);
        setUser(response.data);
      } catch (error) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>
        Welcome, {user?.firstName} {user?.lastName}!
      </h2>
      <p>Email: {user?.email}</p>
      <p>Gender: {user?.gender}</p>
      {user?.profileImage && (
        <img
          src={`http://localhost:5000/${user.profileImage}`}
          alt="Profile"
          width="150"
        />
      )}
      <br />
      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
