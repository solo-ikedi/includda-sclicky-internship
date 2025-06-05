// src/components/LinkInput.jsx
import React, { useState } from 'react';

// This component is the input form for adding new links.
function LinkInput({ onAddLink }) {
  const [url, setUrl] = useState(''); // State to hold the text typed in the input field.
  const [error, setError] = useState(''); // State to show error messages.

  // This function runs when the "Save Link" button is clicked.
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading when the form is submitted.

    if (!url.trim()) { // Check if the input is empty or just spaces.
      setError('Please enter a link.');
      return; // Stop here if there's no link.
    }

    // A simple check to see if the text looks like a URL.
    const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i;
    if (!urlRegex.test(url)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return; // Stop here if it's not a valid URL.
    }

    onAddLink(url); // Call the function (from App.jsx) to add the new link.
    setUrl(''); // Clear the input field after the link is saved.
    setError(''); // Clear any error messages.
  };

  return (
    // The form container, styled with Tailwind CSS for a nice look.
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Label for the input field. */}
      <label htmlFor="link-url" className="block text-lg font-semibold text-gray-800 mb-3">
        Enter your social media link
      </label>
      {/* A flexible container for the input and button, adjusting for small screens. */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* The input field for the URL. */}
        <input
          type="url" // Tells the browser it's a URL, which can help with validation.
          id="link-url"
          value={url} // The input's value is controlled by our 'url' state.
          onChange={(e) => {
            setUrl(e.target.value); // Update 'url' state as the user types.
            setError(''); // Clear error message when user starts typing again.
          }}
          placeholder="e.g., https://twitter.com/yourprofile"
          // Tailwind CSS classes for styling the input field.
          className="
            flex-grow p-3 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none
            focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-transparent
            text-gray-900 placeholder-gray-500 text-base
            transition-all duration-200 ease-in-out
          "
          required // Makes the input field mandatory.
        />
        {/* The "Save Link" button. */}
        <button
          type="submit" // This button submits the form.
          // Tailwind CSS classes for styling the button with a gradient, hover effects, and shadows.
          className="
            bg-gradient-to-r from-blue-600 to-indigo-700 text-white
            px-8 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none
            hover:from-blue-700 hover:to-indigo-800
            focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2
            font-bold text-lg shadow-md transition-all duration-200 ease-in-out
            transform hover:scale-105 active:scale-95
          "
        >
          Save Link
        </button>
      </div>
      {/* Display error message if 'error' state has text. */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}

export default LinkInput;
