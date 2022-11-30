import React, { useContext } from 'react';
import { MenuContext } from '../../App';
import './MenuBox2.scss';
import logo from '../../asset/waffle_logo.svg';
import { useNavigate } from 'react-router-dom';
import { typetotext } from '../../lib/function';
import { IMenu } from '../../lib/Interface';

function MenuBox2() {

    const navigate = useNavigate()
    const { selectMenu, setSelect } = useContext(MenuContext)

    if (Object.keys(selectMenu).length !== 0) {
        return (
            <div className='MenuBox_2'>
                <button className='selectcancle' onClick={() => { setSelect({} as IMenu) }}>x</button>
                <img src={selectMenu.image} alt={""} onError={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                        e.target.src = logo;
                    }
                }} />
                <p className='selectname'>{selectMenu.name}</p>
                <p className='selecttype'>{typetotext(selectMenu.type)}</p>
                <p className='selectprice'>{selectMenu.price.toLocaleString()}원</p>
                <div className='detailview'>
                    <button onClick={() => { navigate(`/menus/${selectMenu.id}`) }}>자세히</button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default MenuBox2;