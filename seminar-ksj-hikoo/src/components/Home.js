import '../css/Home.css';
import Head from './Head';
import Search from './Search'
import { useState, useContext } from 'react';
import { EveryContext } from '../App';
import React from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom';

function Home() {

  const value = useContext(EveryContext)
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
