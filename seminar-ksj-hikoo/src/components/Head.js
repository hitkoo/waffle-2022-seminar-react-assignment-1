import logo from '../asset/waffle_logo.svg';
import '../css/Head.css';
import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {EveryContext} from '../App';




function Head() {

  const value = useContext(EveryContext)
  const LoginId = value.LoginId
  const setLoginId = value.setLoginId
  const navigate = useNavigate()
  const Logout = () => {
    setLoginId('')
  }

  return (
    <div className='Head'>
      <div className="Title">
        <Link to="/" ><img className="Logo" src={logo} alt="Logo" /></Link>
        <Link to="/" className='headtitle' ><h1>와플스튜디오 메뉴 관리</h1></Link>
      </div>
      {LoginId == '' ? 
      <div className='LoginTap'>
        <button className='LoginButton' onClick={()=>navigate('/login')}>로그인</button>
      </div>:
      <div className='LoginTap'>
      <span className='LoginStatus'><span className='LoginIdBold'>{LoginId}</span>님 환영합니다!</span>
      <button className='LoginButton' onClick={()=>{navigate('/store/1')}}>내 가게</button>
      <button className='LoginButton' onClick={()=>{Logout()}}>로그아웃</button>
    </div>}
    </div>
  );
}

export default Head;