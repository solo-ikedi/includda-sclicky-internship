// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage'; // Import your custom hook for storage.
import LoadingScreen from './components/LoadingScreen'; // Import the loading screen component.
import LinkInput from './components/LinkInput'; // Import the link input form component.
import LinkList from './components/LinkList'; // Import the list of links component.

// The main component that runs your Sclicky application.
function App() {
  // Use the custom 'useLocalStorage' hook to manage the list of links.
  // 'sclicky_links' is the key in local storage, and [] is the initial value if no links are saved.
  const [links, setLinks] = useLocalStorage('sclicky_links', []);
  const [isLoading, setIsLoading] = useState(true); // State to control the loading screen.

  // This effect runs once when the app starts to simulate a loading time.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 1 second, hide the loading screen.
    }, 10000); // 1-second loading screen.
    return () => clearTimeout(timer); // Clean up the timer if the component unmounts.
  }, []);

  // Function to add a new link to the list.
  // 'useCallback' helps optimize performance by preventing this function from recreating unnecessarily.
  const handleAddLink = useCallback((url) => {
    const newLink = {
      id: Date.now(), // Create a unique ID for the new link using the current timestamp.
      url: url,
      clicks: 0, // New links start with 0 clicks.
    };
    // Update the 'links' state by adding the new link to the existing list.
    setLinks((prevLinks) => [...prevLinks, newLink]);
  }, [setLinks]); // This function only recreates if 'setLinks' changes (which it won't).

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

  // If the app is still loading, show the LoadingScreen component.
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Once loading is done, render the main application content.
  return (
    // Main container for the whole app, with overall styling.
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Content wrapper to limit width and center content. */}
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Sclicky Header - Styled with Tailwind CSS. */}
        <h1 className="text-6xl font-extrabold text-center text-gray-900 tracking-tight leading-tight">
          Sclicky <span className="text-blue-600">.</span>
        </h1>

        {/* Link Input Section - Uses the LinkInput component. */}
        <LinkInput onAddLink={handleAddLink} />

        {/* Link List Section - Uses the LinkList component to display all links. */}
        <LinkList
          links={links} // Pass the current list of links.
          onLinkClick={handleLinkClick} // Pass the function to handle link clicks.
          onDeleteLink={handleDeleteLink} // Pass the function to handle link deletion.
        />
      </div>
    </div>
  );
}

export default App;
