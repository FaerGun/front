import { apiClient } from './client';

export const authApi = {
  async register(email, password, name, phone) {
    return apiClient.post('/auth/register', {
      email,
      password,
      name,
      phone
    });
  },

  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
    }
    return response;
  },

  async logout() {
    localStorage.removeItem('token');
    return apiClient.post('/auth/logout');
  },

  async getCurrentUser() {
    return apiClient.get('/auth/me');
  },

  async updateProfile(data) {
    return apiClient.put('/auth/me', data);
  },

  async deleteAccount() {
    return apiClient.delete('/auth/me');
  }
}; 