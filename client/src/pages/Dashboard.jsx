/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import {
  Clipboard,
  Plus,
  LogOut,
  Edit3,
  Trash2,
  Mail,
  ExternalLink,
  Calendar,
  BarChart3,
  Settings,
  User
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId, formTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${formTitle}"?`)) return;

    try {
      await API.delete(`/forms/${formId}`);
      setData((prev) => ({
        ...prev,
        forms: prev.forms.filter((form) => form._id !== formId),
      }));
      toast.success('Form deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete form');
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

  const getTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diffInHours = Math.floor((now - created) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return created.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Zapform
                </h1>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {user && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.username}! 👋
            </h2>
            <p className="text-gray-600">
              Manage your forms and track submissions from your dashboard.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Forms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.forms ? data.forms.length : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Forms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.forms ? data.forms.length : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Plan</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">
                  {user?.plan || 'Free'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Your Forms</h3>
              <button
                onClick={() => navigate('/create')}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Form
              </button>
            </div>
          </div>

          <div className="p-6">
            {data.forms && data.forms.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {data.forms.map((form) => (
                  <div
                    key={form._id}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200"
                  >
                    {/* Form Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                        {form.formtitle}
                      </h4>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => navigate(`/edit/${form._id}`)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                          title="Edit Form"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(form._id, form.formtitle)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete Form"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Form Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{form.notificationEmail}</span>
                      </div>

                      {form.redirectUrl && (
                        <div className="flex items-center text-sm text-gray-600">
                          <ExternalLink className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="truncate">{form.redirectUrl}</span>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Created {getTimeAgo(form.createdAt)}</span>
                      </div>
                    </div>

                    {/* Endpoint */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">API Endpoint:</p>
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <code className="text-sm text-indigo-600 font-mono truncate mr-2">
                          {form.endpoint}
                        </code>
                        <button
                          onClick={() => handleCopyBtn(form.endpoint)}
                          className="flex items-center space-x-1 px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200"
                          title="Copy Endpoint"
                        >
                          <Clipboard className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/edit/${form._id}`)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(form._id, form.formtitle)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating your first form to collect submissions.
                </p>
                <button
                  onClick={() => navigate('/create')}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Form
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
