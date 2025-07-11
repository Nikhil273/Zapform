import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateForm from './pages/CreateForm';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateCreate from './pages/UpdateCreate'; // Assuming this is the edit form page
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create"
          element=
          {
            <ProtectedRoute>
              <CreateForm />
            </ProtectedRoute>
          } />
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id"
          element={
            <ProtectedRoute>
              <UpdateCreate />
            </ProtectedRoute>
          } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

