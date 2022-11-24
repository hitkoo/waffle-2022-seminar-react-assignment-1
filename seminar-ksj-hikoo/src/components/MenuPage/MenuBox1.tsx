import './MenuBox1.scss';
import Menulist from './Menulist';
import add from '../../asset/add.svg';
import logo from '../../asset/waffle_logo.svg'
import {useNavigate,useParams} from 'react-router-dom';
import { IMenu, IOwner } from '../../lib/Interface';
import React, { useContext } from 'react';
import { MenuContext } from '../../App';

function MenuBox1() {
  
  const { menuList } = useContext(MenuContext);
  const param = useParams();
  const LoginRefresh:IOwner|null = localStorage.getItem('login')? JSON.parse(localStorage.getItem('login')||"{}") : null
  const navigate = useNavigate()
  const OpenAddPage = () => {
    navigate('/menus/new')
  }

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
        {menuList?.map((menu: IMenu)=>(Menulist(menu)))}
        {LoginRefresh?.id === Number(param.owner) && <img id='AddButton'src={add} alt={logo} onClick={() => OpenAddPage()}></img>}

      </div>
    </div>

  );
}


export default MenuBox1;