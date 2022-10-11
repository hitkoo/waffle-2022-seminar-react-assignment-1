import React, { useContext } from 'react'
import { EveryContext } from '../App';
import '../css/MenuBox1.css';
import Menulist from './Menulist.js';
import add from '../asset/add.svg';
import logo from '../asset/waffle_logo.svg'
import { Navigateto } from './function';

function MenuBox1() {

  const value = useContext(EveryContext);

  const LoginId = value.LoginId
  const search = value.search
  const menuList = value.menuList
  const selectMenu = value.selectMenu
  const select = value.select
  const setEnterdName = value.setEnterdName
  const setEnterdNum = value.setEnterdNum
  const setEnterdURL = value.setEnterdURL
  const setEnterdType = value.setEnterdType
  const setEnteredDes = value.setEnteredDes

  const OpenAddPage = () => {
    setEnterdName("");
    setEnterdNum("");
    setEnterdURL("");
    setEnterdType("");
    setEnteredDes("");
    Navigateto('/menus/new')
  }

  //menuList state를 활용해서 메뉴 목록을 띄워주는 부분은 하위 컴포넌트로 넘김
  return (

    <div className='buttonfix'>
      <div className='MenuBox_1'>
        <div className='MenuContent'>
          <div className='ID'><b>ID</b></div>
          <div className='Name'><b>이름</b></div>
          <div className='Type'><b>종류</b></div>
          <div className='Price'><b>가격</b></div>
        </div>
        <Menulist menuList={menuList} selectMenu={selectMenu} select={select} search={search}></Menulist>
        {LoginId!='' && <img id='AddButton'src={add} alt={logo} onClick={() => OpenAddPage()}></img>}

      </div>
    </div>

  );
}

export default MenuBox1;