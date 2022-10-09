import '../css/Home.css';
import Head from './Head';
import Search from './Search'
import { useState, useContext } from 'react';
import React from 'react'
import { Navigate, Link } from 'react-router-dom';

function Home() {
    
  return (
    <div className="Wrap">
      <Head/>
      <Search>
      </Search>
      <div className='StoreList'>
        <p>가게목록</p>
        <Link to="/store/1"><button className='tostore'>/store/1로 이동</button></Link>
      </div>
    </div>
  );
}

export default Home;
