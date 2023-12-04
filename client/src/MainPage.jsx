import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FileList from './components/Content/FileList';
import FileUpload from './components/Content/FileUpload';
import './MainPage.scss';

const MainPage = () => {

  //current selected folder's ID
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  //list of folders from backend
  const [folders, setFolders] = useState([]);

  //fetch folder data
  useEffect(() => {
    fetch('http://localhost:5001/folders')
      .then(response => response.json())
      .then(data => setFolders(data))
      .catch(error => console.error('Error fetching folders:', error));
  }, []);

  //add new folder to list
  const addNewFolderToList = (newFolder) => {
    setFolders(prevFolders => [...prevFolders, newFolder]);
  };

  //update select folder state
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


