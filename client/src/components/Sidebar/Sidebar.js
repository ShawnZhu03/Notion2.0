
import React, { useState, useEffect } from 'react';

function Sidebar({ onFolderSelect, onAddFolder }) {
    // Name of new folder
    const [newFolderName, setNewFolderName] = useState('');
    // Current selected folder ID
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    // Folders state
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/MainPage', {
            method: 'GET',
        })
             
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFolders(data);
            })
            .catch(error => {
                console.error('There was an error fetching the folders:', error);
            });
    }, []);

    const handleFolderClick = (folderId) => {
        setSelectedFolderId(folderId);
        onFolderSelect(folderId);
    };

    // Add folders
    const handleAddFolder = (e) => {
        e.preventDefault();

        const newFolder = {
            folderName: newFolderName,
            owner: '656d52bbc51ea1bc6b0b6de0'
        };

        fetch('http://localhost:5001/MainPage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFolder)
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
                // Update folders state with the new folder
                setFolders(prevFolders => [...prevFolders, addedFolder]);
            })
            .catch(error => {
                console.error('There was an error adding the folder:', error);
            });
    };

    return (
        <aside style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            {folders.map(folder => (
                console.log(folder),
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
