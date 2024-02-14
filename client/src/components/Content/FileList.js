import React, { useEffect, useState } from 'react';

export default function FileList({ selectedFolderId }) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:5001/notes/files');
                const data = await response.json();
                setFiles(data.filter(file => file.folderId === selectedFolderId)); // problem with data.filter 
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        if (selectedFolderId) { 
            fetchFiles();
        }
    }, [selectedFolderId]); 

    const getFileUrl = (fileName) => {
        const url =  `http://localhost:5001/uploads/${fileName}`;
        console.log(url);
        return url;
    };

    return (
        <div>
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
