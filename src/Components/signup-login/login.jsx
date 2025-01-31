
"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://adaa-jaipur-backend.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userDetails = {
          email: data.user.emailD,
          name: data.user.nameD,
          phNumber: data.user.phNumberD,
          role: "user",
          dob: data.user.dobD,
        };

        sessionStorage.setItem("user", JSON.stringify(userDetails));
        navigate("/");
      } else {
        setError(data.msg || "Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8 px-4">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className=" text-sm font-medium text-gray-700 flex items-center"
              >
                <FaEnvelope className="mr-2" /> Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <FaLock className="mr-2" /> Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
