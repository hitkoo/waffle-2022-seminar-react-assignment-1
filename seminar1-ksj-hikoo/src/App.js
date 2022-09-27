import './App.css';
import MenuBox from './components/MenuBox';
import Head from './components/Head';
import Search from './components/Search'
import { useState } from 'react';
import React from 'react'

function App() {

  // 검색기능을 위한 search state 정의
  const [search, setSearch] = useState("");

  
  return (
    <div className="Wrap">
      <Head/>
      <Search
        search={search} setSearch={setSearch}>
      </Search>
      <MenuBox
        search={search}>
      </MenuBox>
    </div>
  );
}

export default App;
