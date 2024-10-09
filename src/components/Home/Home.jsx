import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // For notifications
import { server } from "../../server"; // Replace with your server URL
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to track errors
  const navigate = useNavigate(); // Hook to access navigate for navigation

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${server}/api/auth/profile`, {
          method: "GET",
          credentials: "include", // Include cookies if required for authentication
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setError(error.message); // Set error state
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Fetch on component mount

  // Fetch user by ID
  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`${server}/api/auth/profile/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setSelectedUser(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Navigate to Login Page
  const handleLogin = () => {
    navigate("/login"); // Change to your actual login route
  };

  // Navigate to Signup Page
  const handleSignup = () => {
    navigate("/signup"); // Change to your actual signup route
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading users...</p>
      </div>
    ); // Styled loading state
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">{error}</p> {/* Display error message */}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">No users available</p>
      </div>
    ); // If no users are found
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-indigo-400 p-4">
      {/* Buttons for Login and Signup */}
      <div className="flex justify-between w-full max-w-md mb-4">
        <button
          className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>

      <h1 className="text-4xl font-extrabold mb-6 text-white">User List</h1>
      <ul className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center p-4 border-b cursor-pointer hover:bg-gray-100 transition duration-300"
            onClick={() => fetchUserById(user._id)} // Fetch user details on click
          >
            <span className="text-lg text-gray-800">{user.name}</span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-700">Profile Details</h2>
          <p className="text-lg font-medium mb-2">
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Email:</strong> {selectedUser.email}
          </p>
          {selectedUser.avatar && (
            <img
              src={selectedUser.avatar.url}
              alt="User Avatar"
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mb-2"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
