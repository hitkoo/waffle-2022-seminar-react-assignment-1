import './Store.scss';
import MenuBox from './MenuBox';
import Head from '../Head/Head';
import Search from '../Search/Search'
import { useState, useEffect, useContext } from 'react';
import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IDContext, MenuContext } from '../../App'
import Loading from '../Loading/Loading';
import { IMenu } from '../../lib/Interface';

function Store() {

  // 검색기능을 위한 search state 정의
  const [Load, setLoad] = useState<boolean>(true);
  const value = useContext(MenuContext)
  const value2 = useContext(IDContext);
  const setStore = value2.setStore;
  const setMenu = value.setMenu;
  const search = value.search;
  const setSelect = value.setSelect;
  const param = useParams();

  useEffect(() => {
    setSelect({} as IMenu)
    search === "" ? 
    axios
    .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: param.owner } })
    .then((res) => {
      setMenu(res.data.data)
      axios
        .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/${param.owner}`, { params: { owner: param.owner } })
        .then((res)=>{
          setStore({id: res.data.owner.id, name : res.data.owner.store_name, owner : res.data.owner.username})
          setLoad(false)
        })
    })
    .catch((error) => {
    }) 
    :
    axios
      .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: param.owner, search: search } })
      .then((res) => {
        setMenu(res.data.data)
        axios
          .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/${param.owner}`, { params: { owner: param.owner } })
          .then((res)=>{
            setStore({id: res.data.owner.id, name : res.data.owner.store_name, owner : res.data.owner.username})
          })
      })
      .catch((error) => {
      })
  }, [param.owner, search, setMenu, setSelect, setStore])

  return (
    Load ?
      <Loading /> :
      <div className="Wrap">
        <Head />
        <Search />
        <MenuBox />
      </div>
  );
}

export default Store;
