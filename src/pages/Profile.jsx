import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, loading, logOut, role } = useContext(AuthContext);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!user) return <p className="text-center text-red-500">No user found.</p>;
  console.log(user)
  const renderRoleBadge = () => {
    if (role === "farmer") {
      return (
        <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full">
          🌾 Farmer
        </span>
      );
    }
    if (role === "consumer") {
      return (
        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
          🛒 Consumer
        </span>
      );
    }
    return null;
  };

  return (
    <div className="px-6 md:px-20 py-10  text-gray-800 ">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-green-700">
            {renderRoleBadge()}
            {role?.charAt(0).toUpperCase() + role.slice(1)} Profile
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
          {/* Avatar */}
          <div className="p-6 text-4xl uppercase bg-green-700 text-white font-bold rounded-full w-24 h-24 flex items-center justify-center shadow">
            {user.fullname?.[0] || "U"}
          </div>

          {/* User Details */}
          <div className="space-y-3 text-lg w-full">
            <p><strong>Name:</strong> {user.fullname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {role}</p>

            {/* Farmer-specific Info */}
            {role === "farmer" && (
              <>
                <p><strong>Farm Location:</strong> {user.city || "Not set"}</p>
                <p><strong>Contact Number:</strong> {user.phone || "N/A"}</p>
                <p><strong>Types of Produce:</strong> {user.produceTypes || "Not set"}</p>
              </>
            )}

            {/* Consumer-specific Info */}
            {role === "consumer" && (
              <>
                <p><strong>City:</strong> {user.city || "Not set"}</p>
                <p><strong>Country:</strong> {user.country || "Not set"}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p><strong>Delivery Preferences:</strong> {user.address || "Not set"}</p>
              </>
            )}
          </div>
        </div>

        {/* Optional Log Out Button */}
        <div className="mt-10">
          <button
            onClick={logOut}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
