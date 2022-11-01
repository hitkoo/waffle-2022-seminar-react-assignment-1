import '../css/Store.css';
import MenuBox from './MenuBox';
import Head from './Head';
import Search from './Search'
import { useState, useEffect, useContext } from 'react';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IDContext, MenuContext } from '../App'
import Loading from './Loading';


function Store() {

  // 검색기능을 위한 search state 정의
  const [search, setSearch] = useState("");
  const [Load, setLoad] = useState(true);
  const value = useContext(MenuContext)
  const value2 = useContext(IDContext);
  const setStoreId = value2.setStoreId;
  const setMenu = value.setMenu;
  const setSelect = value.setSelect;
  const param = useParams();
  

  useEffect(() => {
    setStoreId(param.owner)
    setSelect("")
    axios
      .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', {params : { owner: param.owner }})
      .then((res) => {
        setMenu(res.data.data)
        setLoad(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [param.owner])

  return (
    Load ?
      <Loading /> :
      <div className="Wrap">
        <Head />
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
