import { apiClient } from './client';
import { API_CONFIG } from './config';

export const authApi = {
  async register(email, password, name, phone) {
    return apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
      name,
      phone
    });
  },

  async login(email, password) {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, password });
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
    }
    return response;
  },

  async logout() {
    localStorage.removeItem('token');
    return apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
  },

  async getCurrentUser() {
    return apiClient.get(API_CONFIG.ENDPOINTS.AUTH.ME);
  },

  async updateProfile(data) {
    return apiClient.put(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE, data);
  },

  async deleteAccount() {
    return apiClient.delete(API_CONFIG.ENDPOINTS.AUTH.DELETE_ACCOUNT);
  },

  async getDirections() {
    return apiClient.get(API_CONFIG.ENDPOINTS.AUTH.DIRECTIONS);
  },

  async getLanguages() {
    return apiClient.get(API_CONFIG.ENDPOINTS.AUTH.LANGUAGES);
  },

  async selectDirections(directionIds) {
    return apiClient.post(API_CONFIG.ENDPOINTS.AUTH.SELECT_DIRECTIONS, { direction_ids: directionIds });
  },

  async selectLanguages(languageIds) {
    return apiClient.post(API_CONFIG.ENDPOINTS.AUTH.SELECT_LANGUAGES, { language_ids: languageIds });
  }
}; 