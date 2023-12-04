import React, { useState, useEffect } from 'react';

function Sidebar() {
    const [folders, setFolders] = useState([]);

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
    }, []);

    return (
        <aside style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
            {folders.map(folder => (
                <div key={folder._id} style={{ margin: '10px' }}>
                    {folder.name}
                </div>
            ))}
        </aside>
    );
}

export default Sidebar;
