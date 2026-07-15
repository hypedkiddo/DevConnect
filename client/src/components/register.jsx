"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import Layout from "./layout";

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: "File must be under 5MB",
      }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: "Invalid image type",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, profilePhoto: file }));

    const reader = new FileReader();
    reader.onloadend = () => setProfilePhotoPreview(reader.result);
    reader.readAsDataURL(file);

    if (errors.profilePhoto) {
      setErrors((prev) => ({ ...prev, profilePhoto: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (formData.bio && formData.bio.length > 500)
      newErrors.bio = "Bio must be under 500 characters";

    return newErrors;
  };

  //handle register user function
  const registerUser = async (formData) => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    data.append("bio", formData.bio);
    if (formData.avatarUrl ) {
      data.append("avatarUrl ", formData.avatarUrl);
    }

    //the important work
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/register",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("User registered:", data);
      onRegister(data); // optionally pass to parent
      navigate("/login"); // or wherever you want
    },
    onError: (error) => {
      console.error("Registration error:", error);
      alert(error?.response?.data?.message || "Registration failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    mutation.mutate(formData,{
      onSettled:()=>setIsSubmitting(false),
    })    

  };

  return (
    <Layout>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Join the developer community today
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  username
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border ${
                    errors.fullName ? "border-red-300" : "border-gray-300"
                  } rounded-md sm:text-sm`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md sm:text-sm`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md sm:text-sm`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md sm:text-sm`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio (Optional)
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={500}
                  className={`mt-1 w-full px-3 py-2 border ${
                    errors.bio ? "border-red-300" : "border-gray-300"
                  } rounded-md sm:text-sm resize-none`}
                  placeholder="Tell us about yourself..."
                />
                <div className="flex justify-between text-sm mt-1">
                  {errors.bio && <p className="text-red-600">{errors.bio}</p>}
                  <p className="text-gray-500 ml-auto">
                    {formData.bio.length}/500
                  </p>
                </div>
              </div>

              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo (Optional)
                </label>
                <div className="flex items-center space-x-4">
                  {profilePhotoPreview ? (
                    <img
                      className="h-16 w-16 rounded-full object-cover border"
                      src={profilePhotoPreview}
                      alt="Profile"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      id="profilePhoto"
                      name="avatarUrl"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
                    >
                      Upload Photo
                    </label>
                    {formData.avatarUrl  && (
                      <p className="text-sm text-gray-600">
                        {formData.avatarUrl.name}
                      </p>
                    )}
                  </div>
                </div>
                {errors.profilePhoto && (
                  <p className="text-sm text-red-600">{errors.profilePhoto}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            {/* Switch to Login */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
