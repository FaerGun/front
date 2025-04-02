export const API_CONFIG = {
  BASE_URL: '/api/v1',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      ME: '/auth/me',
      UPDATE_PROFILE: '/auth/me',
      DELETE_ACCOUNT: '/auth/me',
      DIRECTIONS: '/auth/directions',
      LANGUAGES: '/auth/languages',
      SELECT_DIRECTIONS: '/auth/select-directions',
      SELECT_LANGUAGES: '/auth/select-languages'
    },
    INTERVIEW: {
      START: '/interview/start',
      SUBMIT_ANSWER: '/interview/submit-answer',
      COMPLETE: '/interview/complete',
      HISTORY: '/interview/history'
    }
  }
}; 