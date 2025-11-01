import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from './authService';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const res = await loginUser(email, password);
      const { requiresOtp } = res.data;

      localStorage.setItem('authEmail', email);
      if (requiresOtp) {
        navigate('/verify-otp');
      } else {
        localStorage.setItem('isAuthenticated', 'true');
window.dispatchEvent(new Event('authChange')); // ← déclenche le re-render
        navigate('/home');
      }
    } catch (err: unknown) {
      setErrors({
        general: axios.isAxiosError(err)
          ? err.response?.data?.message || 'Login failed'
          : 'Unexpected error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="grid gap-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
        </div>
        {errors.general && (
          <p className="text-red-600 text-sm">{errors.general}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {isLoading ? 'Please wait...' : 'Login'}
        </button>
        <p className="text-sm text-center mt-2">
          Haven't signed up yet?{' '}
          <Link to="/register" className="text-blue-600 underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
