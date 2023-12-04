import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="page-body">
        <Sidebar />
      </div>
    </div>
  );
}

export default MainPage;
