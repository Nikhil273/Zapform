import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // axios instance with baseURL & token
import { ToastContainer, toast } from 'react-toastify';

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [notificationEmail, setNotificationEmail] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await API.post("/forms/createform", {
        name: title,
        notificationEmail,
        redirectUrl,
      });
      toast.success("Form created!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating form:", err);
      toast.error(err?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create a New Form</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
            <input
              type="text"
              placeholder="Enter form title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URL</label>
            <input
              type="url"
              placeholder="https://your-redirect-url.com"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
