import '../css/Updatemodal.css';
import '../css/EditPage.css';
import React from "react";
import Head from './Head';
import { useContext } from 'react';
import { EveryContext } from '../App';
import { useRef, useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditPage() {
    const value = useContext(EveryContext)
    const menuList = value.menuList
    const setMenu = value.setMenu
    const setEnterdName = value.setEnterdName
    const enteredNum = value.enteredNum
    const setEnterdNum = value.setEnterdNum
    const enteredURL = value.enteredURL
    const setEnterdURL = value.setEnterdURL
    const setSelect = value.setSelect
    const changeEnteredNum = value.changeEnteredNum
    const changeEnteredURL = value.changeEnteredURL
    const enteredDes = value.enteredDes
    const changeEnteredDes = value.changeEnteredDes
    const setEnterdType = value.setEnterdType
    const setEnteredDes = value.setEnteredDes
    const typetotext = value.typetotext
    const comma = value.comma

    const params = useParams();
    const Index = menuList.findIndex(e => e.id === Number(params.id))
    const ThisPageMenu = menuList[Index]

    const navigate = useNavigate();


    useEffect(() => {
        setEnterdNum(comma(ThisPageMenu.price));
        setEnterdURL(ThisPageMenu.image);
        setEnteredDes(ThisPageMenu.description);
    }, [])

    const EditMenu = () => {

        const price = enteredNum.replaceAll(",", "")
        const image = enteredURL
        const des = enteredDes

        if (price === '' || price === '0') {
            alert("가격은 필수 입력 사항입니다.")
        } else if (enteredNum.replaceAll(",", "") % 10 !== 0) {
            alert("가격의 최소단위는 10원입니다.")
        } else {
            const newMenuList = [...menuList]
            if (Index !== -1) {
                newMenuList[Index] = { id: ThisPageMenu.id, name: ThisPageMenu.name, price: price, image: image, type: ThisPageMenu.type, description: des }
            }
            setMenu(newMenuList);
            setSelect(newMenuList[Index])
            setEnterdName("");
            setEnterdType("");
            setEnterdNum("");
            setEnterdURL("");
            setEnteredDes("");
            navigate(-1);
        }
    }

    return (
        <div className='AddWrap'>
            <Head />
            <div className='buttonfix'>
            <div className='Editcontainer'>
                <b className='title'>메뉴 수정</b>
                <p className='Editline'><span className='subtitle'>이름</span><span className='nametype'>{ThisPageMenu.name}</span></p>
                <p className='Editline'><span className='subtitle'>종류</span><span className='nametype'>{typetotext(ThisPageMenu.type)}</span></p>
                <p className='line'>가격</p>
                <input id='price' type='text' className='input' placeholder="10,000(필수)" value={enteredNum} onChange={changeEnteredNum}></input>
                <p className='line'>상품 이미지</p>
                <input id='image' type='text' className='input' placeholder="이미지URL(선택)" value={enteredURL} onChange={changeEnteredURL}></input>
                <p className='line'>설명</p>
                <textarea id='description' type='text' placeholder="상품에 대한 자세한 설명을 입력해주세요." value={enteredDes} onChange={changeEnteredDes}></textarea>
                <div className='buttonArea'>
                    <button className='add' onClick={() => EditMenu()}>
                        저장
                    </button>
                    <button className='close' onClick={() => navigate(-1)}>
                        취소
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}
export default EditPage;
