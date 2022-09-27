import '../css/Home.css';
import Head from './Head';
import Search from './Search'
import { useState } from 'react';
import React from 'react'
import { Navigate, Link } from 'react-router-dom';

function Home() {

  // 검색기능을 위한 search state 정의
  const [search, setSearch] = useState("");
  
  return (
    <div className="Wrap">
      <Head/>
      <Search
        search={search} setSearch={setSearch}>
      </Search>
      <div className='StoreList'>
        <p>가게목록</p>
        <Link to="/store"><button className='tostore'>/store로 이동</button></Link>
      </div>
    </div>
  );
}

export default Home;
