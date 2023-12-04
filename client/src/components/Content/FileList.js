import React, { useEffect, useState } from 'react';

export default function FileList({ selectedFolderId }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (selectedFolderId) {
            fetchFiles(selectedFolderId);
        } else {
            setFiles([]); // Clear files if no folder is selected
        }
    }, [selectedFolderId]);

    const fetchFiles = async (folderId) => {
        try {
            const response = await fetch(`http://localhost:5001/files?folderId=${folderId}`);
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const deleteFile = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/files/${id}`, { method: 'DELETE' });
            if (response.ok) {
                // Remove the file from the state
                setFiles(files.filter(file => file._id !== id));
            } else {
                console.error('Failed to delete the file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

     return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id}>
                        {/* ... existing file rendering logic ... */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
