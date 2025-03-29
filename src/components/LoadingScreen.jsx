import React from 'react';
import '../styles/loading.css';

const LoadingScreen = ({ isLoading }) => {
  return (
    <div className={`loading-screen ${!isLoading ? 'hide' : ''}`}>
      <div className="loading-logo">
        <svg width="128" height="128" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 0L64 64H0L32 0Z" fill="#FF0000"/>
        </svg>
        
        <div className="arrows">
          <span className="arrow">→</span>
          <span className="arrow">←</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 