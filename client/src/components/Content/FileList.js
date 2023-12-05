import React, { useEffect, useState } from 'react';

export default function FileList({ selectedFolderId }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:5001/files');
                const data = await response.json();
                setFiles(data.filter(file => file.folderId === selectedFolderId)); // Filter by selected folder
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        if (selectedFolderId) { // Only fetch if a folder is selected
            fetchFiles();
        }
    }, [selectedFolderId]); // Dependency array includes selectedFolderId

    const getFileUrl = (fileName) => {
        return `http://localhost:5001/uploads/${fileName}`;
    };

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id}>
                        <a href={getFileUrl(file.name)} target="_blank" rel="noopener noreferrer">
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
