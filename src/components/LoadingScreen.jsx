// src/components/LoadingScreen.jsx
import React from 'react';

// This component shows a loading screen.
function LoadingScreen() {
  return (
    // This div makes the loading screen take up the whole page and centers its content.
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* This div holds the loading animation and text, with some nice styling. */}
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        {/* The spinning circle animation. */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 mx-auto mb-6"></div>
        {/* The loading text. */}
        <p className="text-2xl font-semibold text-gray-700">Loading Sclicky...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
