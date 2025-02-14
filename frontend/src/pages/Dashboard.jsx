import { useEffect, useState } from "react";
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
        console.log(error.message);
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
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <div>
          <h2 className="text-5xl font-semibold text-center mb-4">
            Welcome, {user?.firstName} {user?.lastName}!
          </h2>
          <div className="flex flex-row-reverse justify-center items-center gap-4 mt-[50px] border border-gray-300 p-10 rounded-lg shadow-lg">
            <div className="text-center">
              <p className="text-xl font-medium mb-4 text-gray-800">
                Email: {user?.email}
              </p>
              <p className="text-xl font-medium mb-4 text-gray-800">
                Gender: {user?.gender}
              </p>
              <button
                onClick={handleLogout}
                className="bg-teal-800 border-0 outline-0 text-white font-semibold py-3 px-[2rem] rounded-full text-[15px] uppercase"
              >
                Logout
              </button>
            </div>
            <div className="">
              {user?.profileImage && (
                <img
                  src={`http://localhost:3000/${user.profileImage}`}
                  alt="Profile"
                  className="w-[200px] h-[200px] rounded-full border-4 border-solid border-gray-800 p-1"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
