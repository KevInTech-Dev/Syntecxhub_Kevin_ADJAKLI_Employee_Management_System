import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from './authService';
import axios from 'axios';

const OtpVerify = () => {
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
const inputRefs = useRef<Array<HTMLInputElement>>(Array(6).fill(null));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('authEmail');

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpDigits.join('');

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    try {
      await verifyOtp(email!, otp);
      localStorage.setItem('isAuthenticated', 'true');
      window.dispatchEvent(new Event('authChange'));
      navigate('/home');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'OTP verification failed');
      } else {
        setError('Unexpected error');
      }
    }
  };

  const handleResend = async () => {
    setError('');
    setIsResending(true);
    try {
      await axios.post('http://localhost:5000/api/auth/resend-otp', { email });
      setOtpDigits(Array(6).fill(''));
      setTimer(300);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'OTP resend failed');
      } else {
        setError('Unexpected error');
      }
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
      <p className="text-sm text-gray-700 text-center mb-2">
        We’ve sent a 6-digit code to your email address: <span className="font-semibold">{email}</span>
      </p>

      <form onSubmit={handleVerify} className="grid gap-4">
        <div className="flex justify-between gap-2">
          {otpDigits.map((digit, i) => (
  <input
    key={i}
    type="text"
    inputMode="numeric"
    maxLength={1}
    value={digit}
    ref={(el) => {
      if (el) inputRefs.current[i] = el;
    }}
    onInput={(e) => {
      const val = (e.target as HTMLInputElement).value;
      if (!/^\d$/.test(val)) return;

      const newDigits = [...otpDigits];
      newDigits[i] = val;
      setOtpDigits(newDigits);

      // Avance automatiquement si possible
      if (i < 5) {
        inputRefs.current[i + 1]?.focus();
      }
    }}
    onKeyDown={(e) => {
      if (e.key === 'Backspace') {
        const newDigits = [...otpDigits];
        newDigits[i] = '';
        setOtpDigits(newDigits);

        // Recule si le champ est vide
        if (i > 0 && !otpDigits[i]) {
          inputRefs.current[i - 1]?.focus();
        }
      }
    }}
    className="border px-3 py-2 rounded-md text-center w-10"
  />
))}


        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-md"
        >
          Verify
        </button>

        <div className="text-sm text-center mt-2">
          {timer > 0 ? (
            <p className="text-gray-600">Code expires in: <span className="font-semibold">{formatTime(timer)}</span></p>
          ) : (
            <p className="text-red-500">Code expired. You can resend a new one.</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0 || isResending}
          className={`mt-2 text-blue-600 underline text-sm ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isResending ? 'Resending...' : 'Resend OTP'}
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
