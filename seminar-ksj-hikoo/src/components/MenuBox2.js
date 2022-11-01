import React, {useContext} from 'react';
import { MenuContext } from '../App';
import '../css/MenuBox2.css';
import logo from '../asset/waffle_logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import {typetotext} from './function';

function MenuBox2() {

    const navigate = useNavigate()
    const value = useContext(MenuContext)
    const selectMenu = value.selectMenu
    const setSelect = value.setSelect

    // img src가 잘못되었거나 입력되지 않았을 때 대체이미지를 띄워주는 함수
    const handleError = (e) => {
        e.target.src = logo;
    }
    // 조건문으로 선택된 메뉴가 있을 때만 렌더링하게 설정  
    if (selectMenu !== "") {
        return (
            <div className='MenuBox_2'>
                <button className='selectcancle' onClick={() => { setSelect("") }}>x</button>
                <img className='selectimage' src={selectMenu.image} alt={logo} onError={handleError} />
                <p className='selectname'>{selectMenu.name}</p>
                <p className='selecttype'>{typetotext(selectMenu.type)}</p>
                <p className='selectprice'>{selectMenu.price.toLocaleString()}원</p>
                <div className='detailview'>
                    <button className='ToDetail' onClick={() => { navigate(`/menus/${selectMenu.id}`) }}>자세히</button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default MenuBox2;