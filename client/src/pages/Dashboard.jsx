/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Clipboard } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  const fetchForms = async () => {
    try {
      const res = await API.get('/forms/myforms');
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (formId) => {
    try {
      await API.delete(`/forms/${formId}`);
      setData((prev) => ({
        ...prev,
        forms: prev.forms.filter((form) => form._id !== formId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCopyBtn = (endpoint) => {
    navigator.clipboard.writeText(endpoint);
    toast.success('Endpoint copied to clipboard!');
  };
  useEffect(() => {
    fetchUser();
    fetchForms();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      {/* Topbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      {user && (
        <h2 className="text-xl text-gray-800 mb-6">
          Welcome, <span className="font-semibold">{user.username}</span> 👋
        </h2>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">Your Forms</h3>
        <button
          onClick={() => navigate('/create')}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          + Create New Form
        </button>
      </div>

      {/* Form List */}
      {data.forms && data.forms.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.forms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
            >
              <h4 className="text-lg font-bold text-gray-800 mb-2">{form.formtitle}</h4>

              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Endpoint:</span>{' '}
                <code className="break-all text-indigo-600">{form.endpoint}</code>
              </div>

              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Notification Email:</span> {form.notificationEmail}</p>
                <p><span className="font-medium">Redirect URL:</span> {form.redirectUrl}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-2">

                <button
                  onClick={() => navigate(`/edit/${form._id}`)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"

                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(form._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCopyBtn(form.endpoint)}
                  title="Copy Endpoint"
                  className="text-indigo-600 flex items-center px-3 py-1 border border-indigo-200 rounded hover:bg-indigo-50"
                >
                  <Clipboard className="h-4 w-4 mr-1" />
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          You have no forms yet. Click <strong>+ Create New Form</strong> to get started!
        </p>
      )}
    </div>
  );
}

export default Dashboard;
