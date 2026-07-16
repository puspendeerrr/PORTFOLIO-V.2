import ProfilePicture from '../models/ProfilePicture.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Get active profile picture (PUBLIC)
 */
export const getProfilePicture = asyncHandler(async (req, res) => {
  const profilePic = await ProfilePicture.findOne();

  res.status(200).json({
    success: true,
    data: profilePic,
  });
});

/**
 * Create or Update profile picture (ADMIN PROTECTED)
 */
export const updateProfilePicture = asyncHandler(async (req, res) => {
  // Validate request has a file
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file provided',
    });
  }

  // Check if profile picture already exists
  let profilePic = await ProfilePicture.findOne();

  // If exists, delete old image from Cloudinary
  if (profilePic && profilePic.imageUrl) {
    try {
      await deleteFromCloudinary(profilePic.imageUrl);
    } catch (err) {
      console.warn('Warning: Could not delete old image from Cloudinary:', err.message);
    }
  }

  // Upload new image to Cloudinary (using 'portfolio/profile' folder)
  const imageUrl = await uploadToCloudinary(
    req.file.buffer,
    req.file.originalname,
    'portfolio/profile'
  );

  if (profilePic) {
    // Update existing record
    profilePic.imageUrl = imageUrl;
    await profilePic.save();
  } else {
    // Create new record
    profilePic = new ProfilePicture({
      imageUrl,
    });
    await profilePic.save();
  }

  res.status(200).json({
    success: true,
    message: 'Profile picture updated successfully',
    data: profilePic,
  });
});
