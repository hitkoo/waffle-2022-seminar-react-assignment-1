import '../css/Store.css';
import MenuBox from './MenuBox';
import Head from './Head';
import Search from './Search'
import { useState, useEffect, useContext } from 'react';
import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IDContext, MenuContext } from '../App'
import Loading from './Loading';


function Store() {

  // 검색기능을 위한 search state 정의
  const [Load, setLoad] = useState(true);
  const value = useContext(MenuContext)
  const value2 = useContext(IDContext);
  const setStore = value2.setStore;
  const setMenu = value.setMenu;
  const search = value.search;
  const setSelect = value.setSelect;
  const param = useParams();

  useEffect(() => {
    setSelect("")
    search === "" ? 
    axios
    .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: param.owner } })
    .then((res) => {
      setMenu(res.data.data)
      console.log('첫메뉴받아오기')
      axios
        .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/${param.owner}`, { params: { owner: param.owner } })
        .then((res)=>{
          setStore({id: res.data.owner.id, name : res.data.owner.store_name, owner : res.data.owner.username})
          setLoad(false)
        })
    })
    .catch((error) => {
      console.log(error)
    }) 
    :
    axios
      .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: param.owner, search: search } })
      .then((res) => {
        setMenu(res.data.data)
        console.log('검색메뉴받아오기')
        axios
          .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/${param.owner}`, { params: { owner: param.owner } })
          .then((res)=>{
            setStore({id: res.data.owner.id, name : res.data.owner.store_name, owner : res.data.owner.username})
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [param.owner, search])

  return (
    Load ?
      <Loading /> :
      <div className="Wrap">
        <Head />
        <Search>
        </Search>
        <MenuBox>
        </MenuBox>
      </div>
  );
}

export default Store;
