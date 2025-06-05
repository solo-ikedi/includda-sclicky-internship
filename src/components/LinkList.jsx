// src/components/LinkList.jsx
import React from 'react';
import LinkItem from './LinkItem'; // Import the LinkItem component to display each link.

// This component renders a list of LinkItem components.
function LinkList({ links, onLinkClick, onDeleteLink }) {
  // If there are no links saved, show a friendly message.
  if (!links || links.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
        <p className="text-gray-600 text-lg font-medium">No links saved yet. Add one above!</p>
      </div>
    );
  }

  // If there are links, display them.
  return (
    // Container for the list of links, with spacing between items.
    <div className="space-y-4">
      {/* Heading for the saved links section. */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Saved Links</h2>
      {/* Map over the 'links' array and create a LinkItem for each link. */}
      {links.map((link) => (
        <LinkItem
          key={link.id} // 'key' is important for React to efficiently update lists.
          link={link} // Pass the individual link data to LinkItem.
          onLinkClick={onLinkClick} // Pass the click handler down.
          onDeleteLink={onDeleteLink} // Pass the delete handler down.
        />
      ))}
    </div>
  );
}

export default LinkList;
