// src/components/LinkInput.jsx
import React, { useState } from 'react';

// This component is the input form for adding new links.
function LinkInput({ onAddLink }) {
  const [url, setUrl] = useState(''); // State to hold the text typed in the input field.
  const [platform, setPlatform] = useState('Other'); // State for the selected platform, default to 'Other'.
  const [error, setError] = useState(''); // State to show error messages.

  // This function runs when the "Save Link" button is clicked.
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading when the form is submitted.

    if (!url.trim()) { // Check if the input is empty or just spaces.
      setError('Please enter a link URL.');
      return; // Stop here if there's no link.
    }

    // A simple check to see if the text looks like a URL.
    const urlRegex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i;
    if (!urlRegex.test(url)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return; // Stop here if it's not a valid URL.
    }

    onAddLink(url, platform); // Call the function (from App.jsx) to add the new link, passing the platform.
    setUrl(''); // Clear the input field after the link is saved.
    setPlatform('Other'); // Reset platform to default.
    setError(''); // Clear any error messages.
  };

  return (
    // The form container, styled with Tailwind CSS for a nice look.
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Link URL input section */}
      <div className="mb-4">
        <label htmlFor="link-url" className="block text-lg font-semibold text-gray-800 mb-2">
          Link URL
        </label>
        <input
          type="url" // Tells the browser it's a URL, which can help with validation.
          id="link-url"
          value={url} // The input's value is controlled by our 'url' state.
          onChange={(e) => {
            setUrl(e.target.value); // Update 'url' state as the user types.
            setError(''); // Clear error message when user starts typing again.
          }}
          placeholder="https://example.com"
          // Tailwind CSS classes for styling the input field.
          className="
            w-full p-3 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            text-gray-900 placeholder-gray-500 text-base
            transition-all duration-200 ease-in-out
          "
          required // Makes the input field mandatory.
        />
      </div>

      {/* Platform dropdown section */}
      <div className="mb-6">
        <label htmlFor="platform-select" className="block text-lg font-semibold text-gray-800 mb-2">
          Platform
        </label>
        <div className="relative">
          <select
            id="platform-select"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="
              block appearance-none w-full bg-white border border-gray-300
              text-gray-900 py-3 px-4 pr-8 rounded-lg leading-tight
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            "
          >
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Other">Other</option>
          </select>
          {/* Custom arrow for the dropdown */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {/* Display error message if 'error' state has text. */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Save Link button */}
      <button
        type="submit" // This button submits the form.
        // Tailwind CSS classes for styling the button with a gradient, hover effects, and shadows.
        className="
          w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white
          px-8 py-3 rounded-lg
          hover:from-blue-700 hover:to-indigo-800
          focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2
          font-bold text-lg shadow-md transition-all duration-200 ease-in-out
          transform hover:scale-105 active:scale-95
        "
      >
        Save Link
      </button>
    </form>
  );
}

export default LinkInput;
