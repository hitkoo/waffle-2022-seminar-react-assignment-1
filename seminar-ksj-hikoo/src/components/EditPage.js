import '../css/Updatemodal.css';
import '../css/EditPage.css';
import React from "react";
import Head from './Head';
import { useContext } from 'react';
import { IDContext, MenuContext } from '../App';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { typetotext } from './function';
import axios from 'axios';
import Loading from './Loading';

function EditPage() {

    const [Load, setLoad] = useState(true);
    const navigate = useNavigate();
    const param = useParams();
    const [ThisPageMenu, setThisPageMenu] = useState();

    const value = useContext(MenuContext)
    const setMenu = value.setMenu

    const value2 = useContext(IDContext)
    const StoreStatus = value2.StoreStatus
    const setStore = value2.setStore

    const [inputs, setInputs] = useState({ enteredNum: "", enteredName: "", enteredType: "", enteredURL: "", enteredDes: "" })
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
            if (JSON.parse(localStorage.getItem('login')) != null) {
                axios
                    .patch(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${param.id}`, {
                        "price": Number(price),
                        "image": image,
                        "description": des
                    }, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
                        },
                        params: { id: param.id }
                    })
                    .then(() => {
                        axios
                            .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: StoreStatus.id } })
                            .then((res) => {
                                setMenu(res.data.data)
                                navigate(`/menus/${param.id}`);
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                navigate(-1)
            }
        }
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('login')) == null) {
            navigate('/login')
        } else {

            axios
                .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${param.id}`)
                .then((res) => {
                    const Menu = res.data
                    if (JSON.parse(localStorage.getItem('login')).owner.id == res.data.owner.id) {
                        setThisPageMenu(res.data)
                        setStore({
                            id: JSON.parse(localStorage.getItem('login')).owner.id,
                            name: JSON.parse(localStorage.getItem('login')).owner.store_name,
                            owner: JSON.parse(localStorage.getItem('login')).owner.username
                        })
                        setInputs({
                            enteredNum: Menu.price.toLocaleString(),
                            enteredURL: Menu.image,
                            enteredDes: Menu.description
                        })
                        setLoad(false)
                    } else {
                        navigate('/')
                    }
                })
                .catch((error) => {
                    navigate(-1)
                })
        }
    }, [])

    return (Load ? <Loading /> :
        <div className='AddWrap'>
            <Head />
            <div className='buttonfix'>
                <div className='Editcontainer'>
                    <b className='title'>메뉴 수정</b>
                    <p className='Editline'><span className='subtitle'>이름</span><span className='nametype'>{ThisPageMenu.name}</span></p>
                    <p className='Editline'><span className='subtitle'>종류</span><span className='nametype'>{typetotext(ThisPageMenu.type)}</span></p>
                    <p className='line'>가격</p>
                    <input name='enteredNum' id='price' type='text' className='input' placeholder="10,000(필수)" value={enteredNum} onChange={changeInputs}></input>
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
