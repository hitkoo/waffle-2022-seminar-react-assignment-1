import '../css/Updatemodal.css';
import '../css/EditPage.css';
import React from "react";
import Head from './Head';
import { useContext } from 'react';
import { IDContext, MenuContext } from '../App';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {typetotext, FindMenubyID} from './function';

function EditPage() {

    const navigate = useNavigate();
    const params = useParams();

    const value = useContext(MenuContext)
    const menuList = value.menuList
    const setMenu = value.setMenu
    const setSelect = value.setSelect

    const value2 = useContext(IDContext)
    const LoginStatus = value2.LoginStatus

    const Index = FindMenubyID(menuList, params.id)
    const ThisPageMenu = menuList[Index] 

    const [inputs, setInputs] = useState({ enteredNum: "", enteredURL: "", enteredDes: "" })
    const { enteredNum, enteredURL, enteredDes } = inputs
    const changeInputs = (e) => {
        const { name, value } = e.target
        if (name === 'enteredNum') {
            const numvalue = value.replaceAll(",", "");
            if (!isNaN(numvalue)) {
                const removedCommaValue = Number(numvalue);
                setInputs({ ...inputs, [name]: removedCommaValue.toLocaleString() })
            } else {
                alert("가격에는 숫자만 입력해야합니다.")
                setInputs({ ...inputs, [name]: "" })
            };
        } else {
            setInputs({ ...inputs, [name]: value })
        }
    }
   
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
            navigate(-1);
        }
    }

    useEffect(() => {
        if (!LoginStatus.isLogin){
            alert('로그인 후 이용해주세요')
            navigate(-1)
        } else { 
            if (Index === -1){
            alert('없는 메뉴 입니다.')
            navigate(-1)
        } else {
            setInputs({enteredNum: ThisPageMenu.price.toLocaleString(), enteredURL: ThisPageMenu.image, enteredDes: ThisPageMenu.description})
        }}
     },[])

    return ( Index !== -1 &&
        <div className='AddWrap'>
            <Head />
            <div className='buttonfix'>
            <div className='Editcontainer'>
                <b className='title'>메뉴 수정</b>
                <p className='Editline'><span className='subtitle'>이름</span><span className='nametype'>{ThisPageMenu.name}</span></p>
                <p className='Editline'><span className='subtitle'>종류</span><span className='nametype'>{typetotext(ThisPageMenu.type)}</span></p>
                <p className='line'>가격</p>
                <input name='enteredNum'id='price' type='text' className='input' placeholder="10,000(필수)" value={enteredNum} onChange={changeInputs}></input>
                <p className='line'>상품 이미지</p>
                <input name='enteredURL' id='image' type='text' className='input' placeholder="이미지URL(선택)" value={enteredURL} onChange={changeInputs}></input>
                <p className='line'>설명</p>
                <textarea name='enteredDes' id='description' type='text' placeholder="상품에 대한 자세한 설명을 입력해주세요." value={enteredDes} onChange={changeInputs}></textarea>
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
