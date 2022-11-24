import logo from '../../asset/waffle_logo.svg';
import './Head.scss';
import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { IDContext } from '../../App';
import axios from "axios";
import {initLoginStatus, IOwner} from '../../lib/Interface';

function Head() {

  const value = useContext(IDContext)
  const LoginStatus = value.LoginStatus
  const setLoginStatus = value.setLoginStatus
  const StoreStatus = value.StoreStatus
  const LoginRefresh:IOwner|null = localStorage.getItem('login')? JSON.parse(localStorage.getItem('login')||"{}") : null
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
        setLoginStatus(initLoginStatus())
        localStorage.removeItem('login')
      })
      .catch((error) => {
      })
  }

  return (
    <div className='Head'>
      <div className="Title">
        <Link to="/" ><img className="Logo" src={logo} alt="Logo" /></Link>
        {Number.isNaN(StoreStatus.id) ?
          <Link to="/" className='headtitle'><h1>와플스튜디오 메뉴 관리</h1></Link>
          :
          <Link to="/" className='storeTitle'>
            <p className='storeTitleTop'>와플스튜디오 메뉴 관리</p>
            <p className='storeTitleBottom'>{StoreStatus.name}
              <span>{`by ${StoreStatus.owner}`}</span>
            </p>
          </Link>
        }
      </div>
      {LoginRefresh == null ?
        <div className='LoginTap'>
          <button onClick={() => navigate('/login')}>로그인</button>
        </div> :
        <div className='LoginTap'>
          <p className='LoginStatus'><span className='LoginIdBold'>{LoginRefresh.username}</span>님 환영합니다!</p>
          <div className='LoginButtonArea'>
            <button onClick={() => { navigate(`/store/${LoginStatus.UserID}`) }}>내 가게</button>
            <button onClick={() => { Logout() }}>로그아웃</button>
          </div>
        </div>}
    </div>
  );
}

export default Head;