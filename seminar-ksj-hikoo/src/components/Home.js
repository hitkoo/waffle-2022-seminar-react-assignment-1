import '../css/Home.css';
import Head from './Head';
import Search from './Search'
import { useContext, useEffect, useState } from 'react';
import { IDContext } from '../App';
import React from 'react'
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

function Home() {

  const [Load, setLoad] = useState(true);
  const [Owners, setOwners] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/")
      .then((res) => {
        setOwners(res.data)
        setLoad(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const ShowOwnerList = (a) => {
    return (a.map((list) => (
      <div key={list.id} className="Owner" onClick={() => { navigate(`/store/${list.id}`) }}>
        <span className='MenuID'>{list.id}</span>
        <span className='OwnerName'>{list.username}</span>
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
