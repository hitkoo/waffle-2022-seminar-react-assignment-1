import './Menulist.scss';
import React, { useContext } from 'react'
import { typetotext, rateToStarBig } from '../../lib/function';
import { IMenu } from '../../lib/Interface';
import { MenuContext } from '../../App';

function Menulist(menu:IMenu) {

  const { selectMenu, setSelect } = useContext(MenuContext);

  return (
    <div key={menu.id} className={"Menu" + (menu.name === selectMenu.name ? "select" : "")} onClick={() => setSelect(menu)}>
      <span id='selectid' className='MenuID'>{menu.id}</span>
      <span className='MenuName'>{menu.name}</span>
      <span className='MenuType'>{typetotext(menu.type)}</span>
      <span className='MenuPrice'>{menu.price.toLocaleString()}</span>
      <span className='MenuRate'>{rateToStarBig(menu.rating)}{`${(menu.rating/2).toFixed(1)}`}</span>
    </div>
  );
}

export default Menulist;