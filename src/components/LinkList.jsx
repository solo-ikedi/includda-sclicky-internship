// src/components/LinkList.jsx
import React from 'react';
import LinkItem from './LinkItem'; // Import the LinkItem component to display each link.

// This component renders a list of LinkItem components.
function LinkList({ links, onLinkClick, onDeleteLink, searchQuery, onSearchChange }) {
  // Filter links based on the search query.
  // It checks if the URL or platform (if available) includes the search text (case-insensitive).
  const filteredLinks = links.filter(link =>
    link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (link.platform && link.platform.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Heading for the saved links section. */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Saved Links</h2>

      {/* Search Bar */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
        <label htmlFor="link-search" className="sr-only">Search Links</label>
        <input
          type="text"
          id="link-search"
          placeholder="Type here to search links or platforms..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)} // Update search query in App.jsx
          className="
            w-full p-3 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            text-gray-900 placeholder-gray-500 text-base
            transition-all duration-200 ease-in-out
          "
        />
      </div>

      {/* Display filtered links or a message if no links match the search. */}
      {filteredLinks.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
          <p className="text-gray-600 text-lg font-medium">
            {searchQuery ? "No links found matching your search." : "No links saved yet. Add one above!"}
          </p>
        </div>
      ) : (
        // Map over the filtered links and render LinkItem for each.
        filteredLinks.map((link) => (
          <LinkItem
            key={link.id} // 'key' is important for React to efficiently update lists.
            link={link} // Pass the individual link data to LinkItem.
            onLinkClick={onLinkClick} // Pass the click handler down.
            onDeleteLink={onDeleteLink} // Pass the delete handler down.
          />
        ))
      )}
    </div>
  );
}

export default LinkList;
