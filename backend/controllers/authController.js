const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendOtpEmail = require('../utils/sendOtpEmail');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { lastName, firstName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();

    const newUser = new User({
      lastName,
      firstName,
      email,
      password: hashedPassword,
      otp,
      isVerified: false,
    });

    await newUser.save();

    // Envoi d'email en arrière-plan pour éviter les blocages
    sendOtpEmail(email, otp).catch((err) => {
      console.error('Email failed:', err.message);
    });

    res.status(201).json({
      message: 'Registration successful, OTP sent',
      requiresOtp: true,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      const otp = crypto.randomInt(100000, 999999).toString();
      user.otp = otp;
      await user.save();

      sendOtpEmail(email, otp).catch((err) => {
        console.error('Email failed:', err.message);
      });

      return res.json({ requiresOtp: true });
    }

    res.json({ requiresOtp: false });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed', error: error.message });
  }
};
