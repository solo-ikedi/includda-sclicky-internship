// src/components/LinkItem.jsx
import React, { useCallback } from 'react';

// This component displays a single link with its URL, click count, and action buttons.
function LinkItem({ link, onLinkClick, onDeleteLink }) {
  // Function to handle copying the link URL to the clipboard.
  const handleCopyClick = useCallback(() => {
    // We create a temporary textarea element to copy text because
    // navigator.clipboard.writeText might not work reliably in all environments (like iframes).
    const textarea = document.createElement('textarea');
    textarea.value = link.url; // Put the link URL into the textarea.
    document.body.appendChild(textarea); // Add the textarea to the document.
    textarea.select(); // Select the text in the textarea.
    try {
      document.execCommand('copy'); // Execute the copy command.
      // In a real app, you'd use a nicer pop-up message (toast) instead of a simple alert.
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link.');
    } finally {
      document.body.removeChild(textarea); // Always remove the temporary textarea.
    }
  }, [link.url]); // This function only recreates if link.url changes.

  // Function to handle clicking on the link itself.
  const handleLinkNavigation = useCallback(() => {
    onLinkClick(link.id); // Tell the parent component (App.jsx) that this link was clicked.
    // Open the link in a new browser tab so the Sclicky app stays open.
    window.open(link.url, '_blank', 'noopener,noreferrer');
  }, [link.id, link.url, onLinkClick]); // This function only recreates if these props change.

  return (
    // The main container for a single link item, styled with Tailwind CSS.
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Section for the link URL and click count. */}
      <div className="flex-grow min-w-0">
        <a
          href="#" // We use '#' here and handle navigation with onClick to control the click count.
          onClick={handleLinkNavigation}
          // Tailwind CSS classes for the link text, making it look good and truncate long URLs.
          className="
            text-blue-600 hover:underline text-lg font-medium block truncate
            cursor-pointer transition-colors duration-200 ease-in-out
            hover:text-blue-700
          "
          title={link.url} // Shows the full URL when you hover over the link.
        >
          {link.url}
        </a>
        {/* Display the total clicks for this link. */}
        <p className="text-gray-600 text-sm mt-1">Total Clicks: <span className="font-semibold text-gray-800">{link.clicks}</span></p>
      </div>
      {/* Container for the Copy and Delete buttons. */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 ml-0 sm:ml-4 w-full sm:w-auto">
        {/* Copy button. */}
        <button
          onClick={handleCopyClick}
          // Tailwind CSS classes for the Copy button.
          className="
            bg-gray-200 text-gray-800 px-5 py-2 rounded-lg text-sm font-semibold
            hover:bg-gray-300 transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
            transform hover:scale-105 active:scale-95
          "
        >
          Copy
        </button>
        {/* Delete button. */}
        <button
          onClick={() => onDeleteLink(link.id)} // Call onDeleteLink (from App.jsx) with the link's ID.
          // Tailwind CSS classes for the Delete button.
          className="
            bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-semibold
            hover:bg-red-600 transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
            transform hover:scale-105 active:scale-95
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LinkItem;
