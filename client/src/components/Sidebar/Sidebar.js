import React, { useState } from 'react';

function Sidebar({ onFolderSelect, onAddFolder, folders, selectedFolderId }) {
    const [newFolderName, setNewFolderName] = useState('');
    const username = localStorage.getItem("username");
    const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePicture") || 'path/to/default/profile.png');

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

    const handleProfilePictureUpload = (e) => {
 
    };

    return (
        <aside style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img
                    src={profilePicture}
                    alt="Profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
                <input
                    type="file"
                    onChange={handleProfilePictureUpload}
                    style={{ display: 'block', margin: '10px auto' }}
                />
            </div>
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

