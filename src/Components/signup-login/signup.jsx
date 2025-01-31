
"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaLock } from 'react-icons/fa';

export default function Signup() {
  const [name, setName] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validation patterns
    const namePattern = /^[A-Za-z\s]{2,}$/;
    const phonePattern = /^[6-9][0-9]{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validation checks
    if (!namePattern.test(name)) {
      setError("Name must contain only letters and spaces, with at least 2 characters.");
      setIsSubmitting(false);
      return;
    }

    if (!phonePattern.test(phNumber)) {
      setError("Phone number must be a valid 10-digit number starting with a digit between 6 and 9.");
      setIsSubmitting(false);
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!address.trim()) {
      setError("Address is required for users.");
      setIsSubmitting(false);
      return;
    }

    const dobDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    if (
      age < 12 ||
      (age === 12 && today < new Date(dobDate.setFullYear(today.getFullYear())))
    ) {
      setError("You must be at least 12 years old.");
      setIsSubmitting(false);
      return;
    }

    if (!passwordPattern.test(password)) {
      setError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      setIsSubmitting(false);
      return;
    }

    if (password !== cfmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    const userData = {
      name,
      phNumber,
      email,
      address,
      dob: dateOfBirth,
      password,
    };

    try {
      const response = await fetch("https://adaa-jaipur-backend.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(data.newUser));
        navigate("/");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Error connecting to the server." + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8 px-4">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
            <p className="mt-2 text-gray-600">Enter your information to get started</p>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  <FaUser className="inline-block mr-2" /> Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  <FaPhone className="inline-block mr-2" /> Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phNumber}
                  onChange={(e) => setPhNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <FaEnvelope className="inline-block mr-2" /> Email
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
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                <FaMapMarkerAlt className="inline-block mr-2" /> Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                <FaCalendarAlt className="inline-block mr-2" /> Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                <FaLock className="inline-block mr-2" /> Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={cfmPassword}
                onChange={(e) => setCfmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <button
  type="submit"
  disabled={isSubmitting}
  className={`w-full rounded-md bg-orange-700 px-4 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50`}
>
  {isSubmitting ? "Creating account..." : "Create account"}
</button>
          </form>

          <p className={`mt=6 text-center text-sm text-gray=600`}>
            Already have an account?{" "}
            <Link to="/login" className={`font-medium text-orange=600 hover:text-orange=500`}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
