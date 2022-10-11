import logo from '../asset/waffle_logo.svg';
import '../css/Head.css';
import React from 'react'
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import {EveryContext} from '../App';




function Head() {

  const value = useContext(EveryContext)
  const LoginId = value.LoginId

  return (
    <div className='Head'>
      <div className="Title">
        <Link to="/" ><img className="Logo" src={logo} alt="Logo" /></Link>
        <Link to="/" className='headtitle' ><h1>와플스튜디오 메뉴 관리</h1></Link>
      </div>
      {LoginId == '' && <div className='LoginTap'>
        <Link to="/login" ><button>로그인</button></Link>
      </div>}
    </div>
  );
}

export default Head;