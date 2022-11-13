import '../css/AddPage.css';
import React from "react";
import { useState, useContext, useEffect } from 'react';
import { IDContext, MenuContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { FindMenubyName } from './function';
import Head from './Head';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPage() {

    const navigate = useNavigate()
    const value = useContext(MenuContext)
    const menuList = value.menuList
    const setMenu = value.setMenu
    const setSelect = value.setSelect
    const {LoginStatus, StoreStatus, setStore} = useContext(IDContext)
    const LoginRefresh = JSON.parse(localStorage.getItem('login'))

    const [inputs, setInputs] = useState({ enteredNum: "", enteredName: "", enteredType: "", enteredURL: "", enteredDes: "" })
    const { enteredNum, enteredName, enteredType, enteredURL, enteredDes } = inputs

    const changeInputs = (e) => {
        const { name, value } = e.target
        if (name === 'enteredNum') {
            const numvalue = value.replaceAll(",", "");
            if (!isNaN(numvalue)) {
                const removedCommaValue = Number(numvalue);
                setInputs({ ...inputs, [name]: removedCommaValue.toLocaleString() })
            } else {
                toast.warn("가격에는 숫자만 입력해야합니다");
                setInputs({ ...inputs, [name]: "" })
            };
        } else {
            setInputs({ ...inputs, [name]: value })
        }
    }

    // 추가버튼 클릭시 실행되는 함수
    const addMenu = () => {
        const name = enteredName
        const type = enteredType
        const price = enteredNum.replaceAll(",", "")
        const image = enteredURL
        const des = enteredDes
        if (name === '' || price === '' || type === '') {
            toast.warn("이름, 종류, 가격은 필수 입력 사항입니다.");
        }
        else if (enteredNum.replaceAll(",", "") % 10 !== 0) {
            toast.warn('가격의 최소 단위는 10원입니다.');
        }
        else {
            if (LoginRefresh != null) {
                axios
                    .post('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', {
                        "name": name,
                        "type": type,
                        "price": Number(price),
                        "image": image,
                        "description": des
                    }, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${LoginStatus.Token}`
                        }
                    })
                    .then(() => {
                        axios
                            .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: StoreStatus.id } })
                            .then((res) => {
                                setMenu(res.data.data)
                                setSelect(menuList[FindMenubyName(menuList, name)])
                                toast.success('메뉴 추가에 성공했습니다');
                                navigate(`/store/${StoreStatus.id}`);
                            })
                            .catch((error) => {
                                toast.success('메뉴 목록 불러오기에 실패했습니다');
                                navigate(`/store/${StoreStatus.id}`);
                            })
                    })
                    .catch((error) => {
                        toast.error('메뉴 추가에 실패했습니다');
                    })
            } else {
                toast.warn('로그인 후 이용해주세요');
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        if (LoginRefresh == null) {
            toast.warn('로그인 후 이용해주세요');
            navigate('/login')
        } else {
            setStore({
                id: LoginRefresh.id,
                name: LoginRefresh.store_name,
                owner: LoginRefresh.username
            })
        }
    }, [])


    return (
        <div className='AddWrap'>
            <Head />
            <div className='buttonfix'>
                <div className='container'>
                    <b className='title'>새 메뉴 추가</b>
                    <p className='line'>이름</p>
                    <input id='name' name='enteredName' type='text' className='input' placeholder="맛있는와플(필수)" value={enteredName} onChange={changeInputs}></input>
                    <p className='line'>종류</p>
                    <select id={`type${enteredType === '' ? "no" : ""}`} name='enteredType' type='text' value={enteredType} onChange={changeInputs}>
                        <option key="" value="" disabled selected hidden>상품의 종류를 선택하세요(필수)</option>
                        <option key='waffle' value='waffle'>와플</option>
                        <option key='beverage' value='beverage'>음료</option>
                        <option key='coffee' value='coffee'>커피</option>
                    </select>
                    <p className='line'>가격</p>
                    <input name='enteredNum' id='price' type='text' className='input' placeholder="10,000(필수)" value={enteredNum} onChange={changeInputs}></input>
                    <p className='line'>상품 이미지</p>
                    <input name='enteredURL' id='image' type='text' className='input' placeholder="이미지URL(선택)" value={enteredURL} onChange={changeInputs}></input>
                    <p className='line'>설명</p>
                    <textarea name='enteredDes' id='description' type='text' placeholder="상품에 대한 자세한 설명을 입력해주세요(선택)" value={enteredDes} onChange={changeInputs}></textarea>
                    <div className='buttonArea'>
                        <button className='add' onClick={() => addMenu()}>
                            추가
                        </button>
                        <button className='close' onClick={() => navigate(-1)}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPage;
