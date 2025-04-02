import { apiClient } from './client';

export const languagesApi = {
  async getLanguages() {
    return apiClient.get('/languages');
  },

  async getLanguageById(id) {
    return apiClient.get(`/languages/${id}`);
  },

  async getLanguageDirections(languageId) {
    return apiClient.get(`/languages/${languageId}/directions`);
  },

  async getUserLanguages() {
    return apiClient.get('/user/languages');
  },

  async updateUserLanguages(languageIds) {
    return apiClient.put('/user/languages', { language_ids: languageIds });
  }
};
