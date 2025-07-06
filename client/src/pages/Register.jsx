import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', form);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input name="username" placeholder="Username" onChange={handleChange} required className="mb-4 p-2 border w-full" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="mb-4 p-2 border w-full" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="mb-2 p-2 border w-full" />
        <span className='mb-4'>Already Registered </span>
        <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
