import React from 'react'
import { useContext } from 'react';
import { EveryContext } from '../App';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Head from './Head';
import '../css/DetailPage.css'
import ArrowBack from '../asset/arrow_back.svg'
import logo from '../asset/waffle_logo.svg'
import editicon from '../asset/edit.svg';
import deleteicon from '../asset/delete.svg';
import Deletemodal from './Deletemodal';



function DetailPage() {

    const value = useContext(EveryContext)
    const LoginId = value.LoginId
    const menuList = value.menuList
    const comma = value.comma
    const DeletemodalOpen = value.DeletemodalOpen
    const setDeletemodalOpen = value.setDeletemodalOpen
    const showDeletemodal = value.showDeletemodal
    
    const params = useParams();
    const Index = menuList.findIndex(e => e.id === Number(params.id))
    const ThisPageMenu = menuList[Index]

    const navigate = useNavigate();

    const handleError = (e) => {
        e.target.src = logo;
    }

    return (
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
                    <p className='selectprice'>{comma(ThisPageMenu.price)}원</p>
                    <p className='selectdes'>{ThisPageMenu.description}</p>
                    {LoginId != '' && <div className='editdelete'>
                        <img className='editicon' src={editicon} onClick={()=>{navigate(`/menus/edit/${params.id}`)}} alt={logo} />
                        <img className='deleteicon' src={deleteicon} onClick={showDeletemodal} alt={logo} />
                    </div>}
                </div>
                <div className='DetailRight'></div>
            </div>
            {DeletemodalOpen && <Deletemodal
                DeletemodalOpen={DeletemodalOpen} setDeletemodalOpen={setDeletemodalOpen}>
            </Deletemodal>}
        </div>

    );
}

export default DetailPage;