import React, { useState } from "react";
import {
  Mail,
  Calendar,
  Clock,
  Edit3,
  Camera,
  Shield,
  User,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  profile_photo: string | null;
  created_at: string;
  updated_at: string;
};


export const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "manager":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Get initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Card */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="bg-white border rounded-xl border-gray-200 mb-8">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {user.profile_photo ? (
                        <img
                          src={user.profile_photo}
                          alt={`${user.first_name} ${user.last_name}`}
                          className="w-40 h-40 rounded-full object-cover ring-4 ring-white shadow-lg"
                        />
                      ) : (
                        <div className="w-40 h-40 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold ring-4 ring-white">
                          {getInitials(user.first_name, user.last_name)}
                        </div>
                      )}
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Camera className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {user.first_name} {user.last_name}
                      </h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                            user.role
                          )}`}
                        >
                          <Shield className="w-3 h-3 inline mr-1" />
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ID: #{user.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />
                  Profile Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-gray-900 font-medium">
                            {user.first_name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-gray-900 font-medium">
                            {user.last_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-gray-900">{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(
                              user.role
                            )}`}
                          >
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Account Details
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Account Created
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(user.created_at)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getRelativeTime(user.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Last Updated
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(user.updated_at)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getRelativeTime(user.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Edit3 className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      Edit Profile
                    </span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      Change Password
                    </span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      Email Settings
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-sm text-white overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Profile Completion
                </h3>
                <p className="text-indigo-100 text-sm mb-4">
                  Your profile is 85% complete. Add more information to enhance
                  your experience.
                </p>
                <div className="w-full bg-indigo-400 rounded-full h-2 mb-4">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <button className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
