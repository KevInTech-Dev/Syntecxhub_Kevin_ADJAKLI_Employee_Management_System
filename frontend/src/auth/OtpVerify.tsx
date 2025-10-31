import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from './authService';
import axios from 'axios';


const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('authEmail');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtp(email!, otp);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.message || 'Server error');
  } else {
    setError('Unexpected error');
  }
}

  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleVerify} className="grid gap-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
