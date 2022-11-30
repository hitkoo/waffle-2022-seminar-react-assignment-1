import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { MenuContext, IDContext } from '../../App';
import { useParams, useNavigate } from 'react-router-dom';
import {typetotext} from '../../lib/function';
import Head from '../Head/Head';
import './DetailPage.scss'
import ArrowBack from '../../asset/arrow_back.svg'
import logo from '../../asset/waffle_logo.svg'
import editicon from '../../asset/edit.svg';
import deleteicon from '../../asset/delete.svg';
import Deletemodal from '../DeleteModal/Deletemodal';
import Loading from '../Loading/Loading';
import axios from 'axios';
import Reviews from './Reviews';
import { IMenu, IOwner } from '../../lib/Interface';



function DetailPage () {

    const [DeletemodalOpen, setDeletemodalOpen] = useState(false);
    const showDeletemodal = () => {
      setDeletemodalOpen(true);
    };

    const navigate = useNavigate();

    const value = useContext(MenuContext)
    const setSelect = value.setSelect
    const [Load, setLoad] = useState(true);
    const [ThisPageMenu, setThisPageMenu] = useState<IMenu>({} as IMenu);
    const {LoginStatus, StoreStatus, setStore} = useContext(IDContext)
    const LoginRefresh:IOwner|null = localStorage.getItem('login')? JSON.parse(localStorage.getItem('login')||"{}") : null
    const params = useParams();

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
    },[navigate, params.id, setStore])

    return ( Load ? <Loading/> :
       <div className='DetailWrap'>
            <Head />
            <div className='toMenu'>
                <img className='ArrowBack' src={ArrowBack} alt={logo} onClick={()=>{setSelect(ThisPageMenu); navigate(`/store/${StoreStatus.id}`)}}/>
                <span onClick={()=>{navigate(`/store/${StoreStatus.id}`)}}>메뉴 목록</span>
            </div>
            <div className='DetailContainer'>
                <div className='DetailLeft'>
                    <img className='selectimage' src={ThisPageMenu.image} alt={""} onError={(e) => {
                    if (e.target instanceof HTMLImageElement) {
                        e.target.src = logo;
                    }
                }}/>
                    <p className='selectname'>{ThisPageMenu.name}</p>
                    <p className='selecttype'>{typetotext(ThisPageMenu.type)}</p>
                    <p className='selectprice'>{ThisPageMenu.price.toLocaleString()}원</p>
                    <p className='selectdes'>{ThisPageMenu.description}</p>
                    {LoginRefresh!=null && LoginRefresh.id === ThisPageMenu.owner.id && <div className='editdelete'>
                        <img className='editicon' src={editicon} onClick={()=>{navigate(`/menus/${params.id}/edit`)}} alt={logo} />
                        <img className='deleteicon' src={deleteicon} onClick={showDeletemodal} alt={logo} />
                    </div>}
                </div>
                <div className='DetailRight'>
                    <Reviews ThisPageMenu={ThisPageMenu} LoginStatus={LoginStatus} LoginRefresh={LoginRefresh}></Reviews>
                </div>
            </div>
            {DeletemodalOpen && <Deletemodal setDeletemodalOpen={setDeletemodalOpen} StoreStatus={StoreStatus} LoginStatus={LoginStatus} MenuOrReview={"Menu"} />}
        </div>
    )
}

export default DetailPage;