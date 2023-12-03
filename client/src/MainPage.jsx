import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="main-page">
      <Navbar />
      <div className="page-body">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default MainPage;
