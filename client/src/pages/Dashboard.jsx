/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Clipboard } from 'lucide-react';
function Dashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me'); // Assuming you have a GET /auth/me endpoint
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  const fetchForms = async () => {
    try {
      const res = await API.get('/forms/myforms'); // Replace with your endpoint
      setData(res.data);
      console.log('Fetched forms:', res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const HandleDelete = async (formId) => {
    try {
      console.log('Deleting form with ID:', formId);
      await API.delete(`/forms/${formId}`); // Replace with your delete endpoint
      setData((prevData) => ({
        ...prevData,
        forms: prevData.forms.filter((form) => form._id !== formId),
      }));
      console.log('Form deleted successfully');
    } catch (err) {
      console.error('Error deleting form:', err);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchForms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {user && <h2 className="text-lg mb-4">Welcome, {user.username} 👋</h2>}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Your Forms</h3>
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Form
        </button>
      </div>
      {data.forms && data.forms.length > 0 ? (
        <ul className="space-y-4">

          {data.forms.map((form) => (
            <li key={form._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold">{form.formtitle}</h4>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="font-semibold">Endpoint:</span>
                <span>{form.endpoint}</span>
                <Clipboard size={18} />
              </p>
              <b className="text-gray-600">Notification Email:</b> {form.notificationEmail}
              <b className="text-gray-600">Redirect URL:</b> {form.redirectUrl}
              <button
                onClick={() => navigate(`/edit/${form._id}`)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Edit
              </button>
              {/* <button
                onClick={() => navigate(`/view/${form._id}`)}
                className="mt-2 ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View Submissions
              </button> */}
              <button
                onClick={() => HandleDelete(form._id)}
                className="mt-2 ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You have no forms yet. Create one
          to get started!</p>
      )}



    </div>
  );
}

export default Dashboard;
