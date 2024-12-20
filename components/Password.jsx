import React, { useState } from "react";

const PasswordInput = () => {
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  // Validate the password on every change
  const validatePassword = (value) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasMinLength = value.length >= 8;

    setRequirements({
      length: hasMinLength,
      uppercase: hasUppercase,
      number: hasNumber,
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <label
        htmlFor="password"
        className="block text-gray-700 font-medium mb-2"
      >
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleChange}
          className={`w-full border ${
            password && Object.values(requirements).includes(false)
              ? "border-red-500"
              : "border-gray-300"
          } rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        <span className="absolute right-3 top-3 text-gray-400">
          {/* Icon: lock */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </span>
      </div>
      <p className="text-sm text-red-500 mt-2">
        {password && Object.values(requirements).includes(false)
          ? "Weak password. Must contain at least:"
          : ""}
      </p>
      <ul className="mt-2 space-y-1">
        <li
          className={`flex items-center text-sm ${
            requirements.length ? "text-green-600" : "text-gray-500"
          }`}
        >
          {requirements.length ? "✅" : "❌"} At least 8 characters
        </li>
        <li
          className={`flex items-center text-sm ${
            requirements.uppercase ? "text-green-600" : "text-gray-500"
          }`}
        >
          {requirements.uppercase ? "✅" : "❌"} At least 1 uppercase
        </li>
        <li
          className={`flex items-center text-sm ${
            requirements.number ? "text-green-600" : "text-gray-500"
          }`}
        >
          {requirements.number ? "✅" : "❌"} At least 1 number
        </li>
      </ul>
    </div>
  );
};

export default PasswordInput;
