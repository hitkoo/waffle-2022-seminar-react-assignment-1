import React, { useContext } from 'react'
import { MenuContext, IDContext } from '../App';
import '../css/MenuBox1.css';
import Menulist from './Menulist.js';
import add from '../asset/add.svg';
import logo from '../asset/waffle_logo.svg'
import {useNavigate,useParams} from 'react-router-dom';

function MenuBox1() {
  
  const value = useContext(MenuContext);
  const search = value.search
  const menuList = value.menuList
  const selectMenu = value.selectMenu
  const setSelect = value.setSelect
  const param = useParams();

  const value2 = useContext(IDContext)
  const LoginStatus = value2.LoginStatus

  const navigate = useNavigate()

  const OpenAddPage = () => {
    navigate('/menus/new')
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
          <div className='Rate'><b>평점</b></div>
        </div>
        <Menulist menuList={menuList} selectMenu={selectMenu} setSelect={setSelect} search={search}></Menulist>
        {JSON.parse(localStorage.getItem('login'))!=null && JSON.parse(localStorage.getItem('login')).owner.id == param.owner && <img id='AddButton'src={add} alt={logo} onClick={() => OpenAddPage()}></img>}

      </div>
    </div>

  );
}

export default MenuBox1;