import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  getProfilePicture,
  updateProfilePicture,
} from '../controllers/profilePictureController.js';

const router = express.Router();

/**
 * GET /api/profile-picture
 * Fetch active profile picture (PUBLIC)
 */
router.get('/', getProfilePicture);

/**
 * POST /api/profile-picture
 * Upload/replace profile picture (ADMIN PROTECTED)
 * Requires: image file in multipart form-data
 */
router.post('/', authMiddleware, upload.single('image'), updateProfilePicture);

export default router;
