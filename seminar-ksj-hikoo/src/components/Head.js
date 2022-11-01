import logo from '../asset/waffle_logo.svg';
import '../css/Head.css';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { IDContext } from '../App';
import axios from "axios";




function Head() {

  const value = useContext(IDContext)
  const LoginStatus = value.LoginStatus
  const setLoginStatus = value.setLoginStatus
  const navigate = useNavigate()
  const Logout = () => {
    axios
      .post("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/auth/logout", null, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${LoginStatus.Token}`
        }
      })
      .then(() => {
        console.log('로그아웃')
        setLoginStatus({ 'isLogin': false, 'LoginUser': "", 'Token': "" })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='Head'>
      <div className="Title">
        <Link to="/" ><img className="Logo" src={logo} alt="Logo" /></Link>
        <Link to="/" className='headtitle' ><h1>와플스튜디오 메뉴 관리</h1></Link>
      </div>
      {!LoginStatus.isLogin ?
        <div className='LoginTap'>
          <button className='LoginButton' onClick={() => navigate('/login')}>로그인</button>
        </div> :
        <div className='LoginTap'>
          <span className='LoginStatus'><span className='LoginIdBold'>{LoginStatus.LoginUser}</span>님 환영합니다!</span>
          <button className='LoginButton' onClick={() => { navigate(`/store/${LoginStatus.UserID}`) }}>내 가게</button>
          <button className='LoginButton' onClick={() => { Logout() }}>로그아웃</button>
        </div>}
    </div>
  );
}

export default Head;