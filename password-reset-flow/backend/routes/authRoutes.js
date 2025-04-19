const express = require('express');
const router = express.Router();
const {
  register, login, forgotPassword, resetPassword
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


const authMiddleware = require('../middleware/authMiddleware');
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

module.exports = router;
