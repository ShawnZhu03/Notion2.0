import React, { useEffect, useState } from 'react';

export default function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:5001/files');
                const data = await response.json();
                setFiles(data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, []);

    // Function to generate file URL
    const getFileUrl = (fileName) => {
        return `http://localhost:5001/uploads/${fileName}`; // Adjust the URL pattern as per your server's file serving logic
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
