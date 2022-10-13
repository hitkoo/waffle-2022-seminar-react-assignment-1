import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { MenuContext, IDContext } from '../App';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {FindMenubyID} from './function';
import Head from './Head';
import '../css/DetailPage.css'
import ArrowBack from '../asset/arrow_back.svg'
import logo from '../asset/waffle_logo.svg'
import editicon from '../asset/edit.svg';
import deleteicon from '../asset/delete.svg';
import Deletemodal from './Deletemodal';



function DetailPage() {

    const [DeletemodalOpen, setDeletemodalOpen] = useState(false);
    const showDeletemodal = () => {
      setDeletemodalOpen(true);
    };


    const navigate = useNavigate();

    const value = useContext(MenuContext)
    const menuList = value.menuList

    const value2 = useContext(IDContext)
    const LoginStatus = value2.LoginStatus

    const params = useParams();
    const Index = FindMenubyID(menuList, params.id)
    console.log(Index)
    const ThisPageMenu = menuList[Index]  

    const handleError = (e) => {
        e.target.src = logo;
    }

    useEffect(()=>{
        if (Index === -1){
            alert('없는 메뉴 입니다.')
            navigate(-1)
        }
    },[])

    return ( Index !== -1 &&
       <div className='DetailWrap'>
            <Head />
            <div className='toMenu'>
                <Link to='/store/1'><img className='ArrowBack' src={ArrowBack} alt={logo} /></Link>
                <Link to='/store/1' className='toMenuText'>메뉴 목록</Link>
            </div>
            <div className='DetailContainer'>
                <div className='DetailLeft'>
                    <img className='selectimage' src={ThisPageMenu.image} alt={logo} onError={handleError} />
                    <p className='selectname'>{ThisPageMenu.name}</p>
                    <p className='selectprice'>{ThisPageMenu.price.toLocaleString()}원</p>
                    <p className='selectdes'>{ThisPageMenu.description}</p>
                    {LoginStatus.isLogin && <div className='editdelete'>
                        <img className='editicon' src={editicon} onClick={()=>{navigate(`/menus/${params.id}/edit`)}} alt={logo} />
                        <img className='deleteicon' src={deleteicon} onClick={showDeletemodal} alt={logo} />
                    </div>}
                </div>
                <div className='DetailRight'></div>
            </div>
            {DeletemodalOpen && <Deletemodal
                DeletemodalOpen={DeletemodalOpen} setDeletemodalOpen={setDeletemodalOpen}>
            </Deletemodal>}
        </div>
    )
}

export default DetailPage;