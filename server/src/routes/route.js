import express from 'express';
import * as authController from '../controllers/authController.js'
import * as profile from '../controllers/profile.js'
import * as auth from '../middleware/auth.js'

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
// router.post('/new', profile);

router.get('/profile', auth.authenticateToken, authController.getProfile)
router.get('/profile/check', auth.authenticateToken, profile.checkProfileCompleted);
router.post('/profile/complete', auth.authenticateToken, profile.completeProfile);

export default router;