import { apiClient } from './client';

export const languagesApi = {
  async getLanguages() {
    return apiClient.get('/directions');
  },

  async getDirectionById(id) {
    return apiClient.get(`/directions/${id}`);
  },

  async getDirectionDirections(directionId) {
    return apiClient.get(`/directions/${directionId}/directions`);
  },

  async getUserDirections() {
    return apiClient.get('/user/directions');
  },

  async updateUserDirections(directionIds) {
    return apiClient.put('/user/directions', { direction_ids: directionIds });
  }
};