import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import auth from '../middlewares/auth'; 

const router = express.Router();

// Route to get the user's profile
router.get('/profile', auth, getProfile);

// Route to update the user's profile
router.put('/profile', auth, updateProfile);

export default router;
