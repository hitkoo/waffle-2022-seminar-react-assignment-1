import '../css/Menulist.css';
import React from 'react'
import { typetotext, rateToStarBig } from './function';

function Menulist({menuList, selectMenu, setSelect}) {


      const ShowMenuList = (menu) =>{
        return (menu.map((list) => (
          <div key={list.id} className={"Menu" + (list.name === selectMenu.name ? "select" : "")} onClick={()=>setSelect(list)}>
              <span id='selectid' className='MenuID'>{list.id}</span>
              <span className='MenuName'>{list.name}</span>
              <span className='MenuType'>{typetotext(list.type)}</span>
              <span className='MenuPrice'>{list.price.toLocaleString()}</span>
              <span className='MenuRate'>{rateToStarBig(list.rating)}</span>
          </div>
        )))}
      
    return (
            ShowMenuList(menuList) 
    );
}

export default Menulist;