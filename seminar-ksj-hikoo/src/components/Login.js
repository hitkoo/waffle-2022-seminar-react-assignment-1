import '../css/Login.css';
import React, { useState } from 'react'
import Head from './Head';
import {useContext} from 'react';
import {EveryContext} from '../App';
import { useNavigate } from 'react-router-dom';



function Login() {

    const navigate = useNavigate();  
    const value = useContext(EveryContext)
    const setLoginId = value.setLoginId
    const [enteredId, setEnterdId] = useState("");
    const changeEnteredId = (e) => {
        const value = e.target.value;
        setEnterdId(value);
      }

    const Login = () =>{
        // if ()
        setLoginId(enteredId);
        navigate(-1);
    }

    
    return (
        <div className='LoginWrap'>
            <Head/>
            <div className='LoginContainer'>
                <div className='LoginBox'>
                    <div className='LoginTitle'>
                        <b>로그인</b>
                    </div>
                    <div className='LoginSubtitle'>
                        <div className='LoginLeft'>
                            <p className='Loginline'><span className='LoginIDPW'>ID</span>
                                <input className='LoginInput' placeholder='아이디를 입력하세요.' onChange={changeEnteredId} ></input></p>
                            <p className='Loginline'><span className='LoginIDPW'>PASSWORD</span>
                                <input className='LoginInput' placeholder='비밀번호를 입력하세요.'></input></p>
                        </div>
                        <div className='LoginRight'>
                            <button ID='LoginButton' onClick={()=>Login()}>로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;