import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // axios instance with baseURL & token
import toast from "react-hot-toast";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [notificationEmail, setNotificationEmail] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating form with data:")
      const res = await API.post("/forms/createform", {
        name: title,
        notificationEmail,
        redirectUrl
      });
      console.log("Form created:", res.data);
      toast.success("Form created!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating form:", err);
      toast.error(err?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="email for notifications"
          value={notificationEmail}
          onChange={(e) => setNotificationEmail(e.target.value)}
        />

        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="Redirect URL (optional)"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Form
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
