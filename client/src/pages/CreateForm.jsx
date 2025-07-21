import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import {
  ArrowLeft,
  Plus,
  Mail,
  ExternalLink,
  FileText,
  Sparkles,
  Info,
  CheckCircle
} from 'lucide-react';

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    notificationEmail: "",
    redirectUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Form title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Form title must be at least 3 characters";
    }

    if (!formData.notificationEmail.trim()) {
      newErrors.notificationEmail = "Notification email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.notificationEmail)) {
      newErrors.notificationEmail = "Please enter a valid email address";
    }

    if (formData.redirectUrl && !formData.redirectUrl.startsWith('http')) {
      newErrors.redirectUrl = "Redirect URL must start with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsLoading(true);
    try {
      await API.post("/forms/createform", {
        name: formData.title,
        notificationEmail: formData.notificationEmail,
        redirectUrl: formData.redirectUrl,
      });
      toast.success("Form created successfully! 🎉");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error creating form:", err);
      toast.error(err?.response?.data?.msg || "Failed to create form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="light"
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Form
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mb-4">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Form
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Set up your form endpoint in seconds. We'll handle submissions and send you notifications.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">Form Configuration</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Configure your form settings below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Form Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Form Title *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.title ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter a descriptive form title"
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                This will be displayed in your dashboard and email notifications
              </p>
            </div>

            {/* Notification Email */}
            <div>
              <label htmlFor="notificationEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                Notification Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="notificationEmail"
                  name="notificationEmail"
                  type="email"
                  required
                  value={formData.notificationEmail}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.notificationEmail ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  placeholder="your-email@example.com"
                />
              </div>
              {errors.notificationEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.notificationEmail}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                You'll receive an email notification when someone submits this form
              </p>
            </div>

            {/* Redirect URL */}
            <div>
              <label htmlFor="redirectUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                Success Redirect URL
                <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="redirectUrl"
                  name="redirectUrl"
                  type="url"
                  value={formData.redirectUrl}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.redirectUrl ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  placeholder="https://yoursite.com/thank-you"
                />
              </div>
              {errors.redirectUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.redirectUrl}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Where users will be redirected after successful form submission
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900">What happens next?</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>You'll get a unique API endpoint for your form</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>Form submissions will be sent to your notification email</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>Users can be redirected to your success page</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Create Form
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
