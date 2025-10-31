import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = (email: string, password: string) =>
  axios.post(`${API_URL}/login`, { email, password });

export const verifyOtp = (email: string, otp: string) =>
  axios.post(`${API_URL}/verify-otp`, { email, otp });
