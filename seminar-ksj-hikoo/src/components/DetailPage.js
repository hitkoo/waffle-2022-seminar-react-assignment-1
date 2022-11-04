import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { MenuContext, IDContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import {typetotext} from './function';
import Head from './Head';
import '../css/DetailPage.css'
import ArrowBack from '../asset/arrow_back.svg'
import logo from '../asset/waffle_logo.svg'
import editicon from '../asset/edit.svg';
import deleteicon from '../asset/delete.svg';
import Deletemodal from './Deletemodal';
import Loading from './Loading';
import axios from 'axios';
import Reviews from './Reviews';



function DetailPage() {

    const [DeletemodalOpen, setDeletemodalOpen] = useState(false);
    const showDeletemodal = () => {
      setDeletemodalOpen(true);
    };

    const navigate = useNavigate();

    const value = useContext(MenuContext)
    const menuList = value.menuList
    const setSelect = value.setSelect
    const [Load, setLoad] = useState(true);
    const [ThisPageMenu, setThisPageMenu] = useState();
    const value2 = useContext(IDContext)
    const setStore = value2.setStore
    const StoreStatus = value2.StoreStatus

    const params = useParams();
    const handleError = (e) => {
        e.target.src = logo;
    }

    useEffect(()=>{
        axios
        .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${params.id}`)
        .then((res) => {
            setThisPageMenu(res.data)
            setStore({id: res.data.owner.id, name : res.data.owner.store_name, owner : res.data.owner.username})
            setLoad(false)
        })
        .catch((error) => {
            navigate(-1)
        })
    },[])

    return ( Load ? <Loading/> :
       <div className='DetailWrap'>
            <Head />
            <div className='toMenu'>
                <img className='ArrowBack' src={ArrowBack} alt={logo} onClick={()=>{setSelect(ThisPageMenu); navigate(`/store/${StoreStatus.id}`)}}/>
                <span className='toMenuText' onClick={()=>{navigate(`/store/${StoreStatus.id}`)}}>메뉴 목록</span>
            </div>
            <div className='DetailContainer'>
                <div className='DetailLeft'>
                    <img className='selectimage' src={ThisPageMenu.image} alt={logo} onError={handleError} />
                    <p className='selectname'>{ThisPageMenu.name}</p>
                    <p className='selecttype'>{typetotext(ThisPageMenu.type)}</p>
                    <p className='selectprice'>{ThisPageMenu.price.toLocaleString()}원</p>
                    <p className='selectdes'>{ThisPageMenu.description}</p>
                    {JSON.parse(localStorage.getItem('login'))!=null && JSON.parse(localStorage.getItem('login')).owner.id == ThisPageMenu.owner.id && <div className='editdelete'>
                        <img className='editicon' src={editicon} onClick={()=>{navigate(`/menus/${params.id}/edit`)}} alt={logo} />
                        <img className='deleteicon' src={deleteicon} onClick={showDeletemodal} alt={logo} />
                    </div>}
                </div>
                <div className='DetailRight'>
                    <Reviews ThisPageMenu={ThisPageMenu}></Reviews>
                </div>
            </div>
            {DeletemodalOpen && <Deletemodal
                DeletemodalOpen={DeletemodalOpen} setDeletemodalOpen={setDeletemodalOpen} ThisPageMenu={ThisPageMenu} params={params} StoreStatus={StoreStatus} MenuOrReview="Menu">
            </Deletemodal>}
        </div>
    )
}

export default DetailPage;