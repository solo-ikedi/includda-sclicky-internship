// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage'; // Import your custom hook for storage.
import LoadingScreen from './components/LoadingScreen'; // Import the loading screen component.
import LinkInput from './components/LinkInput'; // Import the link input form component.
import LinkList from './components/LinkList'; // Import the list of links component.

// The main component that runs your Sclicky application.
function App() {
  // Use the custom 'useLocalStorage' hook to manage the list of links.
  const [links, setLinks] = useLocalStorage('sclicky_links', []);
  const [isLoading, setIsLoading] = useState(true); // State to control the loading screen.
  // State to manage which view is currently active: 'add' for adding links, 'list' for viewing links.
  const [currentView, setCurrentView] = useState('add');
  const [searchQuery, setSearchQuery] = useState(''); // State for the search bar.

  // This effect runs once when the app starts to simulate a loading time.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 1 second, hide the loading screen.
    }, 1000); // 1-second loading screen.
    return () => clearTimeout(timer); // Clean up the timer if the component unmounts.
  }, []);

  // Function to add a new link to the list.
  const handleAddLink = useCallback((url, platform) => {
    const newLink = {
      id: Date.now(), // Create a unique ID for the new link using the current timestamp.
      url: url,
      platform: platform, // Store the selected platform.
      clicks: 0, // New links start with 0 clicks.
    };
    // Update the 'links' state by adding the new link to the existing list.
    setLinks((prevLinks) => [...prevLinks, newLink]);
    setCurrentView('list'); // Switch to 'My Links' view after adding a link.
    setSearchQuery(''); // Clear search query when adding a new link
  }, [setLinks]); // This function only recreates if 'setLinks' changes.

  // Function to handle a link being clicked.
  const handleLinkClick = useCallback((id) => {
    // Find the link by its ID and increase its click count.
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, clicks: link.clicks + 1 } : link
      )
    );
  }, [setLinks]); // This function only recreates if 'setLinks' changes.

  // Function to delete a link from the list.
  const handleDeleteLink = useCallback((id) => {
    // Filter out the link with the matching ID to remove it from the list.
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  }, [setLinks]); // This function only recreates if 'setLinks' changes.

  // Handle search query change.
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // If the app is still loading, show the LoadingScreen component.
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Once loading is done, render the main application content.
  return (
    // Main container for the whole app, with overall styling and responsive design.
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans flex flex-col">
      {/* Content wrapper to limit width and center content. */}
      <div className="max-w-3xl mx-auto w-full flex-grow space-y-10">
        {/* Sclicky Header - Styled with Tailwind CSS. */}
        <h1 className="text-6xl font-extrabold text-center text-gray-900 tracking-tight leading-tight">
          Sclicky <span className="text-purple-600">.</span> {/* Changed dot color */}
        </h1>

        {/* Dynamic content based on currentView */}
        {currentView === 'add' ? (
          <LinkInput onAddLink={handleAddLink} />
        ) : (
          <LinkList
            links={links} // Pass the current list of links.
            onLinkClick={handleLinkClick} // Pass the function to handle link clicks.
            onDeleteLink={handleDeleteLink} // Pass the function to handle link deletion.
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        )}
      </div>

      {/* Navigation tabs at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 sm:relative sm:mt-10 sm:rounded-xl sm:max-w-xs sm:mx-auto">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => {
              setCurrentView('add');
              setSearchQuery(''); // Clear search when switching to add view
            }}
            className={`flex flex-col items-center justify-center p-2 text-sm font-medium transition-colors duration-200
                        ${currentView === 'add' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {/* SVG for Add Link Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Link
          </button>
          <button
            onClick={() => setCurrentView('list')}
            className={`flex flex-col items-center justify-center p-2 text-sm font-medium transition-colors duration-200
                        ${currentView === 'list' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {/* SVG for My Links Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            My Links
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
