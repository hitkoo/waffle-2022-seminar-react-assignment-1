import '../css/Home.css';
import Head from './Head';
import Search from './Search'
import { useContext } from 'react';
import { IDContext } from '../App';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  const value = useContext(IDContext)
  const setStoreId = value.setStoreId
  const navigate = useNavigate();

  const ToStore = () => {
    setStoreId('1')
    navigate('/store/1')
  }

  return (
    <div className="Wrap">
      <Head />
      <Search>
      </Search>
      <div className='StoreList'>
        <p>가게목록</p>
        <button className='tostore' onClick={() => ToStore()}>/store/1로 이동</button>
      </div>
    </div>
  );
}

export default Home;
