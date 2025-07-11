import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { ToastContainer, toast } from 'react-toastify';

const EditForm = () => {
  const { id } = useParams();
  console.log("Editing form with ID:", id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    notificationEmail: "",
    redirectUrl: "",
  });

  // Fetch existing form data
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await API.get(`/forms/${id}`);
        console.log("Fetched form data:", res.data);
        console.log("Form title:", res.data.form.formtitle);
        setForm({
          name: res.data.form.formtitle || "",
          notificationEmail: res.data.form.notificationEmail || "",
          redirectUrl: res.data.form.redirectUrl || " ",
        });
      } catch (err) {
        console.error("Failed to fetch form data:", err);
        toast.error("Error loading form");
        navigate("/dashboard");
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/forms/${id}`, form);
      toast.success("Form updated successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Edit Form</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Email</label>
            <input
              type="email"
              name="notificationEmail"
              value={form.notificationEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URL</label>
            <input
              type="url"
              name="redirectUrl"
              value={form.redirectUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Update Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
