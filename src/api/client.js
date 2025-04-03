import { API_CONFIG } from './config';

class ApiClient {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Добавляем токен авторизации, если он есть
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { detail: 'Ошибка при обработке ответа сервера' };
      }

      if (!response.ok) {
        // Обработка ошибок FastAPI
        const error = new Error(data.detail || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.data = data;
        
        // Специальная обработка для ошибок авторизации
        if (response.status === 401) {
          localStorage.removeItem('token');
          // Убираем перенаправление на главную страницу
          // window.location.href = '/';
        }
        
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Неизвестная ошибка при выполнении запроса');
      }
    }
  }

  // Методы для работы с API
  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(); 