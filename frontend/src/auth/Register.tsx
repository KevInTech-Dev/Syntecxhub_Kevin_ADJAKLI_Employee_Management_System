// import { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [lastName, setLastName] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [step, setStep] = useState<'register' | 'otp'>('register');
//   const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (isAuthenticated === 'true') {
//       navigate('/home');
//     }
//   }, [navigate]);

//   const validatePassword = (value: string) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
//     return regex.test(value);
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const newErrors: Record<string, string> = {};

//     if (!validatePassword(password)) {
//       newErrors.password = 'Must be 8+ chars, include upper, lower, and special';
//     }
//     if (password !== confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/register', {
//         lastName,
//         firstName,
//         email,
//         password,
//       });

//       if (res.data.requiresOtp) {
//         localStorage.setItem('authEmail', email);
//         setStep('otp');
//       }
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setErrors({ general: err.response?.data?.message || 'Registration failed' });
//       } else {
//         setErrors({ general: 'Unexpected error' });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const otp = otpDigits.join('');
//     if (otp.length !== 6) {
//       setErrors({ otp: 'OTP must be 6 digits' });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await axios.post('http://localhost:5000/api/auth/verify-otp', {
//         email: localStorage.getItem('authEmail'),
//         otp,
//       });

//       localStorage.setItem('isAuthenticated', 'true');
//       navigate('/home');
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         setErrors({ otp: err.response?.data?.message || 'OTP verification failed' });
//       } else {
//         setErrors({ otp: 'Unexpected error' });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         {step === 'register' ? 'Sign Up' : 'OTP Verification'}
//       </h2>

//       {step === 'register' ? (
//         <form onSubmit={handleRegister} className="grid gap-4">
//           <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border px-3 py-2 rounded-md" required />
//           <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border px-3 py-2 rounded-md" required />
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-3 py-2 rounded-md" required />
//           <div>
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-3 py-2 rounded-md w-full" required />
//             {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
//           </div>
//           <div>
//             <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border px-3 py-2 rounded-md w-full" required />
//             {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
//           </div>
//           {errors.general && <p className="text-red-600 text-sm">{errors.general}</p>}
//           <button type="submit" disabled={isLoading} className="bg-blue-600 text-white py-2 px-4 rounded-md">
//             {isLoading ? 'Please wait...' : 'Sign Up'}
//           </button>
//           <p className="text-sm text-center">
//             Already have an account?{' '}
//             <Link to="/" className="text-blue-600 underline">Log in</Link>
//           </p>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp} className="grid gap-4">
//           <p className="text-sm text-gray-700 text-center">OTP sent to <span className="font-semibold">{localStorage.getItem('authEmail')}</span></p>
//           <div className="flex justify-between gap-2">
//             {otpDigits.map((digit, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => {
//                   const val = e.target.value;
//                   const newDigits = [...otpDigits];
//                   newDigits[i] = val;
//                   setOtpDigits(newDigits);
//                 }}
//                 className="border px-3 py-2 rounded-md text-center w-10"
//               />
//             ))}
//           </div>
//           {errors.otp && <p className="text-red-600 text-sm">{errors.otp}</p>}
//           <button type="submit" disabled={isLoading} className="bg-green-600 text-white py-2 px-4 rounded-md">
//             {isLoading ? 'Please wait...' : 'Verify'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Register;


import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validatePassword(password)) {
      newErrors.password = 'Must be 8+ chars, include upper, lower, and special';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
        navigate('/verify-otp'); // ✅ redirection vers composant OTP centralisé
      } else {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
      }
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Registration failed'
        : 'Unexpected error';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

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
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
            required
          />
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        {errors.general && <p className="text-red-600 text-sm">{errors.general}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {isLoading ? 'Please wait...' : 'Sign Up'}
        </button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 underline">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
