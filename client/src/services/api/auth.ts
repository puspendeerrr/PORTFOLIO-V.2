/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import BASE_URL from './config';
import { handleApiError, isUnauthorizedError } from './errorHandler';

interface LoginResponse {
  success: boolean;
  token: string;
  expiresIn?: string;
  message?: string;
}

/**
 * Login with password
 */
export const authService = {
  async login(password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (jsonErr) {
          try {
            const text = await response.text();
            errorMessage = text || errorMessage;
          } catch (textErr) {
            // ignore
          }
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Verify token validity
   */
  async verifyToken(token: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Token expired or invalid');
        }
        throw new Error('Failed to verify token');
      }

      return await response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
