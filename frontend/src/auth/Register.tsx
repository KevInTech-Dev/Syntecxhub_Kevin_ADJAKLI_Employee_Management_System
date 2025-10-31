import  { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



const Register = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'register' | 'otp'>('register');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/home');
    }
  }, [navigate]);
const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
  lastName,
  firstName,
  email,
  password,
});


      if (res.data.requiresOtp) {
        localStorage.setItem('authEmail', email);
        setStep('otp');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Registration failed');
      } else {
        setError('Unexpected error');
      }
    }
    finally {
  setIsLoading(false);
}
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
try {
      
      await axios.post('http://localhost:5000/api/auth/verify-otp', {
  email,
  otp,
});


      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'OTP verification failed');
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
      <h2 className="text-2xl font-bold mb-4">
        {step === 'register' ? 'Sign Up' : 'OTP Verification'}
      </h2>
      {error && <p className="text-red-600">{error}</p>}

      {step === 'register' ? (
        <form onSubmit={handleRegister} className="grid gap-4">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border px-3 py-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border px-3 py-2 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-3 py-2 rounded-md"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
           {isLoading ? 'Please wait...' : 'Sign Up'}
          </button>
          <p className="text-sm mt-2">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 underline">
              Log in
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="grid gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border px-3 py-2 rounded-md"
            required
          />
          {isLoading && <p className="text-gray-500 text-sm">Processing...</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white py-2 px-4 rounded-md"
          >
            {isLoading ? 'Please wait...' : 'Verify'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
