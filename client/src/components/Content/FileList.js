import React, { useEffect, useState } from 'react';

export default function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch('http://localhost:5001/files');
            const data = await response.json();
            setFiles(data);
        };
        fetchFiles();
    }, []);

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
}
