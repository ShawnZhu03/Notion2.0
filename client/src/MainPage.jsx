import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import FileList from './components/Content/FileList';
import FileUpload from './components/Content/FileUpload';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="main-page">
      <Sidebar />
      <div className="page-body">
        <div className="Content">
          <FileList />
          <FileUpload />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

