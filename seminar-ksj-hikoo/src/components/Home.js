import '../css/Home.css';
import Head from './Head';
import Search from './Search'
import { useContext, useEffect, useState } from 'react';
import { IDContext, MenuContext } from '../App';
import React from 'react'
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import { rateToStarBig } from './function';
import { toast } from 'react-toastify';

function Home() {

  const [Load, setLoad] = useState(true);
  const [Owners, setOwners] = useState("");
  const navigate = useNavigate();
  const value = useContext(IDContext)
  const value2 = useContext(MenuContext)
  const setStore = value.setStore
  const search = value2.search
  const setSearch = value2.setSearch

  useEffect(() => {
    search === "" ?
    axios
      .get("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/")
      .then((res) => {
        setOwners(res.data)
        setLoad(false)
        setStore({id : "", name : "", ownername : ""})
      })
      .catch((error) => {
        toast.error("가게 목록을 불러오지 못했습니다.")
      }) 
      : axios
      .get("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/", { params: { name : search } })
      .then((res) => {
        setOwners(res.data)
        setLoad(false)
        setStore({id : "", name : "", ownername : ""})
      })
      .catch((error) => {
        toast.error("가게 목록을 불러오지 못했습니다.")
      })
  }, [search])

  const ShowOwnerList = (a) => {
    return (a.map((list) => (
      list.store_name != null &&
      <div key={list.id} className="Store" onClick={() => { navigate(`/store/${list.id}`); setSearch("") }}>
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
