import '../css/Menulist.css';
import React from 'react'
import { typetotext, FilterMenu } from './function';

function Menulist({menuList, selectMenu, setSelect, search}) {

      const filteredMenu = FilterMenu(menuList, search)

      const ShowMenuList = (menu) =>{
        return (menu.map((list) => (
          <div id={list.id} className={"Menu" + (list.id === selectMenu.id ? "select" : "")} onClick={()=>setSelect(list)}>
              <span id='selectid' className='MenuID'>{list.id}</span>
              <span className='MenuName'>{list.name}</span>
              <span className='MenuType'>{typetotext(list.type)}</span>
              <span className='MenuPrice'>{list.price.toLocaleString()}</span>
          </div>
        )))}
      
    return (
        (search === null || search === '') ?
            ShowMenuList(menuList) :
            ShowMenuList(filteredMenu)
    );
}

export default Menulist;