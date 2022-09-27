import React from 'react';
import '../css/MenuBox2.css';
import editicon from '../asset/edit.png';
import deleteicon from '../asset/delete.svg';
import logo from '../asset/waffle_logo.svg';

function MenuBox2({ selectMenu, setSelect, showUpdatemodal, showDeletemodal, comma }) {

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
                <p className='selectprice'>{comma(selectMenu.price)}원</p>
                <div className='editdelete'>
                    <img className='editicon' src={editicon} onClick={showUpdatemodal} alt={logo} />
                    <img className='deleteicon' src={deleteicon} onClick={showDeletemodal} alt={logo} />
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default MenuBox2;