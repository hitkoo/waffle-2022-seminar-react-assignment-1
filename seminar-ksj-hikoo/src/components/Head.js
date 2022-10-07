import logo from '../asset/waffle_logo.svg';
import '../css/Head.css';
import React from 'react'
import { Link } from 'react-router-dom';




function Head() {

  return (
    <div className='Head'>
      <div className="Title">
        <Link to="/" ><img className="Logo" src={logo} alt="Logo" /></Link>
        <Link to="/" className='headtitle' ><h1>와플스튜디오 메뉴 관리</h1></Link>
      </div>
      <div className='LoginTap'>
        <Link to="/login" ><button>로그인</button></Link>
      </div>
    </div>
  );
}

export default Head;