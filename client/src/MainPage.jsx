import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FileList from './components/Content/FileList';
import FileUpload from './components/Content/FileUpload';
import NotesArea from './components/notes/note';
import './MainPage.scss';

const MainPage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const username = localStorage.getItem("username");

  // Function to fetch folders
  const fetchFolders = () => {
    fetch('http://localhost:5001/MainPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner: username })
    })
      .then(response => response.json())
      .then(data => setFolders(data))
      .catch(error => console.error('Error fetching folders:', error));
  };

  useEffect(() => {
    fetchFolders();
  }, [username]);

  const addNewFolderToList = (newFolder) => {
    fetch('http://localhost:5001/AddFolder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFolder)
    })
      .then(response => response.json())
      .then(data => {
        fetchFolders(); 
      })
      .catch(error => console.error('Error adding folder:', error));
  };

  const handleAddNote = (newNote) => {
    // You can define logic here to update your state or UI after a note is added
  };

   return (
    <div className="main-page">
      <Sidebar
        folders={folders}
        selectedFolderId={selectedFolderId}
        onFolderSelect={setSelectedFolderId}
        onAddFolder={addNewFolderToList}
      />
      <div className="page-body">
        <div className="content">
          <FileList selectedFolderId={selectedFolderId} />
          <FileUpload />
          <NotesArea folderId={selectedFolderId} onAddNote={handleAddNote} /> 
        </div>
      </div>
    </div>
  );
}

export default MainPage;

