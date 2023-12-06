import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FileList from './components/Content/FileList';
import FileUpload from './components/Content/FileUpload';
import NotesArea from './components/notes/NotesArea';
import './MainPage.scss';
import ShareFolder from './components/Content/ShareFolder';

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
  //render when new folder is added
  useEffect(() => {
    fetchFolders();
  }, []);
  

  const addNewFolderToList = (newFolder) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
    fetchFolders();
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
          <ShareFolder folderId={selectedFolderId} />
          <NotesArea folderId={selectedFolderId}/> 
        </div>
      </div>
    </div>
  );
}

export default MainPage;

