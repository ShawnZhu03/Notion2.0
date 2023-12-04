import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FileList from './components/Content/FileList';
import FileUpload from './components/Content/FileUpload';
import './MainPage.scss';

const MainPage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folders, setFolders] = useState([]);
  const addNewFolderToList = (newFolder) => {
    setFolders(prevFolders => [...prevFolders, newFolder]);
  };
  useEffect(() => {
    fetch('http://localhost:5001/folders') // Adjust the endpoint as necessary
      .then(response => response.json())
      .then(data => setFolders(data))
      .catch(error => console.error('Error fetching folders:', error));
  }, []);

  const handleFolderSelect = (folderId) => {
    setSelectedFolderId(folderId);
  };

  return (
    <div className="main-page">
      <Sidebar folders={folders} onFolderSelect={handleFolderSelect} onAddFolder={addNewFolderToList} />
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


