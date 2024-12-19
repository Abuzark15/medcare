import axios from "axios";
import { useState } from "react";

// Define the base URL for your API (adjust this based on your actual backend URL)
const API_URL = "http://localhost:2449/api"; // Replace with your actual API endpoint

// Function to login the user
export const login = async (email, password) => {
  try {
    // Send credentials to the backend to get the token
    const response = await axios.post(`${API_URL}/patients/login`, { email, password });

    // Extract the token and user data from the response
    const { token, user } = response.data;

    // Store the token and user info in localStorage or sessionStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Optionally store user data

    return { token, user }; // Return the token and user data
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Invalid credentials or server error.");
  }
};


export const register = async ({ name, email, phone, gender, password }) => {
  try {
    // Send registration data to the backend
    const response = await axios.post(`${API_URL}/patients/register`, {
      name,
      email,
      phone,
      gender,
      password,
    });

    // Extract the response data (user and token)
    const { user, token } = response.data;

    // Store the token and user info in localStorage or sessionStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Optionally store user data

    return { user, token }; // Return the token and user data
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error(error.response?.data?.error || "Registration failed. Please try again.");
  }
};
// Function to logout the user
export const logout = () => {
  // Remove the token and user info from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

// Function to get the current user from localStorage
export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

// Function to get the JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to refresh the token (if your backend supports it)
export const refreshToken = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found.");

    // Call API to refresh the token (assuming your API supports this)
    const response = await axios.post(`${API_URL}/refresh-token`, { token });

    // Update the localStorage with the new token
    const { newToken } = response.data;
    localStorage.setItem("token", newToken);

    return newToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw new Error("Unable to refresh token.");
  }
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1])); // Decode the JWT token
  const expiryTime = payload.exp * 1000; // Convert expiration time to milliseconds
  const currentTime = Date.now();

  return expiryTime < currentTime;
};
