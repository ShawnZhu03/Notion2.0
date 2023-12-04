import React, { useState, useEffect } from 'react';

function Sidebar() {
    const [folders, setFolders] = useState([]);
    const [newFolderName, setNewFolderName] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001/MainPage').then(response => {
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
    });

    //Add folders
    const handleAddFolder = (e) => {
        e.preventDefault();

        const newFolder = {
            name: newFolderName,
        };

        fetch('http://localhost:5001/folders', {
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
                setFolders([...folders, addedFolder]);
                setNewFolderName(''); 
            })
            .catch(error => {
                console.error('There was an error adding the folder:', error);
            });
    };

    return (
        <aside style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            {folders.map(folder => (
                <div key={folder._id} style={{ margin: '10px' }}>
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

