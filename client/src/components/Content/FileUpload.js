import React from 'react';

export default function FileUpload({ onFileUpload, selectedFolderId }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append('folderId', selectedFolderId);

    const response = await fetch('http://localhost:5001/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('File uploaded');
      onFileUpload(); 
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


