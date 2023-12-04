import React, { useState } from 'react';

function Sidebar({ folders, onFolderSelect, onAddFolder }) {
    //Name of new folder 
    const [newFolderName, setNewFolderName] = useState('');
    // current selected folder ID 
    const [selectedFolderId, setSelectedFolderId] = useState(null);


    const handleFolderClick = (folderId) => {
        setSelectedFolderId(folderId);
        onFolderSelect(folderId);
    };

    //Add folders
    const handleAddFolder = (e) => {
        e.preventDefault();

        const newFolder = {
            name: newFolderName,
        };

        fetch('http://localhost:5001/Addfolders', { //This is either not reaching Addfolders or the backend is not doing something right!
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFolder),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(addedFolder => {
                onAddFolder(addedFolder);
                setNewFolderName('');
            })
            .catch(error => {
                console.error('There was an error adding the folder:', error);
            });
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
                    {folder.name}
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

