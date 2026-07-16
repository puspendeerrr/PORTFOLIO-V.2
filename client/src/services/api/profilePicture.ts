/**
 * PROFILE PICTURE SERVICE
 * Handles profile picture management API calls
 */

import BASE_URL from './config';
import { handleApiError } from './errorHandler';

export interface ProfilePicture {
  _id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfilePictureResponse {
  success: boolean;
  data: ProfilePicture | null;
  message?: string;
}

export const profilePictureService = {
  /**
   * Get active profile picture (public)
   */
  async get(): Promise<ProfilePictureResponse> {
    try {
      const response = await fetch(`${BASE_URL}/profile-picture`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile picture');
      }

      return await response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Upload/replace profile picture (admin)
   */
  async upload(token: string, file: File): Promise<ProfilePictureResponse> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${BASE_URL}/profile-picture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Note: Content-Type is omitted so fetch automatically formats boundary for multipart/form-data
        },
        body: formData
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Token expired or invalid');
        }
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload profile picture');
      }

      return await response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
