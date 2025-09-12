const startInterview = async () => {
  try {
    const response = await fetch('/api/interview/start', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Ошибка при запуске интервью');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  }
}; 