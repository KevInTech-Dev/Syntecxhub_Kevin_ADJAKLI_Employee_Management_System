import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from './authService';
import axios from 'axios'
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated === 'true') {
    navigate('/home');
  }
}, [navigate]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
try {
      const res = await loginUser(email, password);
      const { requiresOtp } = res.data;

      localStorage.setItem('authEmail', email);
      if (requiresOtp) {
        navigate('/verify-otp');
      } else {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
      }
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.message || 'Server error');
  } else {
    setError('Unexpected error');
  }
}
finally {
  setIsLoading(false);
}
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleLogin} className="grid gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        {isLoading && <p className="text-gray-500 text-sm">Processing...</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {isLoading ? 'Please wait...' : 'Login'}
        </button>
        <p className="text-sm mt-2">
  haven't signed up yet ?{' '}
  <Link to="/register" className="text-blue-600 underline">
    Sign up for an account
  </Link>
</p>

      </form>
    </div>
  );
};

export default Login;
