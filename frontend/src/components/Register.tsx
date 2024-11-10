import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, UserData } from "../types";
import { useRegisterHook } from "../hooks/useAuth";

export default function RegisterPage() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    profilePic: null
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { register } = useRegisterHook();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(userData.name, userData.email, userData.password,userData.profilePic);
      navigate("/blogs");
    } catch (err: unknown) {
      const errorMessage = (err as ApiError)?.response?.data?.message ||
        "Invalid email or password. Please try again.";
      setError(errorMessage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserData({ ...userData, profilePic: file });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00A699]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#484848]">
          Register
        </h1>
        {error && <p className="text-[#FF5A5F] mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-4">
            <label htmlFor="profilePic" className="relative cursor-pointer">
              <div className="w-24 h-24 rounded-full border-4 border-dotted border-[#00A699] flex items-center justify-center overflow-hidden">
                {userData.profilePic ? (
                  <img
                    src={URL.createObjectURL(userData.profilePic as File)}
                    alt="Profile Preview"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-[#767676] text-center">Upload Photo</span>
                )}
              </div>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#767676]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={userData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#767676]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#767676]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={userData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FC642D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#767676]">
          Already have an account?{" "}
          <a
            href="/"
            className="font-medium text-[#00A699] hover:text-[#FC642D]"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}