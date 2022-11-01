import '../css/Store.css';
import MenuBox from './MenuBox';
import Head from './Head';
import Search from './Search'
import { useState } from 'react';
import React from 'react'

function Store() {

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

export default Store;
