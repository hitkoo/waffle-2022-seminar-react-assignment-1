import './EditPage.scss';
import React from "react";
import Head from '../Head/Head';
import { useContext } from 'react';
import { IDContext, MenuContext } from '../../App';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { typetotext } from '../../lib/function';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import { IMenu, IOwner } from '../../lib/Interface';

function EditLogic() {

    const navigate = useNavigate();
    const param = useParams();

    const [inputs, setInputs] = useState<{enteredNum: string, enteredURL: string, enteredDes: string}>({ enteredNum: "", enteredURL: "", enteredDes: "" })
    const { enteredNum, enteredURL, enteredDes } = inputs

    const {setMenu} = useContext(MenuContext)
    const {LoginStatus, StoreStatus, setStore} = useContext(IDContext)

    const LoginRefresh:IOwner|null = localStorage.getItem('login')? JSON.parse(localStorage.getItem('login')||"{}") : null

    const changeInputs = (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === 'enteredNum') {
            const numvalue:number = Number(value.replaceAll(",", ""));
            if (!isNaN(numvalue)) {
                const removedCommaValue = numvalue;
                setInputs({ ...inputs, [name]: removedCommaValue.toLocaleString() })
            } else {
                toast.warn("가격에는 숫자만 입력해야합니다");
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
            toast.warn("가격은 필수 입력 사항입니다.");
        } else if (Number(enteredNum.replaceAll(",", "")) % 10 !== 0) {
            toast.warn("가격의 최소단위는 10원입니다");
        } else {
            if (LoginRefresh != null) {
                axios
                    .patch(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${param.id}`, {
                        "price": Number(price),
                        "image": image,
                        "description": des
                    }, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${LoginStatus.Token}`
                        },
                        params: { id: param.id }
                    })
                    .then(() => {
                        axios
                            .get('https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/', { params: { owner: StoreStatus.id } })
                            .then((res) => {
                                setMenu(res.data.data)
                                toast.success('메뉴 수정에 성공했습니다');
                                navigate(`/menus/${param.id}`);
                            })
                            .catch((error) => {
                                toast.error('메뉴 수정에 실패했습니다');
                            })
                    })
                    .catch((error) => {
                        toast.error('메뉴 수정에 실패했습니다');
                    })
            } else {
                toast.warn('로그인 후 이용해주세요');
                navigate('/login')
            }
        }
    }
    return {navigate, param, LoginRefresh, EditMenu, changeInputs, setStore, setInputs, enteredNum, enteredURL, enteredDes}
}


export default function EditPage() {

    const [Load, setLoad] = useState<boolean>(true);
    const [ThisPageMenu, setThisPageMenu] = useState<IMenu>();
   
    const {navigate, param, LoginRefresh, EditMenu, changeInputs, setStore, setInputs, enteredNum, enteredURL, enteredDes} = EditLogic()

    useEffect(() => {
        if (LoginRefresh == null) {
            toast.warn('로그인 후 이용해주세요');
            navigate('/login')
        } else {
            axios
                .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${param.id}`)
                .then((res) => {
                    const Menu = res.data
                    if (LoginRefresh.id === res.data.owner.id) {
                        setThisPageMenu(res.data)
                        setStore({
                            id: LoginRefresh.id,
                            name: LoginRefresh.store_name,
                            owner: LoginRefresh.username
                        })
                        setInputs({
                            enteredNum: Menu.price.toLocaleString(),
                            enteredURL: Menu.image,
                            enteredDes: Menu.description
                        })
                        setLoad(false)
                    } else {
                        toast.warn('본인 가게의 메뉴만 수정할 수 있습니다.');
                        navigate(`/`)
                    }
                })
                .catch((error) => {
                    toast.error('메뉴 불러오기에 실패했습니다');
                    navigate(-1)
                })
        }
    }, [])

    return (Load ? <Loading /> :
        <div className='EditWrap'>
            <Head />
            <div className='buttonfix'>
                <div className='Editcontainer'>
                    <b >메뉴 수정</b>
                    <p className='Editline'><span className='subtitle'>이름</span><span className='nametype'>{ThisPageMenu?.name}</span></p>
                    <p className='Editline'><span className='subtitle'>종류</span><span className='nametype'>{typetotext(ThisPageMenu?.type)}</span></p>
                    <p className='line'>가격</p>
                    <input name='enteredNum' id='price' type='text' className='input' placeholder="10,000(필수)" value={enteredNum} onChange={changeInputs}></input>
                    <p className='line'>상품 이미지</p>
                    <input name='enteredURL' id='image' type='text' className='input' placeholder="이미지URL(선택)" value={enteredURL} onChange={changeInputs}></input>
                    <p className='line'>설명</p>
                    <textarea name='enteredDes' id='description' placeholder="상품에 대한 자세한 설명을 입력해주세요." value={enteredDes} onChange={changeInputs}></textarea>
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
