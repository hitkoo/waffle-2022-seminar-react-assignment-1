import logo from '../asset/waffle_logo.svg';
import '../css/Head.css';
import React from 'react'
import { Link } from 'react-router-dom';




function Head() {

  return (
    <div className='Head'>
    <div className="Title">
      <a href="https://wafflestudio.com"><img className="Logo" src={logo} alt="Logo" /></a>
      <a href="https://wafflestudio.com" className='headtitle'><h1>와플스튜디오 메뉴 관리</h1></a>
    </div>
    <div className='LoginTap'>
      <Link to="/login" ><button>로그인</button></Link>
    </div>
    </div>
  );
}

export default Head;