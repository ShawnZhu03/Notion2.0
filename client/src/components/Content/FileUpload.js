import React from 'react';

export default function FileUpload() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            alert('File uploaded');
        } else {
            alert('Upload failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
