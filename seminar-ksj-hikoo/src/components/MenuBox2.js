import React, {useContext} from 'react';
import { EveryContext } from '../App';
import '../css/MenuBox2.css';
import logo from '../asset/waffle_logo.svg';
import { Link } from 'react-router-dom';

function MenuBox2() {

    const value = useContext(EveryContext)
    const selectMenu = value.selectMenu
    const setSelect = value.setSelect
    const comma = value.comma
    const typetotext = value.typetotext

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
                <p className='selectprice'>{comma(selectMenu.price)}원</p>
                <div className='detailview'>
                    <Link to={`/menus/${selectMenu.id}`}><button className='ToDetail'>자세히</button></Link>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default MenuBox2;