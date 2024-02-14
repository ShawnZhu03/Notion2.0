import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NotesArea from './components/notes/NotesArea';
import ShareFolder from './components/Content/ShareFolder';
import './MainPage.css';
const MainPage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [refreshFileList, setRefreshFileList] = useState(false); // State to trigger refresh

  const username = localStorage.getItem("username");

  // Function to fetch folders
  const fetchFolders = () => {
    fetch('http://localhost:5001/folders/MainPage', {
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
    fetch('http://localhost:5001/folders/AddFolder', {
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

  // Function to refresh file list
  const handleFileUploadSuccess = () => {
    fetchFolders(selectedFolderId);
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
        <h2>Welcome {localStorage.getItem('username')}</h2>

        <div className="content">
          <ShareFolder folderId={selectedFolderId} />
          <NotesArea folderId={selectedFolderId}/> 
        </div>
      </div>
    </div>
  );
}

export default MainPage;

