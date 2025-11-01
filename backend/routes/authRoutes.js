const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/verify-otp', authController.verifyOtp);
// POST /api/auth/resend-otp
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  await user.save();
  sendOtpEmail(email, otp).catch((err) => console.error('Email failed:', err.message));
  res.json({ message: 'OTP resent' });
});


module.exports = router;
