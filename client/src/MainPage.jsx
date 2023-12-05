import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FileList from './components/Content/FileList';
import FileUpload from './components/Content/FileUpload';
import './MainPage.scss';

const MainPage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Fetch folders and set them in the state
    fetch('http://localhost:5001/MainPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: username
      })
    })
    .then(response => response.json())
    .then(data => setFolders(data))
    .catch(error => console.error('Error fetching folders:', error));
    console.log(folders)
  }, [username]);

  // useEffect(() => {
  //   // Log selectedFolderId whenever it changes
  //   console.log(selectedFolderId);
  // }, [selectedFolderId]);

  const addNewFolderToList = (newFolder) => {
    setFolders(prevFolders => [...prevFolders, newFolder]);
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
        <div className="Content">
          <FileList selectedFolderId={selectedFolderId} />
          <FileUpload />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
