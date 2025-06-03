// src/App.jsx
import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage'; // Import your custom hook
import LoadingScreen from './components/LoadingScreen'; // Import the LoadingScreen component

function App() {
  // Use the custom hook for links state, initialized from localStorage
  // For now, it's an empty array. You'll add links via LinkInput later.
  const [links, setLinks] = useLocalStorage('sclicky_links', []);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a brief loading time for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Show loading screen for 500ms
    return () => clearTimeout(timer);
  }, []);

  // Placeholder functions for link management (you'll fill these out more later)
  const handleAddLink = (url) => {
    console.log("Add link called:", url);
    // Logic to add a new link to the 'links' array
    // (You'll expand this when you build LinkInput.jsx)
  };

  const handleLinkClick = (id) => {
    console.log("Link clicked:", id);
    // Logic to increment click count
    // (You'll expand this when you build LinkItem.jsx)
  };

  const handleDeleteLink = (id) => {
    console.log("Delete link called:", id);
    // Logic to delete a link
    // (You'll expand this when you build LinkItem.jsx)
  };

  // Display loading screen if app is still loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Sclicky Header - Basic Styling (Success will enhance this) */}
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
          Sclicky <span className="text-blue-600"></span>
        </h1>

        {/* Placeholder for LinkInput (You'll replace this with the component later) */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <p className="text-center text-lg text-gray-700">Link Input section will go here (Your task, Solomon!)</p>
        </div>

        {/* Placeholder for LinkList (Success will get this working) */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Saved Links</h2>
          <p className="text-center text-gray-600 text-lg">Link List section will go here (Success's task!)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
