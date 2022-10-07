import React from 'react'
import { Link } from 'react-router-dom';
import Head from './Head';
import '../css/DetailPage.css'
import ArrowBack from '../asset/arrow_back.svg'
import logo from '../asset/logo.svg'
import MenuBox2 from './MenuBox2';



function DetailPage( ) {

    return (
        <div className='DetailWrap'>
            <Head />
            <div className='toMenu'>
                <Link to='/store'><img className='ArrowBack' src={ArrowBack} alt={logo} /></Link>
                <Link to='/store' className='toMenuText'>메뉴 목록</Link>
            </div>
            <div className='DetailContainer'>
                <div className='DetailLeft'></div>
                <div className='DetailRight'></div>
            </div>
        </div>

    );
}

export default DetailPage;