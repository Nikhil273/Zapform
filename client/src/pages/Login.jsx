import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const api_res = await API.post('/auth/login', form);
      localStorage.setItem('token', api_res.data.token);
      toast.success('Login successful');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-blue-200 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="mb-4 p-2 border w-full" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required className="mb-2 p-2 border w-full" />
        <span className='mb-4'>New User </span>
        <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2">Login</button>
      </form>
    </div>
  );
}

export default Login;
