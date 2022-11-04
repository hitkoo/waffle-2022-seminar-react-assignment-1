import '../css/Home.css';
import Head from './Head';
import Search from './Search'
import { useContext, useEffect, useState } from 'react';
import { IDContext } from '../App';
import React from 'react'
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import { rateToStarBig } from './function';

function Home() {

  const [Load, setLoad] = useState(true);
  const [Owners, setOwners] = useState("");
  const navigate = useNavigate();
  const value = useContext(IDContext)
  const setStore = value.setStore

  useEffect(() => {
    axios
      .get("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/")
      .then((res) => {
        setOwners(res.data)
        setLoad(false)
        setStore({id : "", name : "", ownername : ""})
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const ShowOwnerList = (a) => {
    return (a.map((list) => (
      list.store_name != null &&
      <div key={list.id} className="Store" onClick={() => { navigate(`/store/${list.id}`) }}>
        <span className='storeName'>{list.store_name}</span>
        <span className='ownerName'>{list.username}</span>
        <span className='storeDes'>{list.store_description}</span>
        <span className='storeRate'>{rateToStarBig(8)}</span>
      </div>
    )))
  }

  return (
    Load ?
      <Loading /> :
      <div className="Wrap">
        <Head />
        <Search>
        </Search>
        <div className='StoreList'>
          <div className='OwnersContainer'>
            {ShowOwnerList(Owners)}
          </div>
        </div>
      </div>
  )
}
export default Home;
