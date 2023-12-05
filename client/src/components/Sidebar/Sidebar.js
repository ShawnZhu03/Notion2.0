import React, { useState, useEffect } from 'react';

function Sidebar({ onFolderSelect, onAddFolder, folders, selectedFolderId }) {
    const [newFolderName, setNewFolderName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const username = localStorage.getItem("username");

}




function Sidebar({ onFolderSelect, onAddFolder, folders, selectedFolderId }) {
  const [newFolderName, setNewFolderName] = useState('');
  const username = localStorage.getItem("username");

  const handleFolderClick = (folderId) => {
    console.log(folderId);
    onFolderSelect(folderId);
  };

  const handleAddFolder = (e) => {
    e.preventDefault();

    const newFolder = {
      folderName: newFolderName,
      owner: username
    };

    fetch('http://localhost:5001/AddFolder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFolder)
    })
    .then(response => response.json())
    .then(addedFolder => {
      onAddFolder(addedFolder);
      setNewFolderName('');
    })
    .catch(error => console.error('Error adding folder:', error));
  };

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
      {folders.map(folder => (
        <div
          key={folder._id}
          style={{
            margin: '10px',
            cursor: 'pointer',
            backgroundColor: folder._id === selectedFolderId ? '#f0f0f0' : 'transparent',
          }}
          onClick={() => handleFolderClick(folder._id)}
        >
          {folder.folderName}
        </div>
      ))}
      <form onSubmit={handleAddFolder}>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New Folder Name"
        />
        <button type="submit">Add Folder</button>
      </form>
    </aside>
  );
}

export default Sidebar;
