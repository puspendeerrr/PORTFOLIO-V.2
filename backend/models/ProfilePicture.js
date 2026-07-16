import mongoose from 'mongoose';

/**
 * ProfilePicture Schema - Stores the single active profile picture URL
 *
 * Fields:
 * - imageUrl: URL of the image stored in Cloudinary
 * - createdAt: Timestamp when image was uploaded
 * - updatedAt: Timestamp when image was last updated
 */
const profilePictureSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'profile_picture'
  }
);

const ProfilePicture = mongoose.model('ProfilePicture', profilePictureSchema);

export default ProfilePicture;
