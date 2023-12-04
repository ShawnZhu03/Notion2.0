import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FileList from './components/Content/FileList';
import FileUpload from './components/Content/FileUpload';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="page-body">
        <Sidebar />
        <FileList />
        <FileUpload/>
      </div>
    </div>
  );
}

export default MainPage;
