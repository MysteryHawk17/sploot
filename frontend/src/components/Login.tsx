import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, UserLoginData } from "../types";
import { useLoginHook } from "../hooks/useAuth";

export default function LandingPage() {
  const [loginData, setLoginData] = useState<UserLoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const { login } = useLoginHook();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);

      navigate("/blogs");
    } catch (err: unknown) {
      console.log(err);
      setError(
        (err as ApiError).response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00A699]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#484848]">
          Login
        </h1>
        {error && <p className="text-[#FF5A5F] mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#767676] rounded-md shadow-sm focus:outline-none focus:ring-[#00A699] focus:border-[#00A699]"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FC642D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#767676]">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-[#00A699] hover:text-[#FC642D]"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
